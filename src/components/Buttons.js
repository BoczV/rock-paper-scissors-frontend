import React from "react";
import "../styles/Buttons.scss";

function Buttons({ play, round }) {
  return (
    <div className="buttons">
      <button
        className="learn-more"
        disabled={round !== 3 ? false : true}
        onClick={() => play("rock")}
      >
        <img src="Rock.png" alt="" />
      </button>
      <button
        className="learn-more"
        disabled={round !== 3 ? false : true}
        onClick={() => play("paper")}
      >
        <img src="Paper.png" alt="" />
      </button>
      <button
        className="learn-more"
        disabled={round !== 3 ? false : true}
        onClick={() => play("scissors")}
      >
        <img src="Scissors.png" alt="" />
      </button>
    </div>
  );
}

export default Buttons;
