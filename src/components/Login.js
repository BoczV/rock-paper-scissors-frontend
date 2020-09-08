import React, { useState, useContext } from "react";
import Axios from "axios";
import { LoggedInContext } from "../context/LoggedInContext";
import "../styles/Login.scss";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

  const sendUserLoginData = () => {
    Axios.post("http://localhost:8080/auth/sign-in", {
      username: username,
      password: password,
    })
      .then((data) => {
        document.cookie = `Authorization=${data.data.token}`;
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("roles", data.data.roles);
        setIsLoggedIn(true);
        window.location.replace("/");
      })
      .catch((e) => {
        console.log(e);
        //alert("Incorrect username and/or password!!");
      });
  };

  const togglePasswordVisibility = () => {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  return (
    <div>
      <div id="login">
        <div className="login-card">
          <div className="card-title">
            <h1>Please Sign In</h1>
          </div>

          <div className="content">
            <input
              id="email"
              type="text"
              name="email"
              title="email"
              placeholder="Username"
              required
              autofocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="password"
              type="password"
              name="password"
              title="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="level options">
              <div className="checkbox level-left">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="regular-checkbox"
                  onClick={togglePasswordVisibility}
                />
                <label for="checkbox"></label>
                <span>Show password</span>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={sendUserLoginData}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
