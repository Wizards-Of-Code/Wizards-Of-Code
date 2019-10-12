import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Attacking from './attacking'
import {withFirebase} from '../Firebase'
import GameOver from './gameOver'
import BattleHistory from '../Home/battleHistory';
import firebutton from '../../styling/easy-fireball-button.png'
class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = {};
    this.taskboxClass = 'taskbox'
    this.state = {
      battleIsOver: false,
      battleInfo: {},
      problem: {
        prompt: ""
      },
      result: {},
      userCode: "",
      backgroundImage: "",
    };
  }

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId)
    problemRef.get().then(problem => this.setState({problem: problem.data()}))
  }

  getRandomProblem = difficulty => {
    this.setState({ result: {} });
    this.props.firebase
      .getRandomProblem(difficulty)
      .then(problemRef => problemRef.get())
      .then(doc => this.setState({problem: doc.data()}))
  }

  updateCode = event => {
    this.setState({
      userCode: event
    })
  }

  submitCode = (code, inputs, expectedOutputs) => {
    const webWorker = new Worker('webWorker.js')

    // send user code to web worker with relevant data
    webWorker.postMessage({
      userFunction: code,
      inputs: inputs,
      expectedOutputs: expectedOutputs
    })

    // timeout to protect against infinite loops etc.
    const timeoutId = setTimeout(() => {
      this.setState({
        result: { userOutputs: "Your function failed!  :(", correct: false }
      });
      webWorker.terminate();
      this.selfDamage(5);
    }, 5000);

    // Damage amounts: Move to database?
    const damageAmounts = {
      1: 10,
      2: 25,
      3: 60
    };

    // respond to correct/incorrect evaluations of code from WebWorker
    webWorker.onmessage = event => {
      this.setState({result: event.data})
      if (event.data.correct) {
        this.doDamage(damageAmounts[this.state.problem.difficulty]);
        this.setState({ userCode: "", problem: {prompt: ""} });
      } else {
        this.selfDamage(this.state.problem.difficulty * 5)
      }
      webWorker.terminate()
      clearTimeout(timeoutId)
    }
  }

  doDamage = (amount, player) => {

    if (this.props.user.role === 'player1') {
      this.props.battleRef
        .update({
          player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player1_anim: elrondCastsSpell,
          player2_anim: elrondHurt,
          attack_anim: player1FireBall
        })
        .then(() => {
          this.isDead()
        })
    } else {
      this.props.battleRef
        .update({
         player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player2_anim: elrondCastsSpell,
          player1_anim: elrondHurt,
          attack_anim: player2FireBall
        })
        .then(() => {
          this.isDead()
        })
    }

    // return to idle animations
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: elrondIdle,
          player2_anim: elrondIdle,
          attack_anim: null
        },
        {merge: true}
      )
    }, 2000)
  }

  selfDamage = amount => {
    this.taskboxClass = 'taskbox red';
    if (this.props.user.role === "player2") {
      this.props.battleRef
        .update({
          player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player2_anim: elrondHurt
        })
        .then(() => {
          this.isDead()
        })
    } else {
      this.props.battleRef
        .update({
          player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player1_anim: elrondHurt
        })
        .then(() => {
          this.isDead()
        })
    }
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: elrondIdle,
          player2_anim: elrondIdle,
          attack_anim: null
        },
        { merge: true }
      );
      this.taskboxClass = 'taskbox';
    }, 2000);
  };

  isDead = () => {
    const { battleInfo } = this.state

    if (battleInfo.player1_health <= 0) {
      this.props.battleRef.set(
        {winner: battleInfo.player2, status: 'completed'},
        {merge: true}
      )
    } else if (battleInfo.player2_health <= 0) {
      this.props.battleRef.set(
        {winner: battleInfo.player1, status: 'completed'},
        {merge: true}
      )
    }
  }

  onBattleUpdate = battleSnapshot => {
    this.setState({battleInfo: battleSnapshot.data()});
  }

  componentDidMount() {
    if (this.props.battleRef.id) {
      this.unsubscribe = this.props.battleRef.onSnapshot(this.onBattleUpdate);
      this.props.battleRef
        .get()
        .then(battleDoc =>
          this.setState({ backgroundImage: battleDoc.data().background })
        );
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
    if (this.state.battleInfo.status === "completed") {
      this.props.userRef.set(
        {
          activeBattle: ''
        },
        {merge: true}
      )
    }
  }

  render() {

    if (this.state.battleInfo.status === "completed") {
      console.log('Battle Devided', this.state);
      return (
        <GameOver battleInfo={this.state.battleInfo} user={this.props.user} />
      )
    }

    return (
      <div className="gamepage">
        <div
          className="gamestage"
          style={{
            backgroundImage: `url(${this.state.backgroundImage})`
          }}
        >
          <div className={fireball} style={glowAnimation}>
            {this.state.battleInfo.player1 ? (
              <img
                src={firebutton}
                onClick ={() => this.getRandomProblem(1)}
                alt='fireball!!!!'
              />
            ) : (
              ''
            )}
          </div>
          <div className="gamebox">
            <div>
              <div className={this.state.battleInfo.attack_anim}>
                <Attacking />
              </div>
              <Player1
                playerName={this.state.battleInfo.player1}å
                playerHP={this.state.battleInfo.player1_health}
              />
              <div
                className={this.state.battleInfo.player1_anim}
                style={{
                  ...convertDirection,
                  marginTop: '-20%',
                  marginRight: '10%'
                }}
              ></div>
            </div>
            <div>
              <Player2
                playerName={this.state.battleInfo.player2}
                playerHP={this.state.battleInfo.player2_health}
              />
              <div
                className={this.state.battleInfo.player2_anim}
                style={{marginTop: '-20%', marginLeft: '10%'}}
              ></div>
            </div>
          </div>
          <div className={fireball} style={glowAnimation}>
            {this.state.battleInfo.player2 ? (
              <img
                src={firebutton}
                onClick ={() => this.getRandomProblem(1)}
                alt='fireball!!!!'
              />
            ) : (
              ''
            )}
          </div>

        </div>
        <div className={this.taskboxClass}>
          <Instructions
            prompt={this.state.problem.prompt}
            doDamage={this.doDamage}
            getRandomProblem={this.getRandomProblem}
          />
          <CodeArea
            value={this.state.userCode}
            updateCode={this.updateCode}
          />
          <Result
            submitCode={
              this.state.problem.inputs
                ? this.submitCode
                : () => console.log("No opponent")
            }
            userCode={this.state.userCode}
            problem={this.state.problem}
            result={this.state.result}
          />
        </div>
      </div>
    )
  }
}

export default withFirebase(GameStage)

const galadrielIdle = 'galadriel-idle'
const galadrielCastsSpell = 'galadriel-casts-spell'
const galadrielHurt = 'galadriel-hurt'
const galadrielWin = 'galadriel-win'
const elrondIdle = 'elrond-idle'
const elrondCastsSpell = 'elrond-casts-spell'
const elrondHurt = 'elrond-hurt'
const elrondWin = 'elrond-win'
const arwenIdle = 'arwen-idle'
const arwenCastsSpell = 'arwen-casts-spell'
const arwenHurt = 'arwen-hurt'
const arwenWin = 'arwen-win'
const figwitIdle = 'figwit-idle'
const figwitCastsSpell = 'figwit-casts-spell'
const figwitHurt = 'figwit-hurt'
const figwitWin = 'figwit-win'
const player1FireBall = 'fireball-right'
const player2FireBall = 'fireball-left'
const fireball = 'glow-fireball'
const none = {transform: 'none'}



// add style={glowAnimation} to fireball class when fireball button can be pressed
const glowAnimation = {animation: 'glowing 1500ms infinite'}

// in PLAYER1 DIE mode, USE style={none} otherwise, use style={convertDirection}
const elrondDie = 'elrond-die'
const galadrielDie = 'galadriel-die'

// all players are animated to be player 2 (facing left), if we were to make them player1, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection = {
  transform: 'scaleX(-0.7) scaleY(0.7)'
}
