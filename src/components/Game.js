import React, { useEffect, useState } from "react";
import "../styles/Buttons.scss";
import Axios from "axios";
import Draw from "./Draw";
import Win from "./Win";
import Lost from "./Lost";
import Play from "./Play";

function Game() {
  const cookieValue = document.cookie.split("=")[1];
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [playerDecision, setPlayerDecision] = useState("");
  const [AiDecision, setAiDecision] = useState("");
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!cookieValue) {
      window.location.replace("/");
    }
  }, [cookieValue]);

  const play = (chosenOption) => {
    const options = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * options.length);
    let aiDec = options[random];
    setPlayerDecision(chosenOption);
    setAiDecision(aiDec);
    comparison(chosenOption, aiDec);
    setRound(round + 1);
  };

  useEffect(() => {
    const sendPoints = () => {
      const url = "http://localhost:8080/save-my-score";
      const scoreToBeAdded =
        playerScore > aiScore ? 10 : playerScore === aiScore ? 5 : 3;
      Axios.post(url, {
        userName: localStorage.getItem("username"),
        score: scoreToBeAdded,
      });
    };
    if (round === 3) {
      setTimeout(function () {
        setRound(round + 1);
      }, 1000);
      sendPoints();
    }
  }, [aiScore, playerScore, round]);

  function comparison(chosenOption, aiDec) {
    if (aiDec === "rock") {
      decideWhoGetsPoint(chosenOption, "paper", "scissors");
    } else if (aiDec === "paper") {
      decideWhoGetsPoint(chosenOption, "scissors", "rock");
    } else {
      decideWhoGetsPoint(chosenOption, "rock", "paper");
    }
  }

  function decideWhoGetsPoint(chosenOption, option1, option2) {
    if (chosenOption === option1) {
      setPlayerScore(playerScore + 1);
    } else if (chosenOption === option2) {
      setAiScore(aiScore + 1);
    }
  }

  return (
    <div>
      {round < 4 ? (
        <Play
          playerScore={playerScore}
          aiScore={aiScore}
          round={round}
          play={play}
          playerDecision={playerDecision}
          AiDecision={AiDecision}
        />
      ) : playerScore === aiScore ? (
        <Draw playerScore={playerScore} aiScore={aiScore} />
      ) : playerScore > aiScore ? (
        <Win playerScore={playerScore} aiScore={aiScore} />
      ) : (
        <Lost playerScore={playerScore} aiScore={aiScore} />
      )}
    </div>
  );
}

export default Game;
