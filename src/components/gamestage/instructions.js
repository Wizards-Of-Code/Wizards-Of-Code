import React, { Component } from "react";
import hardButton from '../../styling/hard-button.png' 

class Instructions extends Component {

  render() {
    return (
      <div className="instructions">
        <div className="flex-side">
          <div className="title">Question</div>
          <p>{this.props.prompt}</p>
          <button onClick={() => this.props.getRandomProblem(1)}>
            Easy Problem Spell
          </button>
          <button onClick={() => this.props.getRandomProblem(2)}>
            Medium Problem Spell
          </button>
          <button onClick={() => this.props.getRandomProblem(3)}>
            Hard Problem Spell
          </button>
        </div>
      </div>
    );
  }
}
export default Instructions;
