import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, Users, CalendarCheck, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";
import { cn } from "@/lib/utils";
import { weeklyAttendanceData, weeklyRevenueData, monthlyRevenueData, attendanceReportData, membershipReportData, reportFilters } from "@/data/mockData";

export default function ReportsPage() {
  const [active, setActive] = useState<(typeof reportFilters)[number]>("Weekly");

  // Select data based on active filter
  const getAttendanceData = () => {
    switch (active) {
      case "Daily":
        return weeklyAttendanceData.slice(0, 3); // Show 3 days
      case "Weekly":
        return weeklyAttendanceData; // Show full week
      case "Monthly":
        return attendanceReportData.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: item.present
        }));
      default:
        return weeklyAttendanceData;
    }
  };

  const getRevenueData = () => {
    switch (active) {
      case "Daily":
        return weeklyRevenueData.slice(0, 3); // Show 3 weeks
      case "Weekly":
        return weeklyRevenueData; // Show full month weeks
      case "Monthly":
        return monthlyRevenueData; // Show months
      default:
        return weeklyRevenueData;
    }
  };

  const getStatData = () => {
    switch (active) {
      case "Daily":
        return {
          avgAttendance: "52",
          newMembers: "2",
          revenue: "₱85K",
          growthRate: "5%"
        };
      case "Weekly":
        return {
          avgAttendance: "156",
          newMembers: "12",
          revenue: "₱3.1M",
          growthRate: "14%"
        };
      case "Monthly":
        return {
          avgAttendance: "468",
          newMembers: "47",
          revenue: "₱12.5M",
          growthRate: "18%"
        };
      default:
        return {
          avgAttendance: "156",
          newMembers: "12",
          revenue: "₱3.1M",
          growthRate: "14%"
        };
    }
  };

  const statData = getStatData();
  const attendanceData = getAttendanceData();
  const revenueData = getRevenueData();

  return (
    <DashboardLayout>
      <PageHeader title="REPORTS">
        <div className="flex overflow-hidden rounded-md border border-border bg-secondary">
          {reportFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Avg Attendance" value={statData.avgAttendance} change="+14.2%" icon={<CalendarCheck size={20} />} />
        <StatCard title="New Members" value={statData.newMembers} change="+8%" icon={<Users size={20} />} />
        <StatCard title="Revenue" value={statData.revenue} change="+12%" icon={<DollarSign size={20} />} />
        <StatCard title="Growth Rate" value={statData.growthRate} icon={<TrendingUp size={20} />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">
            Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fafafa" }} />
              <Area type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} fill="url(#rg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">
            Revenue Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#fafafa" }} />
              <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
