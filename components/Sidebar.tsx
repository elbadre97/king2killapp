import React from 'react';
import { Page, User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  user: User;
  t: any;
  language: 'ar' | 'en';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, user, t, language }) => {
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    onClose();
  };
  
  const isRtl = language === 'ar';
  
  const sidebarPositionClass = isRtl ? 'right-0' : 'left-0';
  const sidebarTransformClass = isRtl 
    ? (isOpen ? 'translate-x-0' : 'translate-x-full') 
    : (isOpen ? 'translate-x-0' : '-translate-x-full');
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${sidebarPositionClass} ${sidebarTransformClass}`}
        dir={isRtl ? "rtl" : "ltr"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 id="sidebar-title" className="text-2xl font-bold text-purple-600 dark:text-purple-400">King2Kill 👑</h2>
            {user && (
                <div className="mt-4 flex items-center">
                    <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full border-2 border-purple-300" />
                    <span className={`font-bold text-gray-800 dark:text-gray-200 ${isRtl ? 'mr-3' : 'ml-3'}`}>{user.name}</span>
                </div>
            )}
        </div>
        <nav className="p-4 flex flex-col justify-between h-[calc(100%-8rem)]">
            <div>
                <ul>
                    <li>
                        <button onClick={() => handleNavigate('home')} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 font-bold text-gray-700 dark:text-gray-200 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                            <span className="text-2xl">🏠</span>
                            <span>{t.navHome}</span>
                        </button>
                    </li>
                     <li>
                        <a href="https://www.youtube.com/@king2-kill" target="_blank" rel="noopener noreferrer" className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 font-bold text-gray-700 dark:text-gray-200 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                            <span className="text-2xl">📺</span>
                            <span>{t.sidebarYoutube}</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://kick.com/king2kill" target="_blank" rel="noopener noreferrer" className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 font-bold text-gray-700 dark:text-gray-200 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                            <span className="text-2xl">🎮</span>
                            <span>{t.sidebarKick}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                 <hr className="my-2 border-gray-200 dark:border-gray-700" />
                 <h3 className={`px-3 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.sidebarInfo}</h3>
                 <ul>
                    <li><button onClick={() => handleNavigate('about')} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}><span>{t.sidebarAbout}</span></button></li>
                    <li><button onClick={() => handleNavigate('contact')} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}><span>{t.sidebarContact}</span></button></li>
                    <li><button onClick={() => handleNavigate('privacy')} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}><span>{t.sidebarPrivacy}</span></button></li>
                    <li><button onClick={() => handleNavigate('terms')} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}><span>{t.sidebarTerms}</span></button></li>
                 </ul>
            </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;