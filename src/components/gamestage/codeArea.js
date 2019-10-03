import CodeMirror from 'react-codemirror'
import React, {Component} from 'react'

export default class CodeArea extends Component {
  getInitialState = function() {
    return {
      code: '// Code'
    }
  }
  updateCode = function(newCode) {
    this.setState({
      code: newCode
    })
  }
  render() {
    let options = {
      lineNumbers: true
    }
    return (
      <CodeMirror
        // value={this.state.code}
        // onchange={this.updateCode}
        mode="javascript"
        options={options}
      />
    )
  }
}
