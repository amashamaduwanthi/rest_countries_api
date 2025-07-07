// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Import auth

const firebaseConfig = {
    apiKey: "AIzaSyC_AwS4-UBUZgFMfTHEZIdYmHR_D_e_TN0",
    authDomain: "countries-api-3ac5d.firebaseapp.com",
    projectId: "countries-api-3ac5d",
    storageBucket: "countries-api-3ac5d.appspot.com",
    messagingSenderId: "244567093588",
    appId: "1:244567093588:web:79443ba402d150788ad8c1",
    measurementId: "G-M39191142F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ Export auth
