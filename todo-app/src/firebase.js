// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGlpoQDewYQ7iGzunXA8ISS5oJ2abtv-0",
  authDomain: "todoapp-e7cc8.firebaseapp.com",
  projectId: "todoapp-e7cc8",
  storageBucket: "todoapp-e7cc8.firebasestorage.app",
  messagingSenderId: "621740216861",
  appId: "1:621740216861:web:75b2b8f524aa3a45f46cf4",
  measurementId: "G-LTRZTYE6DX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
