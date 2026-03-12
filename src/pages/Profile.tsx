import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useDevotionStreak } from "@/hooks/useDevotionStreak";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import {
  Flame, BookOpen, Bookmark, LogOut, Settings, Calendar,
  ChevronRight, Sun, Loader2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileData {
  display_name: string | null;
  avatar_url: string | null;
}

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { streak, totalDevotions, completedDates } = useDevotionStreak();
  const { bookmarks } = useBookmarks();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) {
      setProfileLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError(null);
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setProfileError("Failed to load profile. Please try again.");
      } else {
        setProfile(data);
      }
      setProfileLoading(false);
    };

    fetchProfile();
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
          <Sun className="h-12 w-12 text-muted-foreground" />
          <h1 className="font-serif text-2xl font-bold text-foreground">Please log in</h1>
          <p className="text-muted-foreground text-sm">Sign in to view your profile and track your progress.</p>
          <Link
            to="/auth"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </Layout>
    );
  }

  if (profileLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (profileError) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h1 className="font-serif text-xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground text-sm">{profileError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  const displayName = profile?.display_name || user.email?.split("@")[0] || "User";
  const avatarUrl = profile?.avatar_url;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  const stats = [
    { icon: Flame, label: "Day Streak", value: streak, color: "text-orange-500" },
    { icon: BookOpen, label: "Devotions Read", value: totalDevotions, color: "text-sky-500" },
    { icon: Bookmark, label: "Saved", value: bookmarks.length, color: "text-primary" },
  ];

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
            <Avatar className="w-20 h-20 mx-auto mb-4 shadow-lg">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-2xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              {displayName}
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
