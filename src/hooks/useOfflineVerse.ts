import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDailyLocalVerse, LocalVerse } from "@/data/localVerses";

const CACHE_KEY = "daily_light_cached_verse";
const CACHE_DATE_KEY = "daily_light_cache_date";

export interface OfflineVerse extends LocalVerse {
  date: string;
  id?: string;
  isFromCache?: boolean;
  isOffline?: boolean;
}

interface CachedVerse {
  verse: OfflineVerse;
  cachedAt: string;
}

// Check if we're online
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

// Save verse to local storage
function cacheVerse(verse: OfflineVerse) {
  try {
    const cacheData: CachedVerse = {
      verse,
      cachedAt: new Date().toISOString()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    localStorage.setItem(CACHE_DATE_KEY, verse.date);
  } catch (error) {
    console.warn("Failed to cache verse:", error);
  }
}

// Get cached verse from local storage
function getCachedVerse(): CachedVerse | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn("Failed to read cached verse:", error);
  }
  return null;
}

// Check if cached verse is for today
function isCacheValidForToday(): boolean {
  try {
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    const today = new Date().toISOString().split("T")[0];
    return cachedDate === today;
  } catch {
    return false;
  }
}

export function useOfflineVerse() {
  const [verse, setVerse] = useState<OfflineVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isOnline = useOnlineStatus();

  const fetchOnlineVerse = useCallback(async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error: fetchError } = await supabase
        .from("daily_verses")
        .select("*")
        .eq("date", today)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        const onlineVerse: OfflineVerse = {
          id: data.id,
          date: data.date,
          verse_reference: data.verse_reference,
          verse_text: data.verse_text,
          devotional: data.devotional,
          prayer: data.prayer,
          isFromCache: false,
          isOffline: false
        };
        
        // Cache the online verse for offline use
        cacheVerse(onlineVerse);
        return onlineVerse;
      }
      
      return null;
    } catch (err) {
      console.warn("Failed to fetch online verse:", err);
      return null;
    }
  }, []);

  const loadVerse = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Strategy 1: If online and cache is not valid for today, try fetching fresh
      if (isOnline) {
        const onlineVerse = await fetchOnlineVerse();
        if (onlineVerse) {
          setVerse(onlineVerse);
          setIsLoading(false);
          return;
        }
      }

      // Strategy 2: Check if we have a valid cached verse for today
      if (isCacheValidForToday()) {
        const cached = getCachedVerse();
        if (cached) {
          setVerse({
            ...cached.verse,
            isFromCache: true,
            isOffline: !isOnline
          });
          setIsLoading(false);
          return;
        }
      }

      // Strategy 3: Use local verse collection (date-based rotation)
      const localVerse = getDailyLocalVerse();
      const offlineVerse: OfflineVerse = {
        ...localVerse,
        isFromCache: false,
        isOffline: true
      };
      
      setVerse(offlineVerse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load verse"));
      
      // Even on error, provide a local verse
      const localVerse = getDailyLocalVerse();
      setVerse({
        ...localVerse,
        isFromCache: false,
        isOffline: true
      });
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, fetchOnlineVerse]);

  // Load verse on mount and when online status changes
  useEffect(() => {
    loadVerse();
  }, [loadVerse]);

  // Background sync when coming back online
  useEffect(() => {
    if (isOnline && verse?.isOffline) {
      // Silently try to fetch fresh data in background
      fetchOnlineVerse().then((onlineVerse) => {
        if (onlineVerse) {
          setVerse(onlineVerse);
        }
      });
    }
  }, [isOnline, verse?.isOffline, fetchOnlineVerse]);

  return {
    verse,
    isLoading,
    error,
    isOnline,
    isOfflineMode: verse?.isOffline || false,
    refetch: loadVerse
  };
}
