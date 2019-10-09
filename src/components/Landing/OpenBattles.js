import React from "react";
import { Link } from "react-router-dom";

const OpenBattles = props => {

  const battles = props.openBattles;

  return (
    <ol className="join-btl">
      {battles.map(battle => (
        <div className="single-game" key={battle.id}>
          <div>
            <div className="opponent">Opponent: {battle.user1}</div>
            <Link to={"/gamestage"}>
              <button
                className="openGame"
                onClick={() => props.joinOpenBattle(battle.id)}
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
