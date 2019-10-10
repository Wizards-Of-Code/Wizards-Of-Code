import React from 'react';

export default function GameOver(props) {
   
  return (
    <div className="game-over">
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/dd4c80ed483c8f3c286cd44194f2e93b.jpg?alt=media&token=b445f3c9-2313-40a9-86bc-221e1ad0e232"
            alt=""
          />
          <h1>Congratulations</h1>
          <h1>YOU're WINNER</h1>
          <button className="play-again">Play Again</button>
        </div>
      
    </div>
  );
}

