// Local collection of KJV Bible verses for offline access
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
    verse_text: "Thy word is a lamp unto my feet, and a light unto my path.",
    devotional: "God's Word illuminates our journey through life. When we feel lost or uncertain, Scripture provides the guidance we need. Like a lamp in the darkness, it reveals the next step we should take, bringing clarity to our decisions and peace to our hearts.",
    prayer: "Lord, thank Thee for Thy Word that guides my steps. Help me to seek Thy wisdom daily and trust in Thy light to lead me through every situation. Amen."
  },
  {
    verse_reference: "Jeremiah 29:11",
    verse_text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    devotional: "God has wonderful plans for each of us. Even when life seems uncertain or difficult, we can trust that He is working all things together for our good. His plans are filled with hope and purpose, designed to lead us into a bright future.",
    prayer: "Father, help me trust in Thy plans even when I cannot see the way ahead. Give me faith to believe that Thou art working all things for my good. Amen."
  },
  {
    verse_reference: "Philippians 4:13",
    verse_text: "I can do all things through Christ which strengtheneth me.",
    devotional: "Our strength comes not from ourselves but from Christ who empowers us. When we face challenges that seem insurmountable, we can lean on His strength. Through Him, we find the courage and ability to overcome every obstacle.",
    prayer: "Lord Jesus, be my strength today. When I feel weak, remind me that Thy power is made perfect in my weakness. Help me rely on Thee in all things. Amen."
  },
  {
    verse_reference: "Proverbs 3:5-6",
    verse_text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    devotional: "True wisdom begins with trusting God completely. When we stop relying solely on our limited understanding and instead surrender to His guidance, He directs our steps and straightens our paths. This trust is not passive but an active choice to follow Him.",
    prayer: "Heavenly Father, I choose to trust Thee with all my heart today. Guide my decisions and make my paths straight according to Thy perfect will. Amen."
  },
  {
    verse_reference: "Isaiah 41:10",
    verse_text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    devotional: "Fear often grips us when we face the unknown. But God promises His constant presence and support. He strengthens us in our weakness, helps us in our struggles, and upholds us when we feel like falling. We are never alone.",
    prayer: "Lord, calm my fears with Thy presence. Strengthen me and uphold me with Thy righteous right hand. Help me remember that Thou art always with me. Amen."
  },
  {
    verse_reference: "Romans 8:28",
    verse_text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    devotional: "Even in our darkest moments, God is at work. He takes every circumstance—good and bad—and weaves them together for our ultimate good. This promise gives us hope and perspective, knowing that nothing in our lives is wasted.",
    prayer: "Father, help me trust that Thou art working all things together for my good, even when I cannot see how. Give me patience and faith to wait on Thy perfect timing. Amen."
  },
  {
    verse_reference: "Joshua 1:9",
    verse_text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    devotional: "Courage is not the absence of fear but moving forward despite it. God commands us to be strong and courageous because He promises to be with us. Wherever life takes us, His presence goes before us and walks beside us.",
    prayer: "Lord, fill me with Thy courage today. When fear and discouragement threaten to overwhelm me, remind me that Thou art with me wherever I go. Amen."
  },
  {
    verse_reference: "Psalm 23:1-3",
    verse_text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
    devotional: "As our Shepherd, God provides everything we need. He leads us to places of rest and refreshment, caring for our souls with tender love. In His care, we find peace and restoration, even in the midst of life's chaos.",
    prayer: "Good Shepherd, lead me to Thy places of rest today. Refresh my weary soul and remind me that in Thee, I lack nothing. Amen."
  },
  {
    verse_reference: "Matthew 11:28-30",
    verse_text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.",
    devotional: "Jesus invites the weary to find rest in Him. When life's burdens become too heavy, we can bring them to Christ. His yoke is easy because He carries it with us, teaching us His ways with gentleness and humility.",
    prayer: "Jesus, I come to Thee with my burdens today. Give me rest for my weary soul and teach me to walk in Thy gentle ways. Amen."
  },
  {
    verse_reference: "Lamentations 3:22-23",
    verse_text: "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    devotional: "Each morning brings fresh mercies from our faithful God. His compassion never runs out; it is renewed daily. No matter what yesterday held, today we can start fresh with His unfailing love and grace.",
    prayer: "Faithful Father, thank Thee for Thy mercies that are new every morning. Help me receive Thy fresh grace today and walk in Thy unfailing love. Amen."
  },
  {
    verse_reference: "Psalm 46:1",
    verse_text: "God is our refuge and strength, a very present help in trouble.",
    devotional: "In times of trouble, God is not distant or uninvolved. He is our refuge—a safe place to run to. He is our strength when we are weak. He is ever-present, never leaving us to face our struggles alone.",
    prayer: "Lord, be my refuge and strength today. In every trouble I face, help me run to Thee first, knowing Thou art always present to help. Amen."
  },
  {
    verse_reference: "2 Corinthians 12:9",
    verse_text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.",
    devotional: "Our weaknesses are not obstacles to God's work—they are opportunities for His power to shine. When we acknowledge our limitations, we create space for God's grace to flow through us. His strength is magnified in our weakness.",
    prayer: "Lord, I offer Thee my weaknesses today. Let Thy power be made perfect in my limitations, and may Thy grace be sufficient for every need. Amen."
  },
  {
    verse_reference: "Psalm 27:1",
    verse_text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
    devotional: "With God as our light, darkness loses its power over us. With God as our salvation, we are secure eternally. With God as our stronghold, no enemy can prevail against us. Fear fades when we remember who protects us.",
    prayer: "Lord, be my light and salvation today. Remove all fear from my heart and help me stand firm in the security of Thy protection. Amen."
  },
  {
    verse_reference: "John 14:27",
    verse_text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    devotional: "The peace Jesus offers is unlike anything the world can provide. It is not dependent on circumstances but on His presence. This supernatural peace guards our hearts against trouble and fear, anchoring us in His love.",
    prayer: "Prince of Peace, fill my heart with Thy peace today. Help me not to be troubled or afraid, but to rest in the peace that only Thou canst give. Amen."
  },
  {
    verse_reference: "Psalm 91:1-2",
    verse_text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
    devotional: "There is a secret place of rest in God's presence. When we dwell there, we find safety and peace. He becomes our refuge from life's storms, our fortress against every attack, and the One in whom we place our complete trust.",
    prayer: "Most High God, I choose to dwell in Thy shelter today. Be my refuge and fortress, and help me trust in Thee completely. Amen."
  },
  {
    verse_reference: "Hebrews 11:1",
    verse_text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    devotional: "Faith bridges the gap between what we see and what God promises. It gives us confidence to hope for things not yet realized and assurance about realities beyond our sight. Faith is trusting God's character when we cannot trace His hand.",
    prayer: "Lord, increase my faith. Help me have confidence in Thy promises and assurance of Thy unseen work in my life. Amen."
  },
  {
    verse_reference: "1 Peter 5:7",
    verse_text: "Casting all your care upon him; for he careth for you.",
    devotional: "God invites us to release our worries into His capable hands. He doesn't want us carrying the weight of anxiety alone. Because He genuinely cares for us, He asks us to transfer our burdens to Him and trust His loving care.",
    prayer: "Loving Father, I cast all my anxieties on Thee today. Thank Thee for caring for me so deeply. Help me release my worries and rest in Thy care. Amen."
  },
  {
    verse_reference: "Romans 15:13",
    verse_text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    devotional: "Hope is not wishful thinking—it is confident expectation in God's promises. As we trust Him, He fills us with joy and peace that defy our circumstances. The Holy Spirit empowers us to overflow with hope to those around us.",
    prayer: "God of hope, fill me with joy and peace as I trust in Thee. Let Thy hope overflow from my life by the power of Thy Holy Spirit. Amen."
  },
  {
    verse_reference: "Deuteronomy 31:6",
    verse_text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
    devotional: "We can face any challenge with courage because we never face it alone. God goes before us, walks beside us, and watches behind us. His promise to never leave or forsake us is the foundation of our confidence.",
    prayer: "Lord, thank Thee for Thy promise to never leave me. Fill me with strength and courage, knowing that Thou goest with me into every situation. Amen."
  },
  {
    verse_reference: "Psalm 34:8",
    verse_text: "O taste and see that the LORD is good: blessed is the man that trusteth in him.",
    devotional: "God's goodness is not just theoretical—it is meant to be experienced. He invites us to taste and discover His goodness for ourselves. Those who take refuge in Him find blessing, protection, and the sweetness of His presence.",
    prayer: "Good and gracious God, help me experience Thy goodness today. I take refuge in Thee, trusting in Thy blessing and protection. Amen."
  },
  {
    verse_reference: "Isaiah 40:31",
    verse_text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    devotional: "Waiting on the Lord is not passive—it is active hope. When we place our hope in God, He renews our depleted strength. Like eagles catching the wind, we rise above our circumstances with supernatural energy.",
    prayer: "Lord, I place my hope in Thee. Renew my strength today. Help me soar above my challenges and run without growing weary. Amen."
  },
  {
    verse_reference: "Psalm 37:4",
    verse_text: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
    devotional: "When God becomes our greatest delight, our desires align with His will. He doesn't just grant wishes—He transforms our hearts to want what He wants. In delighting in Him, we find our deepest longings fulfilled.",
    prayer: "Lord, be my greatest delight. Transform my desires to align with Thy will, and fulfill the deepest longings of my heart. Amen."
  },
  {
    verse_reference: "Matthew 6:33",
    verse_text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    devotional: "When we prioritize God's kingdom above our own concerns, He takes care of everything else. This is not a formula for getting what we want but a pathway to discovering that what God provides is better than what we could pursue on our own.",
    prayer: "Father, help me seek Thy kingdom first today. I trust Thee to provide for all my needs as I pursue Thy righteousness. Amen."
  },
  {
    verse_reference: "Colossians 3:15",
    verse_text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",
    devotional: "Christ's peace is meant to reign in our hearts like a referee, guiding our decisions and responses. This peace connects us with other believers and calls us to gratitude. When peace rules, anxiety retreats.",
    prayer: "Lord Jesus, let Thy peace rule in my heart today. Help me be thankful in all circumstances and live in harmony with others. Amen."
  },
  {
    verse_reference: "Psalm 139:14",
    verse_text: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
    devotional: "You are not an accident or mistake—you are God's masterpiece, carefully and wonderfully created. Every detail of your being reflects His artistry. Embrace who He made you to be and praise Him for His wonderful work in you.",
    prayer: "Creator God, thank Thee for making me fearfully and wonderfully. Help me see myself as Thy beautiful creation and praise Thee for Thy wonderful works. Amen."
  },
  {
    verse_reference: "2 Timothy 1:7",
    verse_text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    devotional: "The Holy Spirit within us is not a spirit of fear or timidity. He empowers us with supernatural strength, fills us with divine love, and grants us self-control. We can face any situation with confidence through His enabling presence.",
    prayer: "Holy Spirit, thank Thee for giving me power, love, and a sound mind. Replace any timidity in me with Thy bold confidence. Amen."
  },
  {
    verse_reference: "John 16:33",
    verse_text: "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.",
    devotional: "Jesus is honest about life's difficulties—trouble is certain. But He has already overcome the world and all its troubles. In Him, we find peace that transcends our circumstances and courage to face whatever comes.",
    prayer: "Victorious Lord, thank Thee for overcoming the world. Help me find peace in Thee despite life's troubles, and give me courage to take heart. Amen."
  },
  {
    verse_reference: "Ephesians 3:20",
    verse_text: "Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us.",
    devotional: "Our imagination has limits; God's power does not. He is able to exceed our wildest dreams and answer prayers in ways we never conceived. His power is already at work within us, accomplishing more than we can fathom.",
    prayer: "Almighty God, expand my vision of what Thou canst do. Work Thy power within me to accomplish exceeding abundantly above all I can ask or think. Amen."
  },
  {
    verse_reference: "Psalm 16:11",
    verse_text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
    devotional: "God reveals the way of true life to those who seek Him. In His presence, we discover fullness of joy—not fleeting happiness but deep, lasting satisfaction. Eternal pleasures await those who walk closely with Him.",
    prayer: "Lord, show me the path of life. Fill me with joy in Thy presence and lead me to the eternal pleasures found at Thy right hand. Amen."
  },
  {
    verse_reference: "1 John 4:19",
    verse_text: "We love him, because he first loved us.",
    devotional: "Our capacity to love flows from God's love for us. He loved us first—before we deserved it, before we responded. This divine love transforms us and empowers us to love others with the same unconditional grace.",
    prayer: "Loving God, thank Thee for loving me first. Fill me with Thy love so that I can love others as Thou hast loved me. Amen."
  },
  {
    verse_reference: "Psalm 103:12",
    verse_text: "As far as the east is from the west, so far hath he removed our transgressions from us.",
    devotional: "God's forgiveness is complete and permanent. He doesn't just forgive our sins—He removes them infinitely far from us. There is no record of our failures before Him, only the record of Christ's righteousness credited to us.",
    prayer: "Merciful Father, thank Thee for removing my sins completely. Help me receive Thy forgiveness fully and walk in the freedom of Thy grace. Amen."
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
