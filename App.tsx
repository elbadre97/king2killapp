import React, { useState, useCallback, useEffect } from 'react';
import { Page, QuizCategory, ConversionHistoryEntry, UserStats, User, AdState, EventType, StoreItem, QuizDifficulty, QuizQuestion } from './types';
import BottomNav from './components/BottomNav';
import QuizPage from './components/QuizPage';
import PointsConversionPage from './components/PointsConversionPage';
import SettingsPage from './components/SettingsPage';
import StatsPage from './components/StatsPage';
import HelpPage from './components/HelpPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InfoPage from './components/InfoPage';
import RewardedAdModal from './components/RewardedAdModal';
import LeaderboardPage from './components/LeaderboardPage';
import StorePage from './components/StorePage';
import PurchaseModal from './components/PurchaseModal';
import TransferPointsModal from './components/TransferPointsModal';
import DifficultyModal from './components/DifficultyModal';
import ReferralPage from './components/ReferralPage';
import InitialReferralModal from './components/InitialReferralModal';
import { translations } from './translations';
import { QUIZ_DATA } from './constants';
import { AD_REWARD, MAX_ADS_PER_DAY, AD_COOLDOWN_SECONDS, REMOVE_ADS_COST } from './constants';
import { playSound } from './components/audio';
import SubwaySurfersPage from './components/SubwaySurfersPage';
import TicTacToePage from './components/TicTacToePage';
import MemoryGamePage from './components/MemoryGamePage';
import SnakeGamePage from './components/SnakeGamePage';
import NumberPuzzlePage from './components/NumberPuzzlePage';
// FIX: Update firebase imports to use compat layer from firebase.ts
import { auth, googleProvider, FirebaseUser } from './firebase';


// --- State Persistence ---
const LOCAL_STORAGE_KEY = 'king2kill_app_state';

const getInitialPersistedState = () => {
  const defaultState = {
    userPoints: 0,
    userLevel: 0,
    language: 'ar' as 'ar' | 'en',
    theme: 'light' as 'light' | 'dark',
    conversionHistory: [] as ConversionHistoryEntry[],
    userStats: {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        pointsFromQuizzes: 0,
        performanceByCategory: {}
    } as UserStats,
    adState: { 
        watchedToday: 0, 
        lastWatchTimestamp: null, 
        lastResetDate: new Date().toISOString().split('T')[0] 
    } as AdState,
    areAdsRemoved: false,
    referralCode: null as string | null,
    hasUsedReferral: false,
    isFirstVisit: true,
  };

  try {
    const persistedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedStateJSON) {
      const parsedState = JSON.parse(persistedStateJSON);
      // For existing users before this feature, isFirstVisit will be undefined.
      // Treat them as not first-time visitors.
      if (typeof parsedState.isFirstVisit === 'undefined') {
        parsedState.isFirstVisit = false;
      }
      return { ...defaultState, ...parsedState };
    }
  } catch (error) {
    console.error("Could not load state from localStorage", error);
  }
  
  return defaultState; // Only returns this if localStorage is empty
};
// --- End State Persistence ---


const AuthHelpModal: React.FC<{ hostname: string; onClose: () => void; }> = ({ hostname, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" dir="rtl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md text-right">
            <h2 className="text-xl font-bold text-red-500 mb-4">خطأ في تسجيل الدخول (auth/unauthorized-domain)</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                لحل هذه المشكلة، تحتاج إلى إضافة النطاق (Domain) الذي يعمل عليه التطبيق إلى قائمة النطاقات المصرّح بها في إعدادات مشروع Firebase.
            </p>
            <p className="mb-4">
                <strong className="text-gray-800 dark:text-gray-200">النطاق الذي يجب إضافته هو:</strong>
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center font-mono text-purple-600 dark:text-purple-400 mb-6 select-all">
                {hostname}
            </div>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <strong>الخطوات:</strong>
                <ol className="list-decimal list-inside pr-4 mt-2 space-y-1">
                    <li>اذهب إلى لوحة تحكم Firebase.</li>
                    <li>اختر مشروعك (king2killapp).</li>
                    <li>اذهب إلى <strong>Authentication</strong> ثم علامة تبويب <strong>Settings</strong>.</li>
                    <li>في قسم <strong>Authorized domains</strong>، انقر على <strong>Add domain</strong> وأضف النطاق المذكور أعلاه.</li>
                </ol>
            </p>
            <button
                onClick={onClose}
                className="bg-purple-500 text-white w-full px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors"
            >
                فهمت
            </button>
        </div>
    </div>
);


const AdSection: React.FC<{ adState: AdState; onWatchAd: () => void; t: any; }> = ({ adState, onWatchAd, t }) => {
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        
        if (adState.lastWatchTimestamp) {
            const now = Date.now();
            const timeSinceLastAd = now - adState.lastWatchTimestamp;
            const remainingCooldown = AD_COOLDOWN_SECONDS * 1000 - timeSinceLastAd;

            if (remainingCooldown > 0) {
                setCooldown(Math.ceil(remainingCooldown / 1000));
                interval = setInterval(() => {
                    setCooldown(prev => {
                        if (prev <= 1) {
                            if (interval) clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [adState.lastWatchTimestamp]);

    const isLimitReached = adState.watchedToday >= MAX_ADS_PER_DAY;
    const isCoolingDown = cooldown > 0;
    const isDisabled = isLimitReached || isCoolingDown;

    let buttonText = t.homeWatchAdButton;
    if (isLimitReached) {
        buttonText = t.homeWatchAdLimitReached;
    } else if (isCoolingDown) {
        buttonText = t.homeWatchAdCooldown(cooldown);
    }

    return (
        <section className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl p-4 text-white text-center shadow-lg">
            <h3 className="font-bold mb-2">📺 {t.homeWatchAdTitle}</h3>
            <p className="text-sm mb-3">{t.homeWatchAdDesc(AD_REWARD)}</p>
            <div className="flex items-center justify-center gap-4">
                 <button 
                    onClick={onWatchAd}
                    disabled={isDisabled}
                    className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed w-40 text-center"
                >
                    {buttonText}
                </button>
                 {!isLimitReached && (
                    <div className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
                        {t.homeWatchAdRemaining(adState.watchedToday, MAX_ADS_PER_DAY)}
                    </div>
                 )}
            </div>
        </section>
    );
};


const HomePage: React.FC<{ 
    onStartQuiz: (category: QuizCategory) => void; 
    onNavigate: (page: Page) => void;
    userPoints: number; 
    userLevel: number; 
    t: any;
    adState: AdState;
    onWatchAd: () => void;
    areAdsRemoved: boolean;
    userStats: UserStats;
}> = ({ onStartQuiz, onNavigate, userPoints, userLevel, t, adState, onWatchAd, areAdsRemoved, userStats }) => {
    const accuracy = userStats.totalQuestions > 0 ? Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100) : 0;
    
    const categoryStyles: Record<QuizCategory, string> = {
        'أسئلة عامة': 'bg-gradient-to-br from-purple-500 to-indigo-600',
        'العلوم': 'bg-gradient-to-br from-blue-500 to-cyan-500',
        'التاريخ': 'bg-gradient-to-br from-amber-500 to-orange-600',
        'الرياضيات': 'bg-gradient-to-br from-green-500 to-emerald-600',
        'البرمجة': 'bg-gradient-to-br from-slate-600 to-gray-700',
        'الثقافة': 'bg-gradient-to-br from-pink-500 to-rose-600',
    };

    const gameStyles = {
      subwaySurfers: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      ticTacToe: 'bg-gradient-to-br from-teal-400 to-cyan-500',
      memoryGame: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
      snakeGame: 'bg-gradient-to-br from-lime-500 to-green-600',
      numberPuzzle: 'bg-gradient-to-br from-red-500 to-orange-600',
    };

    const quizCategories = (Object.keys(QUIZ_DATA) as QuizCategory[]);
    const games = [
        { page: 'subwaySurfers' as Page, style: gameStyles.subwaySurfers, icon: '🏄‍♂️', label: t.gameSubwaySurfers },
        { page: 'ticTacToe' as Page, style: gameStyles.ticTacToe, icon: '🎲', label: t.gameTicTacToe },
        { page: 'memoryGame' as Page, style: gameStyles.memoryGame, icon: '🧠', label: t.gameMemoryGame },
        { page: 'snakeGame' as Page, style: gameStyles.snakeGame, icon: '🐍', label: t.gameSnake },
        { page: 'numberPuzzle' as Page, style: gameStyles.numberPuzzle, icon: '🔢', label: t.gameNumberPuzzle },
    ];
    
    const renderAdBlock = (key: string) => !areAdsRemoved ? (
        <div className="col-span-2 sm:col-span-3 my-2" key={key}>
            <AdSection adState={adState} onWatchAd={onWatchAd} t={t} />
        </div>
    ) : null;
    
    const itemsWithAds = (items: any[], type: 'quiz' | 'game') => {
        const result: any[] = [];
        for (let i = 0; i < items.length; i++) {
            result.push(items[i]);
            if ((i + 1) % 3 === 0 && i < items.length -1) {
                result.push(renderAdBlock(`${type}-ad-${i}`));
            }
        }
        return result;
    };

    const quizItems = quizCategories.map(category => (
        <button key={category} onClick={() => onStartQuiz(category)} className={`${categoryStyles[category]} p-4 rounded-2xl shadow-lg text-center card-hover text-white flex flex-col items-center justify-center aspect-square`}>
            <span className="text-3xl mb-2 block filter drop-shadow-md">{t.categoryIcons[category]}</span>
            <span className="font-bold drop-shadow-sm">{t.categories[category]}</span>
        </button>
    ));

    const gameItems = games.map(game => (
        <button key={game.page} onClick={() => onNavigate(game.page)} className={`${game.style} p-4 rounded-2xl shadow-lg text-center card-hover text-white flex flex-col items-center justify-center aspect-square`}>
            <span className="text-3xl mb-2 block filter drop-shadow-md">{game.icon}</span>
            <span className="font-bold text-sm drop-shadow-sm">{game.label}</span>
        </button>
    ));

    return (
        <div className="page active p-4">
            <header className="text-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">{t.homeWelcome}</h1>
                    <div className="flex justify-center items-center space-x-4 space-x-reverse">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">⭐ {userPoints}</div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">{t.level} {userLevel}</div>
                    </div>
                </div>
            </header>
            
            <section className="mt-6">
                <h2 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">{t.homeChooseCategory}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {itemsWithAds(quizItems, 'quiz')}
                </div>
            </section>
             <section className="mt-8">
                <h2 className="font-bold text-lg mb-3 text-gray-700 dark:text-gray-300">{t.homeOtherGames}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {itemsWithAds(gameItems, 'game')}
                </div>
            </section>
        </div>
    );
};

const AccountPage: React.FC<{ onNavigate: (page: Page) => void; user: User | null; onSignIn: () => void; onSignOut: () => void; t: any; hostname: string; }> = ({ onNavigate, user, onSignIn, onSignOut, t, hostname }) => {
    const accountItems = [
        { page: 'wallet' as Page, title: t.accountWallet, desc: t.accountWalletDesc, icon: '💳' },
        { page: 'referral' as Page, title: t.accountReferral, desc: t.accountReferralDesc, icon: '🎁' },
        { page: 'settings' as Page, title: t.accountSettings, desc: t.accountSettingsDesc, icon: '⚙️' },
        { page: 'stats' as Page, title: t.accountStats, desc: t.accountStatsDesc, icon: '📊' },
        { page: 'help' as Page, title: t.accountHelp, desc: t.accountHelpDesc, icon: '❓' },
    ];

    return (
        <div className="p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6 flex items-center">
                {user ? (
                    <>
                        <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full border-4 border-purple-300" />
                        <div className="mx-4 flex-1">
                            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">{user.name}</h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{t.accountUsername}</span>
                        </div>
                        <button onClick={onSignOut} className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{t.accountSignOut}</button>
                    </>
                ) : (
                    <div className="text-center w-full">
                        <p className="mb-4 text-gray-600 dark:text-gray-300">{t.accountSignInPrompt}</p>
                        <button onClick={onSignIn} className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold flex items-center justify-center gap-2 mx-auto">
                           <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                            {t.accountSignInWithGoogle}
                        </button>
                    </div>
                )}
            </div>
            <div className="space-y-3">
                {accountItems.map(item => (
                    <button key={item.page} onClick={() => onNavigate(item.page)} className="w-full flex items-center p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-md card-hover text-right">
                        <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg ml-4">
                            <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const WalletPage: React.FC<{ userPoints: number; onNavigate: (page: Page) => void; t: any; }> = ({ userPoints, onNavigate, t }) => {
    const transactions = [
        { id: 1, title: t.walletTx1, amount: '+50', date: t.walletTx1Date },
        { id: 2, title: t.walletTx2, amount: '-200', date: t.walletTx2Date },
        { id: 3, title: t.walletTx3, amount: '+100', date: t.walletTx3Date },
    ];
    return (
        <div className="p-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center shadow-lg mb-6">
                <p className="text-sm opacity-80">{t.walletBalance}</p>
                <p className="text-4xl font-bold">⭐ {userPoints}</p>
            </div>
            
             <div className="flex gap-4 mb-6">
                <button onClick={() => onNavigate('store')} className="w-full bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md card-hover text-center">
                    <span className="text-2xl mb-1 block">💰</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{t.walletBuyPoints}</span>
                </button>
                 <button onClick={() => onNavigate('points-conversion')} className="w-full bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md card-hover text-center">
                    <span className="text-2xl mb-1 block">🔄</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{t.walletConvertPoints}</span>
                </button>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.walletRecent}</h3>
                <div className="space-y-3">
                    {transactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-600">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-200">{tx.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                            </div>
                            <span className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{tx.amount} ⭐</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EventsPage: React.FC<{ onNavigate: (page: Page, eventType: EventType) => void; t: any; }> = ({ onNavigate, t }) => {
    return (
        <div className="p-4 space-y-4">
            {/* Weekly Tournament - Ongoing */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-lg card-hover">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">{t.eventsWeekly}</h3>
                        <span className="bg-white/30 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">{t.eventsOngoing}</span>
                    </div>
                    <span className="text-3xl filter drop-shadow-md">🏆</span>
                </div>
                <p className="text-sm opacity-90 mb-4">{t.eventsWeeklyDesc}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs opacity-80">{t.eventsDaysLeft}</span>
                    <button onClick={() => onNavigate('leaderboard', 'weekly')} className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-purple-100 transition-colors">{t.leaderboardTitleWeekly}</button>
                </div>
            </div>

            {/* Weekend Challenge - Soon */}
            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-2xl p-4 shadow-lg card-hover opacity-90">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">{t.eventsWeekend}</h3>
                        <span className="bg-white/30 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">{t.eventsSoon}</span>
                    </div>
                    <span className="text-3xl filter drop-shadow-md">⚡</span>
                </div>
                <p className="text-sm opacity-90 mb-4">{t.eventsWeekendDesc}</p>
                 <div className="flex justify-between items-center">
                    <span className="text-xs opacity-80">{t.eventsStartsIn}</span>
                    <button disabled className="bg-white/30 text-white px-4 py-2 rounded-full font-bold text-sm cursor-not-allowed opacity-75">{t.leaderboardTitleWeekend}</button>
                </div>
            </div>

            {/* Puzzle Marathon - Completed */}
             <div className="bg-gradient-to-br from-sky-500 to-indigo-500 text-white rounded-2xl p-4 shadow-lg card-hover">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg">{t.eventsMarathon}</h3>
                        <span className="bg-white/30 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">{t.eventsCompleted}</span>
                    </div>
                    <span className="text-3xl filter drop-shadow-md">🏁</span>
                </div>
                <p className="text-sm opacity-90 mb-4">{t.eventsMarathonDesc}</p>
                <div className="flex justify-between items-center">
                     <span className="text-xs opacity-80">{t.eventsEnded}</span>
                    <button onClick={() => onNavigate('leaderboard', 'marathon')} className="bg-white text-sky-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-sky-100 transition-colors">{t.leaderboardTitleMarathon}</button>
                </div>
            </div>
        </div>
    );
};


const VaultPage: React.FC<{ userPoints: number; userLevel: number; t: any; user: User | null; }> = ({ userPoints, userLevel, t, user }) => {
    const nextLevel = userLevel + 1;
    const achievements = [
      { key: 'Champ', descKey: 'ChampDesc', icon: '🏆', met: true },
      { key: 'Detective', descKey: 'DetectiveDesc', icon: '🕵️', met: true },
      { key: 'Speedster', descKey: 'SpeedsterDesc', icon: '⚡', met: false },
    ];
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-6 text-white text-center shadow-lg">
          <p className="text-sm opacity-80">{t.vaultTotalPoints}</p>
          <p className="text-4xl font-bold">⭐ {userPoints.toLocaleString()}</p>
        </div>
  
        <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.vaultAchievements}</h3>
          <div className="space-y-3">
            {achievements.map(ach => {
              const metClass = 'bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-lg border border-amber-300 dark:border-yellow-600';
              const unmetClass = 'bg-gray-100 dark:bg-gray-800 opacity-70';
              const metIconBgClass = 'bg-white/30';
              const unmetIconBgClass = 'bg-gray-200 dark:bg-gray-700';

              return (
                <div key={ach.key} className={`flex items-center p-3 rounded-xl transition-all ${ach.met ? metClass : unmetClass}`}>
                  <div className={`p-3 rounded-full mr-4 ml-1 ${ach.met ? metIconBgClass : unmetIconBgClass}`}>
                    <span className={`text-2xl filter drop-shadow-sm ${ach.met ? '' : 'grayscale'}`}>{ach.icon}</span>
                  </div>
                  <div>
                    <h4 className={`font-bold ${ach.met ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{t[`vault${ach.key}`]}</h4>
                    <p className={`text-xs ${ach.met ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>{t[`vault${ach.key}Desc`]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.vaultLevelProgress}</h3>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">{t.level} {userLevel}</span>
            <span className="text-gray-600 dark:text-gray-400">{t.level} {nextLevel}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 relative overflow-hidden">
            <div className="bg-purple-600 h-4 rounded-full" style={{ width: `65%` }}></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">65%</span>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">{t.vaultLevelProgressDesc(nextLevel)}</p>
        </div>
      </div>
    );
};

const App: React.FC = () => {
    // Use a single call to load initial state to avoid reading localStorage multiple times
    const [initialState] = useState(getInitialPersistedState);

    const [page, setPage] = useState<Page>('home');
    
    // Initialize persisted state from the loaded initial state
    const [userPoints, setUserPoints] = useState(initialState.userPoints);
    const [userLevel, setUserLevel] = useState(initialState.userLevel);
    const [language, setLanguage] = useState<'ar' | 'en'>(initialState.language);
    const [theme, setTheme] = useState<'light' | 'dark'>(initialState.theme);
    const [conversionHistory, setConversionHistory] = useState<ConversionHistoryEntry[]>(initialState.conversionHistory);
    const [userStats, setUserStats] = useState<UserStats>(initialState.userStats);
    const [adState, setAdState] = useState<AdState>(initialState.adState);
    const [areAdsRemoved, setAreAdsRemoved] = useState(initialState.areAdsRemoved);
    const [referralCode, setReferralCode] = useState(initialState.referralCode);
    const [hasUsedReferral, setHasUsedReferral] = useState(initialState.hasUsedReferral);
    const [isFirstVisit, setIsFirstVisit] = useState(initialState.isFirstVisit);

    // Non-persisted state
    const [user, setUser] = useState<User>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [quizCategory, setQuizCategory] = useState<QuizCategory | null>(null);
    const [quizDifficulty, setQuizDifficulty] = useState<QuizDifficulty | null>(null);
    const [eventType, setEventType] = useState<EventType>('weekly');
    const [isRewardedAdOpen, setRewardedAdOpen] = useState(false);
    const [showAuthHelp, setShowAuthHelp] = useState(false);
    const [hostname, setHostname] = useState('');
    const [isDifficultyModalOpen, setDifficultyModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);

    // Effect to save state to localStorage whenever a persisted value changes
    useEffect(() => {
        const stateToPersist = {
            userPoints,
            userLevel,
            language,
            theme,
            conversionHistory,
            userStats,
            adState,
            areAdsRemoved,
            referralCode,
            hasUsedReferral,
            isFirstVisit,
        };
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToPersist));
        } catch (error) {
            console.error("Could not save state to localStorage", error);
        }
    }, [userPoints, userLevel, language, theme, conversionHistory, userStats, adState, areAdsRemoved, referralCode, hasUsedReferral, isFirstVisit]);

    // Effect to reset daily ad watch count if the day has changed since last load
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (adState.lastResetDate !== today) {
            setAdState(prevState => ({
                ...prevState,
                watchedToday: 0,
                lastResetDate: today,
            }));
        }
    }, []); // Runs once on component mount
    
    // Effect to generate a referral code for a new user
    useEffect(() => {
        if (!referralCode) {
            const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            setReferralCode(newCode);
        }
    }, [referralCode]);

    useEffect(() => {
        const currentHostname = window.location.hostname;
        setHostname(currentHostname);
        console.log('Firebase Auth Domain:', currentHostname);
    }, []);

    const t = translations[language];

    useEffect(() => {
        // FIX: Use compat version of onAuthStateChanged
        const unsubscribe = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                const { displayName, photoURL } = firebaseUser;
                setUser({
                    name: displayName || 'User',
                    picture: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'K')}&background=8b5cf6&color=fff&size=128`
                });
                setShowAuthHelp(false); // Hide help modal on successful login
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleNavigate = (page: Page, eventType?: EventType) => {
        setPage(page);
        if (eventType) {
            setEventType(eventType);
        }
        window.scrollTo(0, 0);
    };

    const handleQuizStart = (category: QuizCategory) => {
        const questions = QUIZ_DATA[category];
        const hasDifficulty = questions.some(q => q.difficulty);
        
        if (hasDifficulty) {
            setSelectedCategory(category);
            setDifficultyModalOpen(true);
        } else {
            setQuizCategory(category);
            setQuizDifficulty(null); // No difficulty for other categories
            setPage('quiz');
        }
    }

    const handleDifficultySelect = (difficulty: QuizDifficulty) => {
        if (selectedCategory) {
            setQuizCategory(selectedCategory);
            setQuizDifficulty(difficulty);
            setPage('quiz');
            setDifficultyModalOpen(false);
        }
    };

    const handleQuizFinish = (points: number, bonus: number, correct: number, total: number) => {
        setUserPoints(p => p + points + bonus);
        setUserStats(s => ({
            ...s,
            totalQuizzes: s.totalQuizzes + 1,
            totalQuestions: s.totalQuestions + total,
            correctAnswers: s.correctAnswers + correct,
            pointsFromQuizzes: s.pointsFromQuizzes + points,
        }));
        setPage('home');
    };
    
    const handleGameFinish = (points: number) => {
        if (points > 0) {
            setUserPoints(p => p + points);
        }
        handleNavigate('home');
    };

    const handleWatchAd = () => {
        if (adState.watchedToday >= MAX_ADS_PER_DAY) return;
        const now = Date.now();
        if (adState.lastWatchTimestamp && (now - adState.lastWatchTimestamp < AD_COOLDOWN_SECONDS * 1000)) return;
        setRewardedAdOpen(true);
    };
    
    const handleAdClosed = (reward: boolean) => {
        setRewardedAdOpen(false);
        if (reward) {
            const now = Date.now();
            const today = new Date().toISOString().split('T')[0];
            
            const newWatchedToday = adState.lastResetDate === today ? adState.watchedToday + 1 : 1;
    
            setUserPoints(p => p + AD_REWARD);
            setAdState({
                watchedToday: newWatchedToday,
                lastWatchTimestamp: now,
                lastResetDate: today,
            });
        }
    };

    const handlePurchase = (cost: number) => {
        if (userPoints >= cost) {
            setUserPoints(p => p - cost);
            return true;
        }
        return false;
    };
    const handleRemoveAds = () => {
        if (userPoints >= REMOVE_ADS_COST) {
            setUserPoints(p => p - REMOVE_ADS_COST);
            setAreAdsRemoved(true);
        }
    };
    const handleSignIn = async () => {
        try {
            // FIX: Use compat version of signInWithPopup
            await auth.signInWithPopup(googleProvider);
        } catch (error: any) {
            console.error("Error signing in with Google: ", error);
            if (error.code === 'auth/unauthorized-domain') {
                setShowAuthHelp(true);
            }
        }
    };
    const handleSignOut = async () => {
        try {
            // FIX: Use compat version of signOut
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };
    const handleConfirmConversion = (userId: string) => {
        if (userPoints >= 5000 && userLevel >= 10) {
            setUserPoints(p => p - 5000);
            const newEntry: ConversionHistoryEntry = {
                date: new Date().toLocaleDateString(),
                points: 5000,
                gems: 110,
                userId: userId
            };
            setConversionHistory(h => [newEntry, ...h]);
        }
    };
    
    const handleApplyReferralCode = (code: string): boolean => {
        if (hasUsedReferral) {
            alert(t.referralAlreadyUsedDesc);
            return false;
        }
        if (code === referralCode) {
            alert(t.referralErrorOwnCode);
            return false;
        }
        // Simple validation: 6 chars, alphanumeric. A real app would have a backend check.
        if (!/^[A-Z0-9]{6}$/.test(code)) {
            alert(t.referralErrorInvalidCode);
            return false;
        }
        
        setUserPoints(p => p + 20);
        setHasUsedReferral(true);
        alert(t.referralSuccess);
        return true;
    };
    
    const handleCloseInitialReferral = () => {
        setIsFirstVisit(false);
    };

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [language, theme]);

    const renderPage = () => {
        switch(page) {
            case 'home':
                return <HomePage onStartQuiz={handleQuizStart} onNavigate={handleNavigate} userPoints={userPoints} userLevel={userLevel} t={t} adState={adState} onWatchAd={handleWatchAd} areAdsRemoved={areAdsRemoved} userStats={userStats} />;
            case 'events':
                return <EventsPage onNavigate={handleNavigate} t={t} />;
            case 'store':
                return <StorePage userPoints={userPoints} t={t} onPurchase={handlePurchase} />;
            case 'vault':
                return <VaultPage userPoints={userPoints} userLevel={userLevel} t={t} user={user} />;
            case 'account':
                return <AccountPage onNavigate={handleNavigate} user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} t={t} hostname={hostname} />;
            case 'wallet':
                return <WalletPage userPoints={userPoints} onNavigate={handleNavigate} t={t} />;
            case 'quiz':
                return quizCategory ? <QuizPage category={quizCategory} difficulty={quizDifficulty} onFinish={handleQuizFinish} t={t} userStats={userStats} /> : <div>{t.quizNoQuestions}</div>;
            case 'points-conversion':
                return <PointsConversionPage userPoints={userPoints} userLevel={userLevel} onConfirmConversion={handleConfirmConversion} history={conversionHistory} t={t} />;
            case 'settings':
                return <SettingsPage t={t} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} areAdsRemoved={areAdsRemoved} onRemoveAds={handleRemoveAds} userPoints={userPoints} />;
            case 'stats':
                return <StatsPage stats={userStats} t={t} />;
            case 'help':
                return <HelpPage t={t} />;
            case 'leaderboard':
                return user ? <LeaderboardPage t={t} user={user} eventType={eventType} /> : <div>{t.accountSignInPrompt}</div>;
            case 'referral':
                return <ReferralPage referralCode={referralCode || ''} hasUsedReferral={hasUsedReferral} onApplyCode={handleApplyReferralCode} t={t} />;
            case 'subwaySurfers':
                return <SubwaySurfersPage onFinish={handleGameFinish} t={t} />;
            case 'ticTacToe':
                return <TicTacToePage onFinish={handleGameFinish} t={t} />;
            case 'memoryGame':
                return <MemoryGamePage onFinish={handleGameFinish} t={t} />;
            case 'snakeGame':
                return <SnakeGamePage onFinish={handleGameFinish} t={t} />;
            case 'numberPuzzle':
                return <NumberPuzzlePage onFinish={handleGameFinish} t={t} />;
            case 'about':
                return <InfoPage title={t.pageTitles.about} sections={t.aboutContent} />;
            case 'contact':
                return <InfoPage title={t.pageTitles.contact} sections={t.contactContent} />;
            case 'privacy':
                return <InfoPage title={t.pageTitles.privacy} sections={t.privacyContent} />;
            case 'terms':
                return <InfoPage title={t.pageTitles.terms} sections={t.termsContent} />;
            default:
                return <div>Page not found</div>;
        }
    };
    
    return (
        <div className={`app-container bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans`}>
            {showAuthHelp && !user && <AuthHelpModal hostname={hostname} onClose={() => setShowAuthHelp(false)} />}
            <InitialReferralModal 
                isOpen={isFirstVisit} 
                onClose={handleCloseInitialReferral} 
                onApplyCode={handleApplyReferralCode} 
                t={t} 
            />
            <Header title={t.pageTitles[page] || 'King2Kill'} showBackButton={page !== 'home'} onBack={() => handleNavigate('home')} onMenuClick={() => setSidebarOpen(true)} t={t} language={language} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={handleNavigate} user={user} t={t} language={language} />
            <main className="pb-24 max-w-lg mx-auto">
                {renderPage()}
            </main>
            <RewardedAdModal isOpen={isRewardedAdOpen} onClose={handleAdClosed} t={t} />
            <DifficultyModal 
                isOpen={isDifficultyModalOpen}
                onClose={() => setDifficultyModalOpen(false)}
                onSelect={handleDifficultySelect}
                category={selectedCategory}
                questions={selectedCategory ? QUIZ_DATA[selectedCategory] : []}
                t={t}
            />
            <BottomNav currentPage={page} onNavigate={handleNavigate} userPoints={userPoints} t={t} />
        </div>
    );
};

export default App;