import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border/50 mt-auto hidden md:block">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your daily source of spiritual nourishment through God's Word. Begin each day with light, hope, and purpose.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Today's Devotion
              </Link>
              <Link to="/devotions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Devotions
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Scripture */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-foreground">Daily Reminder</h4>
            <blockquote className="text-sm italic text-muted-foreground leading-relaxed border-l-2 border-amber-500/50 pl-4">
              "Your word is a lamp for my feet, a light on my path."
              <footer className="mt-1 not-italic text-amber-600 dark:text-amber-400 font-medium">— Psalm 119:105</footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Light of Day Devotion. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for His glory
          </p>
        </div>
      </div>
    </footer>
  );
}
