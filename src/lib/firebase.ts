import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFES72xBjelhfWwK4WIP9UVQMBH91ylkU",
  authDomain: "reel-rush-221fd.firebaseapp.com",
  projectId: "reel-rush-221fd",
  storageBucket: "reel-rush-221fd.firebasestorage.app",
  messagingSenderId: "411692873627",
  appId: "1:411692873627:web:0e793f30f6215e506ad33e",
  measurementId: "G-KH42LLLX89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };