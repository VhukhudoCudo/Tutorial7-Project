import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBSS-qQMoN7UARUmAprQBsVUMbyuFKPdsU",
    authDomain: "recipe-app-e3bb9.firebaseapp.com",
    projectId: "recipe-app-e3bb9",
    storageBucket: "recipe-app-e3bb9.firebasestorage.app",
    messagingSenderId: "701978130762",
    appId: "1:701978130762:web:a21c313fffebdfebd8a9b3",
    measurementId: "G-FSFP5C97JL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
