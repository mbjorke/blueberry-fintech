import { Home, CreditCard, Repeat, PiggyBank, Receipt, Users, Gift, BarChart2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard" },
  { label: "Cards", icon: CreditCard, to: "/cards" },
  { label: "Transfers", icon: Repeat, to: "/transfers" },
  { label: "Treasury", icon: PiggyBank, to: "/treasury" },
  { label: "Expenses", icon: Receipt, to: "/expenses" },
  { label: "Team", icon: Users, to: "/team" },
  { label: "Rewards", icon: Gift, to: "/rewards" },
  { label: "Analytics", icon: BarChart2, to: "/analytics" },
];

export function SidebarNav() {
  const location = useLocation();
  return (
    <aside className="h-screen w-56 flex-shrink-0 bg-background/90 backdrop-blur-lg border-r border-border flex flex-col py-6 px-2 text-foreground">
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors
                  ${location.pathname === to ? "bg-card/10 text-foreground" : "text-foreground/70 hover:bg-card/5 hover:text-foreground"}`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
