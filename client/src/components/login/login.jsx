// src/Login.js
import React, { useState } from 'react';
import { auth, googleProvider, signInWithGoogle } from '../../api/firebase';
import '../login/login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const parts = email.split('@');
      const nm = parts[0];
    
      // Always send the request to your backend to add email and name
        await axios.post('http://localhost:3334/insertdata', {
          name: nm,
          email: email,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      // Sign up or sign in the user with Firebase based on isSignUp flag
      if (isSignUp) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.error(error.message);
    }
    alert("Data Collected!!");
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />

      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-button">
          {isSignUp ? 'Sign Up' : 'Sign In'}
          <i className="fas fa-user" />
        </button>
      </form>

      <button
        onClick={signInWithGoogle}
        className="auth-button google-button"
      >
        Sign In with Google
        <i className="fab fa-google" />
      </button>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="toggle-button"
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Login;
