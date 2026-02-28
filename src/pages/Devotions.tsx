import { Layout } from "@/components/layout/Layout";
import { DevotionCard } from "@/components/DevotionCard";
import { DEVOTIONS, getTodaysDevotion } from "@/data/devotions";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const todaysDevotion = getTodaysDevotion();

export default function Devotions() {
  const [selectedId, setSelectedId] = useState<number>(todaysDevotion.id);
  const selectedDevotion = DEVOTIONS.find((d) => d.id === selectedId) ?? DEVOTIONS[0];

  return (
    <Layout>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 dark:from-sky-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 py-16 md:py-20">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-300/20 dark:bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-sky-200/60 dark:border-sky-700/40 text-sky-700 dark:text-sky-300 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            Weekly Devotions
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Devotions
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Seven devotions for seven days. Select any day to read its full devotion, reflection, and prayer.
          </p>
        </div>
      </section>

      {/* Day Selector */}
      <section className="py-8 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {DEVOTIONS.map((devotion) => (
              <button
                key={devotion.id}
                onClick={() => setSelectedId(devotion.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                  selectedId === devotion.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-500/20"
                    : "bg-white/60 dark:bg-white/5 border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {devotion.day}
                {devotion.id === todaysDevotion.id && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-current opacity-70 align-middle" />
                )}
              </button>
            ))}
          </div>
          {selectedId === todaysDevotion.id && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
              ✦ Today's devotion
            </p>
          )}
        </div>
      </section>

      {/* Selected Devotion */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <DevotionCard devotion={selectedDevotion} />
        </div>
      </section>

      {/* All Devotions Grid (compact) */}
      <section className="py-12 md:py-16 bg-secondary/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
            Quick Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEVOTIONS.map((devotion) => (
              <button
                key={devotion.id}
                onClick={() => {
                  setSelectedId(devotion.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cn(
                  "text-left p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                  devotion.id === selectedId
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-700/50"
                    : "bg-white/60 dark:bg-white/5 border-border/60 hover:bg-white/80 dark:hover:bg-white/10"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    {devotion.day}
                  </span>
                  {devotion.id === todaysDevotion.id && (
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                      Today
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-1">
                  {devotion.title}
                </h3>
                <p className="text-xs text-muted-foreground">{devotion.verse_reference}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
