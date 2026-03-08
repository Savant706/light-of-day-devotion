import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useBookmarks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleBookmark = useMutation({
    mutationFn: async (devotionDay: number) => {
      if (!user) throw new Error("Must be logged in");
      const existing = bookmarks.find((b) => b.devotion_day === devotionDay);
      if (existing) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("bookmarks")
          .insert({ user_id: user.id, devotion_day: devotionDay });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks", user?.id] });
    },
  });

  const isBookmarked = (devotionDay: number) =>
    bookmarks.some((b) => b.devotion_day === devotionDay);

  return { bookmarks, isLoading, toggleBookmark, isBookmarked };
}
