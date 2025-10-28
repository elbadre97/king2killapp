import React, { useState } from 'react';
import { Page, ConversionHistoryEntry } from '../types';

interface PointsConversionPageProps {
    userPoints: number;
    userLevel: number;
    onConfirmConversion: (userId: string) => void;
    history: ConversionHistoryEntry[];
    t: any;
}

const Requirement: React.FC<{ text: string; details: string; met: boolean }> = ({ text, details, met }) => (
    <div className={`p-3 rounded-lg border-s-4 ${met ? 'bg-green-50 dark:bg-green-900/50 border-green-500' : 'bg-red-50 dark:bg-red-900/50 border-red-500'}`}>
        <div className="flex items-center justify-between">
            <span className={`font-bold ${met ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-400'}`}>{text}</span>
            <span className={`text-2xl`}>{met ? '✅' : '❌'}</span>
        </div>
        <p className={`text-xs mt-1 ${met ? 'text-gray-600 dark:text-gray-400' : 'text-red-700 dark:text-red-400'}`}>{details}</p>
    </div>
);


const PointsConversionPage: React.FC<PointsConversionPageProps> = ({ userPoints, userLevel, onConfirmConversion, history, t }) => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    const canConvertPoints = userPoints >= 5000;
    const canConvertLevel = userLevel >= 10;
    const canConvert = canConvertPoints && canConvertLevel;

    const handleConfirmClick = () => {
        if (!userId.trim()) {
            setError(t.conversionEnterId);
            return;
        }

        if (canConvert) {
            setError('');
            onConfirmConversion(userId);
        }
    };
    
    return (
        <div className="p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">{t.conversionOffer}</h3>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white text-center mb-4">
                    <p className="text-lg">{t.conversionConvert}</p>
                    <p className="text-3xl font-bold">5000 ⭐</p>
                    <p className="text-lg mt-1">{t.conversionAndGet}</p>
                    <p className="text-3xl font-bold">110 💎</p>
                </div>
                
                 <div className="mb-4">
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2 text-center">{t.conversionRequirements}</h4>
                    <div className="space-y-2">
                        <Requirement 
                            text={t.conversionRequirementLevel}
                            details={t.conversionCurrentLevel(userLevel)}
                            met={canConvertLevel} 
                        />
                        <Requirement 
                            text={t.conversionRequirementPoints}
                            details={t.conversionCurrentPoints(userPoints)}
                            met={canConvertPoints}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="userid-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.conversionYourId}
                    </label>
                    <input
                        type="text"
                        id="userid-input"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder={t.conversionIdPlaceholder}
                        className="w-full p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-600 dark:text-gray-200"
                    />
                </div>
                
                <div className="space-y-2 mb-4">
                    {error && <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/50 dark:text-red-400 p-2 rounded-lg">{error}</p>}
                </div>

                <button
                    onClick={handleConfirmClick}
                    disabled={!canConvert}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {t.conversionConfirm}
                </button>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.conversionHistory}</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                    {history.length > 0 ? (
                        history.map((entry, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-600">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 dark:bg-gray-600 p-2 rounded-lg ml-3">
                                        <span className="text-blue-600">🔄</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200">{t.conversionHistoryEntry(entry.points)}</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{t.dateLabel}: {entry.date}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.idLabel}: {entry.userId}</p>
                                    </div>
                                </div>
                                <span className="text-green-600 dark:text-green-400 font-bold">+{entry.gems} 💎</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">{t.conversionNoHistory}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PointsConversionPage;