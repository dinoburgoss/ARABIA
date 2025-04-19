// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9KVPsx8Mdb-MrFrpAVfFu3ki7-jSpRCg",
  authDomain: "burgeradmin-8c886.firebaseapp.com",
  projectId: "burgeradmin-8c886",
  storageBucket: "burgeradmin-8c886.firebasestorage.app",
  messagingSenderId: "610278695977",
  appId: "1:610278695977:web:333d07efa996af74392838"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
