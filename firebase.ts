// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// FIX: The User type needs to be imported to be used.
import type { User } from "firebase/auth";

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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// The User type is now available on the firebase object.
export type FirebaseUser = User;
