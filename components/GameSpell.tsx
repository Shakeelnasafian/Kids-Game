
import React, { useState, useEffect } from 'react';
import { Language, Word } from '../types';
import { speakWord } from '../services/geminiService';

interface GameSpellProps {
  word: Word;
  onCorrect: () => void;
  onWrong: () => void;
  language: Language;
  supportMode: boolean;
}

export const GameSpell: React.FC<GameSpellProps> = ({ word, onCorrect, onWrong, language, supportMode }) => {
  const letters = word.word_en.toUpperCase().split('');
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(supportMode);
  const display = (() => {
    if (language === Language.UR) {
      return {
        primary: word.meaning_ur,
        secondary: supportMode ? word.word_en : '',
        primaryIsRtl: true,
        secondaryIsRtl: false
      };
    }
    if (language === Language.PS) {
      return {
        primary: word.meaning_ps,
        secondary: supportMode ? word.word_en : '',
        primaryIsRtl: true,
        secondaryIsRtl: false
      };
    }
    if (supportMode && word.meaning_ur) {
      return {
        primary: word.meaning_ur,
        secondary: '',
        primaryIsRtl: true,
        secondaryIsRtl: false
      };
    }
    return {
      primary: '',
      secondary: '',
      primaryIsRtl: false,
      secondaryIsRtl: false
    };
  })();

  useEffect(() => {
    const s = [...letters].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setAnswer(new Array(letters.length).fill(''));
    setShowHint(supportMode);
    speakWord(word.word_en, { slow: supportMode });
  }, [word, supportMode]);

  const addLetter = (char: string, index: number) => {
    const nextEmpty = answer.indexOf('');
    if (nextEmpty === -1) return;

    const newAnswer = [...answer];
    newAnswer[nextEmpty] = char;
    setAnswer(newAnswer);

    const newShuffled = [...shuffled];
    newShuffled.splice(index, 1);
    setShuffled(newShuffled);

    if (newAnswer.join('') === letters.join('')) {
      setTimeout(onCorrect, 1000);
    } else if (!newAnswer.includes('') && newAnswer.join('') !== letters.join('')) {
      setTimeout(() => {
        onWrong();
        setAnswer(new Array(letters.length).fill(''));
        setShuffled([...letters].sort(() => Math.random() - 0.5));
        if (supportMode) {
          speakWord(word.word_en, { slow: true });
        }
      }, 1000);
    }
  };

  const clearLast = () => {
    const lastIdx = answer.map(x => x !== '').lastIndexOf(true);
    if (lastIdx === -1) return;
    
    const char = answer[lastIdx];
    const newAnswer = [...answer];
    newAnswer[lastIdx] = '';
    setAnswer(newAnswer);
    setShuffled([...shuffled, char]);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {display.primary && (
        <div className="text-center space-y-2">
          <div
            className={`text-4xl font-black text-slate-700 ${display.primaryIsRtl ? 'arabic-text' : ''}`}
            dir={display.primaryIsRtl ? 'rtl' : 'ltr'}
          >
            {display.primary}
          </div>
          {display.secondary && (
            <div
              className={`text-lg font-semibold text-slate-500 ${display.secondaryIsRtl ? 'arabic-text' : ''}`}
              dir={display.secondaryIsRtl ? 'rtl' : 'ltr'}
            >
              {display.secondary}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <img src={word.image} alt="Target" className={`rounded-2xl border-4 border-white shadow-lg ${supportMode ? 'w-56 h-56' : 'w-48 h-48'}`} />
        <button
          onClick={() => speakWord(word.word_en, { slow: supportMode })}
          className="absolute -bottom-4 -right-4 bg-yellow-400 p-4 rounded-full shadow-lg hover:bg-yellow-300 transition-all hover:scale-110 active:scale-90"
        >
          <span className="text-2xl">🔊</span>
        </button>
      </div>

      {showHint && (
        <div className="rounded-2xl bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800 shadow-sm">
          Hint: starts with <span className="text-lg">{letters[0]}</span>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 justify-center min-h-[4rem]">
        {answer.map((char, i) => (
          <div 
            key={i} 
            className={`border-b-4 border-slate-300 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600 shadow-sm ${supportMode ? 'w-14 h-20 text-4xl' : 'w-12 h-16 text-3xl'}`}
          >
            {char}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {shuffled.map((char, i) => (
          <button
            key={i}
            onClick={() => addLetter(char, i)}
            className={`bg-yellow-400 rounded-xl font-bold shadow-md hover:bg-yellow-300 transform transition active:scale-90 ${supportMode ? 'w-16 h-16 text-3xl' : 'w-14 h-14 text-2xl'}`}
          >
            {char}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setShowHint(prev => !prev)} className="text-slate-500 underline text-sm">
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        <button onClick={clearLast} className="text-slate-500 underline text-sm">Oops! Clear Last Letter</button>
      </div>
    </div>
  );
};
