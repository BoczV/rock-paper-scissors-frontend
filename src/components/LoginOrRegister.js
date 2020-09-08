import React, { useState } from "react";
import Login from "./Login.js";
import Registration from "./Registration.js";
import "../styles/Login.scss";

function LoginOrRegister(props) {
  const [loginOrReg, setLoginOrReg] = useState("login");

  return (
    <div>
      <div className="buttonsArea">
        {loginOrReg === "registration" ? (
          <button
            className="register-login"
            onClick={() => {
              setLoginOrReg("login");
            }}
          >
            Have an account? Sign in!
          </button>
        ) : (
          <button
            className="register-login"
            onClick={() => {
              setLoginOrReg("registration");
            }}
          >
            Not signed up? Register!
          </button>
        )}
      </div>
      {loginOrReg === "login" ? (
        <Login history={props.history} />
      ) : (
        <Registration history={props.history} />
      )}
    </div>
  );
}

export default LoginOrRegister;
