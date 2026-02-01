const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RequestBody {
  verseText: string;
  verseReference: string;
  format: "whatsapp-status" | "instagram-post" | "instagram-story";
  style: "sunrise" | "mountains" | "light-rays" | "sky" | "gradient";
}

const formatDimensions = {
  "whatsapp-status": { width: 1080, height: 1920, ratio: "9:16" },
  "instagram-post": { width: 1080, height: 1080, ratio: "1:1" },
  "instagram-story": { width: 1080, height: 1920, ratio: "9:16" },
};

const styleDescriptions = {
  sunrise: "a breathtaking golden sunrise over calm waters with soft clouds, warm orange and pink tones, peaceful and spiritual atmosphere",
  mountains: "majestic snow-capped mountains at dawn with soft mist in valleys, purple and blue hues, serene and awe-inspiring landscape",
  "light-rays": "divine golden light rays streaming through clouds from heaven, ethereal and holy atmosphere, soft bokeh effect",
  sky: "peaceful blue sky with gentle white clouds, soft gradients from blue to light peach at horizon, calming and uplifting",
  gradient: "elegant soft gradient background transitioning from warm cream to gentle sky blue, subtle light texture, clean and modern",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { verseText, verseReference, format, style }: RequestBody = await req.json();

    if (!verseText || !verseReference || !format) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: verseText, verseReference, format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dimensions = formatDimensions[format];
    const styleDesc = styleDescriptions[style] || styleDescriptions.gradient;

    // Create a prompt for the AI image generator
    const prompt = `Create a beautiful, peaceful Christian devotional image with the following specifications:

BACKGROUND: ${styleDesc}

TEXT OVERLAY (must be clearly readable):
- Main verse text: "${verseText}"
- Bible reference: "${verseReference}"

DESIGN REQUIREMENTS:
- ${dimensions.ratio} aspect ratio for ${format.replace("-", " ")}
- Elegant serif typography for the verse, clean sans-serif for reference
- Text should be centered with generous padding
- Text color should contrast well with background (white or dark depending on background)
- Add subtle text shadow for readability
- Include a small decorative cross or dove symbol near the reference
- The overall feel should be peaceful, spiritual, and shareable on social media
- Ultra high resolution, professional quality

The image should inspire and uplift viewers while making the Bible verse the focal point.`;

    console.log("Generating image with prompt:", prompt.substring(0, 200) + "...");

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    // Extract the image from the response
    const images = aiData.choices?.[0]?.message?.images;
    if (!images || images.length === 0) {
      throw new Error("No image generated from AI");
    }

    const imageUrl = images[0]?.image_url?.url;
    if (!imageUrl) {
      throw new Error("Invalid image response format");
    }

    return new Response(
      JSON.stringify({
        success: true,
        image: imageUrl,
        format,
        dimensions,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating verse image:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
