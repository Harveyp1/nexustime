// common.js — holds mock data for simulation

// Extended mock workspace list with detailed data
const mockWorkspaces = [
  {
    name: "Acme Inc",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "America/Chicago",
    createdAt: "2023-11-01",
    users: 5,
    industry: "Retail"
  },
  {
    name: "Admin Workspace",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "America/New_York",
    createdAt: "2024-01-15",
    users: 12,
    industry: "IT Services"
  },
  {
    name: "Marketing Hub",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "America/Los_Angeles",
    createdAt: "2024-03-10",
    users: 8,
    industry: "Marketing"
  },
  {
    name: "Tech Ops",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "Europe/London",
    createdAt: "2023-08-20",
    users: 20,
    industry: "Engineering"
  },
  {
    name: "Remote Team",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "Asia/Tokyo",
    createdAt: "2024-05-05",
    users: 6,
    industry: "Support"
  },
  {
    name: "Growth Lab",
    logoUrl: "https://via.placeholder.com/40",
    timezone: "America/Denver",
    createdAt: "2024-06-01",
    users: 4,
    industry: "Startup"
  }
];

// Mock users mapped to workspaces
const mockUsers = {
  "admin@example.com": {
    plan: "Pro",
    workspaces: [mockWorkspaces[1], mockWorkspaces[2], mockWorkspaces[3]]
  },
  "marketing@example.com": {
    plan: "Pro",
    workspaces: [mockWorkspaces[2], mockWorkspaces[4]]
  },
  "user@example.com": {
    plan: "Free",
    workspaces: [mockWorkspaces[0]]
  }
};
