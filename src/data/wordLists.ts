export const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "between", "need", "large", "under", "never", "city", "tree", "cross",
  "every", "food", "keep", "last", "long", "much", "name", "same", "tell",
  "does", "set", "three", "house", "world", "still", "hand", "high", "place",
  "such", "again", "small", "found", "those", "right", "before", "must", "home",
  "while", "should", "each", "just", "move", "live", "own", "below", "real",
  "might", "open", "start", "point", "sound", "change", "play", "spell",
  "light", "kind", "off", "turn", "end", "port", "near", "add", "help",
  "line", "differ", "land", "letter", "mother", "answer", "study", "learn",
  "plant", "cover", "earth", "eye", "head", "story", "draw", "left", "late",
  "run", "press", "close", "night", "north", "form", "hard", "together",
];

export function generateWords(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
  }
  return words;
}
