import React from 'react'
import CodeArea from './codeArea'
import Instructions from './instructions'
import Result from './result'
import Player1 from './player1'
import Player2 from './player2'
import Attacking from './attacking'
import {withFirebase} from '../Firebase'
import GameOver from './gameOver'
import firebutton from '../../styling/easy-fireball-button.png'
import Animation from './utilities'

class GameStage extends React.Component {
  constructor(props) {
    super(props)
    this.unsubscribe = {}
    this.taskboxClass = 'taskbox'
    this.state = {
      battleIsOver: false,
      battleInfo: {},
      problem: {
        prompt: ''
      },
      result: {},
      userCode: '',
      backgroundImage: ''
    }
  }

  //this.state.battleInfo.player1_anim = 'elrond'
  //this.state.battleInfo.player2_anim

  // Ai: I know this looks ugly, but we could clean it up later which requires changing data in firestore.
  // this method returns player1 chosen avatar - so now we can render the right avatar according to player1 profile image at every action without having to hard code it (if user doen't have a profile image, it would show 'elrond' by default)

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId)
    problemRef.get().then(problem => this.setState({problem: problem.data()}))
  }

  getRandomProblem = difficulty => {
    this.setState({result: {}})
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
        result: {userOutputs: 'Your function failed!  :(', correct: false}
      })
      webWorker.terminate()
      this.selfDamage(5)
    }, 5000)

    // Damage amounts: Move to database?
    const damageAmounts = {
      1: 10,
      2: 25,
      3: 60
    }

    // respond to correct/incorrect evaluations of code from WebWorker
    webWorker.onmessage = event => {
      this.setState({result: event.data})
      if (event.data.correct) {
        this.doDamage(damageAmounts[this.state.problem.difficulty])
        this.setState({userCode: '', problem: {prompt: ''}})
      } else {
        this.selfDamage(this.state.problem.difficulty * 5)
      }
      webWorker.terminate()
      clearTimeout(timeoutId)
    }
  }

  updateHealth = (amount, player) => {
    const updateObject = {
      player1: {
        player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player1_anim: Animation[this.state.battleInfo.player1_char].attack,
        player2_anim: Animation[this.state.battleInfo.player2_char].spin,
        attack_anim: Animation.spell.player1.thunder
      },
      player2: {
        player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player2_anim: Animation[this.state.battleInfo.player2_char].attack,
        player1_anim: Animation[this.state.battleInfo.player1_char].spin,
        attack_anim: Animation.spell.player2.thunder
      }
    }

    this.props.battleRef.update(updateObject[player]).then(() => {
      this.isDead()
    })
  }

  doDamage = amount => {
    this.updateHealth(amount, this.props.user.role)

    // return to idle animations
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: Animation[this.state.battleInfo.player1_char].idle,
          player2_anim: Animation[this.state.battleInfo.player2_char].idle,
          attack_anim: null
        },
        {merge: true}
      )
    }, 2000)
  }

  selfDamage = amount => {
    this.taskboxClass = 'taskbox red'
    if (this.props.user.role === 'player2') {
      this.props.battleRef
        .update({
          player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player2_anim: Animation[this.state.battleInfo.player2_char].spin
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
          player1_anim: Animation[this.state.battleInfo.player1_char].spin
        })
        .then(() => {
          this.isDead()
        })
    }
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: Animation[this.state.battleInfo.player1_char].idle,
          player2_anim: Animation[this.state.battleInfo.player2_char].idle,
          attack_anim: null
        },
        {merge: true}
      )
      this.taskboxClass = 'taskbox'
    }, 2000)
  }

  isDead = () => {
    const {battleInfo} = this.state

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
    this.setState({battleInfo: battleSnapshot.data()})
  }

  componentDidMount() {
    // this.player1Avatar();
    // this.player2Avatar();

    if (this.props.battleRef.id) {
      this.unsubscribe = this.props.battleRef.onSnapshot(this.onBattleUpdate)
      this.props.battleRef
        .get()
        .then(battleDoc =>
          this.setState({backgroundImage: battleDoc.data().background})
        )
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
    if (this.state.battleInfo.status === 'completed') {
      this.props.userRef.set(
        {
          activeBattle: ''
        },
        {merge: true}
      )
    }
  }

  render() {
    if (this.state.battleInfo.status === 'completed') {
      console.log('Battle Devided', this.state)
      return (
        <GameOver battleInfo={this.state.battleInfo} user={this.props.user} />
      )
    }

    console.log('BATTLE INFO', this.state.battleInfo)

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
                onClick={() => this.getRandomProblem(1)}
                alt="fireball!!!!" //what is alt for?
              />
            ) : (
              ''
            )}
          </div>
          <div className="gamebox">
            <div className={this.state.battleInfo.attack_anim}>
              <Attacking />
            </div>
            <div className="player">
              <Player1
                playerName={this.state.battleInfo.player1}
                playerHP={this.state.battleInfo.player1_health}
              />
              <div
                className={this.state.battleInfo.player1_anim}
                style={convertDirection}
              ></div>
            </div>


            <div className="player">
              <Player2
                playerName={this.state.battleInfo.player2}
                playerHP={this.state.battleInfo.player2_health}
              />
              <div className={this.state.battleInfo.player2_anim}></div>
            </div>
          </div>
          <div className={fireball} style={glowAnimation}>
            {this.state.battleInfo.player2 ? (
              <img
                src={firebutton}
                onClick={() => this.getRandomProblem(1)}
                alt="fireball!!!!"
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
          <CodeArea value={this.state.userCode} updateCode={this.updateCode} />
          <Result
            submitCode={
              this.state.problem.inputs
                ? this.submitCode
                : () => console.log('No opponent')
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

const fireball = 'glow-fireball'
const none = {transform: 'none'}

// add style={glowAnimation} to fireball class when fireball button can be pressed
const glowAnimation = {animation: 'glowing 1500ms infinite'}

// all players are animated to be player 2 (facing left), if we were to make them player1, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection = {
  transform: 'scaleX(-0.7) scaleY(0.7)'
}
