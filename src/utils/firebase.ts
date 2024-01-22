// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTt0L31TU9TADkdcztsWZ763JYoP8EQNI",
  authDomain: "scoreleet.firebaseapp.com",
  projectId: "scoreleet",
  storageBucket: "scoreleet.appspot.com",
  messagingSenderId: "710917301836",
  appId: "1:710917301836:web:d7626d3497ef7746b5f6e9",
  measurementId: "G-82BHP075WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
