import { Layout } from "@/components/layout/Layout";
import { VerseCard } from "@/components/VerseCard";
import { useTodayVerse } from "@/hooks/useVerses";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

// Fallback verse when no daily verse is available
const FALLBACK_VERSE = {
  date: new Date().toISOString().split("T")[0],
  verse_reference: "Psalm 119:105",
  verse_text: "Your word is a lamp for my feet, a light on my path.",
  devotional: "God's Word illuminates our journey through life. When we feel lost or uncertain, Scripture provides the guidance we need. Like a lamp in the darkness, it reveals the next step we should take, bringing clarity to our decisions and peace to our hearts. Today, let His Word light your way.",
  prayer: "Lord, thank You for Your Word that guides my steps. Help me to seek Your wisdom daily and trust in Your light to lead me through every situation. Amen.",
};

const Index = () => {
  const { data: verse, isLoading, error } = useTodayVerse();

  // Use fallback verse if no data or error
  const displayVerse = verse || (!isLoading ? FALLBACK_VERSE : null);

  return (
    <Layout>
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
        ) : displayVerse ? (
          <VerseCard
            date={displayVerse.date}
            verseReference={displayVerse.verse_reference}
            verseText={displayVerse.verse_text}
            devotional={displayVerse.devotional}
            prayer={displayVerse.prayer}
            isFallback={!verse}
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
