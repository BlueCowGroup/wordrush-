// Word list for the game - common words that are fun to describe
export const wordList = [
  // Animals
  "elephant", "penguin", "giraffe", "butterfly", "dolphin", "kangaroo", "octopus", "flamingo",
  "rhinoceros", "cheetah", "peacock", "hedgehog", "salamander", "pelican", "armadillo",

  // Food & Drink
  "spaghetti", "pancake", "hamburger", "chocolate", "pineapple", "broccoli", "watermelon",
  "sandwich", "popcorn", "milkshake", "pretzel", "burrito", "croissant", "avocado",

  // Objects
  "umbrella", "telescope", "trampoline", "chandelier", "skateboard", "hammock", "lighthouse",
  "escalator", "microwave", "parachute", "submarine", "accordion", "wheelbarrow", "helicopter",

  // Activities
  "swimming", "juggling", "yodeling", "skydiving", "snorkeling", "gardening", "camping",
  "bowling", "surfing", "karaoke", "meditation", "knitting", "skateboarding", "gymnastics",

  // Places
  "volcano", "pyramid", "waterfall", "hospital", "library", "airport", "museum",
  "aquarium", "stadium", "carnival", "laboratory", "planetarium", "cathedral", "treehouse",

  // Concepts & Abstract
  "nightmare", "vacation", "birthday", "thunderstorm", "earthquake", "rainbow", "avalanche",
  "celebration", "adventure", "discovery", "imagination", "expedition", "revolution", "mystery",

  // Occupations
  "astronaut", "detective", "magician", "firefighter", "surgeon", "architect", "scientist",
  "musician", "photographer", "mechanic", "librarian", "veterinarian", "conductor", "pilot",

  // Nature
  "tornado", "glacier", "hurricane", "lightning", "sunrise", "moonlight", "blizzard",
  "meadow", "canyon", "jungle", "desert", "island", "mountain", "forest",

  // Entertainment
  "concert", "circus", "cartoon", "comedy", "magic", "parade", "festival",
  "theater", "orchestra", "ballet", "opera", "carnival", "fireworks", "rodeo",

  // Miscellaneous
  "bubble", "shadow", "whisper", "sparkle", "puzzle", "treasure", "secret",
  "adventure", "journey", "mystery", "legend", "miracle", "wonder", "dream"
];

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
