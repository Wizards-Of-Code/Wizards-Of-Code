import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import GameStage from "../gamestage";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import GameOver from "../GameOver";
import ImgCollection from "../Home/imgCollection";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import NotFound from "../NotFound";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      battles: [],
      problems: [],
      skills: [],
      battleRef: {},
      avatars: [],
      userRef: {}
    };
    this.setState = this.setState.bind(this);
  }

  login = userId => {
    let userRef = this.props.firebase.user(userId);
    this.setState({ userRef });

    userRef.get().then(user => {
      const userData = user.data();
      this.setState({ user: userData });

      if (userData.activeBattle !== "") {
        let battleRef = this.props.firebase.battle(userData.activeBattle);
        this.setState({ battleRef })
      }
    });

    userRef.onSnapshot(snapshot => {
      this.setState({ user: snapshot.data() });
    });
  };

  getAvatars = () => {
    const avatarsRef = this.props.firebase.avatars();
    avatarsRef
      .get()
      .then(querySnapshot => this.setState({ avatars: querySnapshot.docs }));
  };

  setAvatar = imgUrl => {
    this.state.userRef.set(
      {
        imgUrl: imgUrl
      },
      { merge: true }
    );
  };

  getOpenBattles = () => {
    const openBattlesRef = this.props.firebase.openBattles();
    let allOpenBattles = [];
    openBattlesRef.onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        let status = change.doc.data().status;
        let doc = change.doc.data();
        let id = change.doc.id;
        if (change.type === "added") {
          if (status === "open") {
            allOpenBattles.push({ ...doc, id });
          }
        } else if (change.type === "modified") {
          if (status === "closed") {
            allOpenBattles = allOpenBattles.filter(battle => battle.id !== id);
          }
        }
      });
      this.setState({ battles: allOpenBattles });
    });
  };

  createBattle = () => {
    this.props.firebase.createBattle(this.state.user).then(battleRef => {
      this.setState({ battleRef });
      this.state.userRef.set(
        {
          activeBattle: battleRef.id,
          role: "user1"
        },
        { merge: true }
      );
    });
  };

  joinRandomBattle = () => {
    this.props.firebase.joinRandomBattle(this.state.user).then(battleRef => {
      this.joinBattle(battleRef);
    });
  };

  joinOpenBattle = battleId => {
    let battleRef = this.props.firebase.battle(battleId);
    this.joinBattle(battleRef);
  };

  joinBattle = battleRef => {
    const user = this.state.user;
    battleRef.set(
      {
        user2: user.username,
        user2_health: user.maxHealth,
        status: "closed"
      },
      { merge: true }
    );
    this.setState({ battleRef });
    this.state.userRef.set(
      {
        activeBattle: battleRef.id,
        role: "user2"
      },
      { merge: true }
    );
  };

  componentDidMount() {
    console.log("state", this.state);
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.login(authUser.uid);
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navigation setState={this.setState} />
          <Route
            path={ROUTES.SIGN_UP}
            render={props => <SignUpPage {...props} login={this.login} />}
          />
          <Route
            path={ROUTES.SIGN_IN}
            render={props => <SignInPage {...props} login={this.login} />}
          />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route
            path={ROUTES.HOME}
            render={props => <HomePage {...props} user={this.state.user} />}
          />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />

          <Route
            exact
            path={"(/|/battle)"}
            render={props =>
              this.state.user.activeBattle === "" ||
              !this.state.user.activeBattle ? (
                <LandingPage
                  {...props}
                  user={this.state.user}
                  createBattle={this.createBattle}
                  openBattles={this.state.battles}
                  getOpenBattles={this.getOpenBattles}
                  joinRandomBattle={this.joinRandomBattle}
                  joinOpenBattle={this.joinOpenBattle}
                  activeBattle={this.state.user.activeBattle}
                />
              ) : (
                <GameStage
                  {...props}
                  user={this.state.user}
                  battleRef={this.state.battleRef}
                  userRef={this.state.userRef}
                  problem={this.state.problem}
                  getProblem={this.getProblem}
                  userCode={this.state.userCode}
                  updateCode={this.updateCode}
                  result={this.state.result}
                  submitCode={this.submitCode}
                  doDamage={this.doDamage}
                  getRandomProblem={this.getRandomProblem}
                  activeBattle={this.state.user.activeBattle}
                />
              )
            }
          />
          <Route
            path={ROUTES.GAMEOVER}
            render={props => (
              <GameOver {...props} battleInfo={this.props.myBattle} />
            )}
          />
          <Route
            path={ROUTES.SETAVATAR}
            render={props => (
              <ImgCollection
                {...props}
                getAvatars={this.getAvatars}
                avatars={this.state.avatars}
                user={this.state.user}
                setAvatar={this.setAvatar}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
