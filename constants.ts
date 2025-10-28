import { QuizQuestion, QuizCategory, LeaderboardUser, EventType, StoreItem } from './types';

export const QUIZ_DATA: Record<QuizCategory, QuizQuestion[]> = {
  'أسئلة عامة': [
    { question: 'ما هي عاصمة فرنسا؟', options: [{ text: 'لندن', correct: false }, { text: 'روما', correct: false }, { text: 'باريس', correct: true }, { text: 'برلين', correct: false }], points: 10 },
    { question: 'كم عدد أيام الأسبوع؟', options: [{ text: '5 أيام', correct: false }, { text: '6 أيام', correct: false }, { text: '7 أيام', correct: true }, { text: '8 أيام', correct: false }], points: 10 },
    { question: 'ما هو الكوكب الأحمر؟', options: [{ text: 'المشتري', correct: false }, { text: 'المريخ', correct: true }, { text: 'الزهرة', correct: false }, { text: 'زحل', correct: false }], points: 10 },
    { question: 'ما هو أطول نهر في العالم؟', options: [{ text: 'النيل', correct: true }, { text: 'الأمازون', correct: false }, { text: 'الميسيسيبي', correct: false }, { text: 'الدانوب', correct: false }], points: 10 },
    { question: 'من رسم لوحة الموناليزا؟', options: [{ text: 'فان جوخ', correct: false }, { text: 'بيكاسو', correct: false }, { text: 'ليوناردو دافنشي', correct: true }, { text: 'مونيه', correct: false }], points: 10 }
  ],
  'العلوم': [
    { question: 'ما هو العنصر الأكثر وفرة في الكون؟', options: [{ text: 'الأكسجين', correct: false }, { text: 'الهيدروجين', correct: true }, { text: 'النيتروجين', correct: false }, { text: 'الهيليوم', correct: false }], points: 10 },
    { question: 'كم عدد العظام في جسم الإنسان البالغ؟', options: [{ text: '206', correct: true }, { text: '200', correct: false }, { text: '212', correct: false }, { text: '196', correct: false }], points: 10 },
    { question: 'ما هو أسرع حيوان بري؟', options: [{ text: 'الفهد', correct: true }, { text: 'الأسد', correct: false }, { text: 'النمر', correct: false }, { text: 'الذئب', correct: false }], points: 10 },
    { question: 'ما هو الغاز الذي تتنفسه النباتات؟', options: [{ text: 'الأكسجين', correct: false }, { text: 'ثاني أكسيد الكربون', correct: true }, { text: 'النيتروجين', correct: false }, { text: 'الهيدروجين', correct: false }], points: 10 },
    { question: 'ما هو أقوى عظم في جسم الإنسان؟', options: [{ text: 'عظم الفخذ', correct: true }, { text: 'عظم الذراع', correct: false }, { text: 'عظم الجمجمة', correct: false }, { text: 'عظم الكتف', correct: false }], points: 10 }
  ],
  'التاريخ': [
    { question: 'متى انتهت الحرب العالمية الثانية؟', options: [{ text: '1945', correct: true }, { text: '1918', correct: false }, { text: '1939', correct: false }, { text: '1950', correct: false }], points: 10 },
    { question: 'من هو أول رائد فضاء؟', options: [{ text: 'نيل أرمسترونج', correct: false }, { text: 'يوري غاغارين', correct: true }, { text: 'باز ألدرين', correct: false }, { text: 'جون جلين', correct: false }], points: 10 },
    { question: 'أين بنيت الأهرامات؟', options: [{ text: 'العراق', correct: false }, { text: 'اليونان', correct: false }, { text: 'مصر', correct: true }, { text: 'المكسيك', correct: false }], points: 10 },
    { question: 'من اكتشف أمريكا؟', options: [{ text: 'كريستوفر كولومبوس', correct: true }, { text: 'فاسكو دا غاما', correct: false }, { text: 'جيمس كوك', correct: false }, { text: 'ماركو بولو', correct: false }], points: 10 },
    { question: 'متى تأسست الأمم المتحدة؟', options: [{ text: '1920', correct: false }, { text: '1945', correct: true }, { text: '1960', correct: false }, { text: '1980', correct: false }], points: 10 }
  ],
  'الرياضيات': [
    { question: 'ما هو ناتج 5 * 8 ؟', options: [{ text: '35', correct: false }, { text: '40', correct: true }, { text: '45', correct: false }, { text: '50', correct: false }], points: 10 },
    { question: 'كم عدد أضلاع المربع؟', options: [{ text: '3', correct: false }, { text: '4', correct: true }, { text: '5', correct: false }, { text: '6', correct: false }], points: 10 },
    { question: 'ما هو الجذر التربيعي للعدد 81؟', options: [{ text: '7', correct: false }, { text: '8', correct: false }, { text: '9', correct: true }, { text: '10', correct: false }], points: 10 },
    { question: 'ما هي قيمة باي (π) التقريبية؟', options: [{ text: '3.14', correct: true }, { text: '2.71', correct: false }, { text: '1.618', correct: false }, { text: '4.2', correct: false }], points: 10 },
    { question: 'ما هو مجموع زوايا المثلث؟', options: [{ text: '90 درجة', correct: false }, { text: '180 درجة', correct: true }, { text: '270 درجة', correct: false }, { text: '360 درجة', correct: false }], points: 10 }
  ],
  'البرمجة': [
    { question: 'ما هي اللغة المستخدمة لتصميم صفحات الويب؟', options: [{ text: 'Python', correct: false }, { text: 'HTML', correct: true }, { text: 'Java', correct: false }, { text: 'C++', correct: false }], points: 10 },
    { question: 'ماذا يعني اختصار CSS؟', options: [{ text: 'Creative Style Sheets', correct: false }, { text: 'Cascading Style Sheets', correct: true }, { text: 'Computer Style Sheets', correct: false }, { text: 'Colorful Style Sheets', correct: false }], points: 10 },
    { question: 'أي من التالي ليس لغة برمجة؟', options: [{ text: 'JavaScript', correct: false }, { text: 'Photoshop', correct: true }, { text: 'Ruby', correct: false }, { text: 'Go', correct: false }], points: 10 },
    { question: 'ماذا تفعل حلقة `for`؟', options: [{ text: 'تكرار الكود لعدد محدد من المرات', correct: true }, { text: 'اتخاذ قرار بناءً على شرط', correct: false }, { text: 'تخزين البيانات', correct: false }, { text: 'تعريف دالة', correct: false }], points: 10 },
    { question: 'ما هو الـ API؟', options: [{ text: 'واجهة برمجة التطبيقات', correct: true }, { text: 'محرر نصوص متقدم', correct: false }, { text: 'قاعدة بيانات', correct: false }, { text: 'نظام تشغيل', correct: false }], points: 10 }
  ],
  'الثقافة': [
    { question: 'في أي بلد تقع مدينة البتراء؟', options: [{ text: 'مصر', correct: false }, { text: 'الأردن', correct: true }, { text: 'السعودية', correct: false }, { text: 'لبنان', correct: false }], points: 10 },
    { question: 'من هو مؤلف "ألف ليلة وليلة"؟', options: [{ text: 'الجاحظ', correct: false }, { text: 'مؤلف غير معروف', correct: true }, { text: 'ابن خلدون', correct: false }, { text: 'المتنبي', correct: false }], points: 10 },
    { question: 'ما هي العملة الرسمية لليابان؟', options: [{ text: 'اليوان', correct: false }, { text: 'الوون', correct: false }, { text: 'الدولار', correct: false }, { text: 'الين', correct: true }], points: 10 },
    { question: 'ما هو أكبر متحف في العالم؟', options: [{ text: 'متحف اللوفر', correct: true }, { text: 'المتحف البريطاني', correct: false }, { text: 'متحف المتروبوليتان للفنون', correct: false }, { text: 'متحف الفاتيكان', correct: false }], points: 10 },
    { question: 'ما هو الطبق الوطني لإسبانيا؟', options: [{ text: 'البيتزا', correct: false }, { text: 'الباييلا', correct: true }, { text: 'السوشي', correct: false }, { text: 'الهامبرغر', correct: false }], points: 10 }
  ]
};

export const WEEKLY_LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'سلطان القحطاني', picture: 'https://ui-avatars.com/api/?name=سلطان+القحطاني&background=ffd700&color=000&size=128', points: 15250 },
  { rank: 2, name: 'نورة الدوسري', picture: 'https://ui-avatars.com/api/?name=نورة+الدوسري&background=c0c0c0&color=000&size=128', points: 14800 },
  { rank: 3, name: 'خالد المصري', picture: 'https://ui-avatars.com/api/?name=خالد+المصري&background=cd7f32&color=000&size=128', points: 14550 },
  { rank: 4, name: 'فاطمة الزهراء', picture: 'https://ui-avatars.com/api/?name=فاطمة+الزهراء&background=8b5cf6&color=fff&size=128', points: 13900 },
  { rank: 5, name: 'محمد علي', picture: 'https://ui-avatars.com/api/?name=محمد+علي&background=3b82f6&color=fff&size=128', points: 13200 },
  { rank: 6, name: 'علياء الشمري', picture: 'https://ui-avatars.com/api/?name=علياء+الشمري&background=ec4899&color=fff&size=128', points: 12800 },
  { rank: 7, name: 'يوسف الأحمد', picture: 'https://ui-avatars.com/api/?name=يوسف+الأحمد&background=10b981&color=fff&size=128', points: 12150 },
  { rank: 8, name: 'Abdullah Al-Ghamdi', picture: 'https://ui-avatars.com/api/?name=Abdullah+Al-Ghamdi&background=8b5cf6&color=fff&size=128', points: 5100 },
  { rank: 9, name: 'أحمد إبراهيم', picture: 'https://ui-avatars.com/api/?name=أحمد+إبراهيم&background=f97316&color=fff&size=128', points: 4500 },
  { rank: 10, name: 'زينب مراد', picture: 'https://ui-avatars.com/api/?name=زينب+مراد&background=ef4444&color=fff&size=128', points: 4200 },
];

export const WEEKEND_LEADERBOARD_DATA: LeaderboardUser[] = [
    { rank: 1, name: 'فاطمة الزهراء', picture: 'https://ui-avatars.com/api/?name=فاطمة+الزهراء&background=ffd700&color=000&size=128', points: 8500 },
    { rank: 2, name: 'يوسف الأحمد', picture: 'https://ui-avatars.com/api/?name=يوسف+الأحمد&background=c0c0c0&color=000&size=128', points: 8210 },
    { rank: 3, name: 'Abdullah Al-Ghamdi', picture: 'https://ui-avatars.com/api/?name=Abdullah+Al-Ghamdi&background=cd7f32&color=000&size=128', points: 7950 },
    { rank: 4, name: 'زينب مراد', picture: 'https://ui-avatars.com/api/?name=زينب+مراد&background=8b5cf6&color=fff&size=128', points: 7500 },
    { rank: 5, name: 'أحمد إبراهيم', picture: 'https://ui-avatars.com/api/?name=أحمد+إبراهيم&background=3b82f6&color=fff&size=128', points: 7100 },
];

export const MARATHON_LEADERBOARD_DATA: LeaderboardUser[] = [
    { rank: 1, name: 'خالد المصري', picture: 'https://ui-avatars.com/api/?name=خالد+المصري&background=ffd700&color=000&size=128', points: 25300 },
    { rank: 2, name: 'محمد علي', picture: 'https://ui-avatars.com/api/?name=محمد+علي&background=c0c0c0&color=000&size=128', points: 24900 },
    { rank: 3, name: 'علياء الشمري', picture: 'https://ui-avatars.com/api/?name=علياء+الشمري&background=cd7f32&color=000&size=128', points: 24100 },
    { rank: 4, name: 'سلطان القحطاني', picture: 'https://ui-avatars.com/api/?name=سلطان+القحطاني&background=8b5cf6&color=fff&size=128', points: 23850 },
    { rank: 5, name: 'Abdullah Al-Ghamdi', picture: 'https://ui-avatars.com/api/?name=Abdullah+Al-Ghamdi&background=3b82f6&color=fff&size=128', points: 23500 },
];

export const LEADERBOARDS: Record<EventType, LeaderboardUser[]> = {
  weekly: WEEKLY_LEADERBOARD_DATA,
  weekend: WEEKEND_LEADERBOARD_DATA,
  marathon: MARATHON_LEADERBOARD_DATA,
};

export const STORE_ITEMS: StoreItem[] = [
  { id: 'crown', icon: '👑', cost: 500, nameKey: 'storeItemCrown', descKey: 'storeItemCrownDesc' },
  { id: 'booster', icon: '🚀', cost: 200, nameKey: 'storeItemBooster', descKey: 'storeItemBoosterDesc' },
  { id: 'hint', icon: '🔍', cost: 150, nameKey: 'storeItemHint', descKey: 'storeItemHintDesc' },
  { id: 'theme', icon: '🎨', cost: 800, nameKey: 'storeItemTheme', descKey: 'storeItemThemeDesc' },
];

export const AD_REWARD = 25;
export const MAX_ADS_PER_DAY = 5;
export const AD_COOLDOWN_SECONDS = 60; // 1 minute
export const REMOVE_ADS_COST = 5000;
