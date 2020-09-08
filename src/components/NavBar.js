import React from "react";
import "../styles/NavbarStyle.css";

export default function NavBar() {
  const cookieValue = document.cookie.split("=")[1];

  function removeCookies() {
    localStorage.clear();
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }
  return (
    <div className="header">
      <a className="home" href="/" id="logo" target="_blank">
        Rock Paper Scissors
      </a>

      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {cookieValue ? (
            <li>
              <a href="/game">Let's Play!</a>
            </li>
          ) : null}
          {cookieValue ? (
            <li>
              <a href="/my-scores">My scores</a>
            </li>
          ) : null}
          {cookieValue ? (
            <li>
              <a href="/high-scores">High Score</a>
            </li>
          ) : null}
          {!cookieValue ? (
            <li>
              <a href="/auth">Sign in/Sign up</a>
            </li>
          ) : (
            <li>
              <span>Logged in as {localStorage.getItem("username")}</span>
              <a href="/" onClick={() => removeCookies()}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
