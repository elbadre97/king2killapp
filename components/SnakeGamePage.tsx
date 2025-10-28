import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from './audio';

interface SnakeGamePageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

// Game constants
const BOARD_SIZE = 20;
const CELL_SIZE = 15; // Adjusted for a decent size on mobile
const CANVAS_SIZE = BOARD_SIZE * CELL_SIZE;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 9, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const DIRECTIONS = {
  'ArrowUp': { x: 0, y: -1 },
  'ArrowDown': { x: 0, y: 1 },
  'ArrowLeft': { x: -1, y: 0 },
  'ArrowRight': { x: 1, y: 0 },
};
const GAME_SPEED_START = 120;
const GAME_SPEED_INCREMENT = 4;

const SnakeGamePage: React.FC<SnakeGamePageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS['ArrowRight']);
  const [speed, setSpeed] = useState(GAME_SPEED_START);
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  const createFood = (currentSnake: { x: number, y: number }[]) => {
    while (true) {
        const newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        };
        // Ensure food doesn't spawn on the snake
        if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
  };

  const stopGame = () => {
    if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
    }
    playSound('gameOver');
    setGameState('finished');
  };
  
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(createFood(INITIAL_SNAKE));
    setDirection(DIRECTIONS['ArrowRight']);
    setSpeed(GAME_SPEED_START);
    setScore(0);
  };
  
  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const handleKeyDown = useCallback((e: { key: string }) => {
    const key = e.key as keyof typeof DIRECTIONS;
    const newDirection = DIRECTIONS[key];
    if (newDirection) {
        setDirection(prevDirection => {
            // Prevent snake from reversing
            const isOpposite = (
                (newDirection.y !== 0 && newDirection.y === -prevDirection.y) ||
                (newDirection.x !== 0 && newDirection.x === -prevDirection.x)
            );
            return isOpposite ? prevDirection : newDirection;
        });
    }
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
        const keydownHandler = (e: KeyboardEvent) => handleKeyDown(e);
        window.addEventListener('keydown', keydownHandler);
        return () => window.removeEventListener('keydown', keydownHandler);
    }
  }, [gameState, handleKeyDown]);

  const gameLoop = useCallback(() => {
    const newSnake = JSON.parse(JSON.stringify(snake));
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
    newSnake.unshift(head);

    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        stopGame();
        return;
    }
    // Self collision
    for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
            stopGame();
            return;
        }
    }

    // Food collision
    if (head.x === food.x && head.y === food.y) {
        playSound('eat');
        setScore(prev => prev + 1);
        setFood(createFood(newSnake));
        setSpeed(prev => Math.max(40, prev - GAME_SPEED_INCREMENT));
    } else {
        newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, direction, food]);

  useEffect(() => {
    if (gameState === 'playing') {
        gameLoopRef.current = setTimeout(gameLoop, speed);
    }
    return () => {
        if (gameLoopRef.current) {
            clearTimeout(gameLoopRef.current);
        }
    };
  }, [snake, gameState, speed, gameLoop]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // New background
    ctx.fillStyle = '#1d2b3b'; // Dark blue
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for(let i = 0; i < BOARD_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e'; // Bright green head, slightly darker body
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.strokeStyle = '#1d2b3b';
        ctx.strokeRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Draw food
    ctx.fillStyle = '#f43f5e'; // Bright red/rose
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  }, [snake, food]);
  
  const handleCollect = () => onFinish(score);

  const MobileControls = () => (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-48 h-48 mx-auto mt-4">
        <button onClick={() => handleKeyDown({ key: 'ArrowUp' })} className="col-start-2 row-start-1 bg-purple-500 text-white p-2 rounded-lg font-bold text-xl active:bg-purple-600">▲</button>
        <button onClick={() => handleKeyDown({ key: 'ArrowLeft' })} className="col-start-1 row-start-2 bg-purple-500 text-white p-2 rounded-lg font-bold text-xl active:bg-purple-600">◀</button>
        <button onClick={() => handleKeyDown({ key: 'ArrowRight' })} className="col-start-3 row-start-2 bg-purple-500 text-white p-2 rounded-lg font-bold text-xl active:bg-purple-600">▶</button>
        <button onClick={() => handleKeyDown({ key: 'ArrowDown' })} className="col-start-2 row-start-3 bg-purple-500 text-white p-2 rounded-lg font-bold text-xl active:bg-purple-600">▼</button>
    </div>
  );

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{t.snakeScore}: <span className="text-purple-500">{score}</span></h3>
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-inner"
            />
            <MobileControls />
          </div>
        );
      case 'finished':
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-2">{t.snakeGameOver}</h2>
            <div className="my-4">
                <p className="text-lg">{t.snakeYourScore}:</p>
                <p className="text-5xl font-bold text-purple-500 mb-2">{score}</p>
                <p className="text-xl font-bold text-green-500">+{score} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.snakeCollectPoints}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🐍</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameSnake}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.snakeStartDesc}</p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.snakeStartButton}
            </button>
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

export default SnakeGamePage;