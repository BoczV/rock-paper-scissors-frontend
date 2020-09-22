import React from "react";
import AnotherGame from "./AnotherGame";

function Draw({ playerScore, aiScore }) {
  return (
    <div>
      <h1>Draw!</h1>
      <h2>
        {playerScore}:{aiScore}
      </h2>
      <AnotherGame />
    </div>
  );
}

export default Draw;
