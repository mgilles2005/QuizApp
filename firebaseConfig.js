import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlxvCARGi6JyXjzuZ-RHwndJUlZc6xfZ0",
  authDomain: "quizapp-4062c.firebaseapp.com",
  projectId: "quizapp-4062c",
  storageBucket: "quizapp-4062c.appspot.com",
  messagingSenderId: "62542206288",
  appId: "1:62542206288:web:955bb45d04344bed4d8855",
  measurementId: "G-KLDKC7CTPE",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
