import React, { Component } from "react";

class Instructions extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getProblem("b0FL15GLthEMS3mXfBTZ");
  }

  render() {
    return (
      <div className="instructions">
        <div className="title">Question</div>
        <p>{this.props.prompt}</p>
      </div>
    );
  }
}
export default Instructions