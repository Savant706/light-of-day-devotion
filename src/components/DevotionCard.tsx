import { Devotion } from "@/data/devotions";
import { BookOpen, Heart, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DevotionCardProps {
  devotion: Devotion;
  compact?: boolean;
}

export function DevotionCard({ devotion, compact = false }: DevotionCardProps) {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(devotion.id);

  const handleBookmark = () => {
    if (!user) {
      toast.error("Sign in to bookmark devotions");
      return;
    }
    toggleBookmark.mutate(devotion.id, {
      onSuccess: () =>
        toast.success(bookmarked ? "Removed from saved" : "Saved to bookmarks"),
    });
  };

  return (
    <article className="group relative bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary to-destructive/60" />

      <div className="p-8 md:p-10">
        {/* Day badge + Bookmark */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="h-3 w-3" />
            {devotion.day}'s Devotion
          </span>
          <button
            onClick={handleBookmark}
            className="p-2 rounded-full hover:bg-secondary/30 transition-colors"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark
              className={cn(
                "h-5 w-5 transition-colors",
                bookmarked ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 leading-tight">
          {devotion.title}
        </h2>

        {/* Verse block */}
        <div className="relative bg-gradient-to-br from-accent to-accent/50 dark:from-accent dark:to-accent/30 rounded-2xl p-6 mb-6 border border-primary/10">
          <div className="absolute top-4 left-4 text-primary/30 text-5xl font-serif leading-none select-none">"</div>
          <blockquote className="relative z-10 pt-4">
            <p className="font-serif text-lg md:text-xl italic leading-relaxed text-foreground/90 mb-3">
              {devotion.verse_text}
            </p>
            <footer className="text-sm font-semibold text-primary not-italic">
              — {devotion.verse_reference}
            </footer>
          </blockquote>
        </div>

        {!compact && (
          <>
            {/* Message */}
            <div className="mb-6">
              <h3 className="font-serif text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-primary rounded-full" />
                Reflection
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {devotion.message}
              </p>
            </div>

            {/* Prayer */}
            <div className="bg-sky-light/50 dark:bg-sky/10 rounded-2xl p-6 border border-sky/20">
              <h3 className="font-serif text-base font-medium text-foreground mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-destructive fill-destructive" />
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
