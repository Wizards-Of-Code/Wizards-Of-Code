import React, { Component } from "react";
import { connect } from "react-redux";
import { getProblem } from "../../store/game";

class disconnectedInstructions extends Component {
  componentDidMount() {
    this.props.getProblem("b0FL15GLthEMS3mXfBTZ");
  }

  render() {
    return (
      <div className="instructions">
        <div className="title">Question</div>
        <p>{this.props.game.problem}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProblem: id => dispatch(getProblem(id))
});

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disconnectedInstructions);
