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
      const { data, error } = await supabase
        .from("prayer_requests")
        .insert(request)
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
