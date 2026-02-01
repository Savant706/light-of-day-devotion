import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if today's verse already exists
    const today = new Date().toISOString().split("T")[0];
    const { data: existingVerse } = await supabase
      .from("daily_verses")
      .select("id")
      .eq("date", today)
      .maybeSingle();

    if (existingVerse) {
      return new Response(
        JSON.stringify({ message: "Today's verse already exists", date: today }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a new verse using AI
    const prompt = `You are a Christian devotional writer. Generate a daily devotional entry with the following components:

1. A Bible verse reference (e.g., "John 3:16", "Psalm 23:1-3")
2. The actual verse text from that reference (use accurate biblical text)
3. A devotional reflection (2-3 paragraphs, around 150-200 words) explaining the verse's meaning and application for daily life
4. A short prayer (2-3 sentences) related to the verse

Respond in JSON format exactly like this:
{
  "verse_reference": "Book Chapter:Verse",
  "verse_text": "The actual Bible verse text",
  "devotional": "The devotional reflection text",
  "prayer": "The prayer text"
}

Choose a meaningful verse that offers encouragement, wisdom, or spiritual guidance. Vary the books of the Bible - don't always pick from the same book.`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
      }
    );

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;

    // Parse the JSON response (handle markdown code blocks if present)
    let verseData;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      verseData = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Insert the new verse
    const { data: newVerse, error: insertError } = await supabase
      .from("daily_verses")
      .insert({
        date: today,
        verse_reference: verseData.verse_reference,
        verse_text: verseData.verse_text,
        devotional: verseData.devotional,
        prayer: verseData.prayer,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ 
        message: "Daily verse generated successfully", 
        verse: newVerse 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating daily verse:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
