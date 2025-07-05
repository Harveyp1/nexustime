import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";

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

console.log("✅ Firestore initialized:", db);

const testConnection = async () => {
  try {
    const snapshot = await db.collection("test").limit(1).get();
    console.log("✅ Firestore read success:", snapshot.empty ? "No data found" : "Data exists");
  } catch (e) {
    console.error("❌ Firestore test failed:", e);
  }
};

testConnection();
