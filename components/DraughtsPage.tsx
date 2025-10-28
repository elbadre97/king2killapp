import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from './audio';

interface DraughtsPageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
}

type Player = 'player1' | 'cpu';
type Piece = { player: Player; isKing: boolean } | null;
type Board = Piece[][];
type Move = { from: [number, number]; to: [number, number]; captures?: [number, number] };

const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { player: 'cpu', isKing: false };
      }
    }
  }
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { player: 'player1', isKing: false };
      }
    }
  }
  return board;
};

const DraughtsPage: React.FC<DraughtsPageProps> = ({ onFinish, t }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('player1');
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [points, setPoints] = useState(0);

  const getValidMoves = useCallback((boardState: Board, player: Player): Move[] => {
    const moves: Move[] = [];
    const captureMoves: Move[] = [];
    const dir = player === 'player1' ? -1 : 1;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardState[r][c];
        if (piece && piece.player === player) {
          const moveDirs = piece.isKing ? [dir, -dir] : [dir];
          for (const moveDir of moveDirs) {
            // Simple moves
            for (const d of [-1, 1]) {
              const [nr, nc] = [r + moveDir, c + d];
              if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && !boardState[nr][nc]) {
                moves.push({ from: [r, c], to: [nr, nc] });
              }
            }
            // Capture moves
            for (const d of [-1, 1]) {
              const [nr, nc] = [r + moveDir, c + d];
              const [jr, jc] = [r + moveDir * 2, c + d * 2];
              if (
                jr >= 0 && jr < 8 && jc >= 0 && jc < 8 &&
                boardState[nr] && boardState[nr][nc] && boardState[nr][nc]?.player !== player &&
                !boardState[jr][jc]
              ) {
                captureMoves.push({ from: [r, c], to: [jr, jc], captures: [nr, nc] });
              }
            }
          }
        }
      }
    }
    return captureMoves.length > 0 ? captureMoves : moves;
  }, []);
  
  const checkWinner = useCallback((boardState: Board) => {
    const player1Pieces = boardState.flat().filter(p => p?.player === 'player1').length;
    const cpuPieces = boardState.flat().filter(p => p?.player === 'cpu').length;

    if (player1Pieces === 0) return 'cpu';
    if (cpuPieces === 0) return 'player1';
    if (getValidMoves(boardState, 'player1').length === 0) return 'cpu';
    if (getValidMoves(boardState, 'cpu').length === 0) return 'player1';

    return null;
  }, [getValidMoves]);

  const handleMove = (move: Move) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => row.slice());
      const piece = newBoard[move.from[0]][move.from[1]];
      newBoard[move.to[0]][move.to[1]] = piece;
      newBoard[move.from[0]][move.from[1]] = null;

      if (move.captures) {
        newBoard[move.captures[0]][move.captures[1]] = null;
        playSound('eat');
      } else {
        playSound('click');
      }
      
      const movedPiece = newBoard[move.to[0]][move.to[1]];
      if(movedPiece){
        if ((movedPiece.player === 'player1' && move.to[0] === 0) || (movedPiece.player === 'cpu' && move.to[0] === 7)) {
            movedPiece.isKing = true;
        }
      }
      return newBoard;
    });
    setCurrentPlayer(prev => (prev === 'player1' ? 'cpu' : 'player1'));
    setSelectedPiece(null);
  };
  
  useEffect(() => {
    if(gameState !== 'playing') return;

    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameState('finished');
      if (gameWinner === 'player1') { // Player wins
        playSound('gameWin');
        setPoints(30);
      } else {
        playSound('gameOver');
        setPoints(0);
      }
    } else if (currentPlayer === 'cpu') { // CPU's turn
        setTimeout(() => {
          const cpuMoves = getValidMoves(board, 'cpu');
          if (cpuMoves.length > 0) {
            const randomMove = cpuMoves[Math.floor(Math.random() * cpuMoves.length)];
            handleMove(randomMove);
          }
        }, 500);
    }
  }, [board, currentPlayer, gameState, checkWinner, getValidMoves]);

  const handleSquareClick = (r: number, c: number) => {
    if (currentPlayer !== 'player1' || winner) return;

    const piece = board[r][c];
    if (piece && piece.player === 'player1') {
      setSelectedPiece([r, c]);
    } else if (selectedPiece) {
      const validMoves = getValidMoves(board, 'player1');
      const move = validMoves.find(m =>
        m.from[0] === selectedPiece[0] && m.from[1] === selectedPiece[1] &&
        m.to[0] === r && m.to[1] === c
      );
      if (move) {
        handleMove(move);
      }
    }
  };

  const handleStartGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('player1');
    setSelectedPiece(null);
    setWinner(null);
    setPoints(0);
    setGameState('playing');
  };
  
  const handleCollect = () => onFinish(points);

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
      case 'finished':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {winner ? (winner === 'player1' ? t.draughtsYouWin : t.draughtsCpuWins) : (currentPlayer === 'player1' ? t.draughtsYourTurn : t.draughtsCpuTurn)}
            </h2>
            <div className="bg-[#8B4513] p-1 rounded-lg shadow-lg">
              {board.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((piece, c) => (
                    <div
                      key={c}
                      onClick={() => handleSquareClick(r, c)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center
                        ${(r + c) % 2 === 0 ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
                        ${selectedPiece && selectedPiece[0] === r && selectedPiece[1] === c ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {piece && (
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg
                          ${piece.player === 'player1' ? 'bg-white border-2 border-gray-400' : 'bg-black'}
                          `}
                        >
                          {piece.isKing && <span className={`font-bold text-xs sm:text-sm ${piece.player === 'player1' ? 'text-black' : 'text-yellow-400'}`}>👑</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {gameState === 'finished' && (
              <div className="text-center mt-4">
                <p className="text-4xl font-bold text-purple-500">{t.draughtsPoints(points)}</p>
                <button onClick={handleCollect} className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold">
                  {t.draughtsCollectPoints}
                </button>
              </div>
            )}
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <div className="text-8xl mb-4">👑</div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameDraughts}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t.draughtsStartDesc}</p>
            <button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              {t.draughtsStartButton}
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

export default DraughtsPage;