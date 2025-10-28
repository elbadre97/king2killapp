import React from 'react';
import { Page, UserStats, QuizCategory } from '../types';

interface StatsPageProps {
    stats: UserStats;
    t: any;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: string; color: string; }> = ({ label, value, icon, color }) => (
    <div className={`bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md flex items-center`}>
        <div className={`p-3 rounded-lg mr-4 ${color}`}>
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
    </div>
);


const StatsPage: React.FC<StatsPageProps> = ({ stats, t }) => {
    const incorrectAnswers = stats.totalQuestions - stats.correctAnswers;
    const accuracy = stats.totalQuestions > 0 ? ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1) + '%' : '0%';
    
    return (
        <div className="p-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg mb-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">{t.statsOverall}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <StatCard label={t.statsTotalQuizzes} value={stats.totalQuizzes} icon="🎮" color="bg-blue-100 dark:bg-blue-900/50" />
                    <StatCard label={t.statsTotalQuestions} value={stats.totalQuestions} icon="❓" color="bg-indigo-100 dark:bg-indigo-900/50" />
                    <StatCard label={t.statsCorrect} value={stats.correctAnswers} icon="✅" color="bg-green-100 dark:bg-green-900/50" />
                    <StatCard label={t.statsIncorrect} value={incorrectAnswers} icon="❌" color="bg-red-100 dark:bg-red-900/50" />
                    <StatCard label={t.statsAccuracy} value={accuracy} icon="🎯" color="bg-yellow-100 dark:bg-yellow-900/50" />
                    <StatCard label={t.statsPointsFromQuizzes} value={`⭐ ${stats.pointsFromQuizzes}`} icon="💰" color="bg-purple-100 dark:bg-purple-900/50" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">{t.statsPerformanceByCategory}</h3>
                <div className="space-y-4">
                    {(Object.keys(stats.performanceByCategory) as QuizCategory[]).map(category => {
                        const performance = stats.performanceByCategory[category];
                        if (!performance || performance.total === 0) return null;
                        const categoryAccuracy = (performance.correct / performance.total) * 100;

                        return (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm">{t.categories[category]}</h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{performance.correct} / {performance.total}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${categoryAccuracy}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StatsPage;