import React, { useState } from 'react';

interface ReferralPageProps {
    referralCode: string;
    hasUsedReferral: boolean;
    onApplyCode: (code: string) => boolean;
    t: any;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ referralCode, hasUsedReferral, onApplyCode, t }) => {
    const [enteredCode, setEnteredCode] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'King2Kill App',
                text: t.referralShareMessage(referralCode),
                url: 'https://king2kill.netlify.app/',
            }).catch(error => console.log('Error sharing', error));
        }
    };

    const handleSubmitCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (enteredCode.trim()) {
            onApplyCode(enteredCode.trim().toUpperCase());
        }
    };

    return (
        <div className="p-4 space-y-6">
            {/* Your Code Section */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg text-center">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-2">{t.referralYourCodeTitle}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.referralYourCodeDesc}</p>
                <div className="bg-purple-50 dark:bg-gray-800 border-2 border-dashed border-purple-300 dark:border-gray-600 rounded-lg p-4 font-mono text-3xl text-purple-600 dark:text-purple-400 tracking-widest mb-4 select-all">
                    {referralCode}
                </div>
                <div className="flex gap-4">
                    <button onClick={handleCopy} className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        {copied ? t.referralCopied : t.referralCopy}
                    </button>
                    {navigator.share && (
                        <button onClick={handleShare} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform">
                            {t.referralShare}
                        </button>
                    )}
                </div>
            </div>

            {/* Enter Code Section */}
            {hasUsedReferral ? (
                <div className="bg-green-50 dark:bg-green-900/50 border-s-4 border-green-500 rounded-e-lg p-4 text-center">
                    <h3 className="font-bold text-green-800 dark:text-green-300 text-lg mb-1">{t.referralAlreadyUsedTitle}</h3>
                    <p className="text-sm text-green-700 dark:text-green-400">{t.referralAlreadyUsedDesc}</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-2">{t.referralEnterCodeTitle}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.referralEnterCodeDesc}</p>
                    <form onSubmit={handleSubmitCode} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}
                            placeholder={t.referralCodeInputPlaceholder}
                            className="flex-grow w-full p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-600 dark:text-gray-200 text-center uppercase"
                            maxLength={6}
                        />
                        <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-transform">
                            {t.referralGetReward}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ReferralPage;