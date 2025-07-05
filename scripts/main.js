// main.js - Entry point for NexusTime SPA logic
import { mockData, stateManager, getWeek, formatDate } from './common.js';

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('#main-nav a[data-page]');
const logoutButton = document.getElementById('logout-button');
const mainNav = document.getElementById('main-nav');

function showPage(pageId) {
  pages.forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(pageId);
  if (target) target.classList.remove('hidden');
  location.hash = pageId;
}

function setupNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      showPage(page);
    });
  });

  logoutButton.addEventListener('click', () => {
    stateManager.logout();
  });
}

function initApp() {
  setupNavigation();
  const defaultPage = stateManager.isLoggedIn() ? 'dashboard' : 'login';
  showPage(defaultPage);
  if (stateManager.isLoggedIn()) {
    mainNav.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
