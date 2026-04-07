import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, DataRow, DataCell } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { mockUsers } from "@/data/mockData";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate?: string;
  phone?: string;
}

export default function UserManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "client",
    status: "active",
    password: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "client",
      status: "active",
      password: ""
    });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: ""
    });
    setShowModal(true);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        phone: "+1-234-567-8900"
      };
      setUsers([...users, newUser]);
    }
    
    setShowModal(false);
    resetForm();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <DashboardLayout>
      <PageHeader title="USER MANAGEMENT">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus size={16} /> Add User
        </motion.button>
      </PageHeader>

      <DataTable headers={["Name", "Email", "Role", "Status", "Actions"]}>
        {users.map((user) => (
          <DataRow key={user.id}>
            <DataCell className="font-semibold">{user.name}</DataCell>
            <DataCell className="text-muted-foreground">{user.email}</DataCell>
            <DataCell>{user.role}</DataCell>
            <DataCell>
              <StatusBadge variant={user.status as "active" | "inactive" | "expired"} />
            </DataCell>
            <DataCell className="text-right">
              <div className="flex gap-1 justify-end">
                <button 
                  onClick={() => handleEdit(user)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Pencil size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </DataCell>
          </DataRow>
        ))}
      </DataTable>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg uppercase tracking-wider text-foreground">
                  {editingUser ? "Edit User" : "Add User"}
                </h2>
                <button onClick={handleCloseModal} className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Membership Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
                    className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                    required={!editingUser}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 rounded-md border border-border bg-secondary py-3 font-display text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex-1 rounded-md bg-primary py-3 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {editingUser ? "Update User" : "Create User"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
