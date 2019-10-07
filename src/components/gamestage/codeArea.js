import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getCode } from "../../store/game";

class CodeArea extends Component {
  constructor() {
    super();
    this.state = { code: "" };
  }

  updateCode = function(newCode) {
    this.setState({
      code: newCode
    });
  };

  render() {
    let options = {
      lineNumbers: true,
      mode: "javascript",
      autoFocus: true,
      className: "texteditor",
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", 2]
    };
    return (
      <CodeMirror
        value={this.state.code}
        onChange={(event) => {
          this.props.getCode(event)
        }}
        options={options}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCode: (code) => dispatch(getCode(code))
})

export default connect(null, mapDispatchToProps)(CodeArea);
