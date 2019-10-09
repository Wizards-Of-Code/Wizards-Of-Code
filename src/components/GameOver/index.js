import React from 'react';

const GameOver = props => {

  return (
    <div>
      <img
        className="sign-up-img"
        src="https://www.wallpaperup.com/uploads/wallpapers/2015/05/25/697747/ccbbdacd5fe59fe7c6c7c70d5e95158a.jpg"
        alt=""
      />
      <p className="sign-up-logo">Your Game Is Over</p>
      <p className="sign-up-logo">{props.battleInfo.winner} is the winner!</p>
    </div>
  )

}

export default GameOver;
