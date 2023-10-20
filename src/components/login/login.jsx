// src/Login.js
import React, { useState } from 'react';
import { auth, googleProvider , signInWithGoogle } from '../../api/firebase';
import '../login/login.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        // Sign-up successful
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        // Sign-in successful
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      // Sign-in with Google successful
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

      <button onClick={signInWithGoogle} className="auth-button google-button">
        Sign In with Google
        <i className="fab fa-google" />
      </button>

      <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Login;
