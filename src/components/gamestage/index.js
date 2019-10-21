import React from "react";
import CodeArea from "./codeArea";
import Instructions from "./instructions";
import Result from "./result";
import Player1 from "./player1";
import Player2 from "./player2";
import { withFirebase } from "../Firebase";
import GameOver from "./gameOver";
import Animation from "./utilities";
import MessageLog from "./messageLog";
import easySpell from "../../styling/easy-spell.png";
import mediumSpell from "../../styling/medium-spell.png";
import hardSpell from "../../styling/hard-spell.png";
const AUDIO = document.createElement("audio");

class GameStage extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = {};
    this.taskboxClass = "taskbox";
    this.state = {
      battleIsOver: false,
      battleInfo: {},
      problem: {
        prompt: ""
      },
      previousProblem: {},
      result: {},
      userCode: "",
      backgroundImage: "",
      message: {},
      highlightClass: ""
    };
  }

  quitBattle = () => {
    const battleRef = this.props.battleRef;
    const battleInfo = this.state.battleInfo;
    if (battleInfo.status === "open") {
      battleRef.delete();
      this.props.userRef.set({ activeBattle: "" }, { merge: true });
    };
    this.unsubscribe();
    this.setState({ battleInfo: {} });
  }

  getProblem = problemId => {
    const problemRef = this.props.firebase.problem(problemId);
    problemRef
      .get()
      .then(problem => this.setState({ problem: problem.data() }));
  };

  getRandomProblem = difficulty => {
    const classes = {
      1: "easy-active",
      2: "medium-active",
      3: "hard-active"
    };
    this.setState({ result: {}, highlightClass: classes[difficulty] });
    this.props.firebase
      .getRandomProblem(difficulty)
      .then(problemRef => problemRef.get())
      .then(doc => {
        const problem = doc.data();
        this.setState({
          problem,
          previousProblem: {},
          userCode: `${problem.startingCode}\n  \n}`
        });
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
        result: { userOutputs: ["Your function failed!  :("], correct: false }
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
      this.setState(state => ({
        result: event.data,
        previousProblem: { ...state.problem }
      }));
      if (event.data.correct) {
        this.doDamage(damageAmounts[this.state.problem.difficulty]);
        this.setState({
          userCode: "",
          problem: { prompt: "" },
          message: { content: "Success!", type: "goodMessage" },
          highlightClass: ""
        });
      } else {
        this.selfDamage(this.state.problem.difficulty * 5);
        this.setState({
          message: { content: "Incorrect", type: "badMessage" }
        });
      }
      webWorker.terminate();
      clearTimeout(timeoutId);
    };
  };

  updateHealth = (amount, player) => {
    const attacks = {
      10: "thunder",
      25: "purpleExplosion",
      60: "fireball"
    };

    const updateObject = {
      player1: {
        player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player1_anim: Animation[this.state.battleInfo.player1_char].attack,
        player2_anim: Animation[this.state.battleInfo.player2_char].hurt,
        attack_anim: Animation.spell.player1[attacks[amount]]
      },
      player2: {
        player1_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
          -1 * amount
        ),
        player2_anim: Animation[this.state.battleInfo.player2_char].attack,
        player1_anim: Animation[this.state.battleInfo.player1_char].hurt,
        attack_anim: Animation.spell.player2[attacks[amount]]
      }
    };

    this.props.battleRef.update(updateObject[player]).then(() => {
      this.isDead();
    });
  };

  doDamage = amount => {
    this.updateHealth(amount, this.props.user.role);
    this.gettingDamageSound();
    // return to idle animations
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: Animation[this.state.battleInfo.player1_char].idle,
          player2_anim: Animation[this.state.battleInfo.player2_char].idle,
          attack_anim: null
        },
        { merge: true }
      );
      this.setState({ message: {} });
    }, 2000);
  };

  selfDamage = amount => {
    this.gettingDamageSound();
    this.taskboxClass = "taskbox red";
    if (this.props.user.role === "player2") {
      this.props.battleRef
        .update({
          player2_health: this.props.firebase.db._firebaseApp.firebase_.firestore.FieldValue.increment(
            -1 * amount
          ),
          player2_anim: Animation[this.state.battleInfo.player2_char].spin
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
          player1_anim: Animation[this.state.battleInfo.player1_char].spin
        })
        .then(() => {
          this.isDead();
        });
    }
    setTimeout(() => {
      this.props.battleRef.set(
        {
          player1_anim: Animation[this.state.battleInfo.player1_char].idle,
          player2_anim: Animation[this.state.battleInfo.player2_char].idle,
          attack_anim: null
        },
        { merge: true }
      );
      this.taskboxClass = "taskbox";
      this.setState({ message: {} });
    }, 2000);
  };

  addExp = () => {
    this.props.userRef.set(
      { experience: (this.props.user.experience += 100) },
      { merge: true }
    );
  };

  isDead = () => {
    const { battleInfo } = this.state;

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
    this.setState({ battleInfo: battleSnapshot.data() });
  };

  closeResults = () => {
    this.setState({ result: {} });
  };

  gettingDamageSound = () => {
    AUDIO.src =
      "https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/uh.wav?alt=media&token=547a7236-83cd-4b9e-8413-c955c553c563";
    AUDIO.load();
    AUDIO.play();
  };

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

    let battleInfo = this.state.battleInfo

    this.unsubscribe();
    if (battleInfo.status === "completed") {
      this.props.userRef.set(
        {
          activeBattle: ""
        },
        { merge: true }
      );
    }

    if (battleInfo.isPractice) {
      this.props.battleRef.delete();
    }
  }

  render() {
    let playerClass1 = "";
    let playerClass2 = "";

    if (this.state.battleInfo.status === "completed") {
      return (
        <GameOver
          battleInfo={this.state.battleInfo}
          battleRef={this.props.battleRef}
          user={this.props.user}
          addExp={this.addExp}
        />
      );
    }
    if (this.props.user.role === "player1") {
      playerClass1 = "highlightPlayer";
    } else {
      playerClass2 = "highlightPlayer";
    }

    return (
      <div className="gamepage">
        <div
          className="stage-and-spells"
          style={{
            backgroundImage: `url(${this.state.backgroundImage})`,
            backgroundSize: "cover"
          }}
        >
          <div className="gamestage">
            <div className="gamebox">
              <MessageLog message={this.state.message} />
              <div className={this.state.battleInfo.attack_anim}></div>
              <div className={`player ${playerClass1}`}>
                <Player1
                  playerName={this.state.battleInfo.player1}
                  playerHP={this.state.battleInfo.player1_health}
                />
                <div
                  className={this.state.battleInfo.player1_anim}
                  style={convertDirection}
                ></div>
              </div>

              <div className={`player ${playerClass2}`}>
                <Player2
                  playerName={this.state.battleInfo.player2}
                  playerHP={this.state.battleInfo.player2_health}
                />
                <div className={this.state.battleInfo.player2_anim}></div>
              </div>
            </div>
          </div>
          <div>
            {this.state.battleInfo.status === "closed" ? (
              <div className="spells">
                <img
                  className="spell-button"
                  src={easySpell}
                  alt="easy-Spell"
                  onClick={() => this.getRandomProblem(1)}
                ></img>
                <img
                  className="spell-button"
                  src={mediumSpell}
                  alt="medium-Spell"
                  onClick={() => this.getRandomProblem(2)}
                ></img>
                <img
                  className="spell-button"
                  src={hardSpell}
                  alt="medium-Spell"
                  onClick={() => this.getRandomProblem(3)}
                ></img>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={this.taskboxClass}>
          <Instructions
            problem={this.state.problem}
            doDamage={this.doDamage}
            getRandomProblem={this.getRandomProblem}
            battleRef={this.props.battleRef}
            battleInfo={this.state.battleInfo}
            userRef={this.props.userRef}
            highlightClass={this.state.highlightClass}
            quitBattle={this.quitBattle}
          />
          <CodeArea
            value={this.state.userCode}
            updateCode={this.updateCode}
            closeResults={this.closeResults}
            highlightClass={this.state.highlightClass}
          />
          <div className="submit-button-box">
            <button
              onClick={
                this.state.problem.inputs
                  ? () => {
                      this.submitCode(
                        this.state.userCode,
                        this.state.problem.inputs,
                        this.state.problem.outputs
                      );
                    }
                  : () => {}
              }
              className="submit-result"
              id={
                this.state.problem.inputs ? "active-submit" : "inactive-submit"
              }
            >
              SUBMIT CODE
            </button>
          </div>
          <Result
            problem={this.state.problem}
            previousProblem={this.state.previousProblem}
            result={this.state.result}
          />
        </div>
      </div>
    );
  }
}

export default withFirebase(GameStage);

// all players are animated to be player 2 (facing left), if we were to make them player1, we would have to convert their facing direction, that's why we add style={convertDirection} in Player1 div
const convertDirection = {
  transform: "scaleX(-0.7) scaleY(0.7)"
};
