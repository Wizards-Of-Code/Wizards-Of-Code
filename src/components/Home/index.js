import React from "react";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Wizards of Code</h1>
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
