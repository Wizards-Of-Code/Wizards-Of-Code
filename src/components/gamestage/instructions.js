import React, { Component } from "react";

class Instructions extends Component {
  componentDidMount() {
    this.props.getProblem("b0FL15GLthEMS3mXfBTZ");
  }

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
