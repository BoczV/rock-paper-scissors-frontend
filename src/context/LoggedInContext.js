import React, { useState, createContext } from "react";

export const LoggedInContext = createContext();

export const LoggedInContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </LoggedInContext.Provider>
  );
};
