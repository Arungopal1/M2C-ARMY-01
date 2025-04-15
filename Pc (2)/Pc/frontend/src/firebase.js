// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbfvZTda2Cc3xCr_1mB9_-IvdfhPgCsHI",
  authDomain: "m2c-army-7f5d2.firebaseapp.com",
  projectId: "m2c-army-7f5d2",
  storageBucket: "m2c-army-7f5d2.firebasestorage.app",
  messagingSenderId: "233534426240",
  appId: "1:233534426240:web:4f7e364454d67032adaa65",
  measurementId: "G-73VMW307W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, analytics };
