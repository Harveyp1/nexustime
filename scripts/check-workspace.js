firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) return;
  const db = firebase.firestore();

  try {
    const workspacesSnapshot = await db.collection("workspaces")
      .where("ownerId", "==", user.uid)
      .limit(1)
      .get();

    if (workspacesSnapshot.empty) {
      window.location.href = "/onboarding.html";
    } else {
      window.location.href = "/switch-workspace.html";
    }
  } catch (err) {
    console.error("Error checking workspaces:", err);
    alert("There was a problem checking your workspaces. Please try again later.");
  }
});
