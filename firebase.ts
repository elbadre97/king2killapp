// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// FIX: Use named imports for Firebase v9+ modular SDK. The namespace import was incorrect.
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx6joFs7d1rnvz1QIDYyPhUO1FbpcuV8E",
  authDomain: "king2killapp.firebaseapp.com",
  projectId: "king2killapp",
  storageBucket: "king2killapp.firebasestorage.app",
  messagingSenderId: "860139953982",
  appId: "1:860139953982:web:11ce0f2838ed4edf62166f",
  measurementId: "G-5JYEXE9HWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// FIX: Export functions and types so they can be imported from this file.
export { signInWithPopup, signOut, onAuthStateChanged };
export type { User as FirebaseUser } from 'firebase/auth';