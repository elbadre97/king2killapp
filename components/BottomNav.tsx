import React from 'react';
import { Page } from '../types';

interface NavItemProps {
  page: Page;
  label: string;
  icon: string;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ page, label, icon, currentPage, onNavigate }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`nav-item flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${isActive ? 'active text-purple-600 bg-purple-50 dark:bg-gray-700 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'}`}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userPoints: number;
  t: any;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, userPoints, t }) => {
  if (currentPage === 'quiz') return null;

  const navItems = [
    { page: 'home' as Page, label: t.navHome, icon: '🏠' },
    { page: 'events' as Page, label: t.navEvents, icon: '🎯' },
    { page: 'store' as Page, label: t.navStore, icon: '🛍️' },
    { page: 'vault' as Page, label: t.navVault, icon: '💰' },
    { page: 'account' as Page, label: t.navAccount, icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto max-w-lg relative">
        <div className="flex justify-around items-center py-3">
          {navItems.map(item => (
            <NavItem key={item.page} {...item} currentPage={currentPage} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="absolute -top-8 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ⭐ <span>{userPoints}</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;