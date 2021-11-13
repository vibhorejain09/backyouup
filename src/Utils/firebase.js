// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2DQJPE965ssN5k70RE1KORiyCJhILcXU",
  authDomain: "backyouup-3cdf8.firebaseapp.com",
  projectId: "backyouup-3cdf8",
  storageBucket: "backyouup-3cdf8.appspot.com",
  messagingSenderId: "735586835352",
  appId: "1:735586835352:web:ed7c7d6a910c61979929ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export default app;