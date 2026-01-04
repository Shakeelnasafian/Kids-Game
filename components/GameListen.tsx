
import React, { useState, useEffect } from 'react';
import { Language, Word } from '../types';
import { speakWord } from '../services/geminiService';
import { getWordDisplay } from '../utils/wordHelpers';

interface GameListenProps {
  word: Word;
  options: Word[];
  onCorrect: () => void;
  onWrong: () => void;
  language: Language;
  supportMode: boolean;
}

export const GameListen: React.FC<GameListenProps> = ({ word, options, onCorrect, onWrong, language, supportMode }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const display = getWordDisplay(word, language, supportMode);
  const showDisplay = supportMode || language !== Language.EN;

  useEffect(() => {
    setSelected(null);
    speakWord(word.word_en, { slow: supportMode });
  }, [word, supportMode]);

  const handlePick = (opt: Word) => {
    setSelected(opt.id);
    if (opt.id === word.id) {
      setTimeout(onCorrect, 1000);
    } else {
      setTimeout(() => {
        onWrong();
        setSelected(null);
        if (supportMode) {
          speakWord(word.word_en, { slow: true });
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {showDisplay && (
        <div className="text-center space-y-1">
          <div
            className={`text-3xl font-black text-slate-700 ${display.primaryIsRtl ? 'arabic-text' : ''}`}
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
      <button 
        onClick={() => speakWord(word.word_en, { slow: supportMode })}
        className={`bg-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse ring-8 ring-blue-100 hover:scale-105 transition ${supportMode ? 'w-36 h-36' : 'w-32 h-32'}`}
      >
        <span className="text-6xl">🔊</span>
      </button>

      <div className={`grid grid-cols-2 gap-4 ${supportMode ? 'w-full max-w-md' : ''}`}>
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handlePick(opt)}
            className={`rounded-2xl bg-white shadow-lg transition transform hover:scale-105 ${selected === opt.id ? (opt.id === word.id ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400') : ''} ${supportMode ? 'p-4' : 'p-2'}`}
          >
            <img src={opt.image} alt={opt.word_en} className={`${supportMode ? 'w-40 h-40' : 'w-32 h-32'} object-cover rounded-xl`} />
          </button>
        ))}
      </div>

      <p className="text-xl font-bold text-slate-500">Listen and Tap!</p>
    </div>
  );
};
