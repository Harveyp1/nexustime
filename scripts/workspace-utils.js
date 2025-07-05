import { db } from './firebase-init.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function getActiveWorkspace(userId) {
  const workspaceId = localStorage.getItem("activeWorkspaceId");
  if (!workspaceId) return null;

  const ref = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
