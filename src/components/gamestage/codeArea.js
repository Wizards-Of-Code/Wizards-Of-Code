import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import React, { Component } from "react";

export default class CodeArea extends Component {
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
        onchange={this.updateCode}
        options={options}
      />
    );
  }
}
