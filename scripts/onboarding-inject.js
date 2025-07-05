import { getCurrentUser } from '/scripts/auth.js';
import { createWorkspace } from '/scripts/firestore.js';
import { populateTimezones } from '/scripts/populate-timezones.js';

populateTimezones("timezone");

const form = document.getElementById('onboardingForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('workspaceName').value;
  const industry = document.getElementById('industry').value;
  const timezone = document.getElementById('timezone').value;
  const user = getCurrentUser();

  if (!user) {
    alert("No user found. Please sign in again.");
    window.location.href = "/app.html";
    return;
  }

  try {
    const ref = await createWorkspace(user.uid, { name, industry, timezone });
    localStorage.setItem("activeWorkspaceId", ref.id);
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Onboarding error:", error);
    alert("Something went wrong. Please try again.");
  }
});
