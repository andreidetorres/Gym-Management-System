import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <p className="font-display text-3xl tracking-tight text-foreground">{value}</p>
        {change && (
          <span className="mb-1 text-xs font-medium text-status-present">{change}</span>
        )}
      </div>
    </motion.div>
  );
}
