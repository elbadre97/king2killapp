export const translations = {
  ar: {
    // General
    points: 'النقاط',
    level: 'المستوى',
    back: '‹ رجوع',
    next: 'التالي',
    adLabel: 'إعلان',


    // Nav
    navHome: 'الرئيسية',
    navEvents: 'الفعاليات',
    navStore: 'المتجر',
    navVault: 'الخزينة',
    navAccount: 'الحساب',

    // Sidebar
    sidebarYoutube: 'يوتيوب',
    sidebarKick: 'كيك',
    sidebarShareApp: 'مشاركة التطبيق',
    sidebarShareText: 'جرّب تطبيق الألغاز King2Kill! إنه ممتع ومفيد.',
    sidebarAbout: 'من نحن',
    sidebarContact: 'اتصل بنا',
    sidebarPrivacy: 'سياسة الخصوصية',
    sidebarTerms: 'شروط الاستخدام',
    sidebarInfo: 'معلومات',


    // Page Titles
    pageTitles: {
        home: 'الرئيسية',
        events: 'الفعاليات',
        store: 'المتجر',
        vault: 'الخزينة',
        account: 'الحساب',
        wallet: 'المحفظة',
        quiz: 'صفحة اللغز',
        'points-conversion': 'تحويل النقاط',
        settings: 'الإعدادات',
        stats: 'الإحصائيات',
        help: 'المساعدة',
        about: 'من نحن',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الاستخدام',
        leaderboard: 'لوحة الصدارة',
        referral: 'دعوة الأصدقاء',
        subwaySurfers: 'Subway Surfers',
        ticTacToe: 'إكس أو',
        memoryGame: 'لعبة الذاكرة',
        snakeGame: 'لعبة الثعبان',
        numberPuzzle: 'ألغاز ترتيب الأرقام',
    },

    // Home Page
    homeWelcome: 'مرحباً بك في King2Kill 👑',
    homeChooseCategory: 'اختر فئة الألغاز',
    homeStats: 'إحصائياتك',
    homeSolved: 'الألغاز المحلولة',
    homeCorrect: 'الإجابات الصحيحة',
    homeSuccessRate: 'معدل النجاح',
    homeDailyChallenge: 'التحدي اليومي',
    homeDailyChallengeDesc: 'حل 5 ألغاز لربح 50 نقطة إضافية!',
    homeStartChallenge: 'ابدأ التحدي',
    homeWatchAdTitle: 'شاهد واربح',
    homeWatchAdDesc: (p: number) => `شاهد إعلانًا واحصل على ${p} نقطة!`,
    homeWatchAdButton: 'مشاهدة إعلان',
    homeWatchAdRemaining: (w: number, t: number) => `متبقي ${t - w}/${t}`,
    homeWatchAdCooldown: (s: number) => `انتظر ${s} ثانية`,
    homeWatchAdLimitReached: 'تم الوصول للحد اليومي',
    homeOtherGames: 'ألعاب أخرى',

    // Games
    gameSubwaySurfers: 'Subway Surfers',
    subwayStartDesc: 'اركض بأقصى سرعة واجمع النقاط!',
    subwayStartButton: 'ابدأ اللعب',
    subwayPlayingTitle: 'جاري اللعب...',
    subwayPlayingDesc: 'تفادى العقبات واجمع القطع الذهبية!',
    subwayFinishedTitle: 'انتهى السباق!',
    subwayFinishedDesc: 'لقد قمت بعمل رائع!',
    subwayCollect: 'اجمع النقاط',
    subwayScore: 'النتيجة',
    subwayInstructions: 'استخدم مفاتيح الأسهم أو الأزرار على الشاشة للتحرك.',

    gameTicTacToe: 'إكس أو',
    ticTacToeStartDesc: 'تنافس ضد King2Kill أو صديق في لعبة كلاسيكية.',
    ticTacToeChooseMode: 'اختر وضع اللعب',
    ticTacToePlayerVsCpu: 'لاعب ضد King2Kill',
    ticTacToePlayerVsPlayer: 'لاعب ضد لاعب',
    ticTacToeTurn: (player: string) => `دور اللاعب ${player}`,
    ticTacToeYourTurn: 'دورك',
    ticTacToeCpuTurn: 'King2Kill يفكر...',
    ticTacToeWinner: (player: string) => `اللاعب ${player} فاز!`,
    ticTacToeKing2KillWins: 'King2Kill فاز!',
    ticTacToeDraw: 'انتهت بالتعادل!',
    ticTacToePlayAgain: 'العب مجدداً',
    ticTacToeCollectPoints: 'اجمع النقاط',
    
    gameMemoryGame: 'لعبة الذاكرة',
    memoryStartDesc: 'طابق البطاقات المتشابهة واختبر ذاكرتك!',
    memoryStartButton: 'ابدأ اللعب',
    memoryMoves: 'الحركات',
    memoryTime: 'الوقت',
    memorySeconds: 'ثانية',
    memoryFinishedTitle: 'أحسنت صنعاً!',
    memoryFinishedDesc: 'لقد وجدت كل الأزواج المتطابقة.',
    memoryCollectPoints: 'اجمع النقاط',

    gameSnake: 'لعبة الثعبان',
    snakeStartDesc: 'كل الطعام، زد في الطول، وتجنب الاصطدام!',
    snakeStartButton: 'ابدأ اللعب',
    snakeScore: 'النقاط',
    snakeGameOver: 'انتهت اللعبة!',
    snakeYourScore: 'نتيجتك النهائية',
    snakeCollectPoints: 'اجمع النقاط',

    gameNumberPuzzle: 'ألغاز ترتيب الأرقام',
    numberPuzzleStartDesc: 'رتب الأرقام بالتسلسل الصحيح لحل اللغز!',
    numberPuzzleStartButton: 'ابدأ اللعب',
    numberPuzzleMoves: 'الحركات',
    numberPuzzleTime: 'الوقت',
    numberPuzzleFinishedTitle: 'أحسنت! تم حل اللغز',
    numberPuzzleFinishedDesc: 'لقد أظهرت مهارة رائعة في الترتيب!',
    numberPuzzleCollectPoints: 'اجمع النقاط',
    numberPuzzleChooseLevel: 'اختر المستوى',
    numberPuzzleLevelEasy: 'سهل 3x3',
    numberPuzzleLevelMedium: 'متوسط 4x4',
    numberPuzzleLevelHard: 'صعب 5x5',

    // Difficulty Modal
    selectDifficulty: 'اختر مستوى الصعوبة',
    difficultyEasy: 'سهل',
    difficultyMedium: 'متوسط',
    difficultyHard: 'صعب',
    difficultyVeryHard: 'صعب جداً',
    questionsAvailable: (count: number) => `${count} سؤال`,
    

    // Categories
    categories: {
        'أسئلة عامة': 'أسئلة عامة', 
        'العلوم': 'العلوم', 
        'التاريخ': 'التاريخ', 
        'الرياضيات': 'الرياضيات', 
        'البرمجة': 'البرمجة', 
        'الثقافة': 'الثقافة'
    },
    categoryIcons: {
        'أسئلة عامة': '🌍', 
        'العلوم': '🔬', 
        'التاريخ': '🏛️', 
        'الرياضيات': '🧮', 
        'البرمجة': '💻', 
        'الثقافة': '📚'
    },

    // Events Page
    eventsTitle: 'الفعاليات',
    eventsWeekly: 'البطولة الأسبوعية',
    eventsOngoing: 'جاري',
    eventsWeeklyDesc: 'تنافس مع اللاعبين الآخرين لتحتل المركز الأول!',
    eventsDaysLeft: '3 أيام متبقية',
    eventsPrize: 'جائزة',
    eventsWeekend: 'تحدي نهاية الأسبوع',
    eventsSoon: 'قريباً',
    eventsWeekendDesc: 'أجب على 100 سؤالاً في أقل وقت ممكن!',
    eventsStartsIn: 'يبدأ بعد يومين',
    eventsMarathon: 'ماراثون الألغاز',
    eventsCompleted: 'مكتمل',
    eventsMarathonDesc: 'شارك في الماراثون السابق واجمع نقاط إضافية!',
    eventsEnded: 'انتهى',
    
    // Leaderboard
    leaderboardTitleWeekly: 'صدارة البطولة الأسبوعية',
    leaderboardTitleWeekend: 'صدارة تحدي نهاية الأسبوع',
    leaderboardTitleMarathon: 'صدارة ماراثون الألغاز',
    leaderboardYourRank: 'ترتيبك الحالي',
    leaderboardNotInTop: 'لست في الصدارة بعد. استمر باللعب!',

    // Store Page
    storeTitle: 'المتجر',
    storeAvailablePoints: 'النقاط المتاحة للشراء',
    storeBuy: 'شراء',
    storeItemCrown: 'تاج الملك',
    storeItemCrownDesc: 'تميز بتاج الملك في الملف الشخصي',
    storeItemBooster: 'معزز السرعة',
    storeItemBoosterDesc: 'زود وقتك في الألغاز بمقدار 30 ثانية',
    storeItemHint: 'مفتاح المساعدة',
    storeItemHintDesc: 'احذف خيارين خاطئين من السؤال',
    storeItemTheme: 'سمة ذهبية',
    storeItemThemeDesc: 'غير مظهر التطبيق إلى السمة الذهبية',
    purchaseModalTitle: 'تأكيد الشراء',
    purchaseModalConfirm: 'شراء',
    purchaseModalCancel: 'إلغاء',
    purchaseModalBalance: 'رصيدك الحالي',
    purchaseModalCost: 'التكلفة',
    purchaseModalInsufficientPoints: 'نقاطك غير كافية!',
    purchaseSuccessMessage: 'تم الشراء بنجاح!',

    // Vault Page
    vaultTitle: 'الخزينة',
    vaultTotalPoints: 'إجمالي النقاط',
    vaultAchievements: 'الإنجازات',
    vaultChamp: 'البطل الأول',
    vaultChampDesc: 'احتل المركز الأول في بطولة',
    vaultDetective: 'المحقق',
    vaultDetectiveDesc: 'أجب على 50 سؤالاً بشكل صحيح',
    vaultSpeedster: 'السريع',
    vaultSpeedsterDesc: 'أجب على 10 أسئلة في أقل من دقيقة',
    vaultLevelProgress: 'تقدم المستوى',
    vaultLevelProgressDesc: (level: number) => `65% للإنتقال للمستوى ${level}`,

    // Account Page
    accountTitle: 'الحساب',
    accountUsername: 'الملك',
    accountWallet: 'المحفظة',
    accountWalletDesc: 'إدارة النقاط والعمليات',
    accountSettings: 'الإعدادات',
    accountSettingsDesc: 'تخصيص التطبيق',
    accountStats: 'الإحصائيات',
    accountStatsDesc: 'عرض أدائك وتقدمك',
    accountHelp: 'المساعدة',
    accountHelpDesc: 'أسئلة وأجوبة شائعة',
    accountReferral: 'دعوة وربح',
    accountReferralDesc: 'شارك التطبيق واكسب نقاط',
    accountSignInPrompt: 'سجّل الدخول لإدارة ملفك الشخصي ومزامنة تقدمك.',
    accountSignInWithGoogle: 'تسجيل الدخول باستخدام جوجل',
    accountSignOut: 'تسجيل الخروج',
    accountGuest: 'زائر',
    accountAuthHelpNote: 'ملاحظة للمطور:',
    accountAuthHelpDomain: 'إذا واجهت خطأ في تسجيل الدخول، تأكد من إضافة هذا النطاق إلى قائمة النطاقات المصرّح بها في Firebase:',

    // Referral Page
    referralYourCodeTitle: 'رمز الدعوة الخاص بك',
    referralYourCodeDesc: 'شارك هذا الرمز مع أصدقائك، وسيحصلون على مكافأة 20 نقطة!',
    referralCopy: 'نسخ',
    referralCopied: 'تم النسخ!',
    referralShare: 'مشاركة',
    referralEnterCodeTitle: 'هل لديك رمز دعوة؟',
    referralEnterCodeDesc: 'أدخل الرمز هنا للحصول على مكافأة 20 نقطة!',
    referralCodeInputPlaceholder: 'أدخل رمز الدعوة',
    referralGetReward: 'الحصول على المكافأة',
    referralSuccess: 'تهانينا! لقد حصلت على 20 نقطة!',
    referralErrorOwnCode: 'لا يمكنك استخدام الرمز الخاص بك.',
    referralErrorInvalidCode: 'الرمز غير صالح. يرجى التأكد والمحاولة مرة أخرى.',
    referralAlreadyUsedTitle: 'لقد استخدمت رمزًا بالفعل',
    referralAlreadyUsedDesc: 'يمكن استخدام رمز دعوة مرة واحدة فقط.',
    referralShareMessage: (code: string) => `انضم إلي في تطبيق الألغاز King2Kill! استخدم الرمز الخاص بي ${code} عند البدء.`,
    initialReferralSkip: 'تخطي',

    // Wallet Page
    walletTitle: 'المحفظة',
    walletBalance: 'رصيد النقاط',
    walletRecent: 'آخر العمليات',
    walletTx1: 'فوز في تحدي',
    walletTx1Date: 'أمس، 14:30',
    walletTx2: 'شراء من المتجر',
    walletTx2Date: 'منذ يومين، 10:15',
    walletTx3: 'إكمال لغز صعب',
    walletTx3Date: 'منذ 3 أيام، 16:45',
    walletBuyPoints: 'شراء نقاط',
    walletConvertPoints: 'تحويل نقاط',

    // Points Conversion Page
    conversionTitle: 'تحويل النقاط',
    conversionOffer: 'عرض التحويل المتاح',
    conversionConvert: 'حوّل',
    conversionAndGet: 'واحصل على',
    conversionYourId: 'ID الخاص بك',
    conversionIdPlaceholder: 'أدخل ID حسابك هنا',
    conversionConfirm: 'تأكيد التحويل',
    conversionHistory: 'سجل التحويلات',
    conversionNoHistory: 'لا توجد عمليات تحويل سابقة.',
    conversionNotEnoughPoints: 'نقاطك غير كافية لإتمام هذه العملية.',
    conversionEnterId: 'الرجاء إدخال ID الخاص بك للمتابعة.',
    conversionRequirements: 'شروط التحويل',
    conversionRequirementLevel: 'الوصول للمستوى 10',
    conversionRequirementPoints: 'امتلاك 5000 نقطة',
    conversionCurrentLevel: (level: number) => `مستواك الحالي: ${level}`,
    conversionCurrentPoints: (points: number) => `رصيدك الحالي: ${points} نقطة`,
    conversionHistoryEntry: (p: number) => `تحويل ${p} نقطة`,
    dateLabel: 'بتاريخ',
    idLabel: 'لـ ID',
    conversionSuccess: 'تم تحويل 5000 نقطة إلى 110 جوهرة بنجاح!',
    adRewardMessage: (p: number) => `تهانينا! لقد ربحت ${p} نقطة.`,

    // Quiz Page
    quizQuestionOf: (current: number, total: number) => `سؤال ${current}/${total}`,
    quizTime: 'الوقت',
    quizSeconds: 'ثانية',
    quizNoQuestions: 'لا توجد أسئلة لهذه الفئة.',
    quizResultExcellent: '🎉 ممتاز!',
    quizResultExcellentMsg: 'إجاباتك كلها صحيحة!',
    quizResultGood: '👏 أحسنت!',
    quizResultGoodMsg: 'أداء جيد في هذا التحدي',
    quizResultTryAgain: '💪 حاول مرة أخرى',
    quizResultTryAgainMsg: 'يمكنك التحسن في المرة القادمة',
    quizResultStats: (correct: number, total: number) => `${correct}/${total} إجابات صحيحة`,
    quizResultBack: 'العودة للرئيسية',
    bonusPointsForAnswers: 'مكافأة الإجابات الصحيحة',

    // Settings Page
    settingsTitle: 'الإعدادات',
    settingsLanguage: 'اللغة',
    settingsTheme: 'المظهر',
    settingsThemeLight: 'فاتح',
    settingsThemeDark: 'داكن',
    adSettingsTitle: 'إعدادات الإعلانات',
    removeAdsButton: (p: number) => `إزالة الإعلانات (${p} نقطة)`,
    adsRemovedMessage: 'الإعلانات معطلة على حسابك.',
    notEnoughPoints: 'نقاط غير كافية',

    // Rewarded Ad
    rewardedAdLoading: 'جاري تحميل الإعلان...',
    rewardedAdInfo: (s: number) => `ستحصل على مكافأتك بعد ${s} ثانية...`,

    // Stats Page
    statsTitle: 'الإحصائيات',
    statsOverall: 'الأداء العام',
    statsTotalQuizzes: 'إجمالي الألغاز',
    statsTotalQuestions: 'إجمالي الأسئلة',
    statsCorrect: 'الإجابات الصحيحة',
    statsIncorrect: 'الإجابات الخاطئة',
    statsAccuracy: 'الدقة',
    statsPointsFromQuizzes: 'نقاط الألغاز',
    statsPerformanceByCategory: 'الأداء حسب الفئة',
      
    // Help Page
    helpTitle: 'المساعدة',
    faqs: [
        {
            q: 'كيف يمكنني كسب النقاط؟',
            a: 'يمكنك كسب النقاط عن طريق الإجابة بشكل صحيح على أسئلة الألغاز، وإكمال التحديات اليومية، والمشاركة في الفعاليات الخاصة. كل إجابة صحيحة تمنحك 10 نقاط، وهناك نقاط إضافية عند إكمال كل لغز.'
        },
        {
            q: 'ما هي شروط تحويل النقاط إلى جواهر؟',
            a: 'لتحويل النقاط، يجب أن تصل إلى المستوى 10 وأن يكون لديك 5000 نقطة على الأقل. عند استيفاء هذه الشروط، يمكنك تحويل 5000 نقطة مقابل 110 جوهرة.'
        },
        {
            q: 'كيف يمكنني تغيير لغة التطبيق أو مظهره؟',
            a: 'يمكنك تغيير اللغة (العربية/الإنجليزية) والمظهر (فاتح/داكن) من خلال الذهاب إلى صفحة "الحساب" ثم اختيار "الإعدادات".'
        },
        {
            q: 'ماذا يحدث إذا انتهى الوقت قبل أن أجيب؟',
            a: 'إذا انتهى الوقت المخصص للسؤال (30 ثانية)، فسيتم اعتباره إجابة خاطئة وسيتم نقلك تلقائيًا إلى السؤال التالي.'
        },
        {
            q: 'هل يمكنني مراجعة أدائي؟',
            a: 'نعم، يمكنك عرض إحصائيات مفصلة حول أدائك من خلال صفحة "الإحصائيات" المتاحة في قسم "الحساب". ستجد هناك معلومات عن دقة إجاباتك وأدائك في كل فئة.'
        }
    ],

    // Info Pages
    aboutContent: [
        {
          content: [
            'مرحباً بك في King2Kill، وجهتك الأولى للألغاز والتحديات الذهنية الممتعة! نحن نؤمن بأن المعرفة قوة، وأن أفضل طريقة لاكتسابها هي من خلال التحدي والمرح.',
            'تم تصميم تطبيقنا ليكون تجربة تعليمية وترفيهية في آن واحد. سواء كنت ترغب في اختبار معلوماتك العامة، أو التعمق في مجالات مثل العلوم والتاريخ، أو حتى تحدي مهاراتك في البرمجة والرياضيات، ستجد لدينا ما يناسبك.'
          ]
        },
        {
          subtitle: 'مهمتنا',
          content: [
            'مهمتنا هي جعل التعلم ممتعًا ومتاحًا للجميع. نسعى لتقديم محتوى عالي الجودة ومحفز للتفكير يساعدك على توسيع آفاقك وتطوير مهاراتك بطريقة تفاعلية ومبتكرة.'
          ]
        }
    ],
    contactContent: [
       {
          content: [
            'يسعدنا دائمًا تواصلكم معنا! إذا كان لديك أي أسئلة أو اقتراحات أو ملاحظات، أو إذا واجهت أي مشكلة أثناء استخدام التطبيق، فلا تتردد في الاتصال بنا.',
            'يمكنك التواصل معنا عبر البريد الإلكتروني أو من خلال متابعتنا على منصات التواصل الاجتماعي الخاصة بنا للحصول على آخر التحديثات والأخبار.'
          ]
       },
       {
          subtitle: 'معلومات الاتصال',
          content: [
            'البريد الإلكتروني للدعم: support@king2kill.com',
            'للشراكات والإعلانات: business@king2kill.com'
          ]
       }
    ],
    privacyContent: [
        {
            subtitle: 'مقدمة',
            content: [
                'نحن في King2Kill نقدر خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي نتلقاها من مستخدمي تطبيقنا.'
            ]
        },
        {
            subtitle: 'المعلومات التي نجمعها',
            content: [
                'عند استخدامك لخدمة تسجيل الدخول عبر جوجل، فإننا نستلم معلومات ملفك الشخصي الأساسية مثل الاسم، البريد الإلكتروني، وصورة الملف الشخصي. نحن لا نجمع أي معلومات شخصية حساسة.',
                'قد نجمع بيانات استخدام مجهولة المصدر، مثل الألغاز التي تم لعبها والنتائج، لتحسين أداء التطبيق وتجربة المستخدم.'
            ]
        },
        {
            subtitle: 'استخدام خدمات الطرف الثالث',
            content: [
                'يستخدم هذا التطبيق خدمة Google AdSense لعرض الإعلانات. قد تستخدم جوجل والشركاء التابعون لها ملفات تعريف الارتباط (Cookies) لعرض إعلانات مخصصة بناءً على زياراتك السابقة للتطبيق أو لمواقع أخرى. يمكنك إلغاء الاشتراك في الإعلانات المخصصة من خلال زيارة إعدادات الإعلانات في حساب جوجل الخاص بك.'
            ]
        },
        {
            subtitle: 'أمن البيانات',
            content: [
                'نتخذ تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف عنها.'
            ]
        },
        {
            subtitle: 'التغييرات على هذه السياسة',
            content: [
                'قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنعلمك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.'
            ]
        }
    ],
    termsContent: [
        {
            subtitle: '1. قبول الشروط',
            content: [
                'باستخدام تطبيق King2Kill، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي جزء من الشروط، فلا يجوز لك استخدام التطبيق.'
            ]
        },
        {
            subtitle: '2. استخدام التطبيق',
            content: [
                'يتم توفير التطبيق للاستخدام الشخصي وغير التجاري. لا يجوز لك استخدام التطبيق لأي غرض غير قانوني أو محظور بموجب هذه الشروط.'
            ]
        },
        {
            subtitle: '3. سلوك المستخدم',
            content: [
                'أنت توافق على عدم استخدام أي وسائل للغش أو استغلال الأخطاء البرمجية للحصول على ميزة غير عادلة. أي سلوك من هذا القبيل قد يؤدي إلى تعليق حسابك.'
            ]
        },
        {
            subtitle: '4. الملكية الفكرية',
            content: [
                'جميع المحتويات المعروضة في التطبيق، بما في ذلك النصوص والرسومات والأسئلة، هي ملك لـ King2Kill ومحمية بموجب قوانين حقوق النشر.'
            ]
        },
        {
            subtitle: '5. إخلاء المسؤولية',
            content: [
                'يتم توفير التطبيق "كما هو" دون أي ضمانات من أي نوع. نحن لا نضمن أن التطبيق سيكون خاليًا من الأخطاء أو أن الوصول إليه سيكون مستمرًا أو غير متقطع.'
            ]
        },
        {
            subtitle: '6. تحديد المسؤولية',
            content: [
                'لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة تنشأ عن استخدامك أو عدم قدرتك على استخدام التطبيق.'
            ]
        }
    ]

  },
  en: {
    // General
    points: 'Points',
    level: 'Level',
    back: '‹ Back',
    next: 'Next',
    adLabel: 'Advertisement',

    // Nav
    navHome: 'Home',
    navEvents: 'Events',
    navStore: 'Store',
    navVault: 'Vault',
    navAccount: 'Account',
    
    // Sidebar
    sidebarYoutube: 'YouTube',
    sidebarKick: 'Kick',
    sidebarShareApp: 'Share App',
    sidebarShareText: 'Check out the King2Kill quiz app! It\'s fun and informative.',
    sidebarAbout: 'About Us',
    sidebarContact: 'Contact Us',
    sidebarPrivacy: 'Privacy Policy',
    sidebarTerms: 'Terms of Use',
    sidebarInfo: 'Information',

    // Page Titles
    pageTitles: {
        home: 'Home',
        events: 'Events',
        store: 'Store',
        vault: 'Vault',
        account: 'Account',
        wallet: 'Wallet',
        quiz: 'Quiz Page',
        'points-conversion': 'Points Conversion',
        settings: 'Settings',
        stats: 'Statistics',
        help: 'Help',
        about: 'About Us',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        leaderboard: 'Leaderboard',
        referral: 'Refer Friends',
        subwaySurfers: 'Subway Surfers',
        ticTacToe: 'Tic-Tac-Toe',
        memoryGame: 'Memory Game',
        snakeGame: 'Snake Game',
        numberPuzzle: 'Number Puzzle',
    },

    // Home Page
    homeWelcome: 'Welcome to King2Kill 👑',
    homeChooseCategory: 'Choose a quiz category',
    homeStats: 'Your Stats',
    homeSolved: 'Puzzles Solved',
    homeCorrect: 'Correct Answers',
    homeSuccessRate: 'Success Rate',
    homeDailyChallenge: 'Daily Challenge',
    homeDailyChallengeDesc: 'Solve 5 puzzles to earn 50 extra points!',
    homeStartChallenge: 'Start Challenge',
    homeWatchAdTitle: 'Watch & Earn',
    homeWatchAdDesc: (p: number) => `Watch an ad and get ${p} points!`,
    homeWatchAdButton: 'Watch Ad',
    homeWatchAdRemaining: (w: number, t: number) => `${t - w}/${t} remaining`,
    homeWatchAdCooldown: (s: number) => `Wait ${s}s`,
    homeWatchAdLimitReached: 'Daily limit reached',
    homeOtherGames: 'Other Games',

    // Games
    gameSubwaySurfers: 'Subway Surfers',
    subwayStartDesc: 'Run as fast as you can and collect points!',
    subwayStartButton: 'Start Playing',
    subwayPlayingTitle: 'Running...',
    subwayPlayingDesc: 'Dodge obstacles and collect gold coins!',
    subwayFinishedTitle: 'Run Over!',
    subwayFinishedDesc: 'You did a great job!',
    subwayCollect: 'Collect Points',
    subwayScore: 'Score',
    subwayInstructions: 'Use arrow keys or on-screen buttons to move.',

    gameTicTacToe: 'Tic-Tac-Toe',
    ticTacToeStartDesc: 'Compete against King2Kill or a friend in a classic game.',
    ticTacToeChooseMode: 'Choose Game Mode',
    ticTacToePlayerVsCpu: 'Player vs. King2Kill',
    ticTacToePlayerVsPlayer: 'Player vs. Player',
    ticTacToeTurn: (player: string) => `Player ${player}'s Turn`,
    ticTacToeYourTurn: 'Your Turn',
    ticTacToeCpuTurn: 'King2Kill is thinking...',
    ticTacToeWinner: (player: string) => `Player ${player} Wins!`,
    ticTacToeKing2KillWins: 'King2Kill Wins!',
    ticTacToeDraw: "It's a Draw!",
    ticTacToePlayAgain: 'Play Again',
    ticTacToeCollectPoints: 'Collect Points',

    gameMemoryGame: 'Memory Game',
    memoryStartDesc: 'Match the similar cards and test your memory!',
    memoryStartButton: 'Start Playing',
    memoryMoves: 'Moves',
    memoryTime: 'Time',
    memorySeconds: 'seconds',
    memoryFinishedTitle: 'Well Done!',
    memoryFinishedDesc: 'You have found all the matching pairs.',
    memoryCollectPoints: 'Collect Points',

    gameSnake: 'Snake Game',
    snakeStartDesc: 'Eat the food, grow longer, and avoid crashing!',
    snakeStartButton: 'Start Playing',
    snakeScore: 'Score',
    snakeGameOver: 'Game Over!',
    snakeYourScore: 'Your final score',
    snakeCollectPoints: 'Collect Points',

    gameNumberPuzzle: 'Number Puzzle',
    numberPuzzleStartDesc: 'Arrange the numbers in the correct sequence to solve the puzzle!',
    numberPuzzleStartButton: 'Start Playing',
    numberPuzzleMoves: 'Moves',
    numberPuzzleTime: 'Time',
    numberPuzzleFinishedTitle: 'Well Done! Puzzle Solved!',
    numberPuzzleFinishedDesc: 'You showed great skill in arranging!',
    numberPuzzleCollectPoints: 'Collect Points',
    numberPuzzleChooseLevel: 'Choose a Level',
    numberPuzzleLevelEasy: 'Easy 3x3',
    numberPuzzleLevelMedium: 'Medium 4x4',
    numberPuzzleLevelHard: 'Hard 5x5',
    
    // Difficulty Modal
    selectDifficulty: 'Select Difficulty',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    difficultyVeryHard: 'Very Hard',
    questionsAvailable: (count: number) => `${count} questions`,

    // Categories
    categories: {
        'أسئلة عامة': 'General Questions', 
        'العلوم': 'Science', 
        'التاريخ': 'History', 
        'الرياضيات': 'Math', 
        'البرمجة': 'Programming', 
        'الثقافة': 'Culture'
    },
    categoryIcons: {
        'أسئلة عامة': '🌍', 
        'العلوم': '🔬', 
        'التاريخ': '🏛️', 
        'الرياضيات': '🧮', 
        'البرمجة': '💻', 
        'الثقافة': '📚'
    },
    
    // Events Page
    eventsTitle: 'Events',
    eventsWeekly: 'Weekly Tournament',
    eventsOngoing: 'Ongoing',
    eventsWeeklyDesc: 'Compete with other players to take first place!',
    eventsDaysLeft: '3 days left',
    eventsPrize: 'Prize',
    eventsWeekend: 'Weekend Challenge',
    eventsSoon: 'Soon',
    eventsWeekendDesc: 'Answer 20 questions in the shortest time possible!',
    eventsStartsIn: 'Starts in 2 days',
    eventsMarathon: 'Puzzle Marathon',
    eventsCompleted: 'Completed',
    eventsMarathonDesc: 'Participate in the last marathon and collect extra points!',
    eventsEnded: 'Ended',

    // Leaderboard
    leaderboardTitleWeekly: 'Weekly Tournament Leaderboard',
    leaderboardTitleWeekend: 'Weekend Challenge Leaderboard',
    leaderboardTitleMarathon: 'Puzzle Marathon Leaderboard',
    leaderboardYourRank: 'Your Current Rank',
    leaderboardNotInTop: 'Not in the top yet. Keep playing!',

    // Store Page
    storeTitle: 'Store',
    storeAvailablePoints: 'Available points for purchase',
    storeBuy: 'Buy',
    storeItemCrown: "King's Crown",
    storeItemCrownDesc: 'Stand out with the king\'s crown on your profile',
    storeItemBooster: 'Speed Booster',
    storeItemBoosterDesc: 'Increase your time in puzzles by 30 seconds',
    storeItemHint: 'Hint Key',
    storeItemHintDesc: 'Remove two wrong options from the question',
    storeItemTheme: 'Golden Theme',
    storeItemThemeDesc: 'Change the app appearance to the golden theme',
    purchaseModalTitle: 'Confirm Purchase',
    purchaseModalConfirm: 'Buy',
    purchaseModalCancel: 'Cancel',
    purchaseModalBalance: 'Your current balance',
    purchaseModalCost: 'Cost',
    purchaseModalInsufficientPoints: 'Insufficient points!',
    purchaseSuccessMessage: 'Purchase successful!',

    // Vault Page
    vaultTitle: 'Vault',
    vaultTotalPoints: 'Total Points',
    vaultAchievements: 'Achievements',
    vaultChamp: 'First Champion',
    vaultChampDesc: 'Took first place in a tournament',
    vaultDetective: 'Detective',
    vaultDetectiveDesc: 'Answered 50 questions correctly',
    vaultSpeedster: 'Speedster',
    vaultSpeedsterDesc: 'Answered 10 questions in under a minute',
    vaultLevelProgress: 'Level Progress',
    vaultLevelProgressDesc: (level: number) => `65% to advance to level ${level}`,

    // Account Page
    accountTitle: 'Account',
    accountUsername: 'The King',
    accountWallet: 'Wallet',
    accountWalletDesc: 'Manage points and transactions',
    accountSettings: 'Settings',
    accountSettingsDesc: 'Customize the application',
    accountStats: 'Statistics',
    accountStatsDesc: 'View your performance and progress',
    accountHelp: 'Help',
    accountHelpDesc: 'Frequently asked questions and answers',
    accountReferral: 'Invite & Earn',
    accountReferralDesc: 'Share the app and earn points',
    accountSignInPrompt: 'Sign in to manage your profile and sync your progress.',
    accountSignInWithGoogle: 'Sign in with Google',
    accountSignOut: 'Sign Out',
    accountGuest: 'Guest',
    accountAuthHelpNote: 'Developer Note:',
    accountAuthHelpDomain: 'If you encounter a sign-in error, ensure this domain is added to your authorized domains in Firebase:',
    
    // Referral Page
    referralYourCodeTitle: 'Your Referral Code',
    referralYourCodeDesc: 'Share this code with your friends and they will get a 20 point reward!',
    referralCopy: 'Copy',
    referralCopied: 'Copied!',
    referralShare: 'Share',
    referralEnterCodeTitle: 'Have a Referral Code?',
    referralEnterCodeDesc: 'Enter the code here to get a 20 point reward!',
    referralCodeInputPlaceholder: 'Enter referral code',
    referralGetReward: 'Get Reward',
    referralSuccess: 'Congratulations! You\'ve received 20 points!',
    referralErrorOwnCode: 'You cannot use your own code.',
    referralErrorInvalidCode: 'Invalid code. Please check and try again.',
    referralAlreadyUsedTitle: "You've Already Used a Code",
    referralAlreadyUsedDesc: 'A referral code can only be used once.',
    referralShareMessage: (code: string) => `Join me on the King2Kill quiz app! Use my code ${code} when you start.`,
    initialReferralSkip: 'Skip',

    // Wallet Page
    walletTitle: 'Wallet',
    walletBalance: 'Points Balance',
    walletRecent: 'Recent Transactions',
    walletTx1: 'Challenge Win',
    walletTx1Date: 'Yesterday, 14:30',
    walletTx2: 'Store Purchase',
    walletTx2Date: '2 days ago, 10:15',
    walletTx3: 'Hard Puzzle Complete',
    walletTx3Date: '3 days ago, 16:45',
    walletBuyPoints: 'Buy Points',
    walletConvertPoints: 'Convert Points',

    // Points Conversion Page
    conversionTitle: 'Convert Points',
    conversionOffer: 'Available Conversion Offer',
    conversionConvert: 'Convert',
    conversionAndGet: 'and get',
    conversionYourId: 'Your ID',
    conversionIdPlaceholder: 'Enter your account ID here',
    conversionConfirm: 'Confirm Conversion',
    conversionHistory: 'Conversion History',
    conversionNoHistory: 'No previous conversion history.',
    conversionNotEnoughPoints: 'You do not have enough points for this transaction.',
    conversionEnterId: 'Please enter your ID to proceed.',
    conversionRequirements: 'Conversion Requirements',
    conversionRequirementLevel: 'Reach Level 10',
    conversionRequirementPoints: 'Have 5000 points',
    conversionCurrentLevel: (level: number) => `Your current level: ${level}`,
    conversionCurrentPoints: (points: number) => `Your current balance: ${points} points`,
    conversionHistoryEntry: (p: number) => `Converted ${p} points`,
    dateLabel: 'Date',
    idLabel: 'For ID',
    conversionSuccess: 'Successfully converted 5000 points to 110 gems!',
    adRewardMessage: (p: number) => `Congratulations! You've earned ${p} points.`,

    // Quiz Page
    quizQuestionOf: (current: number, total: number) => `Question ${current}/${total}`,
    quizTime: 'Time',
    quizSeconds: 'seconds',
    quizNoQuestions: 'There are no questions for this category.',
    quizResultExcellent: '🎉 Excellent!',
    quizResultExcellentMsg: 'All your answers are correct!',
    quizResultGood: '👏 Well done!',
    quizResultGoodMsg: 'Good performance in this challenge',
    quizResultTryAgain: '💪 Try again',
    quizResultTryAgainMsg: 'You can improve next time',
    quizResultStats: (correct: number, total: number) => `${correct}/${total} correct answers`,
    quizResultBack: 'Back to Home',
    bonusPointsForAnswers: 'Correct Answers Bonus',

    // Settings Page
    settingsTitle: 'Settings',
    settingsLanguage: 'Language',
    settingsTheme: 'Theme',
    settingsThemeLight: 'Light',
    settingsThemeDark: 'Dark',
    adSettingsTitle: 'Ad Settings',
    removeAdsButton: (p: number) => `Remove Ads (${p} points)`,
    adsRemovedMessage: 'Ads are disabled on your account.',
    notEnoughPoints: 'Not enough points',
    
    // Rewarded Ad
    rewardedAdLoading: 'Loading Ad...',
    rewardedAdInfo: (s: number) => `You will be rewarded in ${s} seconds...`,

    // Stats Page
    statsTitle: 'Statistics',
    statsOverall: 'Overall Performance',
    statsTotalQuizzes: 'Total Quizzes',
    statsTotalQuestions: 'Total Questions',
    statsCorrect: 'Correct Answers',
    statsIncorrect: 'Incorrect Answers',
    statsAccuracy: 'Accuracy',
    statsPointsFromQuizzes: 'Points from Quizzes',
    statsPerformanceByCategory: 'Performance by Category',

    // Help Page
    helpTitle: 'Help',
    faqs: [
        {
            q: 'How can I earn points?',
            a: 'You can earn points by correctly answering quiz questions, completing daily challenges, and participating in special events. Each correct answer gives you 10 points, with bonus points for completing a full quiz.'
        },
        {
            q: 'What are the requirements for converting points to gems?',
            a: 'To convert points, you must reach Level 10 and have at least 5000 points. Once you meet these conditions, you can convert 5000 points for 110 gems.'
        },
        {
            q: 'How can I change the app language or theme?',
            a: 'You can change the language (Arabic/English) and theme (Light/Dark) by navigating to the "Account" page and then selecting "Settings".'
        },
        {
            q: 'What happens if the time runs out before I answer?',
            a: 'If the time for a question (30 seconds) expires, it will be considered an incorrect answer, and you will automatically be moved to the next question.'
        },
        {
            q: 'Can I review my performance?',
            a: 'Yes, you can view detailed statistics about your performance on the "Statistics" page, available from the "Account" section. You will find information about your accuracy and performance in each category.'
        }
    ],

    // Info Pages
    aboutContent: [
        {
          content: [
            'Welcome to King2Kill, your premier destination for fun puzzles and mental challenges! We believe that knowledge is power, and the best way to acquire it is through fun and challenge.',
            'Our application is designed to be an educational and entertaining experience. Whether you want to test your general knowledge, delve into fields like science and history, or even challenge your skills in programming and mathematics, you will find what you are looking for here.'
          ]
        },
        {
          subtitle: 'Our Mission',
          content: [
            'Our mission is to make learning fun and accessible to everyone. We strive to provide high-quality, thought-provoking content that helps you broaden your horizons and develop your skills in an interactive and innovative way.'
          ]
        }
    ],
    contactContent: [
       {
          content: [
            'We are always happy to hear from you! If you have any questions, suggestions, or feedback, or if you encounter any issues while using the application, please do not hesitate to contact us.',
            'You can reach us via email or by following us on our social media platforms for the latest updates and news.'
          ]
       },
       {
          subtitle: 'Contact Information',
          content: [
            'Support Email: support@king2kill.com',
            'For Partnerships & Advertising: business@king2kill.com'
          ]
       }
    ],
    privacyContent: [
        {
            subtitle: 'Introduction',
            content: [
                'At King2Kill, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information we receive from users of our application.'
            ]
        },
        {
            subtitle: 'Information We Collect',
            content: [
                'When you use the Google Sign-In service, we receive your basic profile information such as your name, email address, and profile picture. We do not collect any sensitive personal information.',
                'We may collect anonymous usage data, such as puzzles played and scores, to improve the application\'s performance and user experience.'
            ]
        },
        {
            subtitle: 'Use of Third-Party Services',
            content: [
                'This application uses Google AdSense to display advertisements. Google and its partners may use cookies to serve personalized ads based on your prior visits to the application or other websites. You can opt out of personalized advertising by visiting Ads Settings in your Google account.'
            ]
        },
        {
            subtitle: 'Data Security',
            content: [
                'We take reasonable security measures to protect your information from unauthorized access, alteration, or disclosure.'
            ]
        },
        {
            subtitle: 'Changes to This Policy',
            content: [
                'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.'
            ]
        }
    ],
    termsContent: [
        {
            subtitle: '1. Acceptance of Terms',
            content: [
                'By using the King2Kill application, you agree to be bound by these Terms of Use. If you do not agree to any part of the terms, you may not use the application.'
            ]
        },
        {
            subtitle: '2. Use of the Application',
            content: [
                'The application is provided for your personal, non-commercial use. You may not use the application for any illegal or prohibited purpose under these terms.'
            ]
        },
        {
            subtitle: '3. User Conduct',
            content: [
                'You agree not to use any means of cheating or exploiting software bugs to gain an unfair advantage. Any such behavior may result in the suspension of your account.'
            ]
        },
        {
            subtitle: '4. Intellectual Property',
            content: [
                'All content displayed in the application, including text, graphics, and questions, is the property of King2Kill and is protected by copyright laws.'
            ]
        },
        {
            subtitle: '5. Disclaimers',
            content: [
                'The application is provided "as is" without any warranties of any kind. We do not guarantee that the application will be error-free or that access to it will be continuous or uninterrupted.'
            ]
        },
        {
            subtitle: '6. Limitation of Liability',
            content: [
                'We will not be liable for any direct or indirect damages arising from your use or inability to use the application.'
            ]
        }
    ]
  },
};