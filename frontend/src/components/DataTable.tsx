import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

export function DataTable({ headers, children, className }: DataTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border bg-card shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h) => (
              <th
                key={h}
                className={cn(
                  "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                  h === "Actions" ? "text-right" : "text-left"
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function DataRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn("border-b border-border transition-colors duration-200 hover:bg-secondary/50", className)}>
      {children}
    </tr>
  );
}

export function DataCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-6 py-4 text-sm text-foreground", className)}>{children}</td>;
}
