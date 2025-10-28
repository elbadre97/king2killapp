import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from './audio';

interface ManyBricksBreakerPageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

// Game constants
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 480;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 7;
const BRICK_ROWS = 5;
const BRICK_COLS = 7;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 2;
const BRICK_OFFSET_TOP = 40;
const BRICK_OFFSET_LEFT = 15;
const BRICK_HP_COLORS = ['#6ee7b7', '#fde047', '#fb923c', '#f87171', '#ef4444'];
const MAX_LEVELS = 5;

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
}

const ManyBricksBreakerPage: React.FC<ManyBricksBreakerPageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const paddleX = useRef((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const ball = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, dx: 3, dy: -3 });
  const bricks = useRef<Brick[]>([]);

  const createBricksForLevel = useCallback((lvl: number) => {
    const newBricks: Brick[] = [];
    const brickWidth = (CANVAS_WIDTH - BRICK_OFFSET_LEFT * 2) / BRICK_COLS - BRICK_PADDING;
    const rowsToCreate = BRICK_ROWS + Math.min(lvl - 1, 4);
    for (let r = 0; r < rowsToCreate; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        const x = c * (brickWidth + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        const y = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        const hp = Math.min(BRICK_HP_COLORS.length, Math.floor(r / 2) + lvl);
        newBricks.push({ x, y, width: brickWidth, height: BRICK_HEIGHT, hp });
      }
    }
    bricks.current = newBricks;
  }, []);

  const resetBallAndPaddle = useCallback(() => {
    paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
    ball.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      dx: (Math.random() > 0.5 ? 1 : -1) * (2.5 + (level - 1) * 0.3),
      dy: -2.5 - (level - 1) * 0.3,
    };
  }, [level]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Bricks
    bricks.current.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = BRICK_HP_COLORS[brick.hp - 1] || '#ef4444';
      ctx.fill();
      ctx.closePath();
    });

    // Draw Paddle
    ctx.beginPath();
    ctx.rect(paddleX.current, CANVAS_HEIGHT - PADDLE_HEIGHT - 10, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = '#4f46e5';
    ctx.fill();
    ctx.closePath();

    // Draw Ball
    ctx.beginPath();
    ctx.arc(ball.current.x, ball.current.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#f97316';
    ctx.fill();
    ctx.closePath();

    // Ball movement
    ball.current.x += ball.current.dx;
    ball.current.y += ball.current.dy;

    // Wall collision
    if (ball.current.x + ball.current.dx > CANVAS_WIDTH - BALL_RADIUS || ball.current.x + ball.current.dx < BALL_RADIUS) {
      ball.current.dx = -ball.current.dx;
      playSound('click');
    }
    if (ball.current.y + ball.current.dy < BALL_RADIUS) {
      ball.current.dy = -ball.current.dy;
      playSound('click');
    }

    // Paddle collision
    if (
      ball.current.y + ball.current.dy > CANVAS_HEIGHT - PADDLE_HEIGHT - 10 - BALL_RADIUS &&
      ball.current.x > paddleX.current &&
      ball.current.x < paddleX.current + PADDLE_WIDTH
    ) {
      ball.current.dy = -ball.current.dy;
      playSound('land');
    }

    // Bottom wall (lose life)
    if (ball.current.y + ball.current.dy > CANVAS_HEIGHT - BALL_RADIUS) {
      setLives(l => l - 1);
      resetBallAndPaddle();
    }

    // Brick collision
    bricks.current.forEach((brick, index) => {
      if (
        ball.current.x > brick.x &&
        ball.current.x < brick.x + brick.width &&
        ball.current.y > brick.y &&
        ball.current.y < brick.y + brick.height
      ) {
        ball.current.dy = -ball.current.dy;
        brick.hp -= 1;
        playSound('eat');
        if (brick.hp <= 0) {
          bricks.current.splice(index, 1);
          setScore(s => s + 10);
        }
      }
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [resetBallAndPaddle]);
  
  const handleStartGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    createBricksForLevel(1);
    resetBallAndPaddle();
    setGameResult(null);
    setGameState('playing');
  };
  
  useEffect(() => {
    if (gameState === 'playing') {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
        if(gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
  }, [gameState, gameLoop]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (lives <= 0) {
      playSound('gameOver');
      setGameResult('lose');
      setGameState('finished');
    }
    if (bricks.current.length === 0) {
      if (level >= MAX_LEVELS) {
        playSound('gameWin');
        setGameResult('win');
        setGameState('finished');
      } else {
        playSound('win');
        setLevel(l => l + 1);
        createBricksForLevel(level + 1);
        resetBallAndPaddle();
      }
    }
  }, [lives, level, createBricksForLevel, resetBallAndPaddle, gameState]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const relativeX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < CANVAS_WIDTH) {
      paddleX.current = Math.max(0, Math.min(relativeX - PADDLE_WIDTH / 2, CANVAS_WIDTH - PADDLE_WIDTH));
    }
  };
  
  const handleCollect = () => onFinish(score);

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2 px-2 text-gray-800 dark:text-gray-200 font-bold">
              <span>{t.manyBricksScore}: {score}</span>
              <span>{t.manyBricksLevel}: {level}</span>
              <span>{t.manyBricksLives}: {'❤️'.repeat(lives)}</span>
            </div>
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-inner cursor-none"
              onMouseMove={handleMouseMove}
            />
          </div>
        );
      case 'finished':
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-2">{gameResult === 'win' ? t.manyBricksYouWin : t.manyBricksGameOver}</h2>
            <div className="my-4">
                <p className="text-lg">{t.manyBricksScore}:</p>
                <p className="text-5xl font-bold text-purple-500 mb-2">{score}</p>
                <p className="text-xl font-bold text-green-500">+{score} ⭐</p>
            </div>
            <button
              onClick={handleCollect}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.manyBricksCollectPoints}
            </button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🧱</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameManyBricksBreaker}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.manyBricksStartDesc}</p>
            <button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.manyBricksStartButton}
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

export default ManyBricksBreakerPage;