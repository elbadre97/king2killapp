import React, { useState, useEffect, useRef } from 'react';
import { playSound } from './audio';

interface MemoryGamePageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

const ICONS = ['🍓', '🍌', '🍎', '🍇', '🍉', '🍊', '🍍', '🥝'];

const generateCards = () => {
  const cards = [...ICONS, ...ICONS]
    .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const MemoryGamePage: React.FC<MemoryGamePageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);
  
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards.find(c => c.id === firstIndex);
      const secondCard = cards.find(c => c.id === secondIndex);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // Match
        playSound('match');
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.icon === firstCard.icon ? { ...card, isMatched: true } : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        playSound('noMatch');
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched) && gameState === 'playing') {
      playSound('gameWin');
      setGameState('finished');
    }
  }, [cards, gameState]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length >= 2) return;
    const cardToFlip = cards.find(c => c.id === id);
    if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) return;

    playSound('click');
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    
    if(flippedCards.length === 0) {
        setFlippedCards([id]);
    } else {
        setFlippedCards(prev => [...prev, id]);
        setMoves(prevMoves => prevMoves + 1);
    }
  };

  const startGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setGameState('playing');
  };
  
  const calculatePoints = () => {
      // Fewer moves and less time = more points
      const basePoints = 50;
      const timeBonus = Math.max(0, 60 - time); // Bonus for finishing under 60s
      const movePenalty = Math.max(0, moves - 10); // Penalty for more than 10 moves
      return Math.max(10, basePoints + timeBonus - movePenalty * 2);
  }

  const handleCollect = () => {
    onFinish(calculatePoints());
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.memoryMoves}</div>
                <div className="font-bold text-lg text-gray-800 dark:text-gray-200">{moves}</div>
              </div>
               <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{t.memoryTime}</div>
                <div className="font-bold text-lg text-gray-800 dark:text-gray-200">{time} {t.memorySeconds}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {cards.map(card => (
                <div key={card.id} className="w-16 h-16 sm:w-20 sm:h-20 perspective-1000" onClick={() => handleCardClick(card.id)}>
                  <div className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-lg flex items-center justify-center text-3xl font-bold text-white cursor-pointer">?</div>
                    {/* Back */}
                    <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center text-3xl sm:text-4xl ${card.isMatched ? 'bg-green-400' : 'bg-green-200 dark:bg-gray-600'}`}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'finished':
        const pointsEarned = calculatePoints();
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-2">{t.memoryFinishedTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.memoryFinishedDesc}</p>
            <div className="my-4 space-y-2">
              <p>{t.memoryTime}: {time} {t.memorySeconds}</p>
              <p>{t.memoryMoves}: {moves}</p>
              <p className="text-5xl font-bold text-purple-500">+{pointsEarned} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.memoryCollectPoints}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameMemoryGame}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.memoryStartDesc}</p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.memoryStartButton}
            </button>
          </div>
        );
    }
  };
  
  // Add some simple CSS for the 3D flip effect
  const style = document.createElement('style');
  style.innerHTML = `
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  `;
  document.head.appendChild(style);


  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default MemoryGamePage;
