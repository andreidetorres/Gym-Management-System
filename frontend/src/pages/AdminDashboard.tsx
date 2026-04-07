import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Users, CreditCard, CalendarCheck, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { weeklyAttendanceData, monthlyRevenueData, adminStats } from "@/data/mockData";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <PageHeader title="ADMIN DASHBOARD" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={adminStats.totalUsers.toLocaleString()} change="+12%" icon={<Users size={20} />} />
        <StatCard title="Active Annual" value={adminStats.activeAnnual.toLocaleString()} change="+5%" icon={<CreditCard size={20} />} />
        <StatCard title="Active Monthly" value={adminStats.activeMonthly.toLocaleString()} change="+8%" icon={<Activity size={20} />} />
        <StatCard title="Daily Attendance" value={adminStats.dailyAttendance.toLocaleString()} icon={<CalendarCheck size={20} />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">
            Weekly Attendance
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyAttendanceData}>
              <defs>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fafafa" }}
              />
              <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} fill="url(#redGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenueData}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fafafa" }}
              />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#blueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
