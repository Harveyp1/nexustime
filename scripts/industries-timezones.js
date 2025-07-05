<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Onboarding - NexusTime</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
  <script>
    const firebaseConfig = {
      apiKey: "AIzaSyCKy_SqRUTKkoeuTzrksN2_TQ41v8Zs9Ls",
      authDomain: "nexustime-e8b91.firebaseapp.com",
      projectId: "nexustime-e8b91",
      storageBucket: "nexustime-e8b91.appspot.com",
      messagingSenderId: "516976739338",
      appId: "1:516976739338:web:537ae732707a2a1aab4bf3",
      measurementId: "G-QRSD6TYH86"
    };
    firebase.initializeApp(firebaseConfig);
  </script>
</head>
<body class="bg-gray-950 text-white font-inter">
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl shadow-xl">
      <h2 class="text-3xl font-bold text-center text-emerald-400 mb-6">Create a New Workspace</h2>
      <form id="onboardingForm" class="space-y-5">
        <div>
          <label for="workspace" class="block text-sm mb-1">Workspace Name</label>
          <input type="text" id="workspace" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl" required />
        </div>

        <div>
          <label for="industry" class="block text-sm mb-1">Industry</label>
          <select id="industry" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl" required></select>
        </div>

        <div>
          <label for="timezone" class="block text-sm mb-1">Time Zone</label>
          <select id="timezone" class="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl" required></select>
        </div>

        <button type="submit" class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold text-center">Create Workspace</button>
      </form>
    </div>
  </div>

  <script src="/scripts/industries-timezones.js"></script>

  <script>
    document.getElementById("onboardingForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = firebase.auth().currentUser;
      if (!user) return;

      const db = firebase.firestore();
      const data = {
        ownerId: user.uid,
        name: document.getElementById("workspace").value,
        industry: document.getElementById("industry").value,
        timezone: document.getElementById("timezone").value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        plan: "Free"
      };

      try {
        await db.collection("workspaces").add(data);
        window.location.href = "/switch-workspace.html";
      } catch (error) {
        alert("Failed to create workspace: " + error.message);
      }
    });
  </script>
</body>
</html>
