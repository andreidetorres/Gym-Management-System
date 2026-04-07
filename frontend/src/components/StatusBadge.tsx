import { cn } from "@/lib/utils";

type StatusVariant = "present" | "late" | "absent" | "leave" | "active" | "expired" | "inactive";

const variantStyles: Record<StatusVariant, string> = {
  present: "text-status-present bg-status-present/10",
  late: "text-status-late bg-status-late/10",
  absent: "text-status-absent bg-status-absent/10",
  leave: "text-status-leave bg-status-leave/10",
  active: "text-primary bg-primary/10",
  expired: "text-muted-foreground bg-muted",
  inactive: "text-muted-foreground bg-muted",
};

interface StatusBadgeProps {
  variant: StatusVariant;
  label?: string;
  className?: string;
}

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {label || variant}
    </span>
  );
}
