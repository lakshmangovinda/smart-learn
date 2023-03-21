// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1UKsNCtswvHqvQrS3Cmgxj_bYzrWRn7s",
  authDomain: "smart-learn-381109.firebaseapp.com",
  projectId: "smart-learn-381109",
  storageBucket: "smart-learn-381109.appspot.com",
  messagingSenderId: "19797815185",
  appId: "1:19797815185:web:32b633eb01f2b2a1677430",
  measurementId: "G-357XJWEBHF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
