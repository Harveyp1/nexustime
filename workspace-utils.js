function getActiveWorkspace() {
  try {
    const allWorkspaces = JSON.parse(localStorage.getItem("userWorkspaces")) || [];
    const selected = localStorage.getItem("activeWorkspace");
    return allWorkspaces.find(w => w.name === selected) || null;
  } catch (e) {
    console.error("Workspace data load error:", e);
    return null;
  }
}

window.getActiveWorkspace = getActiveWorkspace;
