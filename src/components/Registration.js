import React, { useState, useContext } from "react";
import Axios from "axios";
import { LoggedInContext } from "../context/LoggedInContext";
import "../styles/Login.scss";

function Registration(props) {
  const [userName, setUserName] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

  const sendNewUserData = () => {
    if (firstPassword !== secondPassword) {
      alert("Passwords are not equal!");
    } else {
      Axios.post("http://localhost:8080/auth/registration", {
        username: userName,
        password: firstPassword,
      })
        .then((data) => {
          document.cookie = `Authorization=${data.data.token}`;
          window.localStorage.setItem("username", userName);
          window.localStorage.setItem("roles", data.data.roles);
          setIsLoggedIn(true);
          window.location.replace("/");
        })
        .catch((e) => {
          alert("Username and/or email address taken!");
        });
    }
  };

  const togglePasswordVisibility = () => {
    let passwordInput = document.getElementById("password");
    let passwordInput2 = document.getElementById("password2");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordInput2.type = "text";
    } else {
      passwordInput.type = "password";
      passwordInput2.type = "password";
    }
  };

  return (
    <div>
      <div id="login">
        <div class="login-card">
          <div class="card-title">
            <h1>Please Register</h1>
          </div>

          <div class="content">
            <input
              id="email"
              type="text"
              name="email"
              title="email"
              placeholder="Username"
              autoComplete="off"
              required
              autofocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="password"
              type="password"
              name="password"
              title="password"
              placeholder="Password"
              required
              onChange={(e) => setFirstPassword(e.target.value)}
            />
            <input
              className="password"
              id="password2"
              type="password"
              name="password"
              title="password"
              placeholder="Password again"
              required
              onChange={(e) => setSecondPassword(e.target.value)}
            />

            <div class="level options">
              <div class="checkbox level-left">
                <input
                  type="checkbox"
                  id="checkbox"
                  class="regular-checkbox"
                  onClick={togglePasswordVisibility}
                />
                <label for="checkbox"></label>
                <span>Show password</span>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              onClick={sendNewUserData}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
