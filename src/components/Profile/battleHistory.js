import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import { compose } from "recompose";

class BattleHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closedBattles: [],
      loading: false
    }
  }

  getClosedBattles = (username) => {

    this.setState({ loading: true })

    const player1games = this.props.firebase.battles().where("player1", "==", username).where("status", "==", "completed");
    const player2games = this.props.firebase.battles().where("player2", "==", username).where("status", "==", "completed");

    player1games.get().then(snapshot => {
      const player1Battles = [];
      snapshot.forEach(battle => player1Battles.push(battle.data()));
      this.setState({ closedBattles: [...this.state.closedBattles, ...player1Battles], loading: false });
    });

    player2games.get().then(snapshot => {
      const player2Battles = [];
      snapshot.forEach(battle => player2Battles.push(battle.data()));
      this.setState({ closedBattles: [...this.state.closedBattles, ...player2Battles], loading: false });
    });

  };

  componentDidUpdate() {
    console.log('bloop');
  }

  componentDidMount() {
    if (this.props.user.username) {
      this.getClosedBattles(this.props.user.username);
    }
  }

  render() {

    const {closedBattles} = this.state
    console.log(this.props.user.username);

    return (
      <div className="container1">
        <img
          className="home-img"
          src="https://wallpaperaccess.com/full/279729.jpg"
          alt=""
        />

        <h1 className="sign-up-logo">Battle History:</h1>

        <div className="btl-history">

           {closedBattles.map((compB, index) => {
            let winBackground = "";
            let loseBackground = "";
            let opponent = "";
            let opponentHealth = "";
            let myHealth = "";
            if (this.props.user.username === compB.winner) {
              winBackground = "winBackground";
            } else {
              loseBackground = "loseBackground";
            }
            if (this.props.user.username === compB.player1) {
              myHealth += compB.player1_health;
              opponent = compB.player2;
              opponentHealth += compB.player2_health;
            } else {
              myHealth += compB.player2_health;
              opponent = compB.player1;
              opponentHealth += compB.player1_health;
            }
            return (
              <div
                className={`single-recored ${loseBackground} ${winBackground}`}
                key={index}
              >
                <h1 className={`btl-text`}>{opponent}</h1>
                <h1 className={`btl-text`}>
                  Their Health: {opponentHealth} HP
                </h1>
                <h1 className={`btl-text`}> My Health: {myHealth}HP </h1>
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}


const condition = authUser => !!authUser;
export default compose(withAuthorization(condition), withFirebase)(BattleHistory);
