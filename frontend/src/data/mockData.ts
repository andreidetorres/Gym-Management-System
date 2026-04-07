// Mock data for Gym Management System

// User types
export type UserRole = "admin" | "manager" | "client";
export type UserStatus = "active" | "expired";
export type AttendanceStatus = "present" | "late" | "absent" | "leave";

// User data
export const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@gmail.com", role: "admin" as UserRole, status: "active" as UserStatus, joinDate: "2023-01-15", phone: "+1-234-567-8901" },
  { id: 2, name: "Manager User", email: "manager@gmail.com", role: "manager" as UserRole, status: "active" as UserStatus, joinDate: "2023-02-20", phone: "+1-234-567-8902" },
  { id: 3, name: "Client User", email: "client@gmail.com", role: "client" as UserRole, status: "active" as UserStatus, joinDate: "2023-03-10", phone: "+1-234-567-8903" },
  { id: 4, name: "John Smith", email: "john.smith@gmail.com", role: "client" as UserRole, status: "expired" as UserStatus, joinDate: "2023-01-05", phone: "+1-234-567-8904" },
  { id: 5, name: "Maria Garcia", email: "maria.garcia@gmail.com", role: "client" as UserRole, status: "active" as UserStatus, joinDate: "2024-01-15", phone: "+1-234-567-8905" },
];

// Chart data for dashboards
export const weeklyAttendanceData = [
  { name: "Mon", value: 120, date: "2024-03-11" },
  { name: "Tue", value: 145, date: "2024-03-12" },
  { name: "Wed", value: 132, date: "2024-03-13" },
  { name: "Thu", value: 156, date: "2024-03-14" },
  { name: "Fri", value: 178, date: "2024-03-15" },
  { name: "Sat", value: 195, date: "2024-03-16" },
  { name: "Sun", value: 142, date: "2024-03-17" },
];

export const monthlyRevenueData = [
  { name: "Jan", value: 1812800, month: "2024-01" },
  { name: "Feb", value: 1982750, month: "2024-02" },
  { name: "Mar", value: 2152700, month: "2024-03" },
  { name: "Apr", value: 1926100, month: "2024-04" },
  { name: "May", value: 2379300, month: "2024-05" },
  { name: "Jun", value: 2549250, month: "2024-06" },
];

export const weeklyRevenueData = [
  { name: "Week 1", value: 702260, week: "2024-W11" },
  { name: "Week 2", value: 804430, week: "2024-W12" },
  { name: "Week 3", value: 668670, week: "2024-W13" },
  { name: "Week 4", value: 883740, week: "2024-W14" },
];

// Class schedule
export const classSchedule = [
  { id: 1, time: "6:00 AM", name: "Crossfit", trainer: "Admin", duration: "60 min", capacity: 20, enrolled: 15 },
  { id: 2, time: "8:00 AM", name: "Yoga", trainer: "Manager", duration: "45 min", capacity: 25, enrolled: 18 },
  { id: 3, time: "10:00 AM", name: "HIIT", trainer: "Manager", duration: "30 min", capacity: 15, enrolled: 12 },
  { id: 4, time: "2:00 PM", name: "Boxing", trainer: "Manager", duration: "60 min", capacity: 20, enrolled: 8 },
  { id: 5, time: "5:00 PM", name: "Strength Training", trainer: "Admin", duration: "45 min", capacity: 15, enrolled: 14 },
  { id: 6, time: "7:00 PM", name: "Zumba", trainer: "Manager", duration: "60 min", capacity: 30, enrolled: 22 },
];

// Attendance data
export const clientAttendance = [
  { id: 1, name: "Client User", date: "2024-03-15", time: "6:02 AM", status: "active" as UserStatus, checkInType: "QR Code" },
  { id: 2, name: "Manager User", date: "2024-03-15", time: "6:18 AM", status: "active" as UserStatus, checkInType: "Manual" },
  { id: 3, name: "John Smith", date: "2024-03-15", time: "—", status: "expired" as UserStatus, checkInType: "—" },
  { id: 4, name: "Maria Garcia", date: "2024-03-15", time: "—", status: "active" as UserStatus, checkInType: "—" },
  { id: 5, name: "Admin User", date: "2024-03-15", time: "5:55 AM", status: "active" as UserStatus, checkInType: "QR Code" },
  { id: 6, name: "Client User", date: "2024-03-15", time: "7:30 AM", status: "active" as UserStatus, checkInType: "QR Code" },
  { id: 7, name: "John Smith", date: "2024-03-15", time: "8:45 AM", status: "expired" as UserStatus, checkInType: "Manual" },
];

// Membership data
export const membershipPlans = [
  { id: 1, name: "Annual Membership", price: 33950.00, duration: "12 months", features: ["Unlimited access", "All classes", "Personal trainer (2 sessions)", "Free locker"] },
  { id: 2, name: "Monthly Subscription", price: 3395.00, duration: "1 month", features: ["Unlimited access", "All classes", "Group sessions"] },
  { id: 3, name: "Quarterly Plan", price: 9015.00, duration: "3 months", features: ["Unlimited access", "All classes", "Personal trainer (1 session)"] },
  { id: 4, name: "Day Pass", price: 850.00, duration: "1 day", features: ["Day access", "All classes"] },
];

// Client payments
export const clientPayments = [
  { id: 1, date: "2024-01-15", desc: "Annual Membership", amount: "₱33,950.00", type: "membership", status: "paid", method: "Credit Card" },
  { id: 2, date: "2024-02-01", desc: "Monthly Subscription", amount: "₱3,395.00", type: "monthly", status: "paid", method: "Auto-debit" },
  { id: 3, date: "2024-03-01", desc: "Monthly Subscription", amount: "₱3,395.00", type: "monthly", status: "paid", method: "Auto-debit" },
  { id: 4, date: "2024-04-01", desc: "Monthly Subscription", amount: "₱3,395.00", type: "monthly", status: "pending", method: "Auto-debit" },
  { id: 5, date: "2024-03-10", desc: "Personal Training Session", amount: "₱2,832.50", type: "session", status: "paid", method: "Cash" },
];

// QR Code members for attendance
export const qrMembers = [
  { id: "MEM-001", name: "Admin User", email: "admin@gmail.com", membershipType: "Annual", expiryDate: "2025-01-15" },
  { id: "MEM-002", name: "Manager User", email: "manager@gmail.com", membershipType: "Annual", expiryDate: "2025-02-20" },
  { id: "MEM-003", name: "Client User", email: "client@gmail.com", membershipType: "Monthly", expiryDate: "2024-04-10" },
  { id: "MEM-004", name: "John Smith", email: "john.smith@gmail.com", membershipType: "Expired", expiryDate: "2024-01-05" },
  { id: "MEM-005", name: "Maria Garcia", email: "maria.garcia@gmail.com", membershipType: "Annual", expiryDate: "2025-01-15" },
];

// Dashboard stats
export const adminStats = {
  totalUsers: 5,
  activeAnnual: 3,
  activeMonthly: 2,
  dailyAttendance: 156,
  monthlyRevenue: 2549250,
  totalRevenue: 13254600,
  newSignups: 47,
  churnRate: 2.3,
};

export const managerStats = {
  totalPresent: 4,
  lateToday: 1,
  absent: 1,
  totalMembers: 5,
  classesToday: 6,
  trainersAvailable: 4,
  occupancyRate: 78,
};

export const clientStats = {
  membershipStatus: "active",
  membershipType: "Annual",
  expiryDate: "2025-01-15",
  daysRemaining: 275,
  classesAttended: 24,
  lastVisit: "2024-03-14",
  totalSpent: 716.00,
};

// Reports data
export const reportFilters = ["Daily", "Weekly", "Monthly"] as const;

export const attendanceReportData = [
  { date: "2024-03-11", present: 120, late: 15, absent: 8, total: 143 },
  { date: "2024-03-12", present: 145, late: 12, absent: 6, total: 163 },
  { date: "2024-03-13", present: 132, late: 18, absent: 10, total: 160 },
  { date: "2024-03-14", present: 156, late: 10, absent: 4, total: 170 },
  { date: "2024-03-15", present: 178, late: 8, absent: 3, total: 189 },
];

export const membershipReportData = [
  { month: "Jan", newMembers: 45, cancelled: 8, renewed: 32, total: 1284 },
  { month: "Feb", newMembers: 52, cancelled: 12, renewed: 28, total: 1316 },
  { month: "Mar", newMembers: 47, cancelled: 10, renewed: 35, total: 1353 },
  { month: "Apr", newMembers: 38, cancelled: 6, renewed: 29, total: 1385 },
  { month: "May", newMembers: 61, cancelled: 14, renewed: 41, total: 1432 },
  { month: "Jun", newMembers: 55, cancelled: 9, renewed: 37, total: 1478 },
];

// Helper functions
export const getUserById = (id: number) => mockUsers.find(user => user.id === id);
export const getMemberByQRId = (qrId: string) => qrMembers.find(member => member.id === qrId);
export const getActiveUsers = () => mockUsers.filter(user => user.status === 'active');
export const getUsersByRole = (role: UserRole) => mockUsers.filter(user => user.role === role);
export const getAttendanceByDate = (date: string) => clientAttendance.filter(record => record.date === date);

// Mock API functions
export const mockApi = {
  // Authentication
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      return {
        success: true,
        user,
        token: "mock-jwt-token-" + Date.now()
      };
    }
    return { success: false, error: "Invalid credentials" };
  },

  // Users
  getUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  },

  createUser: async (userData: Partial<typeof mockUsers[0]>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      ...userData,
    } as typeof mockUsers[0];
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: number, userData: Partial<typeof mockUsers[0]>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return mockUsers[userIndex];
    }
    throw new Error("User not found");
  },

  deleteUser: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1);
      return true;
    }
    throw new Error("User not found");
  },

  // Attendance
  markAttendance: async (qrId: string, time: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const member = getMemberByQRId(qrId);
    if (member) {
      const attendanceRecord = {
        id: Date.now(),
        name: member.name,
        date: new Date().toISOString().split('T')[0],
        time,
        status: 'active' as UserStatus,
        checkInType: 'QR Code'
      };
      clientAttendance.unshift(attendanceRecord);
      return attendanceRecord;
    }
    throw new Error("Member not found");
  },

  // Reports
  getAttendanceReport: async (filter: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return attendanceReportData;
  },

  getRevenueReport: async (filter: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return monthlyRevenueData;
  },
};
