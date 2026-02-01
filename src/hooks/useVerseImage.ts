import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ImageFormat = "whatsapp-status" | "instagram-post" | "instagram-story";
export type ImageStyle = "sunrise" | "mountains" | "light-rays" | "sky" | "gradient";

interface UseVerseImageReturn {
  generateImage: (
    verseText: string,
    verseReference: string,
    format: ImageFormat,
    style: ImageStyle
  ) => Promise<string | null>;
  isGenerating: boolean;
  error: string | null;
  generatedImage: string | null;
  clearImage: () => void;
}

export function useVerseImage(): UseVerseImageReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async (
    verseText: string,
    verseReference: string,
    format: ImageFormat,
    style: ImageStyle
  ): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "generate-verse-image",
        {
          body: { verseText, verseReference, format, style },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.image) {
        setGeneratedImage(data.image);
        return data.image;
      }

      throw new Error("No image received");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate image";
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImage = () => {
    setGeneratedImage(null);
    setError(null);
  };

  return {
    generateImage,
    isGenerating,
    error,
    generatedImage,
    clearImage,
  };
}
