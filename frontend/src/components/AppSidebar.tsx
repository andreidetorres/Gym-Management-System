import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  QrCode,
  ScanLine,
  BarChart3,
  ClipboardList,
  Menu,
  X,
  Dumbbell,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

interface RoleNav {
  role: string;
  items: NavItem[];
}

const roleNavs: RoleNav[] = [
  {
    role: "Admin",
    items: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "User Management", to: "/admin/users", icon: Users },
      { label: "Roles", to: "/admin/roles", icon: Shield },
      { label: "Pricing", to: "/admin/pricing", icon: DollarSign },
    ],
  },
  {
    role: "Manager",
    items: [
      { label: "Dashboard", to: "/manager", icon: ClipboardList },
      { label: "Attendance", to: "/manager/attendance", icon: ScanLine },
      { label: "Reports", to: "/manager/reports", icon: BarChart3 },
    ],
  },
  {
    role: "Client",
    items: [
      { label: "Dashboard", to: "/client", icon: QrCode },
    ],
  },
];

function detectCurrentRole(pathname: string): string | null {
  if (pathname.startsWith("/admin")) return "Admin";
  if (pathname.startsWith("/manager")) return "Manager";
  if (pathname.startsWith("/client")) return "Client";
  return null;
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentRole = detectCurrentRole(location.pathname);

  // Show only nav items for the current role
  const currentNav = roleNavs.find((r) => r.role === currentRole);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed left-4 top-4 z-50 rounded-md border border-border bg-card p-2 text-foreground md:hidden"
      >
        {collapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar backdrop-blur-md transition-all duration-300 md:relative",
          collapsed ? "-translate-x-full md:w-16 md:translate-x-0" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Dumbbell size={18} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display text-sm uppercase tracking-wider text-foreground">
              REDNOSE
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hidden rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:block"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && currentRole && (
          <div className="mx-4 mt-4 rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
            {currentRole}
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {currentNav?.items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "mx-2 mb-0.5 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon size={20} strokeWidth={1.5} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-2">
          <NavLink
            to="/"
            className="mx-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut size={20} strokeWidth={1.5} />
            {!collapsed && <span>Logout</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
