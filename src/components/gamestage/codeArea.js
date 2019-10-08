import CodeMirror from "react-codemirror";
import "codemirror/mode/javascript/javascript";
import React, { Component } from "react";

class CodeArea extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "" };
  }

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
        value={this.props.userCode}
        onChange={(event) => {
          this.props.updateCode(event)
        }}
        options={options}
        className="code-mirror"
      />
    );
  }
}

export default CodeArea