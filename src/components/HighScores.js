import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/Users.scss";

function HighScores() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [friends, setFriends] = useState([]);
  const [peopleWithRequest, setPeopleWithRequest] = useState([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
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

  useEffect(() => {
    const friendsUrl = `http://localhost:8080/friend/get-my-friends/${username}`;
    const sentRequestsUrl = `http://localhost:8080/friend/get-my-sent-requests/${username}`;
    const receivedFriendRequests = `http://localhost:8080/friend/get-my-received-requests/${username}`;
    Axios.get(friendsUrl, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    })
      .then((data) => {
        setFriends(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(sentRequestsUrl, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    })
      .then((data) => {
        setPeopleWithRequest(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(receivedFriendRequests, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    }).then((data) => {
      setReceivedFriendRequests(data.data);
    });
  }, [cookieValue, receivedFriendRequests, username]);

  const sendConnectionRequest = (friend) => {
    const url = "http://localhost:8080/friend/send-request";
    Axios.post(url, {
      newFriend: friend,
      me: username,
    })
      .then(setPeopleWithRequest([...peopleWithRequest, friend]))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>LeaderBoard</h1>
      <table className="rwd-table">
        <thead>
          <tr>
            <td className="head-column">Order</td>
            <td className="head-column">Username</td>
            <td className="head-column">Score</td>
            <td className="head-column">Wins</td>
            <td className="head-column">Roles</td>
            <td className="head-column">Friend or not</td>
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
              <td>
                {user.username === username ? null : peopleWithRequest.includes(
                    user.username
                  ) ? (
                  <p>Sent request</p>
                ) : friends.includes(user.username) ? (
                  <p>Your friend :)</p>
                ) : receivedFriendRequests.includes(user.username) ? (
                  <p>Wants you friend</p>
                ) : (
                  <button onClick={() => sendConnectionRequest(user.username)}>
                    Add friend
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;
