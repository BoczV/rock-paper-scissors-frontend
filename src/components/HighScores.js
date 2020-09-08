import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Users.scss";

function HighScores() {
  const [users, setUsers] = useState([]);
  let order = 1;
  const cookieValue = document.cookie.split("=")[1];

  useEffect(() => {
    const url = "http://localhost:8080/high-scores";
    Axios.get(url, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [cookieValue]);

  return (
    <div>
      <table className="rwd-table">
        <thead>
          <tr>
            <td className="head-column">Order</td>
            <td className="head-column">Username</td>
            <td className="head-column">Score</td>
            <td className="head-column">Wins</td>
            <td className="head-column">Roles</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{order++}.</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
              <td>{user.wins}</td>
              <td>{user.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;
