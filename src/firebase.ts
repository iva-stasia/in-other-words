import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
const API_KEY = import.meta.env.VITE_API_KEY as string;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "in-other-words-3608b.firebaseapp.com",
  projectId: "in-other-words-3608b",
  storageBucket: "in-other-words-3608b.appspot.com",
  messagingSenderId: "779040342246",
  appId: "1:779040342246:web:8bd6ed24e99b19ea0c3b27",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
