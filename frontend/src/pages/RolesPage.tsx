import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, DataRow, DataCell } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Pencil, Trash2, X, Shield, Users } from "lucide-react";

type RoleStatus = "active" | "inactive";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: RoleStatus;
  createdAt: string;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all permissions",
    permissions: ["Create", "Read", "Update", "Delete", "Manage Users", "Manage Roles", "Manage Pricing"],
    userCount: 1,
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Manager",
    description: "Can manage attendance, reports, and daily operations",
    permissions: ["Read", "Update", "Manage Attendance", "View Reports", "Manage Classes"],
    userCount: 1,
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: 3,
    name: "Client",
    description: "Can view own profile and attendance",
    permissions: ["Read Own Profile", "View Own Attendance"],
    userCount: 1,
    status: "active",
    createdAt: "2023-01-15",
  },
];

const allPermissions = [
  "Create",
  "Read", 
  "Update",
  "Delete",
  "Manage Users",
  "Manage Roles",
  "Manage Pricing",
  "Manage Attendance",
  "View Reports",
  "Manage Classes",
  "Read Own Profile",
  "View Own Attendance",
  "Check-in Clients",
  "Basic Operations",
];

export default function RolesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    status: "active" as RoleStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData }
          : role
      ));
    } else {
      // Create new role
      const newRole: Role = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        ...formData,
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setRoles([...roles, newRole]);
    }

    resetForm();
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      status: role.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      status: "active",
    });
    setEditingRole(null);
    setShowModal(false);
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <DashboardLayout>
      <PageHeader title="ROLES MANAGEMENT">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus size={16} /> Add Role
        </motion.button>
      </PageHeader>

      <DataTable headers={["Role Name", "Actions"]}>
        {roles.map((role) => (
          <DataRow key={role.id}>
            <DataCell className="font-semibold">{role.name}</DataCell>
            <DataCell className="text-right">
              <div className="flex gap-1 justify-end">
                <button 
                  onClick={() => handleEdit(role)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Pencil size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(role.id)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </DataCell>
          </DataRow>
        ))}
      </DataTable>

      {/* Add/Edit Role Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => resetForm()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-lg uppercase tracking-wider text-foreground">
                  {editingRole ? "Edit Role" : "Add New Role"}
                </h2>
                <button
                  onClick={resetForm}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-1">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Admin, Manager"
                      className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      required
                      readOnly={!!editingRole}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex-1 rounded-md bg-primary py-3 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {editingRole ? "Save" : "Create Role"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={resetForm}
                    className="flex-1 rounded-md border border-border bg-secondary py-3 font-display text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
