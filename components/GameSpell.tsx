
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { speakWord } from '../services/geminiService';

interface GameSpellProps {
  word: Word;
  onCorrect: () => void;
  onWrong: () => void;
}

export const GameSpell: React.FC<GameSpellProps> = ({ word, onCorrect, onWrong }) => {
  const letters = word.word_en.toUpperCase().split('');
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);

  useEffect(() => {
    const s = [...letters].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setAnswer(new Array(letters.length).fill(''));
    speakWord(word.word_en);
  }, [word]);

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
    <div className="flex flex-col items-center space-y-8 p-4">
      <img src={word.image} alt="Target" className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg" />
      
      <div className="flex flex-wrap gap-2 justify-center min-h-[4rem]">
        {answer.map((char, i) => (
          <div 
            key={i} 
            className="w-12 h-16 border-b-4 border-slate-300 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-blue-600 shadow-sm"
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
            className="w-14 h-14 bg-yellow-400 rounded-xl text-2xl font-bold shadow-md hover:bg-yellow-300 transform transition active:scale-90"
          >
            {char}
          </button>
        ))}
      </div>

      <button onClick={clearLast} className="text-slate-500 underline text-sm">Oops! Clear Last Letter</button>
    </div>
  );
};
