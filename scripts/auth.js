import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { app } from './firebase-init.js';

const auth = getAuth(app);

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}
