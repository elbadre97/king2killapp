import React, { useState, useEffect } from 'react';

interface TransferPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  onConfirm: (points: number, userId: string) => void;
}

const CONVERSION_RATE = 100; // 100 points = 1 gem

const TransferPointsModal: React.FC<TransferPointsModalProps> = ({ isOpen, onClose, userPoints, onConfirm }) => {
  const [pointsToTransfer, setPointsToTransfer] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset form when modal opens or closes
    if (!isOpen) {
      setTimeout(() => {
          setPointsToTransfer('');
          setUserId('');
          setError('');
      }, 300); // delay to allow for closing animation
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const gemsToReceive = pointsToTransfer ? Math.floor(parseInt(pointsToTransfer, 10) / CONVERSION_RATE) : 0;

  const handleConfirmClick = () => {
    const points = parseInt(pointsToTransfer, 10);
    if (isNaN(points) || points <= 0) {
      setError('الرجاء إدخال عدد نقاط صحيح وموجب.');
      return;
    }
    if (points > userPoints) {
      setError('عذراً، رصيدك من النقاط غير كافٍ.');
      return;
    }
    if (!userId.trim()) {
      setError('الرجاء إدخال ID الخاص بك لإتمام العملية.');
      return;
    }
    setError('');
    onConfirm(points, userId);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-sm transform transition-all duration-300 scale-100" 
        dir="rtl"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">تحويل النقاط إلى جواهر 💎</h2>
        
        <div className="mb-4">
          <label htmlFor="points-input" className="block text-sm font-medium text-gray-700 mb-1">
            النقاط المراد تحويلها
          </label>
          <div className="relative">
            <input
              type="number"
              id="points-input"
              value={pointsToTransfer}
              onChange={(e) => setPointsToTransfer(e.target.value)}
              placeholder="مثال: 1000"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⭐</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">رصيدك الحالي: <span className="font-bold">{userPoints}</span> نقطة</p>
        </div>

        <div className="mb-4">
          <label htmlFor="userid-input" className="block text-sm font-medium text-gray-700 mb-1">
            ID الخاص بك
          </label>
          <input
            type="text"
            id="userid-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="أدخل ID حسابك هنا"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="text-center bg-purple-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-700">ستحصل على:</p>
          <p className="text-2xl font-bold text-purple-600">{gemsToReceive} 💎</p>
          <p className="text-xs text-gray-500">(كل {CONVERSION_RATE} نقطة = 1 جوهرة)</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition-colors"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirmClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            تحويل الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPointsModal;
