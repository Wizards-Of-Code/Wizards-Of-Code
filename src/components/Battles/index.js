import React from 'react'
import {Link} from 'react-router-dom'
import OpenBattles from './OpenBattles'
import {BATTLE} from '../../constants/routes'

class BattlesPage extends React.Component {
  componentDidMount() {
    this.props.getOpenBattles()
  }

  render() {
    return (
      <div className="landing-page-container">
        {this.props.user.username ? (
          <div className="battle-container">
            <div className="join-random-btl">
              <div className="create-battle">
                <Link to={BATTLE}>
                  <button
                    className="create-battle-btn"
                    onClick={() => {
                      if (this.props.user.username) {
                        this.props.createBattle()
                      }
                    }}
                    onMouseDown={this.props.pageSound}
                  >
                    Create New Battle
                  </button>
                </Link>
              </div>
              <Link to={BATTLE}>
                <button
                  onClick={() => {
                    if (this.props.user.username) {
                      this.props.joinRandomBattle()
                    }
                  }}
                  className="join-random-btl-btn"
                  onMouseDown={this.props.pageSound}
                >
                  Join A Random Battle
                </button>
              </Link>

              <button
                className="join-random-btl-btn"
                disabled
                onMouseDown={this.props.pageSound}
              >
                Open Battles
              </button>
            </div>
            <div className="battle-container">
              <OpenBattles
                user={this.props.user}
                openBattles={this.props.openBattles}
                joinOpenBattle={this.props.joinOpenBattle}
                pageSound={this.pageSound}
              />
            </div>
          </div>
        ) : (
          <div className="sign-in-box">
            <h1 className="wizards-of-code">Wizards Of Code</h1>
          </div>
        )}
      </div>
    )
  }
}

export default BattlesPage
