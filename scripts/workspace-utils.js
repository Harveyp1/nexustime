// workspace-utils.js — shared helper for workspace logic

function getActiveWorkspace() {
  try {
    const allWorkspaces = JSON.parse(localStorage.getItem("userWorkspaces")) || [];
    const selected = localStorage.getItem("activeWorkspace");
    return allWorkspaces.find(w => w.name === selected) || null;
  } catch (err) {
    console.error("Failed to load workspace data:", err);
    return null;
  }
}
