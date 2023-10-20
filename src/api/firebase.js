// src/firebase.js
import { initializeApp } from 'firebase/app'; // Import initializeApp function
import { getAuth , signInWithPopup ,signInWithEmailAndPassword } from 'firebase/auth'; // Import getAuth function
import 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
//Add you firebase proj config
const firebaseConfig = {
    apiKey:"" ,
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  
  const app = initializeApp(firebaseConfig); // Initialize the Firebase app
  const auth = getAuth(app); // Get the authentication instance
  const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};



