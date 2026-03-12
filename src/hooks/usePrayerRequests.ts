import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PrayerRequestInput {
  name: string;
  email?: string;
  prayer_request: string;
  is_anonymous?: boolean;
}

export function useSubmitPrayerRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: PrayerRequestInput) => {
      // Get the current user (optional — anonymous submissions allowed)
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("prayer_requests")
        .insert({
          ...request,
          user_id: user?.id ?? null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prayerRequests"] });
    },
  });
}
