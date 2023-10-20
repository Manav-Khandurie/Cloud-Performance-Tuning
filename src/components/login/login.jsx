// src/Login.js
import React, { useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { auth, googleProvider, githubProvider , signInWithGoogle } from '../../api/firebase';
 // Adjust the path based on your folder structure Adjust the path based on your folder structure
 
 const Login = () => {
   const handleGoogleSignIn = async () => {
     try {
       await auth.signInWithPopup(googleProvider);
       // Sign-up or sign-in with Google successful
     } catch (error) {
       console.error(error.message);
     }
   };
 
   const handleGitHubSignIn = async () => {
     try {
       await auth.signInWithPopup(githubProvider);
       // Sign-up or sign-in with GitHub successful
     } catch (error) {
       console.error(error.message);
     }
   };
 
   return (
     <div>
       <h2>Login</h2>
       {/* Your email/password login form here */}
       
       {/* Google Sign-up button */}
       <button onClick={signInWithGoogle}>Sign Up with Google</button>
       
       {/* GitHub Sign-up button */}
       <button onClick={handleGitHubSignIn}>Sign Up with GitHub</button>
     </div>
   );
 };
 
 export default Login;
 