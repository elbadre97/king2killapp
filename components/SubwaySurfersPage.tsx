import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from './audio';

interface SubwaySurfersPageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

// Game constants
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;
const PLAYER_SIZE = 30;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 20;
const COIN_RADIUS = 10;
const LANE_WIDTH = CANVAS_WIDTH / 3;
const PLAYER_Y_POSITION = CANVAS_HEIGHT - PLAYER_SIZE - 20;
const INITIAL_GAME_SPEED = 4;
const MAX_GAME_SPEED = 8;
const SPEED_INCREASE_RATE = 0.0005;

// New vibrant colors
const PLAYER_COLOR = '#3498db'; // Bright Blue
const OBSTACLE_COLOR = '#e74c3c'; // Bright Red
const COIN_COLOR = '#f1c40f'; // Bright Yellow
const LANE_BG_COLOR = '#34495e';
const LANE_LINE_COLOR = '#566573';

const SubwaySurfersPage: React.FC<SubwaySurfersPageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const playerLane = useRef(1); // 0: left, 1: center, 2: right
  const obstacles = useRef<{ y: number; lane: number; }[]>([]);
  const coins = useRef<{ y: number; lane: number; }[]>([]);
  const frameCount = useRef(0);
  const gameSpeed = useRef(INITIAL_GAME_SPEED);

  const getLaneX = (lane: number) => lane * LANE_WIDTH + (LANE_WIDTH / 2);

  const stopGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    playSound('gameOver');
    setGameState('finished');
  }, []);

  const resetGame = useCallback(() => {
    playerLane.current = 1;
    obstacles.current = [];
    coins.current = [];
    frameCount.current = 0;
    setScore(0);
    gameSpeed.current = INITIAL_GAME_SPEED;
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    frameCount.current++;
    if (gameSpeed.current < MAX_GAME_SPEED) {
      gameSpeed.current += SPEED_INCREASE_RATE;
    }

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background (lanes)
    ctx.fillStyle = LANE_BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = LANE_LINE_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(LANE_WIDTH, 0);
    ctx.lineTo(LANE_WIDTH, CANVAS_HEIGHT);
    ctx.moveTo(LANE_WIDTH * 2, 0);
    ctx.lineTo(LANE_WIDTH * 2, CANVAS_HEIGHT);
    ctx.stroke();


    // Spawn new obstacles and coins
    if (frameCount.current % 75 === 0) {
      const lane = Math.floor(Math.random() * 3);
      if (Math.random() > 0.4) { // 60% chance of obstacle
        obstacles.current.push({ y: -OBSTACLE_HEIGHT, lane });
      } else { // 40% chance of coin
        coins.current.push({ y: -COIN_RADIUS, lane });
      }
    }

    // Update and draw coins
    for (let i = coins.current.length - 1; i >= 0; i--) {
      const coin = coins.current[i];
      coin.y += gameSpeed.current;
      
      // Draw coin
      ctx.fillStyle = COIN_COLOR;
      ctx.beginPath();
      ctx.arc(getLaneX(coin.lane), coin.y, COIN_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      // Check collision with player
      if (
        coin.lane === playerLane.current &&
        coin.y > PLAYER_Y_POSITION &&
        coin.y < PLAYER_Y_POSITION + PLAYER_SIZE
      ) {
        playSound('coin');
        setScore(prev => prev + 1);
        coins.current.splice(i, 1);
      } else if (coin.y > CANVAS_HEIGHT) {
        coins.current.splice(i, 1);
      }
    }

    // Update and draw obstacles
    for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.y += gameSpeed.current;

        // Draw obstacle
        ctx.fillStyle = OBSTACLE_COLOR;
        ctx.fillRect(getLaneX(obs.lane) - OBSTACLE_WIDTH / 2, obs.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);

        // Check collision
        if (
            obs.lane === playerLane.current &&
            obs.y + OBSTACLE_HEIGHT > PLAYER_Y_POSITION &&
            obs.y < PLAYER_Y_POSITION + PLAYER_SIZE
        ) {
            stopGame();
        } else if (obs.y > CANVAS_HEIGHT) {
            obstacles.current.splice(i, 1);
        }
    }

    // Draw player
    ctx.fillStyle = PLAYER_COLOR;
    const playerX = getLaneX(playerLane.current) - PLAYER_SIZE / 2;
    ctx.fillRect(playerX, PLAYER_Y_POSITION, PLAYER_SIZE, PLAYER_SIZE);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [stopGame]);

  const movePlayer = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left' && playerLane.current > 0) {
      playerLane.current--;
    }
    if (direction === 'right' && playerLane.current < 2) {
      playerLane.current++;
    }
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      resetGame();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, resetGame]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') movePlayer('left');
      if (e.key === 'ArrowRight') movePlayer('right');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, movePlayer]);


  const handleStart = () => setGameState('playing');
  const handleCollect = () => onFinish(score);

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2 px-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{t.subwayScore}: <span className="text-purple-500">{score}</span></h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.subwayInstructions}</p>
            </div>
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-inner"
            />
             <div className="relative w-full mt-4 h-20">
                <button onClick={() => movePlayer('left')} className="absolute left-0 w-[calc(50%-0.5rem)] h-full bg-purple-500 text-white p-4 rounded-lg font-bold text-2xl active:bg-purple-600 flex items-center justify-center">←</button>
                <button onClick={() => movePlayer('right')} className="absolute right-0 w-[calc(50%-0.5rem)] h-full bg-purple-500 text-white p-4 rounded-lg font-bold text-2xl active:bg-purple-600 flex items-center justify-center">→</button>
            </div>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-2">{t.subwayFinishedTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.subwayFinishedDesc}</p>
            <div className="my-4">
                <p className="text-lg">{t.subwayScore}:</p>
                <p className="text-5xl font-bold text-purple-500">+{score} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.subwayCollect}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🏄‍♂️</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameSubwaySurfers}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.subwayStartDesc}</p>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.subwayStartButton}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default SubwaySurfersPage;