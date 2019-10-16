import React, {Component} from 'react'
import hardButton from '../../styling/hard-button.png'

class Instructions extends Component {
  render() {
    const problem = this.props.problem

    return (
      <div className="instructions">
        <div className="flex-side">
          <div className="title">
            {problem.name ? problem.name : '...Awaiting Spell'}
          </div>
          <p>
            {problem.prompt
              ? problem.prompt
              : 'Select a spell to cast to receive a challenge!'}
          </p>
        </div>
      </div>
    )
  }
}
export default Instructions
