import React from "react";
import { Link } from "react-router-dom";
import { BATTLE } from "../../constants/routes";

const OpenBattles = props => {
  const battles = props.openBattles;

  return (
    <ol className="join-btl">
      {battles.map(battle => (
        <div className="single-game" key={battle.id}>
          <div className='center'>
            <div className="opponent">Opponent: {battle.user1}</div>
            <Link to={BATTLE}>
              <button
                className="openGame"
                onClick={() => {
                  if (props.user.username) {
                    props.joinOpenBattle(battle.id);
                  }
                }}
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
