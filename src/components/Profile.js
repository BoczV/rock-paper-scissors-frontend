import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";

function Profile() {
  const { username } = useParams();
  const cookieValue = document.cookie.split("=")[1];
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const url = `http://localhost:8080/my-statistics/${username}`;
    Axios.get(url, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    })
      .then((data) => {
        setStatistics(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [cookieValue, username]);

  return (
    <div>
      <h1>Welcome to {username}'s Profile</h1>
      <table className="rwd-table">
        <thead>
          <tr>
            <td className="head-column">Username</td>
            <td className="head-column">Score</td>
            <td className="head-column">Wins</td>
            <td className="head-column">Draws</td>
            <td className="head-column">Defeats</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{statistics.username}</td>
            <td>{statistics.score}</td>
            <td>{statistics.wins}</td>
            <td>{statistics.draws}</td>
            <td>{statistics.defeats}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
