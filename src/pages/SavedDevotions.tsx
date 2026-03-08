import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";
import { DevotionCard } from "@/components/DevotionCard";
import { getDevotionById } from "@/data/devotions";
import { Bookmark } from "lucide-react";

export default function SavedDevotions() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { bookmarks, isLoading } = useBookmarks();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const savedDevotions = bookmarks
    .map((b) => getDevotionById(b.devotion_day))
    .filter(Boolean);

  return (
    <Layout>
      <section className="page-container py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Bookmark className="h-4 w-4" />
              Saved
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Saved Devotions</h1>
            <p className="text-muted-foreground mt-2">Your bookmarked devotions for later</p>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading...</div>
          ) : savedDevotions.length === 0 ? (
            <div className="text-center py-16">
              <Bookmark className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No saved devotions yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tap the bookmark icon on any devotion to save it here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedDevotions.map((d) => d && <DevotionCard key={d.id} devotion={d} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
