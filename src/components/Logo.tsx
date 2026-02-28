import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "h-5 w-5", text: "text-base" },
    md: { icon: "h-7 w-7", text: "text-xl" },
    lg: { icon: "h-10 w-10", text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Sun className={`${icon} text-amber-500 group-hover:text-amber-400 transition-colors duration-200`} />
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm group-hover:bg-amber-400/30 transition-all duration-200" />
      </div>
      {showText && (
        <span className={`${text} font-serif font-semibold text-foreground`}>
          Light of Day
        </span>
      )}
    </Link>
  );
}
