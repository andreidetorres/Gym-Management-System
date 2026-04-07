import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function PricingManagement() {
  return (
    <DashboardLayout>
      <PageHeader title="PRICING MANAGEMENT" subtitle="Manage membership and subscription fees" />

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Annual Membership", desc: "1-year membership plan", value: "33,950.00" },
          { title: "Monthly Subscription", desc: "Monthly recurring plan", value: "3,395.00" },
        ].map((plan) => (
          <motion.div
            key={plan.title}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <DollarSign size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-foreground">{plan.title}</h3>
                <p className="text-xs text-muted-foreground">{plan.desc}</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Price (PHP)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">₱</span>
                <input
                  type="text"
                  defaultValue={plan.value}
                  className="w-full rounded-md border border-border bg-secondary py-4 pl-10 pr-4 font-display text-2xl text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="mt-4 w-full rounded-md bg-primary py-3 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Save Changes
            </motion.button>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
