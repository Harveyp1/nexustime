// common.js - Shared data and functions for NexusTime

export const mockData = {
  user: { name: "Heidi Aquino", email: "manager@nexustime.com", plan: "Pro" },
  workspaces: {
    'ws-acme': {
      name: 'Acme Corp',
      plan: 'Pro',
      departments: ['IT', 'Marketing', 'Sales'],
      employeeTypes: ['Full-time', 'Part-time'],
      payTypes: ['Hourly', 'Salary']
    }
  },
  employees: {
    'ws-acme': [
      { id: '101', name: 'Javier Pizaña', department: 'IT', status: 'Active' },
      { id: '102', name: 'Alice Johnson', department: 'Marketing', status: 'Active' },
    ]
  }
};

export const stateManager = {
  isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true',
  login: () => localStorage.setItem('isLoggedIn', 'true'),
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'app.html';
  }
};

export function getWeek(offset = 0) {
  const now = new Date();
  now.setDate(now.getDate() + (offset * 7));
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const week = [...Array(7)].map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  return { week, start: week[0] };
}

export function formatDate(date, includeYear = false) {
  const options = { month: 'short', day: 'numeric' };
  if (includeYear) options.year = 'numeric';
  return date.toLocaleDateString('en-US', options);
}
