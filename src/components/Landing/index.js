import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = props => (
  <div className="landing-page-container">
    <div className="create-battle">
      <button className="create-battle-btn">Create new Battle</button>
    </div>
    <div className="join-random-btl">
      <Link to={`/gamestage`}>
        <button className="join-random-btl-btn">Join Random battle</button>
      </Link>
    </div>
  </div>
);


export default LandingPage;
