import React from "react";
import "../styles/Buttons.scss";

function AnotherGame() {
  const redirect = (route) => {
    window.location.replace(route);
  };

  return (
    <div className="buttonsDiv">
      <button className="learn-more" onClick={() => redirect("/game")}>
        Play one more, play-play!
      </button>
      <button className="learn-more" onClick={() => redirect("/")}>
        I am tired of this, thanks
      </button>
    </div>
  );
}

export default AnotherGame;
