import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKy_SqRUTKkoeuTzrksN2_TQ41v8Zs9Ls",
  authDomain: "nexustime-e8b91.firebaseapp.com",
  projectId: "nexustime-e8b91",
  storageBucket: "nexustime-e8b91.appspot.com",
  messagingSenderId: "516976739338",
  appId: "1:516976739338:web:537ae732707a2a1aab4bf3",
  measurementId: "G-QRSD6TYH86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
