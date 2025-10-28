import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from './audio';

interface NumberPuzzlePageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

const EMPTY_TILE = null;

const createSolvedGrid = (size: number): (number | null)[][] => {
  const grid: (number | null)[][] = [];
  let count = 1;
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(count++);
    }
    grid.push(row);
  }
  grid[size - 1][size - 1] = EMPTY_TILE;
  return grid;
};

const NumberPuzzlePage: React.FC<NumberPuzzlePageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [gridSize, setGridSize] = useState(4);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const findTilePos = useCallback((tileValue: number | null, currentGrid: (number | null)[][], size: number) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === tileValue) {
          return { r, c };
        }
      }
    }
    return null;
  }, []);

  const shuffleGrid = useCallback((size: number) => {
    let currentGrid = createSolvedGrid(size);
    const shuffleMoves = size * size * 15;

    for (let i = 0; i < shuffleMoves; i++) {
      const emptyPos = findTilePos(EMPTY_TILE, currentGrid, size);
      if (!emptyPos) continue;

      const { r, c } = emptyPos;
      const neighbors = [];
      if (r > 0) neighbors.push({ r: r - 1, c });
      if (r < size - 1) neighbors.push({ r: r + 1, c });
      if (c > 0) neighbors.push({ r, c: c - 1 });
      if (c < size - 1) neighbors.push({ r, c: c + 1 });

      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      currentGrid[r][c] = currentGrid[randomNeighbor.r][randomNeighbor.c];
      currentGrid[randomNeighbor.r][randomNeighbor.c] = EMPTY_TILE;
    }
    return currentGrid;
  }, [findTilePos]);

  const handleStartGame = (size: number) => {
    setGridSize(size);
    setGrid(shuffleGrid(size));
    setMoves(0);
    setTime(0);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const isSolved = useCallback((currentGrid: (number | null)[][], size: number) => {
    const flatGrid = currentGrid.flat();
    const totalTiles = size * size;

    for (let i = 0; i < totalTiles - 1; i++) {
      if (flatGrid[i] !== i + 1) {
        return false;
      }
    }

    return flatGrid[totalTiles - 1] === EMPTY_TILE;
  }, []);

  const handleTileClick = (r: number, c: number) => {
    if (gameState !== 'playing' || grid[r][c] === EMPTY_TILE) return;

    const emptyPos = findTilePos(EMPTY_TILE, grid, gridSize);
    if (!emptyPos) return;

    const { r: emptyR, c: emptyC } = emptyPos;

    const isAdjacent = (Math.abs(r - emptyR) + Math.abs(c - emptyC)) === 1;

    if (isAdjacent) {
      playSound('click');
      const newGrid = grid.map(row => [...row]);
      newGrid[emptyR][emptyC] = newGrid[r][c];
      newGrid[r][c] = EMPTY_TILE;
      
      setGrid(newGrid);
      setMoves(m => m + 1);

      if (isSolved(newGrid, gridSize)) {
        playSound('gameWin');
        setGameState('finished');
      }
    }
  };
  
  const calculatePoints = () => {
    let basePoints = 100;
    let timeLimit = 180;
    let moveLimit = 50;

    if (gridSize === 3) {
      basePoints = 50;
      timeLimit = 60;
      moveLimit = 30;
    } else if (gridSize === 5) {
      basePoints = 250;
      timeLimit = 600;
      moveLimit = 150;
    }

    const timeBonus = Math.max(0, timeLimit - time);
    const movePenalty = Math.max(0, moves - moveLimit);
    return Math.max(10, basePoints + timeBonus - movePenalty);
  };

  const handleCollect = () => {
    onFinish(calculatePoints());
  };
  
  const getTileClass = (size: number) => {
    switch (size) {
        case 3: return 'w-20 h-20 sm:w-24 sm:h-24 text-3xl';
        case 5: return 'w-12 h-12 sm:w-14 sm:h-14 text-xl';
        case 4:
        default: return 'w-16 h-16 sm:w-20 sm:h-20 text-2xl';
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.numberPuzzleMoves}</div>
                <div className="font-bold text-2xl text-purple-600 dark:text-purple-400">{moves}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.numberPuzzleTime}</div>
                <div className="font-bold text-2xl text-purple-600 dark:text-purple-400">{time}s</div>
              </div>
            </div>
            <div className={`grid grid-cols-${gridSize} gap-2 bg-purple-100 dark:bg-slate-800 p-2 rounded-lg`} style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
              {grid.map((row, r) =>
                row.map((tile, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleTileClick(r, c)}
                    className={`flex items-center justify-center font-bold rounded-md transition-all duration-200 ease-in-out
                      ${getTileClass(gridSize)}
                      ${tile === EMPTY_TILE 
                        ? 'bg-purple-200/50 dark:bg-slate-700/50 cursor-default' 
                        : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg transform hover:scale-105 hover:brightness-110'
                      }`}
                  >
                    {tile}
                  </button>
                ))
              )}
            </div>
          </div>
        );
      case 'finished':
        const pointsEarned = calculatePoints();
        return (
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t.numberPuzzleFinishedTitle}</h2>
            <p className="opacity-80 mb-4">{t.numberPuzzleFinishedDesc}</p>
            <div className="my-4 space-y-2 bg-white/10 p-4 rounded-lg">
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-sm opacity-80">{t.numberPuzzleTime}</p>
                        <p className="font-bold text-xl">{time}s</p>
                    </div>
                    <div>
                        <p className="text-sm opacity-80">{t.numberPuzzleMoves}</p>
                        <p className="font-bold text-xl">{moves}</p>
                    </div>
                </div>
                <p className="text-5xl font-bold text-yellow-300 pt-4">+{pointsEarned} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform mt-4"
            >
              {t.numberPuzzleCollectPoints}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🔢</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameNumberPuzzle}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.numberPuzzleStartDesc}</p>
             <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">{t.numberPuzzleChooseLevel}</h3>
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => handleStartGame(3)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                    {t.numberPuzzleLevelEasy}
                </button>
                <button
                    onClick={() => handleStartGame(4)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                    {t.numberPuzzleLevelMedium}
                </button>
                 <button
                    onClick={() => handleStartGame(5)}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                    {t.numberPuzzleLevelHard}
                </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default NumberPuzzlePage;