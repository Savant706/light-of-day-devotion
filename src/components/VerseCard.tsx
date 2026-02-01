import { format } from "date-fns";
import { ShareButtons } from "./ShareButtons";
import { VerseImageGenerator } from "./VerseImageGenerator";
import { BookOpen, Heart } from "lucide-react";

interface VerseCardProps {
  date: string;
  verseReference: string;
  verseText: string;
  devotional: string;
  prayer: string;
  showShare?: boolean;
  compact?: boolean;
}

export function VerseCard({
  date,
  verseReference,
  verseText,
  devotional,
  prayer,
  showShare = true,
  compact = false,
}: VerseCardProps) {
  const formattedDate = format(new Date(date), "EEEE, MMMM d, yyyy");

  if (compact) {
    return (
      <article className="verse-card group hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <time className="text-sm text-muted-foreground" dateTime={date}>
            {formattedDate}
          </time>
          <span className="text-sm font-medium text-accent">{verseReference}</span>
        </div>
        <blockquote className="text-lg font-serif italic text-foreground/90 leading-relaxed mb-4">
          "{verseText}"
        </blockquote>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {devotional}
        </p>
      </article>
    );
  }

  return (
    <article className="verse-card">
      {/* Date */}
      <div className="text-center mb-8">
        <time className="text-sm uppercase tracking-widest text-muted-foreground" dateTime={date}>
          {formattedDate}
        </time>
      </div>

      {/* Scripture */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-medium text-accent">{verseReference}</h2>
        </div>
        <blockquote className="scripture-text text-center">
          "{verseText}"
        </blockquote>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-border" />
        <span className="text-accent text-xl">✦</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Devotional */}
      <div className="mb-8">
        <h3 className="font-serif text-xl text-foreground mb-4">Today's Reflection</h3>
        <p className="devotional-text">{devotional}</p>
      </div>

      {/* Prayer */}
      <div className="bg-secondary/50 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-4 w-4 text-primary" />
          <h3 className="font-serif text-lg text-foreground">Prayer</h3>
        </div>
        <p className="prayer-text">{prayer}</p>
      </div>

      {/* Share Buttons */}
      {showShare && (
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ShareButtons verseReference={verseReference} verseText={verseText} />
          <VerseImageGenerator verseText={verseText} verseReference={verseReference} />
        </div>
      )}
    </article>
  );
}
