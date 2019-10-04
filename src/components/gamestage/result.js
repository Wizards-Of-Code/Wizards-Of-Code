import React from "react";
import { connect } from "react-redux";
import { submitCode } from "../../store/game";

const DisconnectedResult = props => {
  return (
    <div className="result">
      <div className="title">Result</div>
      <button className="buttonFont" onClick={() => props.submitCode()}>
        SUBMIT CODE
      </button>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  submitCode: code => dispatch(submitCode(code))
});
const mapStateToProps = state => {
  return { state: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedResult);
