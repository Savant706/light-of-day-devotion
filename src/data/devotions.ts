// Light of Day Devotion - 7 Sample Daily Devotions
// Rotates based on day of week (0=Sunday, 1=Monday, ..., 6=Saturday)

export interface Devotion {
  id: number;
  day: string;
  title: string;
  verse_reference: string;
  verse_text: string;
  message: string;
  prayer: string;
}

export const DEVOTIONS: Devotion[] = [
  {
    id: 0,
    day: "Sunday",
    title: "Rest in His Presence",
    verse_reference: "Psalm 23:1-3",
    verse_text:
      "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
    message:
      "Sunday is a day of rest and renewal — a gift from God to restore our weary souls. Just as a shepherd leads his flock to green pastures and still waters, God invites us to pause from the busyness of life and find refreshment in His presence. Today, let go of striving and simply be with Him. Allow His peace to wash over you, restoring what the week has taken. True rest is not merely physical; it is spiritual — a deep settling of the soul in the arms of the One who loves you most.",
    prayer:
      "Good Shepherd, lead me to Thy places of rest today. Restore my soul and refresh my spirit. Help me to be still and know that Thou art God. Let this day of rest draw me closer to Thee. Amen.",
  },
  {
    id: 1,
    day: "Monday",
    title: "Strength for a New Week",
    verse_reference: "Isaiah 40:31",
    verse_text:
      "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    message:
      "Monday marks a fresh start — a new week full of possibilities and challenges. As you step into it, remember that your strength does not come from your own reserves but from waiting on the Lord. This waiting is not passive; it is an active, expectant trust in God's faithfulness. When you feel the weight of the week ahead, look up. Like an eagle catching the thermal winds, you can rise above your circumstances when you place your hope in Him. He renews, He empowers, He sustains.",
    prayer:
      "Lord, as I begin this new week, I place my hope in Thee. Renew my strength and help me soar above every challenge. When I grow weary, remind me to wait on Thee. Amen.",
  },
  {
    id: 2,
    day: "Tuesday",
    title: "Walking in His Light",
    verse_reference: "Psalm 119:105",
    verse_text:
      "Thy word is a lamp unto my feet, and a light unto my path.",
    message:
      "In a world filled with confusion and competing voices, God's Word stands as a reliable lamp for our journey. It does not always illuminate the entire road ahead — just the next step. This is intentional. God calls us to walk by faith, trusting Him one step at a time. As you navigate today's decisions, open His Word and let it guide you. The Bible is not merely a historical document; it is a living, active guide that speaks directly into your present circumstances with wisdom and clarity.",
    prayer:
      "Heavenly Father, thank Thee for Thy Word that lights my path. Help me to read it, meditate on it, and apply it to my life today. Guide my steps with Thy wisdom. Amen.",
  },
  {
    id: 3,
    day: "Wednesday",
    title: "Peace in the Midweek",
    verse_reference: "John 14:27",
    verse_text:
      "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    message:
      "Midweek can feel like the hardest stretch — the weekend feels far away and the week's pressures have accumulated. Yet Jesus offers a peace that is entirely different from what the world provides. The world's peace depends on circumstances being favorable; Christ's peace transcends circumstances entirely. It is a supernatural calm that guards your heart even in the storm. Today, receive His peace as a gift. You do not have to earn it or manufacture it — simply open your heart and let Him fill it.",
    prayer:
      "Prince of Peace, fill my heart with Thy peace today. When anxiety rises, remind me of Thy promise. Let Thy peace guard my heart and mind in Christ Jesus. Amen.",
  },
  {
    id: 4,
    day: "Thursday",
    title: "Trust His Plans",
    verse_reference: "Jeremiah 29:11",
    verse_text:
      "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    message:
      "When life feels uncertain or your plans have fallen apart, this promise from God is an anchor for your soul. He knows the thoughts He has toward you — and they are good. His plans are not to harm you but to prosper you, to give you a future and a hope. Even when you cannot see the path ahead, God sees the whole picture. He is not surprised by your circumstances. He is working all things together for your good, weaving even your setbacks into a beautiful story of His grace.",
    prayer:
      "Father, I trust Thy plans for my life even when I cannot see the way ahead. Help me to release control and rest in the knowledge that Thy thoughts toward me are good. Amen.",
  },
  {
    id: 5,
    day: "Friday",
    title: "Gratitude and Grace",
    verse_reference: "Lamentations 3:22-23",
    verse_text:
      "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    message:
      "As the week draws to a close, take a moment to reflect on God's faithfulness. His mercies have been new every single morning this week — even on the days you did not notice them. His compassion has not failed, not once. Gratitude is a powerful spiritual discipline that shifts our focus from what we lack to what we have been given. Today, count your blessings. Thank God for His faithfulness in the small things and the large. A grateful heart is a joyful heart, and joy is your strength.",
    prayer:
      "Faithful God, thank Thee for Thy mercies that have been new every morning this week. Help me to cultivate a grateful heart and to see Thy faithfulness in every detail of my life. Amen.",
  },
  {
    id: 6,
    day: "Saturday",
    title: "Courage for the Journey",
    verse_reference: "Joshua 1:9",
    verse_text:
      "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    message:
      "Courage is not the absence of fear — it is choosing to move forward in spite of it. God commanded Joshua to be strong and courageous not because the road ahead was easy, but because God Himself would be with him every step of the way. The same promise belongs to you. Whatever you are facing — a difficult conversation, a new beginning, an uncertain future — you do not face it alone. The Lord your God goes with you. His presence is your greatest source of courage. Step forward boldly.",
    prayer:
      "Lord, fill me with Thy courage today. When fear and doubt arise, remind me that Thou art with me wherever I go. Help me to step forward boldly in faith. Amen.",
  },
];

/**
 * Get today's devotion based on the current day of the week.
 */
export function getTodaysDevotion(): Devotion {
  const dayOfWeek = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  return DEVOTIONS[dayOfWeek];
}

/**
 * Get a devotion by its ID.
 */
export function getDevotionById(id: number): Devotion | undefined {
  return DEVOTIONS.find((d) => d.id === id);
}
