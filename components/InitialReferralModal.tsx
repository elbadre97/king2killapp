import React, { useState } from 'react';

interface InitialReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCode: (code: string) => boolean;
  t: any;
}

const InitialReferralModal: React.FC<InitialReferralModalProps> = ({ isOpen, onClose, onApplyCode, t }) => {
  const [enteredCode, setEnteredCode] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim()) {
      const success = onApplyCode(enteredCode.trim().toUpperCase());
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-sm text-center transform transition-all duration-300 scale-100"
        dir={t.language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="text-6xl mb-4">🎁</div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t.referralEnterCodeTitle}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{t.referralEnterCodeDesc}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder={t.referralCodeInputPlaceholder}
            className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-600 dark:text-gray-200 text-center uppercase"
            maxLength={6}
            autoFocus
          />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform">
            {t.referralGetReward}
          </button>
        </form>

        <button 
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
            {t.initialReferralSkip}
        </button>
      </div>
    </div>
  );
};

export default InitialReferralModal;
