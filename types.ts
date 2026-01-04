
export enum Language {
  EN = 'en',
  UR = 'ur',
  PS = 'ps'
}

export enum Category {
  ANIMALS = 'Animals',
  FRUITS = 'Fruits',
  COLORS = 'Colors',
  SCHOOL = 'School',
  NUMBERS = 'Numbers',
  BODY = 'Body Parts'
}

export interface Word {
  id: string;
  word_en: string;
  meaning_ur: string;
  meaning_ps: string;
  category: Category;
  image: string;
}

export interface UserStats {
  stars: number;
  unlockedCategories: Category[];
  learnedWords: string[];
  streak: number;
  lastPlayed: string;
}

export enum GameMode {
  MATCH = 'MATCH',
  SPELL = 'SPELL',
  LISTEN = 'LISTEN'
}

export interface GameState {
  currentWordIndex: number;
  score: number;
  isFinished: boolean;
  gameMode: GameMode;
}
