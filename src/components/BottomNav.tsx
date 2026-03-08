import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Heart, Brain, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/devotions", icon: BookOpen, label: "Devotions" },
  { to: "/prayer", icon: Heart, label: "Prayer" },
  { to: "/quiz", icon: Brain, label: "Quiz" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border/50 pb-safe md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full h-full transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
