import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import RolesPage from "./pages/RolesPage";
import PricingManagement from "./pages/PricingManagement";
import ClientDashboard from "./pages/ClientDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AttendancePage from "./pages/AttendancePage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Single login route */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/roles" element={<RolesPage />} />
          <Route path="/admin/pricing" element={<PricingManagement />} />

          {/* Manager routes */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/attendance" element={<AttendancePage />} />
          <Route path="/manager/reports" element={<ReportsPage />} />

          {/* Client routes */}
          <Route path="/client" element={<ClientDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
