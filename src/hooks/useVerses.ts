import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DailyVerse {
  id: string;
  date: string;
  verse_reference: string;
  verse_text: string;
  devotional: string;
  prayer: string;
  created_at: string;
  updated_at: string;
}

export function useTodayVerse() {
  return useQuery({
    queryKey: ["todayVerse"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("daily_verses")
        .select("*")
        .eq("date", today)
        .maybeSingle();

      if (error) throw error;
      return data as DailyVerse | null;
    },
  });
}

export function useVerseArchive() {
  return useQuery({
    queryKey: ["verseArchive"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_verses")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return data as DailyVerse[];
    },
  });
}

export function useCreateVerse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (verse: Omit<DailyVerse, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("daily_verses")
        .insert(verse)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayVerse"] });
      queryClient.invalidateQueries({ queryKey: ["verseArchive"] });
    },
  });
}

export function useUpdateVerse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...verse }: Partial<DailyVerse> & { id: string }) => {
      const { data, error } = await supabase
        .from("daily_verses")
        .update(verse)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayVerse"] });
      queryClient.invalidateQueries({ queryKey: ["verseArchive"] });
    },
  });
}

export function useDeleteVerse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("daily_verses")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayVerse"] });
      queryClient.invalidateQueries({ queryKey: ["verseArchive"] });
    },
  });
}
