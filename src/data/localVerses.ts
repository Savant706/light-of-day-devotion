// Local collection of Bible verses for offline access
// These rotate daily based on the current date

export interface LocalVerse {
  verse_reference: string;
  verse_text: string;
  devotional: string;
  prayer: string;
}

export const LOCAL_VERSES: LocalVerse[] = [
  {
    verse_reference: "Psalm 119:105",
    verse_text: "Your word is a lamp for my feet, a light on my path.",
    devotional: "God's Word illuminates our journey through life. When we feel lost or uncertain, Scripture provides the guidance we need. Like a lamp in the darkness, it reveals the next step we should take, bringing clarity to our decisions and peace to our hearts.",
    prayer: "Lord, thank You for Your Word that guides my steps. Help me to seek Your wisdom daily and trust in Your light to lead me through every situation. Amen."
  },
  {
    verse_reference: "Jeremiah 29:11",
    verse_text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    devotional: "God has wonderful plans for each of us. Even when life seems uncertain or difficult, we can trust that He is working all things together for our good. His plans are filled with hope and purpose, designed to lead us into a bright future.",
    prayer: "Father, help me trust in Your plans even when I cannot see the way ahead. Give me faith to believe that You are working all things for my good. Amen."
  },
  {
    verse_reference: "Philippians 4:13",
    verse_text: "I can do all this through him who gives me strength.",
    devotional: "Our strength comes not from ourselves but from Christ who empowers us. When we face challenges that seem insurmountable, we can lean on His strength. Through Him, we find the courage and ability to overcome every obstacle.",
    prayer: "Lord Jesus, be my strength today. When I feel weak, remind me that Your power is made perfect in my weakness. Help me rely on You in all things. Amen."
  },
  {
    verse_reference: "Proverbs 3:5-6",
    verse_text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    devotional: "True wisdom begins with trusting God completely. When we stop relying solely on our limited understanding and instead surrender to His guidance, He directs our steps and straightens our paths. This trust is not passive but an active choice to follow Him.",
    prayer: "Heavenly Father, I choose to trust You with all my heart today. Guide my decisions and make my paths straight according to Your perfect will. Amen."
  },
  {
    verse_reference: "Isaiah 41:10",
    verse_text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    devotional: "Fear often grips us when we face the unknown. But God promises His constant presence and support. He strengthens us in our weakness, helps us in our struggles, and upholds us when we feel like falling. We are never alone.",
    prayer: "Lord, calm my fears with Your presence. Strengthen me and uphold me with Your righteous right hand. Help me remember that You are always with me. Amen."
  },
  {
    verse_reference: "Romans 8:28",
    verse_text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    devotional: "Even in our darkest moments, God is at work. He takes every circumstance—good and bad—and weaves them together for our ultimate good. This promise gives us hope and perspective, knowing that nothing in our lives is wasted.",
    prayer: "Father, help me trust that You are working all things together for my good, even when I cannot see how. Give me patience and faith to wait on Your perfect timing. Amen."
  },
  {
    verse_reference: "Joshua 1:9",
    verse_text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    devotional: "Courage is not the absence of fear but moving forward despite it. God commands us to be strong and courageous because He promises to be with us. Wherever life takes us, His presence goes before us and walks beside us.",
    prayer: "Lord, fill me with Your courage today. When fear and discouragement threaten to overwhelm me, remind me that You are with me wherever I go. Amen."
  },
  {
    verse_reference: "Psalm 23:1-3",
    verse_text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    devotional: "As our Shepherd, God provides everything we need. He leads us to places of rest and refreshment, caring for our souls with tender love. In His care, we find peace and restoration, even in the midst of life's chaos.",
    prayer: "Good Shepherd, lead me to Your places of rest today. Refresh my weary soul and remind me that in You, I lack nothing. Amen."
  },
  {
    verse_reference: "Matthew 11:28-30",
    verse_text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
    devotional: "Jesus invites the weary to find rest in Him. When life's burdens become too heavy, we can bring them to Christ. His yoke is easy because He carries it with us, teaching us His ways with gentleness and humility.",
    prayer: "Jesus, I come to You with my burdens today. Give me rest for my weary soul and teach me to walk in Your gentle ways. Amen."
  },
  {
    verse_reference: "Lamentations 3:22-23",
    verse_text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    devotional: "Each morning brings fresh mercies from our faithful God. His compassion never runs out; it is renewed daily. No matter what yesterday held, today we can start fresh with His unfailing love and grace.",
    prayer: "Faithful Father, thank You for Your mercies that are new every morning. Help me receive Your fresh grace today and walk in Your unfailing love. Amen."
  },
  {
    verse_reference: "Psalm 46:1",
    verse_text: "God is our refuge and strength, an ever-present help in trouble.",
    devotional: "In times of trouble, God is not distant or uninvolved. He is our refuge—a safe place to run to. He is our strength when we are weak. He is ever-present, never leaving us to face our struggles alone.",
    prayer: "Lord, be my refuge and strength today. In every trouble I face, help me run to You first, knowing You are always present to help. Amen."
  },
  {
    verse_reference: "2 Corinthians 12:9",
    verse_text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
    devotional: "Our weaknesses are not obstacles to God's work—they are opportunities for His power to shine. When we acknowledge our limitations, we create space for God's grace to flow through us. His strength is magnified in our weakness.",
    prayer: "Lord, I offer You my weaknesses today. Let Your power be made perfect in my limitations, and may Your grace be sufficient for every need. Amen."
  },
  {
    verse_reference: "Psalm 27:1",
    verse_text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
    devotional: "With God as our light, darkness loses its power over us. With God as our salvation, we are secure eternally. With God as our stronghold, no enemy can prevail against us. Fear fades when we remember who protects us.",
    prayer: "Lord, be my light and salvation today. Remove all fear from my heart and help me stand firm in the security of Your protection. Amen."
  },
  {
    verse_reference: "John 14:27",
    verse_text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    devotional: "The peace Jesus offers is unlike anything the world can provide. It is not dependent on circumstances but on His presence. This supernatural peace guards our hearts against trouble and fear, anchoring us in His love.",
    prayer: "Prince of Peace, fill my heart with Your peace today. Help me not to be troubled or afraid, but to rest in the peace that only You can give. Amen."
  },
  {
    verse_reference: "Psalm 91:1-2",
    verse_text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'",
    devotional: "There is a secret place of rest in God's presence. When we dwell there, we find safety and peace. He becomes our refuge from life's storms, our fortress against every attack, and the One in whom we place our complete trust.",
    prayer: "Most High God, I choose to dwell in Your shelter today. Be my refuge and fortress, and help me trust in You completely. Amen."
  },
  {
    verse_reference: "Hebrews 11:1",
    verse_text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    devotional: "Faith bridges the gap between what we see and what God promises. It gives us confidence to hope for things not yet realized and assurance about realities beyond our sight. Faith is trusting God's character when we cannot trace His hand.",
    prayer: "Lord, increase my faith. Help me have confidence in Your promises and assurance of Your unseen work in my life. Amen."
  },
  {
    verse_reference: "1 Peter 5:7",
    verse_text: "Cast all your anxiety on him because he cares for you.",
    devotional: "God invites us to release our worries into His capable hands. He doesn't want us carrying the weight of anxiety alone. Because He genuinely cares for us, He asks us to transfer our burdens to Him and trust His loving care.",
    prayer: "Loving Father, I cast all my anxieties on You today. Thank You for caring for me so deeply. Help me release my worries and rest in Your care. Amen."
  },
  {
    verse_reference: "Romans 15:13",
    verse_text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    devotional: "Hope is not wishful thinking—it is confident expectation in God's promises. As we trust Him, He fills us with joy and peace that defy our circumstances. The Holy Spirit empowers us to overflow with hope to those around us.",
    prayer: "God of hope, fill me with joy and peace as I trust in You. Let Your hope overflow from my life by the power of Your Holy Spirit. Amen."
  },
  {
    verse_reference: "Deuteronomy 31:6",
    verse_text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
    devotional: "We can face any challenge with courage because we never face it alone. God goes before us, walks beside us, and watches behind us. His promise to never leave or forsake us is the foundation of our confidence.",
    prayer: "Lord, thank You for Your promise to never leave me. Fill me with strength and courage, knowing that You go with me into every situation. Amen."
  },
  {
    verse_reference: "Psalm 34:8",
    verse_text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.",
    devotional: "God's goodness is not just theoretical—it is meant to be experienced. He invites us to taste and discover His goodness for ourselves. Those who take refuge in Him find blessing, protection, and the sweetness of His presence.",
    prayer: "Good and gracious God, help me experience Your goodness today. I take refuge in You, trusting in Your blessing and protection. Amen."
  },
  {
    verse_reference: "Isaiah 40:31",
    verse_text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    devotional: "Waiting on the Lord is not passive—it is active hope. When we place our hope in God, He renews our depleted strength. Like eagles catching the wind, we rise above our circumstances with supernatural energy.",
    prayer: "Lord, I place my hope in You. Renew my strength today. Help me soar above my challenges and run without growing weary. Amen."
  },
  {
    verse_reference: "Psalm 37:4",
    verse_text: "Take delight in the Lord, and he will give you the desires of your heart.",
    devotional: "When God becomes our greatest delight, our desires align with His will. He doesn't just grant wishes—He transforms our hearts to want what He wants. In delighting in Him, we find our deepest longings fulfilled.",
    prayer: "Lord, be my greatest delight. Transform my desires to align with Your will, and fulfill the deepest longings of my heart. Amen."
  },
  {
    verse_reference: "Matthew 6:33",
    verse_text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    devotional: "When we prioritize God's kingdom above our own concerns, He takes care of everything else. This is not a formula for getting what we want but a pathway to discovering that what God provides is better than what we could pursue on our own.",
    prayer: "Father, help me seek Your kingdom first today. I trust You to provide for all my needs as I pursue Your righteousness. Amen."
  },
  {
    verse_reference: "Colossians 3:15",
    verse_text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
    devotional: "Christ's peace is meant to reign in our hearts like a referee, guiding our decisions and responses. This peace connects us with other believers and calls us to gratitude. When peace rules, anxiety retreats.",
    prayer: "Lord Jesus, let Your peace rule in my heart today. Help me be thankful in all circumstances and live in harmony with others. Amen."
  },
  {
    verse_reference: "Psalm 139:14",
    verse_text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    devotional: "You are not an accident or mistake—you are God's masterpiece, carefully and wonderfully created. Every detail of your being reflects His artistry. Embrace who He made you to be and praise Him for His wonderful work in you.",
    prayer: "Creator God, thank You for making me fearfully and wonderfully. Help me see myself as Your beautiful creation and praise You for Your wonderful works. Amen."
  },
  {
    verse_reference: "2 Timothy 1:7",
    verse_text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
    devotional: "The Holy Spirit within us is not a spirit of fear or timidity. He empowers us with supernatural strength, fills us with divine love, and grants us self-control. We can face any situation with confidence through His enabling presence.",
    prayer: "Holy Spirit, thank You for giving me power, love, and self-discipline. Replace any timidity in me with Your bold confidence. Amen."
  },
  {
    verse_reference: "John 16:33",
    verse_text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
    devotional: "Jesus is honest about life's difficulties—trouble is certain. But He has already overcome the world and all its troubles. In Him, we find peace that transcends our circumstances and courage to face whatever comes.",
    prayer: "Victorious Lord, thank You for overcoming the world. Help me find peace in You despite life's troubles, and give me courage to take heart. Amen."
  },
  {
    verse_reference: "Ephesians 3:20",
    verse_text: "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.",
    devotional: "Our imagination has limits; God's power does not. He is able to exceed our wildest dreams and answer prayers in ways we never conceived. His power is already at work within us, accomplishing more than we can fathom.",
    prayer: "Almighty God, expand my vision of what You can do. Work Your power within me to accomplish immeasurably more than I can ask or imagine. Amen."
  },
  {
    verse_reference: "Psalm 16:11",
    verse_text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
    devotional: "God reveals the way of true life to those who seek Him. In His presence, we discover fullness of joy—not fleeting happiness but deep, lasting satisfaction. Eternal pleasures await those who walk closely with Him.",
    prayer: "Lord, show me the path of life. Fill me with joy in Your presence and lead me to the eternal pleasures found at Your right hand. Amen."
  },
  {
    verse_reference: "1 John 4:19",
    verse_text: "We love because he first loved us.",
    devotional: "Our capacity to love flows from God's love for us. He loved us first—before we deserved it, before we responded. This divine love transforms us and empowers us to love others with the same unconditional grace.",
    prayer: "Loving God, thank You for loving me first. Fill me with Your love so that I can love others as You have loved me. Amen."
  },
  {
    verse_reference: "Psalm 103:12",
    verse_text: "As far as the east is from the west, so far has he removed our transgressions from us.",
    devotional: "God's forgiveness is complete and permanent. He doesn't just forgive our sins—He removes them infinitely far from us. There is no record of our failures before Him, only the record of Christ's righteousness credited to us.",
    prayer: "Merciful Father, thank You for removing my sins completely. Help me receive Your forgiveness fully and walk in the freedom of Your grace. Amen."
  }
];

// Get the daily verse based on the current date
export function getDailyLocalVerse(): LocalVerse & { date: string } {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Use day of year to select verse (cycles through collection)
  const verseIndex = dayOfYear % LOCAL_VERSES.length;
  const verse = LOCAL_VERSES[verseIndex];
  
  return {
    ...verse,
    date: today.toISOString().split("T")[0]
  };
}
