import { Layout } from "@/components/layout/Layout";
import { DevotionCard } from "@/components/DevotionCard";
import { getTodaysDevotion } from "@/data/devotions";
import { Sun, BookOpen, ArrowRight, Sparkles, Flame, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDevotionStreak } from "@/hooks/useDevotionStreak";
import { useOfflineVerse } from "@/hooks/useOfflineVerse";
import { VerseCard } from "@/components/VerseCard";

const todaysDevotion = getTodaysDevotion();

const features = [
  {
    icon: <Sun className="h-6 w-6 text-primary" />,
    title: "Daily Devotions",
    description: "Fresh spiritual nourishment every day of the week, tailored to guide your walk with God.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-sky" />,
    title: "Scripture-Centered",
    description: "Every devotion is rooted in God's Word, helping you meditate on Scripture that transforms.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-destructive" />,
    title: "Prayer Prompts",
    description: "Each devotion includes a guided prayer to help you connect with God in a meaningful way.",
  },
];

export default function Index() {
  const { verse: offlineVerse, isOfflineMode } = useOfflineVerse();

  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const { streak, logDevotion, hasLoggedToday } = useDevotionStreak();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-log when user reads today's devotion
  useEffect(() => {
    if (user && !hasLoggedToday) {
      logDevotion.mutate();
    }
  }, [user, hasLoggedToday]);

  return (
    <Layout>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/50 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-destructive/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sun className="h-4 w-4" />
            {todaysDevotion.day}'s Devotion is Ready
          </div>

          {/* Streak Display */}
          {user && streak > 0 && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-bold mb-6 shadow-lg shadow-primary/25 transition-all duration-700 delay-50 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Flame className="h-4 w-4" />
              {streak} Day Streak 🔥
            </div>
          )}

          {/* Headline */}
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Light of{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-destructive bg-clip-text text-transparent">
              Day
            </span>{" "}
            Devotion
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Begin each day with God's Word. Find peace, wisdom, and guidance through
            Scripture — one devotion at a time.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#todays-devotion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Read Today's Devotion
              <ArrowRight className="h-4 w-4" />
            </a>
            {!user && (
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-card/70 backdrop-blur-sm border border-border/60 text-foreground font-semibold rounded-full hover:bg-card/90 transition-all duration-200 hover:-translate-y-0.5"
              >
                Sign In to Track Progress
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Today's Verse (offline-capable) ── */}
      {offlineVerse && (
        <section className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {isOfflineMode && <WifiOff className="h-3.5 w-3.5" />}
                Today's Verse
              </div>
            </div>
            <VerseCard
              reference={offlineVerse.verse_reference}
              text={offlineVerse.verse_text}
            />
          </div>
        </section>
      )}

      {/* ── Today's Devotion ── */}
      <section id="todays-devotion" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Today's Devotion
            </h2>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <DevotionCard devotion={todaysDevotion} />
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Why Light of Day?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A simple, beautiful space to encounter God's Word every morning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-14 text-center shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Start Every Morning Right
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg">
                Explore all seven daily devotions and find the one that speaks to your heart today.
              </p>
              <Link
                to="/devotions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary font-bold rounded-full hover:bg-primary-foreground/90 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                Explore All Devotions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
