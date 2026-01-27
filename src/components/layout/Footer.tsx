import { Sun, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-accent" />
              <span className="font-serif text-lg font-semibold">Daily Light</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your daily source of spiritual nourishment through God's Word.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Today's Verse
              </Link>
              <Link to="/archive" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Verse Archive
              </Link>
              <Link to="/prayer-request" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Submit Prayer Request
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Scripture */}
          <div className="space-y-4">
            <h4 className="font-serif font-medium text-foreground">Daily Reminder</h4>
            <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
              "Your word is a lamp for my feet, a light on my path."
              <footer className="mt-1 not-italic text-accent">— Psalm 119:105</footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Daily Light. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive" /> for His glory
          </p>
        </div>
      </div>
    </footer>
  );
}
