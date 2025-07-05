import { signup } from '/scripts/auth.js';
import { createWorkspace } from '/scripts/firestore.js';

(async () => {
  try {
    const email = `test${Date.now()}@example.com`;
    const password = "password123";
    const userCredential = await signup(email, password);
    const uid = userCredential.user.uid;
    console.log("✅ Signup success:", uid);

    const workspaceData = {
      name: "Test Workspace",
      industry: "Information Technology",
      timezone: "America/New_York"
    };

    const ref = await createWorkspace(uid, workspaceData);
    console.log("✅ Workspace created:", ref.id);
    localStorage.setItem("uid", uid);
    localStorage.setItem("activeWorkspaceId", ref.id);
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
})();
