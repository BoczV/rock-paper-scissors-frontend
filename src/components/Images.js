import React from "react";

function Images({ playerDecision, AiDecision }) {
  return (
    <div>
      {playerDecision === "rock" ? (
        <img src="Rock.png" alt="" />
      ) : playerDecision === "paper" ? (
        <img src="Paper.png" alt="" />
      ) : playerDecision === "scissors" ? (
        <img src="Scissors.png" alt="" />
      ) : null}
      {AiDecision === "rock" ? (
        <img src="Rock.png" alt="" />
      ) : AiDecision === "paper" ? (
        <img src="Paper.png" alt="" />
      ) : AiDecision === "scissors" ? (
        <img src="Scissors.png" alt="" />
      ) : null}
    </div>
  );
}

export default Images;
