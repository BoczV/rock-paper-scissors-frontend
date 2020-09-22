import React from "react";
import "../styles/Buttons.scss";

function Scores({ playerScore, aiScore }) {
  return (
    <div className="scores">
      <div>
        <h2>Player score:</h2>
        <h2>{playerScore}</h2>
      </div>
      <div>
        <h2>AI score:</h2>
        <h2>{aiScore}</h2>
      </div>
    </div>
  );
}

export default Scores;
