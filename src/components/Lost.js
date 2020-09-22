import React from "react";
import AnotherGame from "./AnotherGame";

function Lost({ playerScore, aiScore }) {
  return (
    <div>
      <h1>AI won!</h1>
      <h2>
        {playerScore}:{aiScore}
      </h2>
      <AnotherGame />
    </div>
  );
}

export default Lost;
