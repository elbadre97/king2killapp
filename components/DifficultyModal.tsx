import React from 'react';
import { QuizDifficulty, QuizQuestion, QuizCategory } from '../types';

interface DifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (difficulty: QuizDifficulty) => void;
  category: QuizCategory | null;
  questions: QuizQuestion[];
  t: any;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({ isOpen, onClose, onSelect, category, questions, t }) => {
  if (!isOpen || !category) {
    return null;
  }

  const difficulties: QuizDifficulty[] = ['سهل', 'متوسط', 'صعب', 'صعب جدا'];
  const difficultyMap: Record<QuizDifficulty, { nameKey: string, color: string, points: string }> = {
      'سهل': { nameKey: 'difficultyEasy', color: 'bg-green-500 hover:bg-green-600', points: '10' },
      'متوسط': { nameKey: 'difficultyMedium', color: 'bg-yellow-500 hover:bg-yellow-600', points: '20' },
      'صعب': { nameKey: 'difficultyHard', color: 'bg-orange-500 hover:bg-orange-600', points: '30' },
      'صعب جدا': { nameKey: 'difficultyVeryHard', color: 'bg-red-600 hover:bg-red-700', points: '50' }
  };

  const questionCounts = difficulties.reduce((acc, diff) => {
    acc[diff] = questions.filter(q => q.difficulty === diff).length;
    return acc;
  }, {} as Record<QuizDifficulty, number>);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-11/12 max-w-sm transform transition-all duration-300 scale-100"
        dir={t.language === 'ar' ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-1">{t.selectDifficulty}</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{t.categories[category]}</p>
        
        <div className="space-y-3">
          {difficulties.map(diff => {
            const count = questionCounts[diff];
            const details = difficultyMap[diff];
            const isDisabled = count === 0;
            return (
              <button
                key={diff}
                onClick={() => onSelect(diff)}
                disabled={isDisabled}
                className={`w-full flex justify-between items-center p-4 rounded-lg font-bold text-white transition-transform transform hover:scale-105 ${details.color} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-right">
                    <span>{t[details.nameKey]}</span>
                    <span className="block text-xs opacity-80 font-normal">{t.questionsAvailable(count)}</span>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">⭐ {details.points}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default DifficultyModal;