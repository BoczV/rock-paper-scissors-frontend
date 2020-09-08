import React, { useEffect, useState } from "react";
import "../styles/Game.css";
import Axios from "axios";

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
    setRound(round + 1);
    setPlayerDecision(chosenOption);
    let options = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * options.length);
    setAiDecision(options[random]);
    comparison();
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
      }, 1500);
      setTimeout(function () {
        sendPoints();
        window.location.replace("/");
      }, 2000);
    }
  }, [aiScore, playerScore, round]);

  const comparison = () => {
    if (AiDecision === "rock") {
      if (playerDecision === "rock") {
        setAiScore(aiScore + 1);
        setPlayerScore(playerScore + 1);
      } else if (playerDecision === "paper") {
        setPlayerScore(playerScore + 1);
      } else if (playerDecision === "scissors") {
        setAiScore(aiScore + 1);
      }
    } else if (AiDecision === "paper") {
      if (playerDecision === "rock") {
        setAiScore(aiScore + 1);
      } else if (playerDecision === "paper") {
        setAiScore(aiScore + 1);
        setPlayerScore(playerScore + 1);
      } else if (playerDecision === "scissors") {
        setPlayerScore(playerScore + 1);
      }
    } else if (AiDecision === "scissors") {
      if (playerDecision === "rock") {
        setPlayerScore(playerScore + 1);
      } else if (playerDecision === "paper") {
        setAiScore(aiScore + 1);
      } else if (playerDecision === "scissors") {
        setAiScore(aiScore + 1);
        setPlayerScore(playerScore + 1);
      }
    }
  };

  return (
    <div>
      {round < 4 ? (
        <>
          <div>
            <h1>Round:</h1>
            <h2>{round}</h2>
          </div>
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
          <div className="buttons">
            <button onClick={() => play("rock")}>
              <img src="Rock.png" alt="" />
            </button>
            <button onClick={() => play("paper")}>
              <img src="Paper.png" alt="" />
            </button>
            <button onClick={() => play("scissors")}>
              <img src="Scissors.png" alt="" />
            </button>
          </div>
        </>
      ) : playerScore === aiScore ? (
        <>
          <h1>Draw!</h1>
          <h2>
            {playerScore}:{aiScore}
          </h2>
        </>
      ) : playerScore > aiScore ? (
        <>
          <h1>Player won!</h1>
          <h2>
            {playerScore}:{aiScore}
          </h2>
        </>
      ) : (
        <>
          <h1>AI won!</h1>
          <h2>
            {playerScore}:{aiScore}
          </h2>
        </>
      )}
    </div>
  );
}

export default Game;
