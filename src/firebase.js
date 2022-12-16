import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk2tdPaz6tyfsQHIbjO3m5buDdjEjfk84",
  authDomain: "video-4c993.firebaseapp.com",
  projectId: "video-4c993",
  storageBucket: "video-4c993.appspot.com",
  messagingSenderId: "312622872427",
  appId: "1:312622872427:web:01d7e8143dc8d3fb6cbe2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
