import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useDevotionStreak } from "@/hooks/useDevotionStreak";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Flame, BookOpen, Bookmark, Trophy, LogOut, Settings, Calendar,
  ChevronRight, Sun
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { streak, totalDevotions, completedDates } = useDevotionStreak();
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const stats = [
    { icon: Flame, label: "Day Streak", value: streak, color: "text-orange-500" },
    { icon: BookOpen, label: "Devotions Read", value: totalDevotions, color: "text-sky-500" },
    { icon: Bookmark, label: "Saved", value: bookmarks.length, color: "text-primary" },
  ];

  // Calendar for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  return (
    <Layout>
      <section className="page-container py-8 md:py-16">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Sun className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              {user.email?.split("@")[0]}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* Streak Banner */}
          {streak > 0 && (
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-center shadow-lg shadow-amber-500/20">
              <div className="flex items-center justify-center gap-2 text-white">
                <Flame className="h-6 w-6" />
                <span className="text-2xl font-bold">{streak}</span>
              </div>
              <p className="text-white/90 text-sm mt-1">
                You're on a {streak} day devotion streak 🔥
              </p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border/50 rounded-2xl p-4 text-center"
              >
                <stat.icon className={cn("h-5 w-5 mx-auto mb-1", stat.color)} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Devotion Calendar */}
          <div className="bg-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="font-serif font-semibold text-foreground">
                {now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-[10px] text-muted-foreground font-medium py-1">{d}</div>
              ))}
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isCompleted = completedDates.includes(dateStr);
                const isToday = day === now.getDate();
                return (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                      isCompleted && "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm",
                      !isCompleted && isToday && "ring-2 ring-primary text-foreground",
                      !isCompleted && !isToday && "text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                Completed
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-muted" />
                Missed
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden divide-y divide-border/50">
            <Link
              to="/saved"
              className="flex items-center justify-between px-5 py-4 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Saved Devotions</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Dark Mode</span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </section>
    </Layout>
  );
}
