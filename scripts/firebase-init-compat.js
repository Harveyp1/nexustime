// Firebase CDN version compatible with browser module imports

// You must include these scripts in your HTML file before this script runs:
// <script type="module" src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"></script>
// <script type="module" src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyCKy_SqRUTKkoeuTzrksN2_TQ41v8Zs9Ls",
  authDomain: "nexustime-e8b91.firebaseapp.com",
  projectId: "nexustime-e8b91",
  storageBucket: "nexustime-e8b91.appspot.com",
  messagingSenderId: "516976739338",
  appId: "1:516976739338:web:537ae732707a2a1aab4bf3",
  measurementId: "G-QRSD6TYH86"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { app, db };
