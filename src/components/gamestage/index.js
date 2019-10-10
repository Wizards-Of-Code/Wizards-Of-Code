import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Attacking from './attacking'
import { withFirebase } from '../Firebase'

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
            doDamage={this.props.doDamage}
            getRandomProblem={this.props.getRandomProblem}
          />
          <CodeArea userCode={this.props.userCode} updateCode={this.props.updateCode} />
          <Result
            submitCode={this.submitCode}
            userCode={this.props.userCode}
            problem={this.state.problem}
            result={this.props.result}
          />
        </div>
      </div>
    );
  }
};

export default withFirebase(GameStage);


// {className: .elrond-cast-spell,
// animation: castSpell}

// {className: elrond,
// animation: elrond-idle}

// {className: galadriel,
// animation: galadriel-idle}

// {className: galadriel-cast-spell,
// animation: galadriel-cast-spell}

// {className: fireball-right,
// animation: attack}

// {className: fireball-left,
// animation: attack}
