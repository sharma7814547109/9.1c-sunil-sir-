import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // Handle user registration
  const handleSignUp = async () => {
    const { username, password, confirmPassword } = contact;

    // Basic validation checks
    if (!username || !password || !confirmPassword) {
      alert('Please enter all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('User created successfully:', user);

      // Redirect to the dashboard or home page after successful sign-up
      navigate('/dashboard'); // Replace with your target page

    } catch (error) {
      console.error('Error creating account:', error);
      
      // Handle specific Firebase error codes
      let errorMessage = 'An error occurred while creating the account.';
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use. Please choose another.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid. Please enter a valid email.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message; // Default to the generic error message
          break;
      }

      // Display the error message to the user
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign Up</h1>
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
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={contact.confirmPassword}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
