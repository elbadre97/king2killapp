import React, { useState, useEffect, useCallback, useRef } from 'react';
import { playSound } from './audio';

// --- Game Constants ---
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOS = {
  'I': { shape: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]], color: 'cyan' },
  'J': { shape: [[1,0,0], [1,1,1], [0,0,0]], color: 'blue' },
  'L': { shape: [[0,0,1], [1,1,1], [0,0,0]], color: 'orange' },
  'O': { shape: [[1,1], [1,1]], color: 'yellow' },
  'S': { shape: [[0,1,1], [1,1,0], [0,0,0]], color: 'green' },
  'T': { shape: [[0,1,0], [1,1,1], [0,0,0]], color: 'purple' },
  'Z': { shape: [[1,1,0], [0,1,1], [0,0,0]], color: 'red' },
};

const TETROMINO_KEYS = Object.keys(TETROMINOS);

// --- Helper Functions ---
const createEmptyBoard = (): (string | null)[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

const checkCollision = (
  currentBoard: (string | null)[][],
  shape: number[][],
  pos: { x: number, y: number }
): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        if (
          !currentBoard[y + pos.y] ||
          currentBoard[y + pos.y][x + pos.x] === undefined ||
          currentBoard[y + pos.y][x + pos.x] !== null
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

const rotate = (matrix: number[][]) => {
  const rotated = matrix.map((_, index) => matrix.map(col => col[index]));
  return rotated.map(row => row.reverse());
};

// --- Component ---
interface TetrisPageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

const TetrisPage: React.FC<TetrisPageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOverSoundPlayed, setGameOverSoundPlayed] = useState(false);
  
  const player = useRef({
    pos: { x: 0, y: 0 },
    tetromino: { shape: [[0]], color: 'transparent' },
    collided: false,
  });

  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const dropCounter = useRef(0);

  const getDropTime = useCallback(() => 1000 / level + 100, [level]);

  const updatePlayerPos = ({ x, y, collided }: { x: number, y: number, collided?: boolean }) => {
    player.current.pos.x += x;
    player.current.pos.y += y;
    if (collided) {
        player.current.collided = collided;
    }
  };

  const resetPlayer = useCallback(() => {
    const randTetromino = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
    const newTetromino = TETROMINOS[randTetromino as keyof typeof TETROMINOS];
    player.current = {
      pos: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.shape[0].length / 2), y: 0 },
      tetromino: newTetromino,
      collided: false,
    };
    if (checkCollision(board, player.current.tetromino.shape, player.current.pos)) {
        if (!gameOverSoundPlayed) {
            playSound('gameOver');
            setGameOverSoundPlayed(true);
        }
        setGameState('finished');
    }
  }, [board, gameOverSoundPlayed]);

  const handlePlayerRotate = useCallback(() => {
    const clonedPlayer = JSON.parse(JSON.stringify(player.current));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);

    if (!checkCollision(board, clonedPlayer.tetromino.shape, clonedPlayer.pos)) {
      playSound('click');
      player.current = clonedPlayer;
    }
  },[board]);
  
  const movePlayer = useCallback((dir: -1 | 1) => {
    if (!checkCollision(board, player.current.tetromino.shape, { x: player.current.pos.x + dir, y: player.current.pos.y })) {
        updatePlayerPos({ x: dir, y: 0 });
    }
  }, [board]);

  const drop = useCallback(() => {
    if (!checkCollision(board, player.current.tetromino.shape, { x: player.current.pos.x, y: player.current.pos.y + 1 })) {
      updatePlayerPos({ x: 0, y: 1 });
    } else {
        playSound('land');
        if (player.current.pos.y < 1) {
            if (!gameOverSoundPlayed) {
                playSound('gameOver');
                setGameOverSoundPlayed(true);
            }
            setGameState('finished');
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [board, gameOverSoundPlayed]);
  
  const hardDrop = useCallback(() => {
    let newY = player.current.pos.y;
    while (!checkCollision(board, player.current.tetromino.shape, { x: player.current.pos.x, y: newY + 1 })) {
        newY++;
    }
    player.current.pos.y = newY;
    drop();
  }, [board, drop]);


  const gameLoop = useCallback((time: number) => {
    if (gameState !== 'playing') return;

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    dropCounter.current += deltaTime;

    if (dropCounter.current > getDropTime()) {
        drop();
        dropCounter.current = 0;
    }

    setBoard(prevBoard => {
        const newBoard = prevBoard.map(row => row.slice());
        if (player.current.collided) {
            player.current.tetromino.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                       if (newBoard[y + player.current.pos.y] && newBoard[y + player.current.pos.y][x + player.current.pos.x] !== undefined) {
                            newBoard[y + player.current.pos.y][x + player.current.pos.x] = player.current.tetromino.color;
                       }
                    }
                });
            });

            // Check for cleared lines
            let clearedLines = 0;
            for (let y = newBoard.length - 1; y >= 0; y--) {
                if (newBoard[y].every(cell => cell !== null)) {
                    clearedLines++;
                    newBoard.splice(y, 1);
                }
            }
            if(clearedLines > 0) {
                playSound('lineClear');
                while(newBoard.length < BOARD_HEIGHT) {
                   newBoard.unshift(Array(BOARD_WIDTH).fill(null));
                }
                setLines(prev => prev + clearedLines);
                setScore(prev => prev + [0, 100, 300, 500, 800][clearedLines] * level);
            }
            
            resetPlayer();
        }
        return newBoard;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, getDropTime, resetPlayer, drop, level]);

  useEffect(() => {
    if (lines >= level * 10) {
        setLevel(prev => prev + 1);
    }
  }, [lines, level]);

  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOverSoundPlayed(false);
    resetPlayer();
    setGameState('playing');
    lastTimeRef.current = 0;
    dropCounter.current = 0;
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') movePlayer(-1);
      else if (e.key === 'ArrowRight') movePlayer(1);
      else if (e.key === 'ArrowDown') drop();
      else if (e.key === 'ArrowUp') handlePlayerRotate();
      else if (e.key === ' ') hardDrop();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, movePlayer, drop, handlePlayerRotate, hardDrop]);
  
  const handleCollect = () => onFinish(Math.floor(score / 10));

  const renderBoard = () => {
    const currentBoard = board.map(row => row.slice());
    // Draw player piece onto the board copy
    player.current.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + player.current.pos.y;
          const boardX = x + player.current.pos.x;
          if (currentBoard[boardY] && currentBoard[boardY][boardX] !== undefined) {
            currentBoard[boardY][boardX] = player.current.tetromino.color;
          }
        }
      });
    });

    return (
      <div className="grid grid-cols-10 gap-px bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-1" style={{ gridTemplateRows: `repeat(${BOARD_HEIGHT}, minmax(0, 1fr))` }}>
        {currentBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-full aspect-square`}
              style={{
                backgroundColor: cell ? cell : 'transparent',
                border: '1px solid rgba(128, 128, 128, 0.1)'
              }}
            />
          ))
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-full sm:w-auto bg-gray-200 dark:bg-gray-900 p-1 rounded-lg">
                {renderBoard()}
            </div>
            <div className="flex flex-row sm:flex-col gap-4 w-full sm:w-28">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center w-full">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.tetrisScore}</p>
                    <p className="font-bold text-gray-800 dark:text-white">{score}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center w-full">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.tetrisLines}</p>
                    <p className="font-bold text-gray-800 dark:text-white">{lines}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center w-full">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.tetrisLevel}</p>
                    <p className="font-bold text-gray-800 dark:text-white">{level}</p>
                </div>
            </div>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-2">{t.tetrisGameOver}</h2>
            <div className="my-4">
              <p className="text-lg">{t.tetrisYourScore}</p>
              <p className="text-4xl font-bold text-purple-500 mb-2">{score}</p>
              <p className="text-xl font-bold text-green-500">+{Math.floor(score / 10)} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.tetrisCollectPoints}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🧱</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameTetris}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.tetrisStartDesc}</p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.tetrisStartButton}
            </button>
          </div>
        );
    }
  };

  const MobileControls = () => (
    <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
        <button onClick={() => movePlayer(-1)} className="col-start-1 bg-purple-500 text-white p-3 rounded-lg font-bold text-xl active:bg-purple-600">←</button>
        <button onClick={() => movePlayer(1)} className="col-start-3 bg-purple-500 text-white p-3 rounded-lg font-bold text-xl active:bg-purple-600">→</button>
        <button onClick={() => handlePlayerRotate()} className="col-span-1 col-start-2 row-start-1 bg-purple-500 text-white p-3 rounded-lg font-bold text-xl active:bg-purple-600">🔄</button>
        <button onClick={() => drop()} className="col-span-1 col-start-2 row-start-2 bg-purple-500 text-white p-3 rounded-lg font-bold text-xl active:bg-purple-600">↓</button>
        <button onClick={() => hardDrop()} className="col-span-3 mt-2 bg-pink-500 text-white p-3 rounded-lg font-bold active:bg-pink-600"> {t.tetrisDrop}</button>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        {renderContent()}
      </div>
      {gameState === 'playing' && <MobileControls />}
    </div>
  );
};

export default TetrisPage;