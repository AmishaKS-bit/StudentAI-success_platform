import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User, BookOpen, Target, Briefcase, MessageSquare, BarChart3,
  Menu, X, GraduationCap, LogOut, Building2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const navItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/study-planner", label: "Study Planner", icon: BookOpen },
  { path: "/skill-gap", label: "Skill Analyzer", icon: Target },
  { path: "/career", label: "Career Path", icon: Briefcase },
  { path: "/interview", label: "Mock Interview", icon: MessageSquare },
  { path: "/internships", label: "Jobs & Internships", icon: Building2 },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden rounded-lg bg-card p-2 shadow-elevated"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-card shadow-elevated border-r border-border
          transform transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
          <div className="gradient-primary rounded-xl p-2">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-foreground">StudentAI</h1>
            <p className="text-xs text-muted-foreground">Success Platform</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          {user && (
            <p className="text-xs text-muted-foreground mb-2 truncate px-2">{user.email}</p>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
