import React, { useState, useEffect } from 'react';

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: (reward: boolean) => void;
  t: any;
}

const REWARD_COUNTDOWN_SECONDS = 15;

const RewardedAdModal: React.FC<RewardedAdModalProps> = ({ isOpen, onClose, t }) => {
  const [countdown, setCountdown] = useState(REWARD_COUNTDOWN_SECONDS);
  const [isAdFinished, setIsAdFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    let loadingTimeout: ReturnType<typeof setTimeout> | null = null;
    
    if (isOpen) {
      setIsLoading(true);
      setCountdown(REWARD_COUNTDOWN_SECONDS);
      setIsAdFinished(false);
      
      // Simulate ad loading time
      loadingTimeout = setTimeout(() => {
          setIsLoading(false);
      }, 1500);

      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer!);
            setIsAdFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  
  const handleClose = (reward: boolean) => {
      if (!isAdFinished && !reward) {
          // Allow closing without reward if ad is not finished (e.g., pressing back)
           onClose(false);
           return;
      }
      if(isAdFinished) {
           onClose(true);
      }
  };


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-900 rounded-2xl p-4 shadow-lg w-full h-full flex flex-col justify-center items-center text-white"
        dir={t.dir}
      >
        {isLoading ? (
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-bold">{t.rewardedAdLoading}</p>
            </div>
        ) : (
             <>
                <div className="absolute top-4 right-4 text-left w-full px-4 flex justify-between items-center">
                    <p className="bg-black/50 px-3 py-1 rounded-full text-sm font-bold">{isAdFinished ? "✅" : countdown}</p>
                    <button 
                        onClick={() => handleClose(false)}
                        className={`text-2xl font-bold ${!isAdFinished ? 'opacity-50' : ''}`}
                        disabled={!isAdFinished}
                        aria-label="Close Ad"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex-grow flex flex-col justify-center items-center text-center">
                    {/* 
                        TODO: Paste your ad provider's rewarded ad unit code here.
                        This could be a video player or an interactive ad element.
                        The placeholder below simulates the ad content area.
                    */}
                    <div className="w-64 h-96 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center rounded-lg">
                        <p className="text-2xl font-bold">Your Ad Here</p>
                    </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-sm">{t.rewardedAdInfo(countdown)}</p>
                </div>
             </>
        )}
      </div>
    </div>
  );
};

export default RewardedAdModal;
