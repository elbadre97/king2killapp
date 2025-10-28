import React from 'react';
import { StoreItem } from '../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: StoreItem | null;
  userPoints: number;
  t: any;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, onConfirm, item, userPoints, t }) => {
  if (!isOpen || !item) {
    return null;
  }

  const hasEnoughPoints = userPoints >= item.cost;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-11/12 max-w-sm transform transition-all duration-300 scale-100" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">{t.purchaseModalTitle}</h2>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-5 text-center">
            <div className="text-6xl mb-2">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t[item.nameKey]}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t[item.descKey]}</p>
        </div>

        <div className="flex justify-between items-center bg-purple-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.purchaseModalCost}:</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-300">⭐ {item.cost}</span>
        </div>
        <div className="flex justify-between items-center bg-green-50 dark:bg-gray-700 p-3 rounded-lg mb-5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.purchaseModalBalance}:</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">⭐ {userPoints}</span>
        </div>

        {!hasEnoughPoints && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 dark:bg-red-900/50 p-2 rounded-lg">{t.purchaseModalInsufficientPoints}</p>}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            {t.purchaseModalCancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!hasEnoughPoints}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.purchaseModalConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
