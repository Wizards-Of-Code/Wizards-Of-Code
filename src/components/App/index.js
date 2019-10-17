import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../Navigation";
import GameStage from "../gamestage";
import BattlesPage from "../Battles";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import ProfilePage from "../Profile";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import ImgCollection from "../Profile/imgCollection";
import BattleHistory from "../Profile/battleHistory";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import HomePage from "../Home";
import NotFound from "../NotFound";
import { Character } from "../gamestage/utilities";
import Leaderboard from "../Leaderboard";

const AUDIO = document.createElement("audio");
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
      userRef: {},
      closedBtl: [],
      medals: []
    };
    this.setState = this.setState.bind(this);
  }

  login = userId => {
    let userRef = this.props.firebase.user(userId);
    this.setState({ userRef });

    // get user firebase reference
    userRef.get().then(user => {
      const userData = user.data();
      this.setState({ user: userData });
      // get battle firebase reference, if applicable
      if (userData.activeBattle !== "") {
        let battleRef = this.props.firebase.battle(userData.activeBattle);
        this.setState({ battleRef });
      }
    });

    // subscribe to user updates
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

  getMedals = () => {
    const medalsRef = this.props.firebase.myMedals();
    medalsRef
      .get()
      .then(querySnapshot => this.setState({ medals: querySnapshot.docs }));
  };

  setAvatar = imgUrl => {
    this.state.userRef.set(
      {
        imgUrl: imgUrl,
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
        if (change.type === 'added' && status === 'open') {
          allOpenBattles.push({ ...doc, id });
        } else if (change.type === 'modified' && status === 'closed') {
          allOpenBattles = allOpenBattles.filter(battle => battle.id !== id);
        }
      });
      this.setState({ battles: allOpenBattles });
    });
  };

  getClosedBtls = () => {
    const closedBattlesRef = this.props.firebase.closedBattles();
    closedBattlesRef
      .get()
      .then(querySnapshot => this.setState({ closedBtl: querySnapshot.docs }));
  };
  createBattle = () => {
    this.props.firebase.createBattle(this.state.user).then(battleRef => {
      this.setState({ battleRef });
      this.state.userRef.set(
        {
          activeBattle: battleRef.id,
          role: 'player1',
        },
        { merge: true }
      );
    });
  };

  joinRandomBattle = () => {
    this.props.firebase.findRandomBattle(this.state.user).then(battleRef => {
      if (battleRef) {
        this.joinBattle(battleRef);
      } else {
        alert('NO OPEN BATTLE DUM DUM!');
      }
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
        player2: user.username,
        player2_health: user.maxHealth,
        status: "closed",
        player2_anim: `${Character(user.imgUrl)}-idle`,
        player2_char: Character(user.imgUrl),
      },
      { merge: true }
    );
    this.setState({ battleRef });
    this.state.userRef.set(
      {
        activeBattle: battleRef.id,
        role: 'player2',
      },
      { merge: true }
    );
  };

  pageSound = () => {
    AUDIO.src =
      'https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/page-flip-01a.mp3?alt=media&token=8fdba966-a324-4c91-863f-18237b57852c';
    AUDIO.load();
    AUDIO.play();
  };

  componentDidMount() {
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
          <Navigation setState={this.setState} pageSound={this.pageSound} />
          <Switch>
            <Route
              exact
              path={ROUTES.SIGN_UP}
              render={props => <SignUpPage {...props} login={this.login} />}
            />
            <Route
              exact
              path={ROUTES.SIGN_IN}
              render={props => <SignInPage {...props} login={this.login} />}
            />
            <Route
              exact
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route
              exact
              path={ROUTES.PROFILE}
              render={props => (
                <ProfilePage
                  {...props}
                  user={this.state.user}
                  pageSound={this.pageSound}
                  medals={this.state.medals}
                  getMedals={this.getMedals}
                />
              )}
            />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.LEADERBOARD} component={Leaderboard} />
            {this.state.battleRef.id || this.state.user.activeBattle === "" ? (
              <Route
                exact
                path={"(/|/battle)"}
                render={props =>
                  this.state.user.activeBattle === "" ||
                  !this.state.user.activeBattle ? (
                    <BattlesPage
                      {...props}
                      user={this.state.user}
                      createBattle={this.createBattle}
                      openBattles={this.state.battles}
                      getOpenBattles={this.getOpenBattles}
                      joinRandomBattle={this.joinRandomBattle}
                      joinOpenBattle={this.joinOpenBattle}
                      activeBattle={this.state.user.activeBattle}
                      pageSound={this.pageSound}
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
            ) : (
              ""
            )}
            <Route exact path={"(/|/home)"} component={HomePage} />

            <Route
              exact
              path={ROUTES.SETAVATAR}
              render={props => (
                <ImgCollection
                  {...props}
                  getAvatars={this.getAvatars}
                  avatars={this.state.avatars}
                  user={this.state.user}
                  setAvatar={this.setAvatar}
                  pageSound={this.pageSound}
                />
              )}
            />

            <Route
              path={ROUTES.BATTLEHISTORY}
              render={props => (
                <BattleHistory
                  {...props}
                  user={this.state.user}
                  closedBtl={this.state.closedBtl}
                  getClosedBtls={this.getClosedBtls}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
