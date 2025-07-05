import { db } from './firebase-init.js';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function getUserWorkspaces(userId) {
  const ref = collection(db, `users/${userId}/workspaces`);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getWorkspace(userId, workspaceId) {
  const ref = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function createWorkspace(userId, workspaceData) {
  const ref = collection(db, `users/${userId}/workspaces`);
  return addDoc(ref, workspaceData);
}

export async function updateWorkspace(userId, workspaceId, updates) {
  const ref = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  return updateDoc(ref, updates);
}

export async function deleteWorkspace(userId, workspaceId) {
  const ref = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  return deleteDoc(ref);
}
