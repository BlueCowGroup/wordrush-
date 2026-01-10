// Word categories for the game - 100+ words per category

export const categories = {
  food: {
    name: "Food & Drink",
    icon: "🍔",
    words: [
      // Dishes & Cuisines
      "beef bourguignon", "chicken tikka masala", "pad thai noodles", "eggs benedict",
      "bangers and mash", "fish and chips", "beef wellington", "coq au vin",
      "lobster thermidor", "shrimp scampi", "fettuccine alfredo", "carbonara pasta",
      "ratatouille", "bouillabaisse", "french onion soup", "clam chowder",
      "jambalaya", "gumbo", "pulled pork sandwich", "philly cheesesteak",
      "chicago deep dish pizza", "new york style pizza", "california roll",
      "dragon roll sushi", "poke bowl", "bibimbap", "bulgogi beef",
      "dim sum dumplings", "peking duck", "kung pao chicken", "sweet and sour pork",
      "general tso's chicken", "mongolian beef", "orange chicken", "lo mein noodles",
      "chicken parmesan", "lasagna bolognese", "risotto milanese", "osso buco",
      "tiramisu dessert", "panna cotta", "creme brulee", "chocolate souffle",
      "bananas foster", "baked alaska", "black forest cake", "red velvet cake",
      "key lime pie", "pecan pie", "apple crumble", "sticky toffee pudding",
      // Ingredients & Foods
      "truffle oil drizzle", "saffron threads", "wagyu beef steak", "foie gras",
      "prosciutto di parma", "manchego cheese", "aged parmesan wheel", "blue cheese crumbles",
      "sun dried tomatoes", "caramelized onions", "roasted garlic", "fresh basil pesto",
      "balsamic reduction", "chimichurri sauce", "hollandaise sauce", "bearnaise sauce",
      "worcestershire sauce", "tahini paste", "harissa paste", "gochujang sauce",
      "miso paste", "fish sauce", "oyster sauce", "hoisin sauce",
      "sriracha hot sauce", "sambal oelek", "adobo seasoning", "cajun spice blend",
      // Drinks & Beverages
      "espresso martini", "moscow mule cocktail", "pina colada", "margarita on the rocks",
      "long island iced tea", "mojito cocktail", "old fashioned whiskey", "manhattan cocktail",
      "cosmopolitan drink", "bloody mary brunch", "mimosa champagne", "irish coffee",
      "cappuccino foam art", "cold brew coffee", "matcha green tea latte", "chai tea latte",
      "bubble tea pearls", "kombucha fermented", "fresh squeezed orange juice", "virgin daiquiri",
      // Cooking & Techniques
      "sous vide cooking", "flambe technique", "molecular gastronomy", "smoking meats low and slow",
      "fermented vegetables", "pickling cucumbers", "bread proofing dough", "tempering chocolate",
      "julienne cut vegetables", "chiffonade basil", "deglazing with wine", "reduction sauce",
      // Restaurant & Dining
      "tasting menu experience", "prix fixe dinner", "amuse bouche appetizer", "palate cleanser sorbet",
      "sommelier wine pairing", "farm to table dining", "michelin star restaurant", "food truck festival"
    ]
  },
  sports: {
    name: "Sports & Games",
    icon: "⚽",
    words: [
      // Basketball
      "slam dunk contest", "alley oop pass", "triple double stats", "three point line shot",
      "free throw shooting", "full court press defense", "fast break offense", "pick and roll play",
      "crossover dribble move", "fadeaway jumper shot", "bank shot off glass", "buzzer beater winner",
      // Football
      "hail mary pass attempt", "quarterback sneak play", "two point conversion", "onside kick recovery",
      "safety touchdown score", "field goal attempt", "overtime sudden death", "red zone offense",
      "blitz defense rush", "interception return touchdown", "fumble recovery", "first down marker",
      // Baseball
      "grand slam home run", "perfect game pitching", "stolen base attempt", "double play turn",
      "sacrifice fly ball", "designated hitter rule", "batting average stats", "earned run average",
      "relief pitcher closing", "pinch hitter substitute", "dugout celebration", "seventh inning stretch",
      // Soccer
      "bicycle kick goal", "penalty shootout kicks", "corner kick play", "offside trap defense",
      "hat trick scorer", "golden goal overtime", "stoppage time winner", "free kick wall",
      "goalkeeper diving save", "header goal score", "volley shot goal", "nutmeg dribble move",
      // Tennis & Golf
      "grand slam tournament", "match point serve", "advantage server game", "tiebreak deciding game",
      "ace serve winner", "double fault error", "hole in one shot", "eagle putt made",
      "birdie opportunity putt", "sand trap bunker shot", "fairway drive straight", "putting green reading",
      // Combat Sports
      "knockout punch winner", "submission hold tap", "technical knockout stoppage", "unanimous decision win",
      "split decision close", "championship belt holder", "weigh in ceremony", "octagon cage fight",
      // Olympics & Athletics
      "photo finish race", "world record attempt", "gold medal ceremony", "relay race baton handoff",
      "pole vault clearance", "shot put throw distance", "decathlon competition", "marathon finish line",
      "hurdles race clearance", "long jump landing", "high jump technique", "javelin throw distance",
      // Board Games & Cards
      "checkmate winning position", "poker bluff call", "royal flush hand", "full house cards",
      "blackjack dealer bust", "monopoly bankruptcy", "scrabble triple word score", "chess grandmaster title",
      "backgammon doubling cube", "bridge bidding system", "risk world domination", "settlers of catan trade",
      // Video Games & Esports
      "speedrun world record", "boss battle victory", "respawn point checkpoint", "power up item collect",
      "multiplayer lobby match", "ranked competitive mode", "esports tournament finals", "twitch streaming live",
      // Extreme Sports
      "halfpipe snowboarding trick", "big wave surfing ride", "bungee jumping freefall", "skydiving formation",
      "base jumping cliff dive", "parkour freerunning moves", "rock climbing summit reach", "whitewater rafting rapids"
    ]
  },
  culture: {
    name: "Culture & Arts",
    icon: "🎭",
    words: [
      // Famous Artworks
      "mona lisa enigmatic smile", "starry night swirling sky", "the scream expressionist", "girl with pearl earring",
      "sistine chapel ceiling fresco", "the last supper painting", "birth of venus botticelli", "persistence of memory clocks",
      "guernica by picasso", "water lilies monet series", "the kiss klimt gold", "american gothic painting",
      "nighthawks diner edward hopper", "the great wave hokusai", "vitruvian man proportions", "creation of adam touch",
      // Art Movements & Styles
      "impressionist brush strokes", "abstract expressionism movement", "pop art andy warhol", "art deco geometric design",
      "renaissance period masterpiece", "baroque dramatic lighting", "cubism fragmented forms", "surrealist dream imagery",
      "minimalist clean sculpture", "street art banksy style", "contemporary installation piece", "modern art museum exhibit",
      // Music & Performance
      "symphony orchestra performance", "jazz improvisation solo", "opera house aria", "ballet dancer en pointe",
      "hip hop freestyle beatbox", "acoustic guitar fingerpicking", "drum solo breakdown", "violin concerto movement",
      "piano recital classical", "gospel choir harmonies", "mariachi band trumpet", "string quartet chamber music",
      "rock concert stadium encore", "unplugged acoustic session", "music festival main stage", "world tour farewell finale",
      "standing ovation applause", "curtain call final bow", "opening night theater premiere", "sold out arena show",
      // Theater & Film
      "broadway musical showstopper", "shakespearean tragedy hamlet", "method acting stanislavski", "improvisational comedy scene",
      "dramatic monologue delivery", "plot twist shocking ending", "character arc development", "special effects blockbuster",
      "film noir detective mystery", "romantic comedy meet cute", "documentary feature film", "animated pixar feature",
      "director's cut extended version", "behind the scenes footage", "red carpet premiere night", "academy awards ceremony speech",
      // Literature
      "bestselling novel author", "poetry anthology collection", "literary classic novel", "short story fiction",
      "memoir autobiography life", "historical fiction novel", "science fiction dystopia", "mystery thriller suspense",
      "graphic novel illustrated", "children's picture book", "young adult fiction series", "book club discussion selection",
      // Dance
      "ballroom dancing waltz", "contemporary modern dance", "breakdancing battle competition", "salsa dancing partners",
      "tango passionate performance", "flamenco spanish dancer", "tap dancing rhythm", "line dancing country",
      "interpretive expressive dance", "choreographed synchronized routine", "dance recital student", "flash mob surprise dance",
      // Cultural Events
      "carnival celebration parade", "cultural heritage festival", "traditional ceremony ritual", "religious festival celebration",
      "art gallery opening reception", "museum exhibition tour", "poetry slam competition", "open mic comedy night"
    ]
  },
  world: {
    name: "World & Travel",
    icon: "🌍",
    words: [
      // Famous Landmarks
      "eiffel tower paris night", "statue of liberty torch", "great wall of china", "machu picchu inca ruins",
      "taj mahal white marble", "colosseum rome gladiators", "pyramids of giza sphinx", "big ben clock tower",
      "sydney opera house sails", "golden gate bridge fog", "christ the redeemer rio", "petra carved rock city",
      "angkor wat cambodia temple", "stonehenge mystery circle", "acropolis parthenon athens", "leaning tower of pisa",
      "burj khalifa tallest building", "empire state building nyc", "times square new year", "hollywood sign hills",
      // Natural Wonders
      "grand canyon colorado river", "niagara falls horseshoe", "great barrier reef coral", "northern lights aurora borealis",
      "victoria falls smoke thunder", "mount everest base camp", "amazon rainforest jungle", "sahara desert sand dunes",
      "dead sea salt floating", "yellowstone old faithful geyser", "giant sequoia redwood trees", "galapagos islands wildlife",
      "iguazu falls argentina brazil", "glacier national park montana", "norwegian fjords cruise", "swiss alps matterhorn",
      // Cities & Destinations
      "tokyo shibuya crossing lights", "venice gondola canal ride", "santorini blue dome sunset", "barcelona sagrada familia",
      "amsterdam tulip canal bikes", "prague astronomical clock", "istanbul grand bazaar spices", "marrakech medina souks",
      "bangkok floating market boats", "hong kong harbor skyline", "singapore marina bay gardens", "dubai palm island luxury",
      "las vegas casino strip", "rio de janeiro carnival", "havana vintage classic cars", "african safari big five",
      // Travel Experiences
      "backpacking hostel adventure", "luxury cruise ship voyage", "road trip route sixty six", "scenic train journey alps",
      "hot air balloon cappadocia", "helicopter grand canyon tour", "walking tour historic city", "food tour local cuisine",
      "scuba diving tropical reef", "snorkeling sea turtles", "zip line rainforest canopy", "kayaking glacier bay",
      "wilderness camping tent", "glamping luxury resort", "youth hostel dormitory", "boutique hotel design",
      "bed and breakfast cozy", "all inclusive beach resort", "vacation rental apartment", "home exchange travel swap",
      // Cultural Elements
      "passport stamps collection", "visa application process", "customs immigration declaration", "duty free airport shopping",
      "currency exchange rates", "language barrier translation", "local street food cuisine", "traditional folk costume",
      "religious temple worship", "ancient archaeological ruins", "historical monument memorial", "unesco world heritage site",
      // Geography
      "international date line crossing", "equator zero latitude", "arctic circle midnight sun", "tropical rainforest climate",
      "volcanic island hawaii", "coral reef atoll maldives", "continental divide rockies", "tectonic earthquake plates"
    ]
  },
  entertainment: {
    name: "Entertainment",
    icon: "🎬",
    words: [
      // Movies & TV
      "binge watching entire season", "season finale shocking cliffhanger", "plot twist nobody expected", "post credits scene teaser",
      "spoiler alert warning ahead", "character redemption story arc", "ensemble cast all stars", "origin story prequel film",
      "sequel trilogy announcement", "remake versus original debate", "crossover episode special", "bottle episode single location",
      "streaming service original exclusive", "theatrical wide release", "direct to streaming premiere", "limited series miniseries",
      "reality tv competition elimination", "late night talk show interview", "opening monologue jokes", "sketch comedy skit",
      "sitcom multi camera laugh track", "prestige drama series premiere", "anthology different stories series", "spin off new show",
      // Internet & Social Media
      "viral video million views", "trending hashtag twitter", "social media mega influencer", "content creator youtube",
      "live streaming twitch broadcast", "podcast weekly episode", "youtube subscriber milestone", "tiktok dance challenge viral",
      "instagram stories highlights", "twitter thread explanation", "reddit ama ask anything", "meme format template popular",
      "online community fan forum", "comment section heated debate", "reaction video compilation", "unboxing tech review video",
      "tutorial step by step", "daily vlog lifestyle", "collaboration crossover video", "behind the scenes documentary",
      // Gaming
      "video game midnight release", "downloadable content expansion", "season battle pass rewards", "microtransaction cosmetic purchase",
      "battle royale last standing", "open world sandbox exploration", "story campaign single player", "multiplayer online competitive",
      "virtual reality immersive headset", "augmented reality pokemon go", "mobile gaming casual app", "next gen console launch",
      "indie game small developer", "triple a blockbuster studio", "early access beta testing", "game of year awards",
      // Music Industry
      "album surprise drop release", "music video premiere youtube", "chart topping number one", "platinum certified sales record",
      "grammy awards nomination winner", "acoustic stripped down cover", "remix electronic dance version", "collaboration featured artist",
      "stadium world tour dates", "music festival coachella lineup", "concert merchandise tour shirt", "vip meet and greet package",
      "fan club exclusive membership", "album listening party event", "record label major signing", "independent unsigned artist",
      // Awards & Events
      "red carpet fashion best dressed", "emotional acceptance speech", "lifetime achievement honorary award", "hall of fame induction ceremony",
      "fan voted peoples choice", "critics consensus choice winner", "box office opening record", "weekend gross earnings numbers",
      // Celebrity Culture
      "paparazzi candid photograph", "exclusive celebrity interview", "tabloid gossip headline news", "public appearance signing autographs",
      "charity gala fundraiser event", "brand ambassador endorsement deal", "million dollar advertising contract", "publicity media stunt",
      "comeback album announcement tour", "retirement farewell announcement", "reunion special episode", "documentary tell all profile"
    ]
  },
  celebrities: {
    name: "Famous People",
    icon: "⭐",
    words: [
      // Types of Fame
      "hollywood movie star actor", "television sitcom personality", "chart topping pop musician", "bestselling fiction author",
      "legendary hall of fame athlete", "world leader politician", "tech billionaire entrepreneur", "silicon valley startup founder",
      "haute couture fashion designer", "supermodel runway victoria secret", "celebrity michelin chef", "late night talk show host",
      "stand up touring comedian", "social media mega influencer", "youtube millionaire sensation", "reality tv breakout star",
      "true crime podcast host", "professional gaming streamer", "viral internet meme personality", "former child star actor",
      // Historical Figures
      "american founding father", "civil rights movement leader", "french revolutionary figure", "ancient greek philosopher",
      "renaissance master artist", "classical symphony composer", "nobel prize winning scientist", "pulitzer literary author",
      "decorated military general commander", "european royal monarch ruler", "world religion spiritual leader", "age of exploration navigator",
      "industrial revolution pioneer", "wright brothers aviation pioneer", "apollo moon landing astronaut", "peace prize humanitarian winner",
      // Modern Icons
      "pop culture defining icon", "fashion trendsetting influencer", "fitness transformation guru", "wellness lifestyle coach",
      "ted talk motivational speaker", "self improvement life coach", "celebrity relationship therapist expert", "financial investing advisor guru",
      "self help bestselling author", "investigative journalism reporter", "cable news network anchor", "sports broadcasting analyst commentator",
      // Entertainment Roles
      "leading man actor oscar", "supporting actress academy award", "animated voice over actor", "dangerous stunt double performer",
      "auteur film director visionary", "hit making music producer", "celebrity dance choreographer", "powerful hollywood talent agent",
      "influential casting director", "emmy winning screenwriter showrunner", "cinematographer oscar winner", "costume designer period piece",
      // Music Industry Figures
      "rock and roll legend guitarist", "teen pop princess singer", "hip hop mogul music producer", "nashville country music star",
      "smooth jazz virtuoso saxophonist", "philharmonic orchestra conductor", "electronic dance dj producer", "nineties boyband heartthrob member",
      "one hit wonder flash singer", "successful comeback touring artist", "genre crossover fusion artist", "grammy duet partners collaboration",
      // Sports Figures
      "super bowl mvp quarterback", "wimbledon grand slam tennis champion", "world cup golden boot soccer", "summer olympics gold medalist",
      "heavyweight boxing world champion", "formula one racing world champion", "masters tournament professional golfer", "nba finals mvp basketball legend",
      "cooperstown baseball hall of famer", "stanley cup hockey champion", "wwe wrestling entertainment champion", "x games extreme sports gold medalist",
      // Business & Tech
      "silicon valley unicorn founder", "wall street hedge fund titan", "commercial real estate tycoon", "media conglomerate empire mogul",
      "fashion house luxury empire founder", "fast food restaurant chain founder", "hospitality hotel chain magnate", "cryptocurrency bitcoin billionaire",
      // Other Famous Types
      "international space station astronaut", "titanic wreck deep sea explorer", "endangered wildlife conservationist activist", "climate change environmental activist",
      "global humanitarian philanthropist billionaire", "united nations goodwill ambassador", "british royal family member", "white house first lady spouse"
    ]
  }
};

export const categoryKeys = Object.keys(categories);

export function getCategoryWords(categoryKey) {
  return categories[categoryKey]?.words || [];
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
