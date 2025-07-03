// common.js - Shared data and functions for the NexusTime App

// --- MOCK DATABASE ---
// This object simulates our entire database. In a real application,
// this data would be fetched from a server (like Firebase).
const mockData = {
    user: { name: "Heidi Aquino", email: "manager@nexustime.com", plan: "Pro" },
    workspaces: { 
        'ws-acme': { name: 'Acme Corp', plan: 'Pro' },
        'ws-stark': { name: 'Stark Industries', plan: 'Pro' },
        'ws-wayne': { name: 'Wayne Enterprises', plan: 'Enterprise' }
    },
    employees: { 
        'ws-acme': [
            { id: '101785', name: 'Javier Pizaña', status: 'Active', hireDate: '2025-06-30', cardNumber: '', department: 'IT Department', supervisor: 'Heidi Aquino', payType: 'Hourly', employeeType: 'Full-time' },
            { id: '101786', name: 'Alice Johnson', status: 'Active', hireDate: '2024-05-15', cardNumber: 'C456', department: 'Marketing', supervisor: 'Heidi Aquino', payType: 'Hourly', employeeType: 'Full-time' },
            { id: '101787', name: 'Bob Williams', status: 'Active', hireDate: '2023-03-01', cardNumber: 'C789', department: 'Sales', supervisor: 'Heidi Aquino', payType: 'Salary', employeeType: 'Full-time' },
        ],
        'ws-stark': [
             { id: 'S001', name: 'Tony Stark', status: 'Active', hireDate: '2008-05-02', cardNumber: 'S1', department: 'R&D', supervisor: 'Heidi Aquino', payType: 'Salary', employeeType: 'Full-time' }
        ],
        'ws-wayne': [
            { id: 'W001', name: 'Bruce Wayne', status: 'Active', hireDate: '1939-05-27', cardNumber: 'W1', department: 'Executive', supervisor: 'Heidi Aquino', payType: 'Salary', employeeType: 'Full-time' }
        ]
    },
    projects: { 
        'ws-acme': ['Project Phoenix', 'Marketing Campaign'],
        'ws-stark': ['Arc Reactor', 'Iron Man Suit'],
        'ws-wayne': ['Gotham Redevelopment']
    },
    timesheets: {
        'ws-acme': {
            'Javier Pizaña': {
                '2025-06-09': { locked: true, punches: [{time: '10:00', type: 'in'}, {time: '12:00', type: 'out'}] },
                '2025-06-10': { locked: true, punches: [{time: '10:00', type: 'in'}, {time: '12:00', type: 'out'}, {time: '13:00', type: 'in'}, {time: '17:00', type: 'out'}] },
            },
            'Alice Johnson': {
                '2025-06-16': { punches: [{time: '09:00', type: 'in'}, {time: '17:00', type: 'out'}] },
            },
            'Bob Williams': {
                '2025-06-16': { punches: [{time: '08:30', type: 'in'}, {time: '12:00', type: 'lunch-start'}, {time: '12:30', type: 'lunch-end'}, {time: '16:30', type: 'out'}] }
            }
        }
    },
    verification: {
        'ws-acme': {
            '101785': { '2025-06-09': { employeeVerified: true, employeeVerificationTimestamp: '6/15/2025, 2:00:00 PM', supervisorVerified: true, supervisorVerificationTimestamp: '6/15/2025, 3:00:00 PM' } },
            '101786': { '2025-06-16': { employeeVerified: false, supervisorVerified: false } }
        }
    }
};

// --- STATE MANAGEMENT using localStorage ---
// These functions help us remember the user's state across different pages.
const stateManager = {
    isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true',
    setCurrentWorkspace: (id) => localStorage.setItem('currentWorkspaceId', id),
    getCurrentWorkspace: () => localStorage.getItem('currentWorkspaceId'),
    setActiveEmployee: (id) => localStorage.setItem('activeEmployeeFilter', id),
    getActiveEmployee: () => localStorage.getItem('activeEmployeeFilter'),
    login: (workspaceId) => {
        localStorage.setItem('isLoggedIn', 'true');
        stateManager.setCurrentWorkspace(workspaceId);
        const defaultEmployee = mockData.employees[workspaceId]?.[0]?.id;
        if(defaultEmployee) stateManager.setActiveEmployee(defaultEmployee);
    },
    logout: () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentWorkspaceId');
        localStorage.removeItem('activeEmployeeFilter');
        window.location.href = 'index.html';
    },
    checkAuth: () => {
        if (!stateManager.isLoggedIn()) {
            window.location.href = 'app.html'; // Redirect to login
        }
        if (!stateManager.getCurrentWorkspace()) {
             window.location.href = 'workspaces.html'; // Redirect to workspace selection
        }
    }
};


// --- UTILITY FUNCTIONS ---
function getWeek(offset = 0) {
    const now = new Date('2025-06-16T12:00:00Z'); // Static date for consistent view
    now.setDate(now.getDate() + (offset * 7));
    const dayOfWeek = now.getDay();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const week = [];
    for (let i = 0; i < 7; i++) { const day = new Date(startDate); day.setDate(startDate.getDate() + i); week.push(day); }
    return { week, start: week[0] };
}

function formatDate(date, includeYear = false) {
    if(!date) return '';
    const options = { month: 'short', day: 'numeric' };
    if (includeYear) options.year = 'numeric';
    return date.toLocaleDateString('en-US', options);
}

function punchTypeToLabel(type) {
    const labels = { 'in': 'Clock In', 'out': 'Clock Out', 'lunch-start': 'Start Lunch', 'lunch-end': 'End Lunch' };
    return labels[type] || 'N/A';
}

function processDayPunches(employeeName, day) {
    const currentWorkspaceId = stateManager.getCurrentWorkspace();
    const dateString = day ? day.toISOString().split('T')[0] : null;
    const entry = employeeName && dateString ? mockData.timesheets[currentWorkspaceId]?.[employeeName]?.[dateString] : null;
    const punches = entry ? entry.punches : [];

    if (punches.length === 0) return { pairs: [], totalHours: 0 };
    const sortedPunches = [...punches].sort((a,b) => a.time.localeCompare(b.time));
    const pairs = [];
    let currentPair = {};
    for (const punch of sortedPunches) {
        if ((punch.type === 'in' || punch.type === 'lunch-end') && !currentPair.in) { currentPair.in = punch.time; } 
        else if ((punch.type === 'out' || punch.type === 'lunch-start') && currentPair.in) { currentPair.out = punch.time; pairs.push(currentPair); currentPair = {}; }
    }
    const totalHours = calculateTotalHoursFromPairs(pairs);
    return { pairs, totalHours };
}

function calculateTotalHoursFromPairs(pairs) {
    let totalMinutes = 0;
    pairs.forEach(pair => {
        if (pair.in && pair.out) {
            const [inH, inM] = pair.in.split(':').map(Number);
            const [outH, outM] = pair.out.split(':').map(Number);
            totalMinutes += (outH * 60 + outM) - (inH * 60 + inM);
        }
    });
    return totalMinutes / 60;
}
