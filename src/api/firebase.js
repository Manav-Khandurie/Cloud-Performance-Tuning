// src/firebase.js
import { initializeApp } from 'firebase/app'; // Import initializeApp function
import { getAuth , signInWithPopup ,signInWithEmailAndPassword } from 'firebase/auth'; // Import getAuth function
import 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAoAa8o3Z4ZwTuQAeSt-d0qonVzvanIdWQ",
    authDomain: "cptproject-750b6.firebaseapp.com",
    projectId: "cptproject-750b6",
    storageBucket: "cptproject-750b6.appspot.com",
    messagingSenderId: "456723411329",
    appId: "1:456723411329:web:19185011e0f8cfc361b880",
    measurementId: "G-J1ZC52XKNN"
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

