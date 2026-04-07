import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Role = "admin" | "manager" | "client";

const roleConfig: Record<Role, { label: string; redirect: string }> = {
  admin: { label: "Admin", redirect: "/admin" },
  manager: { label: "Manager", redirect: "/manager" },
  client: { label: "Client", redirect: "/client" },
};

// Mock authentication function - in real app, this would call your backend API
const authenticateUser = async (email: string, password: string): Promise<Role | null> => {
  // Check for valid password
  if (password !== "password123") {
    return null;
  }
  
  // Mock logic to determine role based on email
  // In production, this should be handled by your backend
  if (email === "admin@gmail.com") {
    return "admin";
  } else if (email === "manager@gmail.com") {
    return "manager";
  } else if (email === "client@gmail.com") {
    return "client";
  }
  
  return null;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const userRole = await authenticateUser(email, password);
      
      if (userRole) {
        // Store user info in localStorage (in production, use secure auth tokens)
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userEmail", email);
        
        // Redirect based on detected role
        navigate(roleConfig[userRole].redirect);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none font-display text-[20vw] uppercase tracking-tighter text-foreground/[0.03]">
          REDNOSE
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="card-glow rounded-xl border border-border bg-card p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
              <Dumbbell size={28} className="text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl uppercase tracking-wider text-foreground">
              REDNOSE FITNESS
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Gym Management System
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@rednose.com"
                className="w-full rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-border bg-secondary px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full rounded-md bg-primary py-4 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
