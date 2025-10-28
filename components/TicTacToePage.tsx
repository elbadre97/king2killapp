import React, { useState, useEffect } from 'react';
import { playSound } from './audio';

interface TicTacToePageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

const calculateWinner = (squares: (string | null)[]): { winner: string | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  if (squares.every(square => square !== null)) {
    return { winner: 'draw', line: null };
  }
  return { winner: null, line: null };
};

const getLineStyle = (line: number[]): string => {
    const lineStr = JSON.stringify(line.sort((a, b) => a - b));
    switch (lineStr) {
        // Horizontal
        case '[0,1,2]': return 'h-1.5 w-[90%] top-[16.66%] left-[5%]';
        case '[3,4,5]': return 'h-1.5 w-[90%] top-1/2 -translate-y-1/2 left-[5%]';
        case '[6,7,8]': return 'h-1.5 w-[90%] bottom-[16.66%] left-[5%]';
        // Vertical
        case '[0,3,6]': return 'w-1.5 h-[90%] top-[5%] left-[16.66%]';
        case '[1,4,7]': return 'w-1.5 h-[90%] top-[5%] left-1/2 -translate-x-1/2';
        case '[2,5,8]': return 'w-1.5 h-[90%] top-[5%] right-[16.66%]';
        // Diagonal
        case '[0,4,8]': return 'h-1.5 w-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 origin-center';
        case '[2,4,6]': return 'h-1.5 w-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 origin-center';
        default: return 'hidden';
    }
};


const TicTacToePage: React.FC<TicTacToePageProps> = ({ onFinish, t }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc' | null>(null);
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [points, setPoints] = useState(0);

  const findBestMove = (currentBoard: (string | null)[]) => {
    // 1. Check if CPU ('O') can win
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = currentBoard.slice();
        testBoard[i] = 'O';
        if (calculateWinner(testBoard).winner === 'O') return i;
      }
    }
    // 2. Check if player ('X') can win and block
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = currentBoard.slice();
        testBoard[i] = 'X';
        if (calculateWinner(testBoard).winner === 'X') return i;
      }
    }
    // 3. Take center if available
    if (!currentBoard[4]) return 4;
    // 4. Take a random corner if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !currentBoard[i]);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    // 5. Take any available square
    const availableSquares = currentBoard.map((sq, i) => sq === null ? i : null).filter(i => i !== null);
    if (availableSquares.length > 0) {
        return availableSquares[Math.floor(Math.random() * availableSquares.length)] as number;
    }
    return null;
  };

  useEffect(() => {
    const { winner: result, line } = calculateWinner(board);
    if (result) {
      setWinner(result);
      setWinningLine(line);
      setGameState('finished');
      if (result === 'draw') {
        playSound('noMatch');
        setPoints(0);
      } else {
        if (gameMode === 'pvc' && result === 'O') {
          playSound('lose');
        } else {
          playSound('gameWin');
        }
        setPoints(20);
      }
      return;
    }

    if (gameMode === 'pvc' && !isXNext && !result) {
      setIsCpuThinking(true);
      const timer = setTimeout(() => {
        const newBoard = board.slice();
        const bestMove = findBestMove(newBoard);
        if (bestMove !== null) {
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
        setIsCpuThinking(false);
      }, 700);
      return () => clearTimeout(timer);
    }

  }, [board, gameMode, isXNext]);

  const handleClick = (i: number) => {
    if (winner || board[i] || gameState !== 'playing' || isCpuThinking || (gameMode === 'pvc' && !isXNext)) {
      return;
    }
    playSound('click');
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleStart = (mode: 'pvp' | 'pvc') => {
    setGameMode(mode);
    setGameState('playing');
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setPoints(0);
  }

  const handlePlayAgain = () => {
    resetGame();
    setGameState('playing');
  };

  const handleCollect = () => {
    const pointsToAward = (winner && winner !== 'draw') ? 20 : 0;
    onFinish(pointsToAward);
  };

  const renderSquare = (i: number) => {
    const value = board[i];
    const colorClass = value === 'X' ? 'text-blue-500' : 'text-pink-500';
    return (
      <button
        className={`w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center text-5xl font-bold transition-colors ${colorClass}`}
        onClick={() => handleClick(i)}
        disabled={!!value || !!winner || isCpuThinking}
        aria-label={`Square ${i + 1}`}
      >
        {value}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      if (winner === 'draw') return <h2 className="text-2xl font-bold mb-4">{t.ticTacToeDraw}</h2>;
      if (gameMode === 'pvc' && winner === 'O') {
        return <h2 className="text-2xl font-bold mb-4">{t.ticTacToeKing2KillWins}</h2>;
      }
      return <h2 className="text-2xl font-bold mb-4">{t.ticTacToeWinner(winner)}</h2>;
    }
    if (isCpuThinking) {
        return <h2 className="text-2xl font-bold mb-4">{t.ticTacToeCpuTurn}</h2>;
    }
    if (gameMode === 'pvc') {
        return isXNext ? <h2 className="text-2xl font-bold mb-4">{t.ticTacToeYourTurn}</h2> : <h2 className="text-2xl font-bold mb-4">{t.ticTacToeCpuTurn}</h2>;
    }
    return <h2 className="text-2xl font-bold mb-4">{t.ticTacToeTurn(isXNext ? 'X' : 'O')}</h2>;
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="flex flex-col items-center">
            {renderStatus()}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 relative" dir="ltr">
              {Array(9).fill(null).map((_, i) => renderSquare(i))}
            </div>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center text-gray-800 dark:text-gray-200">
            {renderStatus()}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 relative my-4" dir="ltr">
              {Array(9).fill(null).map((_, i) => renderSquare(i))}
              {winningLine && (
                <div 
                  className={`absolute bg-red-500 rounded-full transition-all duration-300 ${getLineStyle(winningLine)}`}
                ></div>
              )}
            </div>
            {winner !== 'draw' && (
              <div className="my-4">
                <p className="text-5xl font-bold text-purple-500">+{points} ⭐</p>
              </div>
            )}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePlayAgain}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-full font-bold"
              >
                {t.ticTacToePlayAgain}
              </button>
              <button
                onClick={handleCollect}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold"
              >
                {t.ticTacToeCollectPoints}
              </button>
            </div>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">🎲</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameTicTacToe}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.ticTacToeStartDesc}</p>
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">{t.ticTacToeChooseMode}</h3>
            <div className="flex flex-col gap-4">
                <button
                onClick={() => handleStart('pvc')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                {t.ticTacToePlayerVsCpu}
                </button>
                <button
                onClick={() => handleStart('pvp')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                {t.ticTacToePlayerVsPlayer}
                </button>
            </div>
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

export default TicTacToePage;