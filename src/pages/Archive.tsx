import { Layout } from "@/components/layout/Layout";
import { VerseCard } from "@/components/VerseCard";
import { useVerseArchive } from "@/hooks/useVerses";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Archive = () => {
  const { data: verses, isLoading, error } = useVerseArchive();

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
            Verse Archive
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse through our collection of daily devotionals
          </p>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="page-container">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="verse-card animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                <div className="h-16 bg-muted rounded mb-4" />
                <div className="h-12 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="verse-card text-center">
            <p className="text-destructive">Unable to load archive. Please try again later.</p>
          </div>
        ) : verses && verses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verses.map((verse) => (
              <Link key={verse.id} to={`/?date=${verse.date}`}>
                <VerseCard
                  date={verse.date}
                  verseReference={verse.verse_reference}
                  verseText={verse.verse_text}
                  devotional={verse.devotional}
                  prayer={verse.prayer}
                  showShare={false}
                  compact
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="verse-card text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-foreground mb-2">No verses yet</h2>
            <p className="text-muted-foreground">
              The archive is empty. Check back soon for daily devotionals.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Archive;
