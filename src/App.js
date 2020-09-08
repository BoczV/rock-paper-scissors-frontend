import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Game from "./components/Game";
import LoginOrRegister from "./components/LoginOrRegister";
import HighScores from "./components/HighScores";
import MyScores from "./components/MyScores";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/auth" component={LoginOrRegister} />
        <Route exact path="/high-scores" component={HighScores} />
        <Route exact path="/my-scores" component={MyScores} />
      </Router>
    </div>
  );
}

export default App;
