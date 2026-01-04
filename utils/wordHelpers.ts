import { Language, Word } from '../types';

export type WordDisplay = {
  primary: string;
  secondary?: string;
  primaryIsRtl: boolean;
  secondaryIsRtl: boolean;
};

const hasText = (value?: string) => Boolean(value && value.trim().length > 0);

export const getWordDisplay = (word: Word, language: Language, supportMode: boolean): WordDisplay => {
  if (language === Language.UR) {
    return {
      primary: hasText(word.meaning_ur) ? word.meaning_ur : word.word_en,
      secondary: word.word_en,
      primaryIsRtl: true,
      secondaryIsRtl: false
    };
  }

  if (language === Language.PS) {
    return {
      primary: hasText(word.meaning_ps) ? word.meaning_ps : word.word_en,
      secondary: word.word_en,
      primaryIsRtl: true,
      secondaryIsRtl: false
    };
  }

  return {
    primary: word.word_en,
    secondary: supportMode && hasText(word.meaning_ur) ? word.meaning_ur : '',
    primaryIsRtl: false,
    secondaryIsRtl: supportMode && hasText(word.meaning_ur)
  };
};
