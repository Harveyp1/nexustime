// This file populates dashboard stats from Firestore based on the active workspace
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = "/app.html";

  const db = firebase.firestore();
  const workspaceId = localStorage.getItem("activeWorkspace");
  if (!workspaceId) return;

  const timesheetsSnapshot = await db.collection("timesheets")
    .where("workspaceId", "==", workspaceId)
    .get();

  const employeesSnapshot = await db.collection("employees")
    .where("workspaceId", "==", workspaceId)
    .get();

  const timesheets = timesheetsSnapshot.docs.map(doc => doc.data());
  const employees = employeesSnapshot.docs.map(doc => doc.data());

  const totalHours = timesheets.reduce((sum, sheet) => sum + (sheet.hours || 0), 0);
  const approved = timesheets.filter(t => t.status === "approved").length;
  const pending = timesheets.filter(t => t.status === "pending").length;

  document.querySelector("#totalHours").textContent = `${totalHours.toFixed(1)} hrs`;
  document.querySelector("#pendingTimesheets").textContent = pending;
  document.querySelector("#approvedTimesheets").textContent = approved;
  document.querySelector("#totalEmployees").textContent = employees.length;
});
