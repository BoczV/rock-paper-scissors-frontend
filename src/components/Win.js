import React from "react";
import AnotherGame from "./AnotherGame";

function Win({ playerScore, aiScore }) {
  return (
    <div>
      <h1>Player won!</h1>
      <h2>
        {playerScore}:{aiScore}
      </h2>
      <AnotherGame />
    </div>
  );
}

export default Win;
