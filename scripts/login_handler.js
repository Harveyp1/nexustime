// This script assumes common.js is already loaded

const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (mockUsers[email]) {
    const user = mockUsers[email];
    localStorage.setItem("userPlan", user.plan);
    localStorage.setItem("userWorkspaces", JSON.stringify(user.workspaces));
    localStorage.setItem("activeUser", email);
    window.location.href = "/switch-workspace.html";
  } else {
    alert("Invalid login: No matching user.");
  }
});
