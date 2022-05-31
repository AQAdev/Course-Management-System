// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6kD87Ogo51jnDzdERPfOPLr9l9PgOYls",
  authDomain: "lms-student-5044f.firebaseapp.com",
  projectId: "lms-student-5044f",
  storageBucket: "lms-student-5044f.appspot.com",
  messagingSenderId: "808070937735",
  appId: "1:808070937735:web:b5c5383a63f099c57b0c22",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

export const storage = getStorage(app);
