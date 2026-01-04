
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { speakWord } from '../services/geminiService';
import { gameAudio } from '../services/audioService';

interface GameMatchProps {
  word: Word;
  options: Word[];
  onCorrect: () => void;
  onWrong: () => void;
}

export const GameMatch: React.FC<GameMatchProps> = ({ word, options, onCorrect, onWrong }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setSelected(null);
    speakWord(word.word_en);
  }, [word]);

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
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="relative group">
        <div className="bg-white p-4 rounded-[2rem] shadow-2xl rotate-3 transform transition hover:rotate-0">
          <img 
            src={word.image} 
            alt="Target" 
            className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl"
          />
        </div>
        <button 
          onClick={() => speakWord(word.word_en)}
          className="absolute -bottom-6 -right-6 bg-yellow-400 p-6 rounded-full shadow-xl hover:bg-yellow-300 transition-all hover:scale-110 active:scale-90"
        >
          <span className="text-3xl">🔊</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm px-4">
        {options.map((opt) => {
          const isCorrect = opt.id === word.id;
          const isSelected = selected === opt.id;
          
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
              className={`p-5 rounded-2xl text-2xl font-bold shadow-lg transition-all transform bubbly-button ${bgColor} border-b-8 ${borderCol} flex flex-col items-center`}
            >
              <span>{opt.word_en}</span>
              <span className="text-base font-medium opacity-80 arabic-text mt-1">{opt.meaning_ur}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
