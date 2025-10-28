import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playSound } from './audio';

interface TypingRacePageProps {
  onFinish: (pointsEarned: number) => void;
  t: any;
  language: 'ar' | 'en';
}

const GAME_TIME_SECONDS = 60;
const PARAGRAPHS = {
    en: [
        "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
        "Technology has revolutionized the way we live and work, connecting people across the globe instantly.",
        "To be or not to be, that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
        "The journey of a thousand miles begins with a single step. It is important to start, no matter how small.",
    ],
    ar: [
        "النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.",
        "التكنولوجيا الرقمية غيّرت الطريقة التي نتواصل بها ونتعلم ونعمل، وفتحت آفاقاً جديدة للإبداع والابتكار.",
        "السفر يفتح العقل ويثري الروح، فهو يعرّفك على ثقافات جديدة ويعلمك أشياء لم تكن تعرفها من قبل.",
        "لكي تكون ناجحاً، يجب أن تؤمن بنفسك أولاً. الثقة بالنفس هي مفتاح تحقيق الأهداف والطموحات.",
    ]
};

const TypingRacePage: React.FC<TypingRacePageProps> = ({ onFinish, t, language }) => {
    const [gameState, setGameState] = useState<'idle' | 'countdown' | 'playing' | 'finished'>('idle');
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(GAME_TIME_SECONDS);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [countdown, setCountdown] = useState(3);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const resetGame = useCallback(() => {
        const paragraphs = PARAGRAPHS[language];
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        setCurrentParagraph(paragraphs[randomIndex]);
        setUserInput('');
        setTimeLeft(GAME_TIME_SECONDS);
        setWpm(0);
        setAccuracy(100);
        setCountdown(3);
        if(timerRef.current) clearInterval(timerRef.current);
    }, [language]);

    const startGame = () => {
        resetGame();
        setGameState('countdown');
    };

    useEffect(() => {
        if (gameState === 'countdown' && countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown(c => c - 1);
            }, 1000);
        } else if (countdown === 0) {
            setGameState('playing');
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [gameState, countdown]);
    
    useEffect(() => {
        if (gameState === 'playing') {
            inputRef.current?.focus();
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setGameState('finished');
                        playSound('gameOver');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [gameState]);
    
    useEffect(() => {
        if (gameState === 'playing') {
            const correctChars = userInput.split('').filter((char, index) => char === currentParagraph[index]).length;
            const elapsedTimeInMinutes = (GAME_TIME_SECONDS - timeLeft) / 60;
            
            if (elapsedTimeInMinutes > 0) {
                const calculatedWpm = Math.round((correctChars / 5) / elapsedTimeInMinutes);
                setWpm(calculatedWpm);
            }
            
            const calculatedAccuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
            setAccuracy(parseFloat(calculatedAccuracy.toFixed(1)));
            
            if (userInput.length === currentParagraph.length) {
                if (timerRef.current) clearInterval(timerRef.current);
                setGameState('finished');
                playSound('gameWin');
            }
        }
    }, [userInput, timeLeft, currentParagraph, gameState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameState === 'playing') {
            setUserInput(e.target.value);
        }
    };
    
    const calculatePoints = () => {
        const points = Math.round((wpm * 0.8) + (accuracy * 0.2));
        return Math.max(0, points);
    };

    const handleCollect = () => {
        onFinish(calculatePoints());
    };

    const renderParagraph = () => {
        return (
            <div className="text-xl sm:text-2xl leading-relaxed tracking-wider font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg select-none" dir="ltr">
                {currentParagraph.split('').map((char, index) => {
                    let charClass = 'text-gray-400 dark:text-gray-500';
                    if (index < userInput.length) {
                        charClass = userInput[index] === char ? 'text-green-500' : 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 rounded';
                    } else if (index === userInput.length) {
                        charClass = 'text-blue-500 animate-pulse border-b-2 border-blue-500';
                    }
                    return <span key={index} className={charClass}>{char}</span>;
                })}
            </div>
        );
    };

    const renderContent = () => {
        switch (gameState) {
            case 'countdown':
                return (
                     <div className="text-center">
                        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">{t.typingRaceCountdownGetReady}</p>
                        <p className="text-9xl font-bold text-purple-500">{countdown}</p>
                    </div>
                );
            case 'playing':
                return (
                    <div className="flex flex-col items-center">
                        <div className="w-full flex justify-around items-center mb-6 bg-white dark:bg-gray-700 p-3 rounded-xl shadow-inner">
                            <div className="text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{t.typingRaceTimeLeft}</div>
                                <div className="font-bold text-3xl text-purple-600 dark:text-purple-400">{timeLeft}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{t.typingRaceWPM}</div>
                                <div className="font-bold text-3xl text-purple-600 dark:text-purple-400">{wpm}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{t.typingRaceAccuracy}</div>
                                <div className="font-bold text-3xl text-purple-600 dark:text-purple-400">{accuracy}%</div>
                            </div>
                        </div>
                        {renderParagraph()}
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            className="absolute top-[-9999px] left-[-9999px] opacity-0"
                            autoFocus
                        />
                    </div>
                );
            case 'finished':
                 const pointsEarned = calculatePoints();
                 return (
                    <div className="text-center text-gray-800 dark:text-gray-200">
                        <h2 className="text-2xl font-bold mb-2">{t.typingRaceFinishedTitle}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{t.typingRaceFinishedDesc}</p>
                        <div className="my-4 p-4 bg-purple-50 dark:bg-gray-800 rounded-lg">
                            <h3 className="font-bold mb-2">{t.typingRaceYourStats}</h3>
                            <div className="flex justify-around text-lg">
                                <p><strong>{wpm}</strong> {t.typingRaceWPM}</p>
                                <p><strong>{accuracy}%</strong> {t.typingRaceAccuracy}</p>
                            </div>
                            <p className="text-5xl font-bold text-purple-500 mt-4">+{pointsEarned} ⭐</p>
                        </div>
                        <button
                            onClick={handleCollect}
                            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-transform"
                        >
                            {t.typingRaceCollectPoints}
                        </button>
                    </div>
                );
            case 'idle':
            default:
                 return (
                    <div className="text-center">
                        <div className="text-8xl mb-4">⌨️</div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.gameTypingRace}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">{t.typingRaceStartDesc}</p>
                        <button
                            onClick={startGame}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-transform"
                        >
                            {t.typingRaceStartButton}
                        </button>
                    </div>
                );
        }
    };
    
    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-lg">
                {renderContent()}
            </div>
        </div>
    );
};

export default TypingRacePage;