import React from "react";

const OpenBattles = props => {
  const battles = props.openBattles;
  console.log(battles);
  return (
    <ol>
      {battles.map((battle, i) => (
        <div>
          <button key={i} className="openGame">
            {/* {battle.status} Game */}
            Joinable Game
          </button>
        </div>
      ))}
    </ol>
  );
};
export default OpenBattles;
