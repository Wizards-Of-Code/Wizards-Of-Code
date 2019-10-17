import React from "react";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <img src="https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/WizardsOfCode.png?alt=media&token=237b66f9-0179-4159-a019-a2f718cfeea1" alt='Wizards of Code' />
      <div className="home-page-details">
        <div className='details-left'>
          <p>
            Welcome to the land of code. Those eager enough to learn must enter at
            their own risk. Be prepared to battle.
          </p>
        </div>
        <div className='details-right'>
          <p>
            Gain experience, unlock more health, and become the greatest Code Mage the world has ever seen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
