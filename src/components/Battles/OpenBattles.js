import React from "react";
import { Link } from "react-router-dom";
import { BATTLE } from "../../constants/routes";

const OpenBattles = props => {
  const battles = props.openBattles;

  console.log('MMMMMMMMM', props);

  return (
    <ol className="join-btl">
      {battles.map(battle => (
        <div className="single-game" key={battle.id}>
          <div className="center">
            <div className="opponent">Opponent: {battle.player1}</div>
            <div style={{color: 'gold',fontFamily: "Aladin"}}>
              EXP:{battle.player1_exp}HP:{battle.player1_health}
            </div>
            <Link to={BATTLE}>
              <button
                className="openGame"
                onClick={() => {
                  if (props.user.username) {
                    props.joinOpenBattle(battle.id);
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
  );
};
export default OpenBattles;
