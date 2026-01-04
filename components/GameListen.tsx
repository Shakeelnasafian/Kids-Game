
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { speakWord } from '../services/geminiService';

interface GameListenProps {
  word: Word;
  options: Word[];
  onCorrect: () => void;
  onWrong: () => void;
}

export const GameListen: React.FC<GameListenProps> = ({ word, options, onCorrect, onWrong }) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
    speakWord(word.word_en);
  }, [word]);

  const handlePick = (opt: Word) => {
    setSelected(opt.id);
    if (opt.id === word.id) {
      setTimeout(onCorrect, 1000);
    } else {
      setTimeout(() => {
        onWrong();
        setSelected(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12">
      <button 
        onClick={() => speakWord(word.word_en)}
        className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse ring-8 ring-blue-100 hover:scale-105 transition"
      >
        <span className="text-6xl">🔊</span>
      </button>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handlePick(opt)}
            className={`p-2 rounded-2xl bg-white shadow-lg transition transform hover:scale-105 ${selected === opt.id ? (opt.id === word.id ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400') : ''}`}
          >
            <img src={opt.image} alt={opt.word_en} className="w-32 h-32 object-cover rounded-xl" />
          </button>
        ))}
      </div>

      <p className="text-xl font-bold text-slate-500">Listen and Tap!</p>
    </div>
  );
};
