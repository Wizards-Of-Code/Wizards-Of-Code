import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Attacking from './attacking'
import { withFirebase } from '../Firebase'

<<<<<<< HEAD
class GameStage extends React.Component {

  constructor (props) {
    super(props);
    this.unsubscribe = {};
    this.state = {
      battleInfo : {},
      problem: {},
      result: {},
      userCode: ''
    };
  }

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId);
    problemRef
      .get()
      .then(problem => this.setState({ problem: problem.data() }));
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

  doDamage = amount => {
    if (this.props.user.role === "user1") {
      this.props.battleRef.update({
        user2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -10
        )
      });
    } else {
      this.props.battleRef.update({
        user1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -10
        )
      });
    }
  };

  onBattleUpdate = querySnapshot => {
      let battle = querySnapshot.data();
      if (battle.user1_health <= 0) {
        this.props.battleRef.set(
          { winner: battle.user2, status: "completed" },
          { merge: true }
        );
        console.log("User 2 WON");
        this.props.userRef.set(
          {
            activeBattle: ""
          },
          { merge: true }
        );
      } else if (battle.user2_health <= 0) {
        this.props.battleRef.set(
          { winner: battle.user1, status: "completed" },
          { merge: true }
        );
        console.log("User 1 WON");
        this.props.userRef.set(
          {
            activeBattle: ""
          },
          { merge: true }
        );
      }
      this.props.battleRef.get().then( snapshot => {
        this.setState({ battleInfo: snapshot.data() }, () => console.log(this.state.battleInfo))
      });
    };


  componentDidMount() {
    this.unsubscribe = this.props.battleRef.onSnapshot(this.onBattleUpdate);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    return (
      <div className="gamepage">
        <div className="gamestage">
        <Player1 />
        <Attacking  />
        <Player2 />
        </div>
        <div className="taskbox">
          <Instructions
            prompt={this.state.problem.prompt}
            getProblem={this.getProblem}
            doDamage={this.doDamage}
            getRandomProblem={this.getRandomProblem}
          />
          <CodeArea userCode={this.state.userCode} updateCode={this.updateCode} />
          <Result
            submitCode={this.submitCode}
            userCode={this.state.userCode}
            problem={this.state.problem}
            result={this.state.result}
          />
        </div>
=======
const GameStage = props => {
  return (
    <div className="gamepage">
      <div className="gamestage">
        <div className={elrondIdle} style={convertDirection}><Player1 /></div>
        <div className={player2FireBall}><Attacking /></div>
        <div className={elrondIdle}><Player2 /></div>
      </div>
      <div className="taskbox">
        <Instructions
          prompt={props.problem.prompt}
          getProblem={props.getProblem}
          doDamage={props.doDamage}
          getRandomProblem={props.getRandomProblem}
        />
        <CodeArea userCode={props.userCode} updateCode={props.updateCode} />
        <Result
          submitCode={props.submitCode}
          userCode={props.userCode}
          problem={props.problem}
          result={props.result}
        />
>>>>>>> b92af24a8b98e32d97c9be2c914dc5d243e82ee3
      </div>
    );
  }
};

export default withFirebase(GameStage);

const galadrielCastsSpell = "galadriel-casts-spell"
const galadrielIdle = "galadriel-idle"
const elrondCastsSpell = "elrond-casts-spell"
const elrondIdle = "elrond-idle"
const player1FireBall = "fireball-right"
const player2FireBall = "fireball-left"



// all players are animated to be player 2 (facing left), if we were to make them player2, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection ={
  transform: 'scaleX(-0.7) scaleY(0.7)'
}