import React from 'react';

interface HeaderProps {
  title: string;
  showBackButton: boolean;
  onBack?: () => void;
  onMenuClick: () => void;
  t: any;
  language: 'ar' | 'en';
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBack, onMenuClick, t, language }) => {
  const isRtl = language === 'ar';

  const menuButton = (
    <button onClick={onMenuClick} className="p-2 text-2xl text-purple-600 dark:text-purple-400" aria-label="Open menu">
      ☰
    </button>
  );

  const backButton = (
    <button onClick={onBack} className="p-2 text-purple-600 dark:text-purple-400 font-bold">
      {t.back}
    </button>
  );

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto max-w-lg h-16 flex items-center justify-between px-4">
        <div className="w-20 flex justify-start">
          {isRtl 
            ? menuButton 
            : (showBackButton ? backButton : <div className="w-20"/>)
          }
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate text-center flex-1">{title}</h1>

        <div className="w-20 flex justify-end">
          {isRtl 
            ? (showBackButton ? backButton : <div className="w-20"/>)
            : menuButton
          }
        </div>
      </div>
    </header>
  );
};

export default Header;