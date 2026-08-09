// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB_Al-aJMwhvBtO79i-QcIDli3rQa1f0UU",
  authDomain: "capital-bank-9935d.firebaseapp.com",
  projectId: "capital-bank-9935d",
  storageBucket: "capital-bank-9935d.firebasestorage.app",
  messagingSenderId: "77310870713",
  appId: "1:77310870713:web:88daa97cbdeb709d4d4768"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};