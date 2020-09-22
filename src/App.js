import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Game from "./components/Game";
import LoginOrRegister from "./components/LoginOrRegister";
import HighScores from "./components/HighScores";
import Community from "./components/Community";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/auth" component={LoginOrRegister} />
        <Route exact path="/high-scores" component={HighScores} />
        <Route exact path="/community" component={Community} />
        <Route exact path="/profile/:username" component={Profile} />
      </Router>
    </div>
  );
}

export default App;
