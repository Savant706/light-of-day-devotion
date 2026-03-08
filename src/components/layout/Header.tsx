import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/devotions", label: "Devotions" },
  { to: "/prayer", label: "Prayer" },
  { to: "/quiz", label: "Quiz" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const openInstallPrompt = () => {
    window.dispatchEvent(new Event("open-install-prompt"));
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative py-1",
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <button
              onClick={openInstallPrompt}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Install app"
            >
              <Download className="h-4 w-4" />
              Install
            </button>
            <ThemeToggle />
            {!user ? (
              <Link
                to="/auth"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xs font-bold"
              >
                {user.email?.charAt(0).toUpperCase()}
              </Link>
            )}
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={openInstallPrompt}
                className="px-4 py-3 rounded-xl text-left text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Install App
              </button>
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
