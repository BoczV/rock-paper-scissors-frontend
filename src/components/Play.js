import React from "react";
import Round from "./Round";
import Scores from "./Scores";
import Images from "./Images";
import Buttons from "./Buttons";

function Play({
  round,
  playerScore,
  aiScore,
  playerDecision,
  AiDecision,
  play,
}) {
  return (
    <div>
      <Round round={round} />
      <Scores playerScore={playerScore} aiScore={aiScore} />
      <Images playerDecision={playerDecision} AiDecision={AiDecision} />
      <Buttons play={play} round={round} />
    </div>
  );
}

export default Play;
