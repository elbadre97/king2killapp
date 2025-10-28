export type Page = 'home' | 'events' | 'store' | 'vault' | 'account' | 'wallet' | 'quiz' | 'points-conversion' | 'settings' | 'stats' | 'help' | 'about' | 'contact' | 'privacy' | 'terms' | 'leaderboard' | 'subwaySurfers' | 'ticTacToe' | 'memoryGame' | 'snakeGame' | 'numberPuzzle' | 'referral';

export type QuizCategory = 'أسئلة عامة' | 'العلوم' | 'التاريخ' | 'الرياضيات' | 'البرمجة' | 'الثقافة';
export type QuizDifficulty = 'سهل' | 'متوسط' | 'صعب' | 'صعب جدا';

export type EventType = 'weekly' | 'weekend' | 'marathon';

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  points: number;
  difficulty?: QuizDifficulty;
}

export interface ConversionHistoryEntry {
  date: string;
  points: number;
  gems: number;
  userId: string;
}

export interface CategoryPerformance {
  correct: number;
  total: number;
}

export interface UserStats {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  pointsFromQuizzes: number;
  performanceByCategory: Partial<Record<QuizCategory, CategoryPerformance>>;
}

export type User = {
  name: string;
  picture: string; // URL to picture
} | null;

export interface AdState {
  watchedToday: number;
  lastWatchTimestamp: number | null;
  lastResetDate: string | null; // e.g., '2024-07-31'
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  picture: string;
  points: number;
}

export interface StoreItem {
  id: string;
  icon: string;
  cost: number;
  nameKey: string;
  descKey: string;
}