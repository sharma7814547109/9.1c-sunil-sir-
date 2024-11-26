import React, { createContext, useContext, useState } from "react";

const SignInContext = createContext();

export const useSignIn = () => {
  return useContext(SignInContext);
};

export const SignInProvider = ({ children }) => {
  const [isSignIn, SetIsSignIn] = useState(false);

  return (
    <SignInContext.Provider value={{ isSignIn, SetIsSignIn }}>
      {children}
    </SignInContext.Provider>
  );
};