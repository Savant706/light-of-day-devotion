import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "@/components/BottomNav";
import { OfflineBanner } from "@/components/OfflineBanner";
import { InstallPrompt } from "@/components/InstallPrompt";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OfflineBanner />
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}
