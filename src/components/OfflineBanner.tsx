import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
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

  if (isOnline) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center">
      <p className="text-xs font-medium text-primary flex items-center justify-center gap-1.5">
        <WifiOff className="h-3.5 w-3.5" />
        You are offline. Showing saved devotions.
      </p>
    </div>
  );
}
