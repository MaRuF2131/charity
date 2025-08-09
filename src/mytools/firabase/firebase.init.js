import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2NDwO_hOQC0AxESWEuycWkF54hj4dnxI",
  authDomain: "appstore-ac701.firebaseapp.com",
  projectId: "appstore-ac701",
  storageBucket: "appstore-ac701.firebasestorage.app",
  messagingSenderId: "367282849088",
  appId: "1:367282849088:web:22c6998a2ca801d3af26a5",
  measurementId: "G-TQM350NNCY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
