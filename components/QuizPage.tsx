import React, { useState, useEffect, useCallback } from 'react';
import { QuizCategory } from '../types';
import { QUIZ_DATA } from '../constants';
import { playSound } from './audio';

interface QuizPageProps {
  category: QuizCategory;
  onFinish: (pointsEarned: number, correctAnswers: number, totalQuestions: number) => void;
  t: any;
}

const QuizPage: React.FC<QuizPageProps> = ({ category, onFinish, t }) => {
  const [questions, setQuestions] = useState(QUIZ_DATA[category] || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [soundPlayedForFinish, setSoundPlayedForFinish] = useState(false);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, questions.length]);
  
  useEffect(() => {
    // The timer should not run if an answer is selected or the quiz is over.
    if (selectedOption !== null || isFinished) {
      return;
    }

    // When the timer hits zero, move to the next question.
    if (timeLeft <= 0) {
      playSound('lose');
      handleNextQuestion();
      return;
    }

    // Play the tick sound for the last 5 seconds.
    // The sound plays as the number changes (e.g., when it becomes 5, 4, 3, etc.).
    if (timeLeft <= 5) {
      playSound('tick');
    }

    // Set a timeout for the next second.
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clean up the timeout if the component re-renders or unmounts.
    return () => clearTimeout(timerId);
  }, [timeLeft, selectedOption, isFinished, handleNextQuestion]);


  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    if (questions[currentQuestionIndex].options[optionIndex].correct) {
      playSound('win');
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      playSound('lose');
    }
  };

  const calculateResults = () => {
    const pointsPerCorrectAnswer = questions[0]?.points || 10;
    let bonusPoints = 0;
    let title = t.quizResultTryAgain;
    let message = t.quizResultTryAgainMsg;

    if (correctAnswersCount === questions.length) {
        bonusPoints = 50;
        title = t.quizResultExcellent;
        message = t.quizResultExcellentMsg;
    } else if (correctAnswersCount >= Math.ceil(questions.length * 0.6)) {
        bonusPoints = 30;
        title = t.quizResultGood;
        message = t.quizResultGoodMsg;
    } else {
        bonusPoints = 10;
    }
    
    const totalPoints = (correctAnswersCount * pointsPerCorrectAnswer) + bonusPoints;
    
    return { totalPoints, title, message };
  };

  useEffect(() => {
    if (isFinished && !soundPlayedForFinish) {
        if (correctAnswersCount === questions.length || correctAnswersCount >= Math.ceil(questions.length * 0.6)) {
            playSound('gameWin');
        } else {
            playSound('gameOver');
        }
        setSoundPlayedForFinish(true);
    }
  }, [isFinished, soundPlayedForFinish, correctAnswersCount, questions.length]);

  if (isFinished) {
    const { totalPoints, title, message } = calculateResults();
    
    return (
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-4 text-white text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="text-3xl font-bold mb-2">+{totalPoints} ⭐</div>
          <p className="text-sm mb-4">{t.quizResultStats(correctAnswersCount, questions.length)}</p>
          <button 
            onClick={() => onFinish(totalPoints, correctAnswersCount, questions.length)}
            className="bg-white text-purple-500 px-6 py-2 rounded-full font-bold">
            {t.quizResultBack}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
        <div className="p-4 text-center dark:text-gray-200">
            <p>{t.quizNoQuestions}</p>
        </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-purple-100 dark:bg-gray-600 px-3 py-1 rounded-full text-purple-600 dark:text-purple-300 font-bold">{t.quizQuestionOf(currentQuestionIndex + 1, questions.length)}</div>
          <div className="bg-green-100 dark:bg-gray-600 px-3 py-1 rounded-full text-green-600 dark:text-green-300 font-bold">⭐ +{currentQuestion.points}</div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = option.correct;
              let optionClass = 'w-full bg-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 p-4 rounded-xl text-right font-medium hover:bg-purple-50 transition-colors';
              
              if (selectedOption !== null) {
                if (isCorrect) {
                  optionClass += ' correct-answer';
                } else if (isSelected && !isCorrect) {
                  optionClass += ' wrong-answer';
                }
              }
              
              return (
                <button 
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                  className={optionClass}>
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-300">{t.quizTime}: <span>{timeLeft}</span> {t.quizSeconds}</div>
          {selectedOption !== null && (
            <button onClick={handleNextQuestion} className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold">{t.next} ›</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;