import { Devotion } from "@/data/devotions";
import { BookOpen, Heart } from "lucide-react";

interface DevotionCardProps {
  devotion: Devotion;
  compact?: boolean;
}

export function DevotionCard({ devotion, compact = false }: DevotionCardProps) {
  return (
    <article className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      <div className="p-8 md:p-10">
        {/* Day badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
            <BookOpen className="h-3 w-3" />
            {devotion.day}'s Devotion
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 leading-tight">
          {devotion.title}
        </h2>

        {/* Verse block */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl p-6 mb-6 border border-amber-100 dark:border-amber-800/30">
          <div className="absolute top-4 left-4 text-amber-300 dark:text-amber-600 text-5xl font-serif leading-none select-none">"</div>
          <blockquote className="relative z-10 pt-4">
            <p className="font-serif text-lg md:text-xl italic leading-relaxed text-foreground/90 mb-3">
              {devotion.verse_text}
            </p>
            <footer className="text-sm font-semibold text-amber-600 dark:text-amber-400 not-italic">
              — {devotion.verse_reference}
            </footer>
          </blockquote>
        </div>

        {!compact && (
          <>
            {/* Message */}
            <div className="mb-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-400 rounded-full" />
                Reflection
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {devotion.message}
              </p>
            </div>

            {/* Prayer */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-sky-100 dark:border-sky-800/30">
              <h3 className="font-serif text-base font-medium text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
                Prayer
              </h3>
              <p className="text-sm italic leading-relaxed text-foreground/80">
                {devotion.prayer}
              </p>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
