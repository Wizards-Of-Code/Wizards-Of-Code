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
import MessageLog from './messageLog'
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
      backgroundImage: '',
      message: {}
    }
  }

  // Ai: I know this looks ugly, but we could clean it up later which requires changing data in firestore.
  // this method returns player1 chosen avatar - so now we can render the right avatar according to player1 profile image at every action without having to hard code it (if user doen't have a profile image, it would show 'elrond' by default)
  player1Avatar = () => {
    if (
      this.props.user.imgUrl ===
      'https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/5_animation_attack_000.png?alt=media&token=aa3739c6-9e8e-47c6-9a1b-b97187c971d3'
    ) {
      return 'galadriel'
    } else if (
      this.props.user.imgUrl ===
      'https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/Figwit.png?alt=media&token=eaf3e0df-5fd4-4293-aaeb-e066b1fe7d3e'
    ) {
      return 'figwit'
    } else if (
      this.props.user.imgUrl ===
      'https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/2_animation_idle_002.png?alt=media&token=d52ef37c-11c6-4ec2-9c52-242804ba3e34'
    ) {
      return 'arwen'
    } else {
      return 'elrond'
    }
  }

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId);
    problemRef
      .get()
      .then(problem => this.setState({ problem: problem.data() }));
  };

  getRandomProblem = difficulty => {
    this.setState({result: {}})
    this.props.firebase
      .getRandomProblem(difficulty)
      .then(problemRef => problemRef.get())
      .then(doc => {
        const problem = doc.data();
        this.setState({ problem, userCode: `${problem.startingCode}\n  \n}` });
      });
  };

  updateCode = event => {
    this.setState({
      userCode: event
    });
  };

  submitCode = (code, inputs, expectedOutputs) => {
    const webWorker = new Worker("webWorker.js");

    // send user code to web worker with relevant data
    webWorker.postMessage({
      userFunction: code,
      inputs: inputs,
      expectedOutputs: expectedOutputs
    });

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
      this.setState({ result: event.data });
      if (event.data.correct) {
        this.doDamage(damageAmounts[this.state.problem.difficulty])
        this.setState({ userCode: '', problem: {prompt: ''}, message: {content: 'Success!', type: 'goodMessage'} })
      } else {
        this.selfDamage(this.state.problem.difficulty * 5);
        this.setState({ message: {content: 'Incorrect', type: 'badMessage'} })
      }
      webWorker.terminate();
      clearTimeout(timeoutId);
    };
  };

  updateHealth = (amount, player) => {
    const updateObject = {
      player1: {
        player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player1_anim: Animation[this.player1Avatar()].attack,
        player2_anim: Animation.figwit.hurt,
        // attack_anim: player1FireBall
        attack_anim: "thunder-left"

      },
      player2: {
        player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player2_anim: Animation.figwit.attack,
        player1_anim: Animation[this.player1Avatar()].hurt,
        // attack_anim: player2FireBall
        attack_anim: "thunder-left"

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
          player1_anim: Animation[this.player1Avatar()].idle,
          player2_anim: Animation.figwit.idle,
          attack_anim: null
        },
        { merge: true }
      );
      this.setState({ message: {} });
    }, 2000);
  };

  selfDamage = amount => {
    this.taskboxClass = 'taskbox red'
    if (this.props.user.role === 'player2') {
      this.props.battleRef
        .update({
          player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player2_anim: Animation.figwit.hurt
        })
        .then(() => {
          this.isDead();
        });
    } else {
      this.props.battleRef
        .update({
          player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player1_anim: Animation[this.player1Avatar()].hurt
        })
        .then(() => {
          this.isDead();
        });
    }
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: Animation[this.player1Avatar()].idle,
          player2_anim: Animation.figwit.idle,
          attack_anim: null
        },
        {merge: true}
      )
      this.taskboxClass = 'taskbox';
      this.setState({ message: {} });
    }, 2000)
  }

  isDead = () => {
    const {battleInfo} = this.state

    if (battleInfo.player1_health <= 0) {
      this.props.battleRef.set(
        { winner: battleInfo.player2, status: "completed" },
        { merge: true }
      );
    } else if (battleInfo.player2_health <= 0) {
      this.props.battleRef.set(
        { winner: battleInfo.player1, status: "completed" },
        { merge: true }
      );
    }
  };

  onBattleUpdate = battleSnapshot => {
    this.setState({battleInfo: battleSnapshot.data()})
  }

  componentDidMount() {
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
          activeBattle: ""
        },
        { merge: true }
      );
    }
  }

  render() {

    if (this.state.battleInfo.status === 'completed') {
      console.log('Battle Devided', this.state)
      return (
        <GameOver battleInfo={this.state.battleInfo} user={this.props.user} />
      );
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
                onClick={() => this.getRandomProblem(1)}
                alt="fireball!!!!"
              />
            ) : (
              ""
            )}
          </div>
          <div className="gamebox">
            <MessageLog message={this.state.message} />
            <div>
              <div className={this.state.battleInfo.attack_anim}>
                <Attacking />
              </div>
              <Player1
                playerName={this.state.battleInfo.player1}
                playerHP={this.state.battleInfo.player1_health}
              />
              <div
                className={this.state.battleInfo.player1_anim}
                style={convertDirection}
              ></div>
            </div>
            <div>
              <Player2
                playerName={this.state.battleInfo.player2}
                playerHP={this.state.battleInfo.player2_health}
              />
              <div
                className={this.state.battleInfo.player2_anim}
              ></div>
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
              ""
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
    );
  }
}

export default withFirebase(GameStage)

const player1FireBall = 'fireball-right'
const player2FireBall = 'fireball-left'
const fireball = 'glow-fireball'
const none = {transform: 'none'}

// add style={glowAnimation} to fireball class when fireball button can be pressed
const glowAnimation = { animation: "glowing 1500ms infinite" };

// all players are animated to be player 2 (facing left), if we were to make them player1, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection = {
  transform: "scaleX(-0.7) scaleY(0.7)"
};
