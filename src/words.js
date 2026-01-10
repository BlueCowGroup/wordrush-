// Word categories for the game - each category has 40 words/phrases

export const categories = {
  food: {
    name: "Food & Drink",
    icon: "🍔",
    words: [
      "spaghetti", "sushi", "tacos", "pizza", "hamburger",
      "chocolate cake", "ice cream sundae", "french fries", "chicken wings", "lobster",
      "avocado toast", "pad thai", "fish and chips", "burrito", "croissant",
      "maple syrup", "buffalo wings", "cheese fondue", "apple pie", "ramen",
      "pancakes", "eggs benedict", "grilled cheese", "hot dog", "nachos",
      "cheesecake", "fried rice", "clam chowder", "beef jerky", "spring rolls",
      "milkshake", "espresso", "smoothie bowl", "barbecue ribs", "crab cakes",
      "banana split", "garlic bread", "onion rings", "Caesar salad", "tiramisu"
    ]
  },

  sports: {
    name: "Sports & Games",
    icon: "⚽",
    words: [
      "slam dunk", "home run", "touchdown", "hole in one", "checkmate",
      "penalty kick", "triple axel", "slam dunk", "grand slam", "hat trick",
      "free throw", "volleyball spike", "gymnastics", "marathon", "wrestling",
      "surfing", "skateboarding", "snowboarding", "rock climbing", "scuba diving",
      "archery", "fencing", "bowling strike", "ping pong", "badminton",
      "rugby tackle", "baseball pitch", "golf swing", "tennis serve", "relay race",
      "pole vault", "high jump", "swimming butterfly", "boxing knockout", "karate",
      "billiards", "darts", "horseback riding", "water polo", "rowing"
    ]
  },

  culture: {
    name: "Culture & Arts",
    icon: "🎭",
    words: [
      "Mona Lisa", "ballet dancer", "jazz music", "street art", "origami",
      "opera singer", "symphony orchestra", "abstract painting", "pottery wheel", "Shakespeare",
      "hip hop dance", "oil painting", "sculpture garden", "mime artist", "graffiti",
      "folk music", "stand-up comedy", "magic show", "puppet show", "circus act",
      "tap dancing", "breakdancing", "acoustic guitar", "drum solo", "piano recital",
      "art gallery", "museum exhibit", "theater play", "book club", "poetry slam",
      "film noir", "documentary", "animation", "photography", "calligraphy",
      "mosaic art", "stained glass", "woodcarving", "fashion design", "beatboxing"
    ]
  },

  world: {
    name: "World & Travel",
    icon: "🌍",
    words: [
      "Eiffel Tower", "Great Wall", "pyramids of Egypt", "Amazon rainforest", "Northern Lights",
      "Mount Everest", "Grand Canyon", "Niagara Falls", "Great Barrier Reef", "Sahara Desert",
      "Tokyo subway", "Venice canals", "African safari", "tropical island", "ancient ruins",
      "hot air balloon", "cruise ship", "passport stamp", "time zone", "jet lag",
      "world map", "compass", "backpacking", "road trip", "train station",
      "Statue of Liberty", "Big Ben", "Colosseum", "Taj Mahal", "Machu Picchu",
      "Sydney Opera House", "Golden Gate Bridge", "Mount Fuji", "Stonehenge", "windmill",
      "pagoda", "castle", "lighthouse", "volcano", "glacier"
    ]
  },

  entertainment: {
    name: "Entertainment",
    icon: "🎬",
    words: [
      "binge watching", "plot twist", "cliffhanger", "viral video", "podcast",
      "reality TV", "game show", "talk show", "music festival", "concert",
      "red carpet", "box office", "sequel", "remake", "streaming",
      "superhero movie", "romantic comedy", "horror film", "animated movie", "documentary",
      "video game", "arcade", "karaoke", "escape room", "theme park",
      "roller coaster", "haunted house", "magic trick", "juggling", "fireworks",
      "talent show", "dance battle", "lip sync", "flash mob", "photo booth",
      "trivia night", "board game", "card game", "puzzle", "scavenger hunt"
    ]
  },

  celebrities: {
    name: "Famous People",
    icon: "⭐",
    words: [
      "movie star", "rock star", "pop singer", "rapper", "comedian",
      "talk show host", "news anchor", "sports legend", "Olympic athlete", "world champion",
      "fashion model", "supermodel", "influencer", "YouTuber", "TikTok star",
      "billionaire", "tech mogul", "inventor", "scientist", "astronaut",
      "president", "royal family", "prince", "princess", "queen",
      "chef celebrity", "TV chef", "author", "playwright", "director",
      "producer", "DJ", "choreographer", "magician", "stunt performer",
      "voice actor", "child star", "one-hit wonder", "power couple", "icon"
    ]
  }
};

// Get array of category keys
export const categoryKeys = Object.keys(categories);

// Get words for a specific category
export function getCategoryWords(categoryKey) {
  return categories[categoryKey]?.words || [];
}

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
