import { Layout } from "@/components/layout/Layout";
import { VerseCard } from "@/components/VerseCard";
import { useOfflineVerse } from "@/hooks/useOfflineVerse";
import { Sun, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { verse, isLoading, isOnline, isOfflineMode } = useOfflineVerse();

  return (
    <Layout>
      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm text-amber-700 dark:text-amber-400">
            <WifiOff className="h-4 w-4" />
            <span>You're offline — viewing saved devotional</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sun className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4">
            Daily Light
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Begin each day with God's Word. Find peace, wisdom, and guidance through Scripture.
          </p>
        </div>
      </section>

      {/* Today's Verse Section */}
      <section className="page-container -mt-8">
        {isLoading ? (
          <div className="verse-card animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-8" />
            <div className="h-6 bg-muted rounded w-1/3 mx-auto mb-4" />
            <div className="h-24 bg-muted rounded mb-8" />
            <div className="h-32 bg-muted rounded mb-4" />
            <div className="h-24 bg-muted/50 rounded" />
          </div>
        ) : verse ? (
          <VerseCard
            date={verse.date}
            verseReference={verse.verse_reference}
            verseText={verse.verse_text}
            devotional={verse.devotional}
            prayer={verse.prayer}
            isOffline={isOfflineMode}
          />
        ) : null}
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Need Prayer?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Share your prayer requests with our community. We believe in the power of prayer and would be honored to lift you up.
            </p>
            <Link
              to="/prayer-request"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
