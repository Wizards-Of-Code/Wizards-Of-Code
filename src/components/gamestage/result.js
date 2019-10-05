import React from "react";
import { connect } from "react-redux";
import { submitCode } from "../../store/game";

const DisconnectedResult = props => {

  return (
    <div className="result">
      <div className="title">Result:</div>
      <p>{JSON.stringify(props.result)}</p>
      <button className="buttonFont" onClick={() => handleClick(props)}>
        SUBMIT CODE
      </button>
    </div>
  );

};

const handleClick = (props) => {
  props.submitCode(props.code, props.inputs);
}

const mapDispatchToProps = dispatch => ({
  submitCode: (code, inputs) => dispatch(submitCode(code, inputs))
});
const mapStateToProps = state => ({
  result: state.game.result,
  code: state.game.code,
  inputs: state.game.inputs,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedResult);
