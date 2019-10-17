import React, { Component } from "react";

class Instructions extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const battleRef = this.props.battleRef;
    const battleInfo = this.props.battleInfo;
    if (battleInfo.status === "open") {
      battleRef.set({ status: "quit" }, { merge: true });
      this.props.userRef.set({ activeBattle: "" }, { merge: true });
    }
  }

  render() {
    let visible;
    if (this.props.battleInfo.status === "closed") {
      visible = false;
    } else {
      visible = true;
    }
    let problem = this.props.problem;

    return (
      <div className= {`instructions ${this.props.highlightClass}`}>
        <div className="flex-side">
          <div className="title">
            {problem.name ? problem.name : "...Awaiting Spell"}
          </div>
          <p className='prompt'>
            {problem.prompt
              ? problem.prompt
              : "Select a spell to cast to receive a challenge!"}
          </p>
        </div>
        {visible ? (
          <button className="quitGame" onClick={this.handleClick}>
            Quit Game
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Instructions;
