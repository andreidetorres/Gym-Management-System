import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { DataTable, DataRow, DataCell } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Users, UserCheck, Clock, UserX, LogOut as LogOutIcon } from "lucide-react";
import { clientAttendance, managerStats } from "@/data/mockData";

export default function ManagerDashboard() {
  return (
    <DashboardLayout>
      <PageHeader title="MANAGER DASHBOARD" />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Present" value={managerStats.totalPresent.toLocaleString()} icon={<UserCheck size={20} className="text-status-present" />} />
        <StatCard title="Late Today" value={managerStats.lateToday.toLocaleString()} icon={<Clock size={20} className="text-status-late" />} />
        <StatCard title="Absent" value={managerStats.absent.toLocaleString()} icon={<UserX size={20} className="text-status-absent" />} />
        <StatCard title="Total Members" value={managerStats.totalMembers.toLocaleString()} icon={<Users size={20} />} />
      </div>

      {/* Attendance Tables */}
      <div className="mt-6 space-y-6">
        <div>
          <h2 className="mb-4 font-display text-lg uppercase tracking-wider text-foreground">Client Attendance</h2>
          <DataTable headers={["Name", "Date", "Check-in", "Status"]}>
            {clientAttendance.map((r, i) => (
              <DataRow key={i}>
                <DataCell className="font-semibold">{r.name}</DataCell>
                <DataCell className="text-muted-foreground">{r.date}</DataCell>
                <DataCell className="text-muted-foreground">{r.time}</DataCell>
                <DataCell><StatusBadge variant={r.status as "active" | "expired"} /></DataCell>
              </DataRow>
            ))}
          </DataTable>
        </div>
      </div>
    </DashboardLayout>
  );
}
