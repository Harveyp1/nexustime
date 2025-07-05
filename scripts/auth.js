// auth.js - Login & Signup handlers
import { stateManager } from './common.js';

export function initAuth() {
  const loginPage = document.getElementById('login');
  const signupPage = document.getElementById('signup');

  loginPage.innerHTML = `
    <div class="card max-w-md mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form id="login-form" class="space-y-4">
        <input type="email" placeholder="Email" class="form-input w-full" required />
        <input type="password" placeholder="Password" class="form-input w-full" required />
        <button class="cta-button w-full py-2 rounded">Login</button>
        <p class="text-sm text-center text-gray-400">Don't have an account? <a href="#signup" class="text-emerald-400">Sign up</a></p>
      </form>
    </div>`;

  signupPage.innerHTML = `
    <div class="card max-w-md mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-4">Create Account</h2>
      <form id="signup-form" class="space-y-4">
        <input type="text" placeholder="Company Name" class="form-input w-full" required />
        <input type="email" placeholder="Email" class="form-input w-full" required />
        <input type="password" placeholder="Password" class="form-input w-full" required />
        <button class="cta-button w-full py-2 rounded">Sign Up</button>
        <p class="text-sm text-center text-gray-400">Already have an account? <a href="#login" class="text-emerald-400">Login</a></p>
      </form>
    </div>`;

  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    stateManager.login();
    window.location.hash = '#dashboard';
    location.reload();
  });

  document.getElementById('signup-form')?.addEventListener('submit', e => {
    e.preventDefault();
    stateManager.login();
    window.location.hash = '#dashboard';
    location.reload();
  });
}
