
import React, { useState, useEffect } from 'react';
import { VOCABULARY } from './data/vocabulary';
import { Category, Word, UserStats, GameMode, Language } from './types';
import { GameMatch } from './components/GameMatch';
import { GameSpell } from './components/GameSpell';
import { GameListen } from './components/GameListen';
import { gameAudio } from './services/audioService';
import { Confetti } from './components/Confetti';

const App: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'CATEGORIES' | 'GAME' | 'REWARDS'>('HOME');
  const [showConfetti, setShowConfetti] = useState(false);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('kpk_kids_stats');
    return saved ? JSON.parse(saved) : {
      stars: 0,
      unlockedCategories: [Category.ANIMALS],
      learnedWords: [],
      streak: 0,
      lastPlayed: ''
    };
  });

  const [currentCategory, setCurrentCategory] = useState<Category>(Category.ANIMALS);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.MATCH);
  const [wordIndex, setWordIndex] = useState(0);
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [supportMode, setSupportMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kpk_kids_support_mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kpk_kids_language');
    return saved === Language.UR || saved === Language.PS ? saved : Language.EN;
  });

  useEffect(() => {
    localStorage.setItem('kpk_kids_stats', JSON.stringify(stats));
  }, [stats]);
  
  useEffect(() => {
    localStorage.setItem('kpk_kids_support_mode', JSON.stringify(supportMode));
  }, [supportMode]);

  useEffect(() => {
    localStorage.setItem('kpk_kids_language', language);
  }, [language]);

  const sessionLength = supportMode ? 6 : 10;
  const optionCount = supportMode ? 2 : 4;

  const startLevel = (cat: Category, mode: GameMode) => {
    gameAudio.playClick();
    const filtered = VOCABULARY.filter(w => w.category === cat);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setGameWords(shuffled.slice(0, sessionLength)); // Limit per session
    setCurrentCategory(cat);
    setGameMode(mode);
    setWordIndex(0);
    setView('GAME');
  };

  const handleCorrect = () => {
    const currentWord = gameWords[wordIndex];
    
    setStats(prev => ({
      ...prev,
      stars: prev.stars + 1,
      learnedWords: Array.from(new Set([...prev.learnedWords, currentWord.id]))
    }));

    if (wordIndex < gameWords.length - 1) {
      setWordIndex(prev => prev + 1);
    } else {
      gameAudio.playWin();
      setShowConfetti(true);
      setTimeout(() => setView('REWARDS'), 500);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handleWrong = () => {
    // Feedback provided in components
  };

  const getOptions = (correctWord: Word, count = 4) => {
    const others = VOCABULARY.filter(w => w.id !== correctWord.id).sort(() => Math.random() - 0.5);
    const needed = Math.max(1, count - 1);
    return [correctWord, ...others.slice(0, needed)].sort(() => Math.random() - 0.5);
  };

  const renderGame = () => {
    const currentWord = gameWords[wordIndex];
    if (!currentWord) return null;

    switch (gameMode) {
      case GameMode.MATCH:
        return (
          <GameMatch
            word={currentWord}
            options={getOptions(currentWord, optionCount)}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            language={language}
            supportMode={supportMode}
          />
        );
      case GameMode.SPELL:
        return (
          <GameSpell
            word={currentWord}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            language={language}
            supportMode={supportMode}
          />
        );
      case GameMode.LISTEN:
        return (
          <GameListen
            word={currentWord}
            options={getOptions(currentWord, optionCount)}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            language={language}
            supportMode={supportMode}
          />
        );
    }
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto flex flex-col relative overflow-hidden bg-gradient-to-b from-green-50 to-blue-50">
      {showConfetti && <Confetti />}

      {/* BACKGROUND DECO */}
      <div className="absolute top-10 -left-10 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-64 h-64 bg-green-400 opacity-10 rounded-full blur-3xl"></div>

      {/* TOP BAR */}
      <header className="p-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg border-2 border-green-100">
          <span className="text-2xl">⭐</span>
          <span className="font-bold text-xl text-green-700">{stats.stars}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { gameAudio.playClick(); setSupportMode(prev => !prev); }}
            className={`px-4 py-2 rounded-full text-xs font-black shadow-lg border-2 transition-all ${supportMode ? 'bg-green-500 text-white border-green-600' : 'bg-white/80 text-slate-500 border-slate-100'}`}
          >
            SUPPORT: {supportMode ? 'ON' : 'OFF'}
          </button>
          <button 
            onClick={() => { gameAudio.playClick(); setView('HOME'); }}
            className="bg-white/80 p-3 rounded-full shadow-lg border-2 border-slate-100 hover:scale-110 active:scale-95 transition-all"
          >
            <span className="text-3xl">🏠</span>
          </button>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 z-10 flex flex-col overflow-y-auto">
        {view === 'HOME' && (
          <div className="flex flex-col items-center justify-center space-y-10 py-4 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-2">
              <h1 className="text-6xl font-black text-green-600 drop-shadow-md tracking-tight">KIDS QUEST!</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Adventure in Learning</p>
            </div>
            
            <div className="relative group">
               <img src="https://images.unsplash.com/photo-1491153059943-412fcc355adb?w=600" alt="Hero" className="w-full h-64 object-cover rounded-[3rem] shadow-2xl animate-bounce-subtle border-8 border-white transform group-hover:rotate-2 transition-all" />
               <div className="absolute -bottom-4 -left-4 bg-yellow-400 p-4 rounded-2xl shadow-lg rotate-12 font-bold text-slate-800">PAKISTAN! 🇵🇰</div>
            </div>

            <div className="w-full space-y-6">
              <button 
                onClick={() => setView('CATEGORIES')}
                className="w-full py-8 bg-green-500 text-white text-4xl font-black rounded-[2.5rem] shadow-[0_12px_0_rgb(21,128,61)] hover:bg-green-400 transform transition active:translate-y-2 active:shadow-none flex items-center justify-center space-x-6"
              >
                <span>LET'S GO!</span>
                <span className="text-5xl animate-bounce">🚀</span>
              </button>

              <div className="bg-white p-5 rounded-3xl shadow-xl border-b-8 border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Learning Support</p>
                    <p className="text-lg font-black text-slate-700">Slow Mode</p>
                    <p className="text-xs text-slate-400">Fewer choices, extra hints, slow audio.</p>
                  </div>
                  <button
                    onClick={() => { gameAudio.playClick(); setSupportMode(prev => !prev); }}
                    className={`px-5 py-3 rounded-2xl text-sm font-black shadow-md border-2 transition-all ${supportMode ? 'bg-green-500 text-white border-green-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`}
                  >
                    {supportMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { gameAudio.playClick(); setView('REWARDS'); }}
                  className="bg-white p-6 rounded-3xl shadow-xl font-black text-blue-500 border-b-8 border-slate-200 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 transition"
                >
                  <span className="text-3xl">🏆</span>
                  <span>AWARDS</span>
                </button>
                <div className="bg-white p-6 rounded-3xl shadow-xl font-black text-orange-500 border-b-8 border-slate-200 flex flex-col items-center justify-center space-y-2">
                  <span className="text-3xl">🔥</span>
                  <span>{stats.streak} STREAK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'CATEGORIES' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-center text-slate-700">Pick a World!</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.values(Category).map((cat) => (
                <div key={cat} className="group cursor-pointer">
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-b-8 border-slate-200 group-hover:border-blue-500 transition-all transform group-hover:-translate-y-2">
                    <div className="text-center text-6xl mb-4 transform group-hover:scale-125 transition">
                      {cat === Category.ANIMALS && '🦁'}
                      {cat === Category.FRUITS && '🍎'}
                      {cat === Category.COLORS && '🎨'}
                      {cat === Category.SCHOOL && '🎒'}
                      {cat === Category.NUMBERS && '🔢'}
                      {cat === Category.BODY && '👤'}
                    </div>
                    <h3 className="text-center font-black text-slate-700 text-xl mb-4">{cat}</h3>
                    <div className="flex flex-col space-y-3">
                      <button 
                        onClick={() => startLevel(cat, GameMode.MATCH)}
                        className="w-full py-3 bg-blue-500 text-white rounded-2xl font-black text-sm shadow-md hover:bg-blue-600 transition"
                      >
                        MATCH
                      </button>
                      <button 
                        onClick={() => startLevel(cat, GameMode.SPELL)}
                        className="w-full py-3 bg-purple-500 text-white rounded-2xl font-black text-sm shadow-md hover:bg-purple-600 transition"
                      >
                        SPELL
                      </button>
                      <button 
                        onClick={() => startLevel(cat, GameMode.LISTEN)}
                        className="w-full py-3 bg-teal-500 text-white rounded-2xl font-black text-sm shadow-md hover:bg-teal-600 transition"
                      >
                        LISTEN
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'GAME' && (
          <div className="flex-1 flex flex-col">
            {supportMode && (
              <div className="mb-4 rounded-2xl bg-white/80 border border-green-200 p-3 text-sm font-semibold text-green-700 shadow-sm">
                Learning Support is ON: fewer choices, extra hints, slow audio.
              </div>
            )}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 h-6 bg-white rounded-full overflow-hidden shadow-inner border-2 border-slate-100 p-1">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700" 
                  style={{ width: `${(wordIndex / gameWords.length) * 100}%` }}
                />
              </div>
              <span className="font-black text-slate-400 text-lg">{wordIndex + 1}/{gameWords.length}</span>
            </div>
            {renderGame()}
          </div>
        )}

        {view === 'REWARDS' && (
          <div className="flex flex-col items-center justify-center space-y-10 py-10 animate-in zoom-in duration-700">
            <div className="text-center space-y-2">
              <h2 className="text-6xl font-black text-yellow-500 drop-shadow-lg">FANTASTIC!</h2>
              <p className="text-slate-500 font-bold text-xl">Level Complete! 🥳</p>
            </div>

            <div className="relative group">
              <div className="text-[12rem] animate-bounce-subtle drop-shadow-2xl">🏆</div>
              <div className="absolute top-0 -right-8 bg-red-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl border-4 border-white rotate-12">
                +{gameWords.length}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full text-center space-y-6 border-b-8 border-slate-100">
              <h3 className="text-2xl font-black text-slate-700">CHAMPION STATS</h3>
              <div className="flex justify-around text-xl font-black">
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-2">⭐</span>
                  <span className="text-yellow-500">{stats.stars} Total</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-2">🔥</span>
                  <span className="text-orange-500">Super Hot!</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { gameAudio.playClick(); setView('CATEGORIES'); }}
              className="w-full py-8 bg-green-500 text-white text-3xl font-black rounded-[2.5rem] shadow-[0_10px_0_rgb(21,128,61)] transform transition active:translate-y-2 active:shadow-none"
            >
              PLAY AGAIN!
            </button>
          </div>
        )}
      </main>

      {/* FOOTER - LANGUAGE TOGGLE */}
      {view === 'HOME' && (
        <footer className="p-8 bg-white/90 backdrop-blur-md border-t-4 border-green-100 flex flex-col space-y-4">
          <p className="text-center font-bold text-slate-400 text-sm">SWITCH LANGUAGE</p>
          <div className="flex justify-center space-x-3">
            {[
              { id: Language.EN, label: 'ENGLISH', col: 'bg-blue-500' },
              { id: Language.UR, label: 'اردو', col: 'bg-green-500' },
              { id: Language.PS, label: 'پښتو', col: 'bg-orange-500' }
            ].map(lang => (
              <button 
                key={lang.id}
                className={`flex-1 py-3 rounded-2xl font-black transition-all transform active:scale-95 border-b-4 ${language === lang.id ? `${lang.col} text-white border-black/20` : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                onClick={() => { gameAudio.playClick(); setLanguage(lang.id); }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
