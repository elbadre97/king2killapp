import React, { useState } from 'react';
import { StoreItem } from '../types';
import { STORE_ITEMS } from '../constants';
import PurchaseModal from './PurchaseModal';

interface StorePageProps {
  userPoints: number;
  t: any;
  onPurchase: (cost: number) => boolean;
}

const StorePage: React.FC<StorePageProps> = ({ userPoints, t, onPurchase }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  const handleBuyClick = (item: StoreItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmPurchase = () => {
    if (selectedItem) {
      const success = onPurchase(selectedItem.cost);
      if (success) {
        handleCloseModal();
      }
    }
  };

  return (
    <>
      <div className="page p-4">
        <div className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white text-center shadow-lg">
          <div className="flex items-center justify-center mb-2">
            <span className="text-xl ml-2">⭐</span>
            <span className="text-xl font-bold">{userPoints}</span>
          </div>
          <p className="text-sm">{t.storeAvailablePoints}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STORE_ITEMS.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 shadow-md card-hover flex flex-col justify-between">
              <div>
                <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-3 mb-3 text-center">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{t[item.nameKey]}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{t[item.descKey]}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-purple-600 dark:text-purple-300 font-bold">⭐ {item.cost}</span>
                <button 
                  onClick={() => handleBuyClick(item)}
                  className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-600 transition-colors"
                >
                  {t.storeBuy}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PurchaseModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPurchase}
        item={selectedItem}
        userPoints={userPoints}
        t={t}
      />
    </>
  );
};

export default StorePage;
