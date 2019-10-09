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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      battles: [],
      problems: [],
      problem: [],
      skills: [],
      userCode: "",
      result: {},
      battleRef: {},
      avatars: [],
      userRef: {},
      endBattleSubscription: {}
    };
  }

  login = userId => {
    let userRef = this.props.firebase.user(userId);
    this.setState({ userRef });

    userRef.get().then(user => {
      const userData = user.data();
      this.setState({ user: userData });

      if (userData.activeBattle !== "") {
        let battleRef = this.props.firebase.battle(userData.activeBattle);
        this.setBattleState(battleRef);
      }
    });

    userRef.onSnapshot(snapshot => {
      this.setState({ user: snapshot.data() });
    });
  };

  setBattleState = battleRef => {
    this.setState({ battleRef });
    let endBattleSubscription = battleRef.onSnapshot(querySnapshot => {
      let battle = querySnapshot.data();
      if (battle.user1_health <= 0) {
        battleRef.set(
          { winner: battle.user2, status: "completed" },
          { merge: true }
        );
        console.log("User 2 WON");
        endBattleSubscription();
        this.state.userRef.set(
          {
            activeBattle: ""
          },
          { merge: true }
        );
      } else if (battle.user2_health <= 0) {
        battleRef.set(
          { winner: battle.user1, status: "completed" },
          { merge: true }
        );
        console.log("User 1 WON");
        endBattleSubscription();
        this.state.userRef.set(
          {
            activeBattle: ""
          },
          { merge: true }
        );
      }
    });
  };

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId);
    problemRef
      .get()
      .then(problem => this.setState({ problem: problem.data() }));
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
      this.setBattleState(battleRef);
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
      console.log(battleRef.id);
      this.joinBattle(battleRef);
    });
  };

  joinOpenBattle = battleId => {
    let battleRef = this.props.firebase.battle(battleId);
    this.joinBattle(battleRef);
  };

  joinBattle = battleRef => {
    const user = this.state.user;
    console.log(user);
    battleRef.set(
      {
        user2: user.username,
        user2_health: user.maxHealth,
        status: "closed"
      },
      { merge: true }
    );
    this.setBattleState(battleRef);
    this.state.userRef.set(
      {
        activeBattle: battleRef.id,
        role: "user2"
      },
      { merge: true }
    );
  };

  doDamage = amount => {
    if (this.state.user.role === "user1") {
      this.state.battleRef.update({
        user2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -10
        )
      });
    } else {
      this.state.battleRef.update({
        user1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -10
        )
      });
    }
  };

  getRandomProblem = difficulty => {
    this.props.firebase
      .getRandomProblem(difficulty)
      .then(problemRef => problemRef.get())
      .then(doc => this.setState({ problem: doc.data() }));
  };

  updateCode = event => {
    this.setState({
      userCode: event
    });
  };

  submitCode = (code, inputs, expectedOutputs) => {
    const webWorker = new Worker("webWorker.js");

    webWorker.postMessage({
      userFunction: code,
      inputs: inputs,
      expectedOutputs: expectedOutputs
    });

    const timeoutId = setTimeout(() => {
      this.setState({
        result: { userOutputs: "Your function failed!  :(", correct: false }
      });
      webWorker.terminate();
    }, 5000);

    webWorker.onmessage = event => {
      this.setState({ result: event.data });
      if (event.data.correct) {
        this.doDamage(10);
      }
      webWorker.terminate();
      clearTimeout(timeoutId);
    };
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
          <Navigation />
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
            path={ROUTES.LANDING}
            render={props => (
              <LandingPage
                {...props}
                createBattle={this.createBattle}
                openBattles={this.state.battles}
                getOpenBattles={this.getOpenBattles}
                joinRandomBattle={this.joinRandomBattle}
                joinOpenBattle={this.joinOpenBattle}
                activeBattle={this.state.user.activeBattle}
              />
            )}
          />
          <Route
            path={ROUTES.BATTLE}
            render={props =>
              this.state.user.activeBattle === "" ||
              !this.state.user.activeBattle ? (
                <LandingPage
                  {...props}
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
                  myBattle={this.state.myBattle}
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
