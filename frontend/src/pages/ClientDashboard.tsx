import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable, DataRow, DataCell } from "@/components/DataTable";
import { QrCode, CreditCard, CalendarDays, Download } from "lucide-react";
import { clientPayments, clientStats } from "@/data/mockData";

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <PageHeader title="CLIENT DASHBOARD" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Membership Card */}
        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <CreditCard size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider text-foreground">Membership</h3>
              <p className="text-xs text-muted-foreground">Annual Plan</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge variant="active" label="ACTIVE" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Expires</span>
              <span className="text-sm font-semibold text-foreground">Jan 15, 2025</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
            <p className="text-xs text-muted-foreground">275 days remaining</p>
          </div>
        </div>

        {/* Monthly Sub Card */}
        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-status-leave/10">
              <CalendarDays size={20} className="text-status-leave" />
            </div>
            <div>
              <h3 className="font-display text-sm uppercase tracking-wider text-foreground">Monthly Sub</h3>
              <p className="text-xs text-muted-foreground">Recurring Plan</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge variant="active" label="ACTIVE" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Renewal</span>
              <span className="text-sm font-semibold text-foreground">Apr 01, 2024</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/2 rounded-full bg-status-leave" />
            </div>
            <p className="text-xs text-muted-foreground">15 days remaining</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="card-glow flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <QrCode size={20} className="text-primary" />
          </div>
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-foreground">Your QR Code</h3>
          <div className="flex h-40 w-40 items-center justify-center rounded-lg bg-foreground p-2">
            <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,8,12,16,18].includes(i)
                      ? "bg-background"
                      : "bg-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Show this to check in</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-6">
        <h2 className="mb-4 font-display text-lg uppercase tracking-wider text-foreground">Payment History</h2>
        <DataTable headers={["Date", "Description", "Amount", "Receipt"]}>
          {clientPayments.map((p, i) => (
            <DataRow key={i}>
              <DataCell className="text-muted-foreground">{p.date}</DataCell>
              <DataCell>{p.desc}</DataCell>
              <DataCell className="font-semibold">{p.amount}</DataCell>
              <DataCell>
                <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Download size={14} />
                </button>
              </DataCell>
            </DataRow>
          ))}
        </DataTable>
      </div>
    </DashboardLayout>
  );
}
