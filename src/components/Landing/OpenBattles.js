import React from "react";

const OpenBattles = props => {
  const battles = props.openBattles;
  console.log(battles);
  return (
    <ol className="join-btl">
      {battles.map(battle => (
        <div className="single-game" key={battle.id}>
          <div>
            Opponent: {battle.user1} -
            <Link to={"/"}>
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
