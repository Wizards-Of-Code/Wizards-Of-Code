import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import React, {Component} from 'react'

export default class CodeArea extends Component {
  constructor() {
    super()
    this.state = {code: ''}
  }
  updateCode = function(newCode) {
    this.setState({
      code: newCode
    })
  }
  render() {
    let options = {
      lineNumbers: true,
      mode: 'javascript',
      autoFocus: true,
      className: 'texteditor'
    }
    return (
      <CodeMirror 
        value={this.state.code}
        onchange={this.updateCode}
        options={options}
      />
    )
  }
}
