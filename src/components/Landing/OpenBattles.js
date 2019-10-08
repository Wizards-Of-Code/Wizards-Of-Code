import React from "react";

const OpenBattles = props => {
  const battles = props.openBattles;
  console.log(battles);
  return (
    <ol>
      {battles.map(battle => (
        <div key={battle.id}>
          <div>
            Opponent: {battle.user1} -
            <button className="openGame" onClick={() => props.joinOpenBattle(battle.id)}>
              Joinable Game
            </button>
          </div>

        </div>
      ))}
    </ol>
  );
};
export default OpenBattles;
