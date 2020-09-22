import React from "react";
import "../styles/NavbarStyle.css";

export default function NavBar() {
  const cookieValue = document.cookie.split("=")[1];

  function removeCookies() {
    localStorage.clear();
    let res = document.cookie;
    let multiple = res.split(";");
    for (let i = 0; i < multiple.length; i++) {
      let key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }

  return (
    <div className="header">
      <p className="home" href="/" id="logo">
        Rock Paper Scissors
      </p>

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
              <a href={`/profile/${localStorage.getItem("username")}`}>
                My scores
              </a>
            </li>
          ) : null}
          {cookieValue ? (
            <li>
              <a href="/high-scores">High Score</a>
            </li>
          ) : null}
          {cookieValue ? (
            <li>
              <a href="/community">Community</a>
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
