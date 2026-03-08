import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useDevotionStreak() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["devotion-logs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("devotion_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("devotion_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const logDevotion = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in");
      const today = new Date().toISOString().split("T")[0];
      const { error } = await supabase
        .from("devotion_logs")
        .upsert({ user_id: user.id, devotion_date: today }, { onConflict: "user_id,devotion_date" });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devotion-logs", user?.id] });
    },
  });

  // Calculate streak
  const calculateStreak = (): number => {
    if (logs.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].devotion_date);
      logDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (logDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const hasLoggedToday = (): boolean => {
    const today = new Date().toISOString().split("T")[0];
    return logs.some((log) => log.devotion_date === today);
  };

  return {
    logs,
    isLoading,
    logDevotion,
    streak: calculateStreak(),
    totalDevotions: logs.length,
    hasLoggedToday: hasLoggedToday(),
    completedDates: logs.map((l) => l.devotion_date),
  };
}
