import React from 'react';
import { Page } from '../types';
import { REMOVE_ADS_COST } from '../constants';

interface SettingsPageProps {
    t: any;
    language: 'ar' | 'en';
    setLanguage: (lang: 'ar' | 'en') => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    areAdsRemoved: boolean;
    onRemoveAds: () => void;
    userPoints: number;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ t, language, setLanguage, theme, setTheme, areAdsRemoved, onRemoveAds, userPoints }) => {
    
    const canRemoveAds = userPoints >= REMOVE_ADS_COST;

    return (
        <div className="p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.settingsLanguage}</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLanguage('ar')}
                        className={`w-full p-3 rounded-lg font-bold transition-colors ${language === 'ar' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-200'}`}
                    >
                        العربية
                    </button>
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`w-full p-3 rounded-lg font-bold transition-colors ${language === 'en' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-200'}`}
                    >
                        English
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.settingsTheme}</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setTheme('light')}
                        className={`w-full p-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-200'}`}
                    >
                        <span className="text-xl">☀️</span>
                        {t.settingsThemeLight}
                    </button>
                    <button 
                        onClick={() => setTheme('dark')}
                        className={`w-full p-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-200'}`}
                    >
                         <span className="text-xl">🌙</span>
                        {t.settingsThemeDark}
                    </button>
                </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.adSettingsTitle}</h3>
                {areAdsRemoved ? (
                    <p className="text-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">{t.adsRemovedMessage}</p>
                ) : (
                    <div>
                        <button 
                            onClick={onRemoveAds}
                            disabled={!canRemoveAds}
                            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {t.removeAdsButton(REMOVE_ADS_COST)}
                        </button>
                        {!canRemoveAds && <p className="text-center text-red-500 text-xs mt-2">{t.notEnoughPoints}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;