import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVerseImage, ImageFormat, ImageStyle } from "@/hooks/useVerseImage";
import { Image, Download, Share2, Loader2, Smartphone, Square, RectangleVertical, Sun, Mountain, Sparkles, Cloud, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VerseImageGeneratorProps {
  verseText: string;
  verseReference: string;
}

const formatOptions: { value: ImageFormat; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "whatsapp-status", label: "WhatsApp Status", icon: <Smartphone className="h-4 w-4" />, description: "9:16 vertical" },
  { value: "instagram-post", label: "Instagram Post", icon: <Square className="h-4 w-4" />, description: "1:1 square" },
  { value: "instagram-story", label: "Instagram Story", icon: <RectangleVertical className="h-4 w-4" />, description: "9:16 vertical" },
];

const styleOptions: { value: ImageStyle; label: string; icon: React.ReactNode }[] = [
  { value: "sunrise", label: "Sunrise", icon: <Sun className="h-4 w-4" /> },
  { value: "mountains", label: "Mountains", icon: <Mountain className="h-4 w-4" /> },
  { value: "light-rays", label: "Light Rays", icon: <Sparkles className="h-4 w-4" /> },
  { value: "sky", label: "Sky", icon: <Cloud className="h-4 w-4" /> },
  { value: "gradient", label: "Gradient", icon: <Palette className="h-4 w-4" /> },
];

export function VerseImageGenerator({ verseText, verseReference }: VerseImageGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("instagram-post");
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>("sunrise");
  const { generateImage, isGenerating, error, generatedImage, clearImage } = useVerseImage();

  const handleGenerate = async () => {
    await generateImage(verseText, verseReference, selectedFormat, selectedStyle);
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${verseReference.replace(/[^a-zA-Z0-9]/g, "-")}-${selectedFormat}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    try {
      // Convert base64 to blob for sharing
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], `${verseReference}.png`, { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: verseReference,
          text: `"${verseText}" — ${verseReference}`,
          files: [file],
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback: copy image URL or show download option
        await navigator.clipboard.writeText(`"${verseText}" — ${verseReference}`);
        toast.info("Verse copied to clipboard! Download the image to share.");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Could not share. Try downloading instead.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(clearImage, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : handleClose()}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Image className="h-4 w-4" />
          Create Image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Create Shareable Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Choose Format</label>
            <div className="grid grid-cols-3 gap-2">
              {formatOptions.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(format.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                    selectedFormat === format.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {format.icon}
                  <span className="text-xs font-medium">{format.label}</span>
                  <span className="text-xs text-muted-foreground">{format.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Choose Background Style</label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setSelectedStyle(style.value)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all text-sm",
                    selectedStyle === style.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {style.icon}
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verse Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Verse Preview</label>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="font-serif italic text-foreground/90">"{verseText}"</p>
              <p className="text-sm text-accent mt-2">— {verseReference}</p>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating your image...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Image
              </>
            )}
          </Button>

          {/* Error Display */}
          {error && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={generatedImage}
                  alt={`${verseReference} verse image`}
                  className="w-full h-auto"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleDownload} className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleShare} variant="secondary" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
