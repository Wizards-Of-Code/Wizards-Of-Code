import React from 'react'
import {Link} from 'react-router-dom'
import {BATTLE} from '../../constants/routes'

const OpenBattles = props => {
  const battles = props.openBattles

  return (
    <ol className="join-btl container1">
      {battles.map(battle => (
        <div className="single-game" key={battle.id}>
          <div className="center">
            <div className="opponent">Opponent: {battle.player1}</div>
            <div className="hp-exp">
              <p className="hp-exp-text">EXP:{battle.player1_exp}</p>
              <p className="hp-exp-text">HP:{battle.player1_health}</p>
            </div>
            <Link to={BATTLE}>
              <button
                className="openGame"
                onClick={() => {
                  if (props.user.username) {
                    props.joinOpenBattle(battle.id)
                  }
                }}
                onMouseDown={props.pageSound}
              >
                Joinable Game
              </button>
            </Link>
          </div>
        </div>
      ))}
    </ol>
  )
}
export default OpenBattles
