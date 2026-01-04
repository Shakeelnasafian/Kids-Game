
import React, { useState, useEffect } from 'react';
import { Language, Word } from '../types';
import { speakWord } from '../services/geminiService';
import { gameAudio } from '../services/audioService';
import { getWordDisplay } from '../utils/wordHelpers';

interface GameMatchProps {
  word: Word;
  options: Word[];
  onCorrect: () => void;
  onWrong: () => void;
  language: Language;
  supportMode: boolean;
}

export const GameMatch: React.FC<GameMatchProps> = ({ word, options, onCorrect, onWrong, language, supportMode }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const display = getWordDisplay(word, language, supportMode);

  useEffect(() => {
    setSelected(null);
    speakWord(word.word_en, { slow: supportMode });
  }, [word, supportMode]);

  const handleOptionClick = (optionId: string) => {
    if (isAnimating) return;
    setSelected(optionId);
    setIsAnimating(true);
    gameAudio.playClick();

    if (optionId === word.id) {
      gameAudio.playCorrect();
      setTimeout(() => {
        onCorrect();
        setIsAnimating(false);
      }, 800);
    } else {
      gameAudio.playWrong();
      setTimeout(() => {
        onWrong();
        setSelected(null);
        setIsAnimating(false);
        if (supportMode) {
          speakWord(word.word_en, { slow: true });
        }
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-bottom duration-500">
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
        {supportMode && (
          <p className="text-xs font-semibold text-slate-400">Tap the speaker to hear the word again.</p>
        )}
      </div>
      <div className="relative group">
        <div className="bg-white p-4 rounded-[2rem] shadow-2xl rotate-3 transform transition hover:rotate-0">
          <img 
            src={word.image} 
            alt="Target" 
            className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl"
          />
        </div>
        <button 
          onClick={() => speakWord(word.word_en, { slow: supportMode })}
          className="absolute -bottom-6 -right-6 bg-yellow-400 p-6 rounded-full shadow-xl hover:bg-yellow-300 transition-all hover:scale-110 active:scale-90"
        >
          <span className="text-3xl">🔊</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm px-4">
        {options.map((opt) => {
          const isCorrect = opt.id === word.id;
          const isSelected = selected === opt.id;
          const optionDisplay = getWordDisplay(opt, language, supportMode);
          
          let bgColor = 'bg-white';
          let borderCol = 'border-slate-200';
          if (isSelected) {
            bgColor = isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
            borderCol = isCorrect ? 'border-green-700' : 'border-red-700';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionClick(opt.id)}
              disabled={isAnimating}
              className={`rounded-2xl font-bold shadow-lg transition-all transform bubbly-button ${bgColor} border-b-8 ${borderCol} flex flex-col items-center ${supportMode ? 'p-6 text-3xl' : 'p-5 text-2xl'}`}
            >
              <span className={optionDisplay.primaryIsRtl ? 'arabic-text' : ''} dir={optionDisplay.primaryIsRtl ? 'rtl' : 'ltr'}>
                {optionDisplay.primary}
              </span>
              {optionDisplay.secondary && (
                <span
                  className={`text-base font-medium opacity-80 mt-1 ${optionDisplay.secondaryIsRtl ? 'arabic-text' : ''}`}
                  dir={optionDisplay.secondaryIsRtl ? 'rtl' : 'ltr'}
                >
                  {optionDisplay.secondary}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
