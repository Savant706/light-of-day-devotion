import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    // Authenticate the caller
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Verify admin role
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roleData } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: "Forbidden: admin role required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if today's verse already exists
    const today = new Date().toISOString().split("T")[0];
    const { data: existingVerse } = await serviceClient
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
2. The actual verse text from that reference - MUST be from the King James Version (KJV) Bible exactly as written
3. A devotional reflection (2-3 paragraphs, around 150-200 words) explaining the verse's meaning and application for daily life
4. A short prayer (2-3 sentences) related to the verse

IMPORTANT REQUIREMENTS:
- Use ONLY King James Version (KJV) text for the verse
- Choose from a DIFFERENT book of the Bible each day - rotate through: Genesis, Exodus, Psalms, Proverbs, Isaiah, Jeremiah, Matthew, Mark, Luke, John, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, Hebrews, James, 1 Peter, 1 John, Revelation
- Do NOT repeat books used recently

Respond in JSON format exactly like this:
{
  "verse_reference": "Book Chapter:Verse",
  "verse_text": "The exact KJV Bible verse text",
  "devotional": "The devotional reflection text",
  "prayer": "The prayer text"
}

Choose a meaningful verse that offers encouragement, wisdom, or spiritual guidance.`;

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
    const { data: newVerse, error: insertError } = await serviceClient
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
      JSON.stringify({ error: "An internal error occurred" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
