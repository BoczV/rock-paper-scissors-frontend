import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Users.scss";

function Community() {
  const cookieValue = document.cookie.split("=")[1];
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [friends, setFriends] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);

  useEffect(() => {
    const friendsUrl = `http://localhost:8080/friend/get-my-friends/${username}`;
    const sentRequestsUrl = `http://localhost:8080/friend/get-my-sent-requests/${username}`;
    const receivedFriendRequests = `http://localhost:8080/friend/get-my-received-requests/${username}`;
    Axios.get(friendsUrl, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    }).then((data) => {
      setFriends(data.data);
    });
    Axios.get(sentRequestsUrl, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    }).then((data) => {
      setSentFriendRequests(data.data);
    });
    Axios.get(receivedFriendRequests, {
      withCredentials: true,
      headers: { Authorization: cookieValue },
    }).then((data) => {
      setReceivedFriendRequests(data.data);
    });
  }, [cookieValue, username]);

  const deleteSentRequest = (request) => {
    const url = `http://localhost:8080/friend/delete/my-created-request/${username}/${request}`;
    Axios.delete(url).then(
      setSentFriendRequests(
        sentFriendRequests.filter((friend) => friend !== request)
      )
    );
  };

  const deleteReceivedRequest = (request) => {
    const url = `http://localhost:8080/friend/delete/my-received-request/${username}/${request}`;
    Axios.delete(url).then(
      setReceivedFriendRequests(
        receivedFriendRequests.filter((friend) => friend !== request)
      )
    );
  };

  const addToFriend = (request) => {
    const url = "http://localhost:8080/friend/add";
    Axios.post(url, {
      me: username,
      newFriend: request,
    }).then(setFriends([...friends, request]));
    deleteReceivedRequest(request);
  };

  const deleteFriend = (request) => {
    const url = `http://localhost:8080/friend/delete/${username}/${request}`;
    Axios.delete(url).then(
      setFriends(friends.filter((friend) => friend !== request))
    );
  };

  return (
    <div>
      <h1>Manage your friends, {username}! :)</h1>
      <div className="table-container">
        <table className="rwd-table">
          <caption>Friends</caption>
          <thead>
            <tr>
              <td className="head-column">Username</td>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <tr>
                <td>
                  <a href={`/profile/${friend}`}>{friend}</a>
                </td>
                <td>
                  <button onClick={() => deleteFriend(friend)}>
                    Delete friend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="rwd-table">
          <caption>Sent requests</caption>
          <thead>
            <tr>
              <td className="head-column">Username</td>
            </tr>
          </thead>
          <tbody>
            {sentFriendRequests
              ? sentFriendRequests.map((request) => (
                  <tr>
                    <td>{request}</td>
                    <td>
                      <button onClick={() => deleteSentRequest(request)}>
                        Cancel request
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        <table className="rwd-table">
          <caption>Received requests</caption>
          <thead>
            <tr>
              <td className="head-column">Username</td>
            </tr>
          </thead>
          <tbody>
            {receivedFriendRequests
              ? receivedFriendRequests.map((request) => (
                  <tr>
                    <td>{request}</td>
                    <td>
                      <button onClick={() => addToFriend(request)}>
                        Accept request
                      </button>
                      <button onClick={() => deleteReceivedRequest(request)}>
                        Cancel request
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Community;
