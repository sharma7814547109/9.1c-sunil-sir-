import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGooglePopup, createUserDocFromAuth } from "./firebase";
import { useSignIn } from "./context";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [contact, setContact] = useState({
    username: "",
    password: ""
  });

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const {SetIsSignIn} = useSignIn()
  // Handle traditional email/password login
  const handleLogin = async () => {
    try {
      if (contact.username === "" || contact.password === "") {
        alert("ENTER THE CREDENTIALS");
      } else {
        const auth = getAuth();
        const res = await signInWithEmailAndPassword(auth, contact.username, contact.password)
          .catch((error) => {
            alert(error.message);
            return;
          });
        if (res === undefined) {
          alert("Invalid credentials");
          SetIsSignIn(true);
          navigate('/login');
        } else {
          console.log('Trying to log in user:', contact.username);
          navigate('/signout');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Google login
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user); // Create user doc in Firestore if it doesn't exist
      console.log('Google User Logged In:', user);
      SetIsSignIn(true);
      navigate('/signout'); // Redirect to the signout page or dashboard
    } catch (error) {
      console.error("Google Login Error:", error);
      setErrorMessage("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div>
      <div className="signin-container">
        <h5 style={{ color: "blue" }}>
          <Link to="/registration">Sign Up</Link>
        </h5>
        <h1>Log In</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          name="username"
          type="email"
          placeholder="Email"
          value={contact.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={contact.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
        <button type="button" onClick={logGoogleUser}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
