import { QuizQuestion, QuizCategory, LeaderboardUser, EventType, StoreItem } from './types';

export const QUIZ_DATA: Record<QuizCategory, QuizQuestion[]> = {
  'أسئلة عامة': [
    // سهل - 10 نقاط
    { question: 'ما هو أكبر كوكب في نظامنا الشمسي؟', options: [{ text: 'الأرض', correct: false }, { text: 'المريخ', correct: false }, { text: 'المشتري', correct: true }, { text: 'زحل', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد القارات في العالم؟', options: [{ text: '5', correct: false }, { text: '6', correct: false }, { text: '7', correct: true }, { text: '8', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي عاصمة إيطاليا؟', options: [{ text: 'ميلانو', correct: false }, { text: 'نابولي', correct: false }, { text: 'روما', correct: true }, { text: 'فينيسيا', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو أسرع حيوان بري؟', options: [{ text: 'الأسد', correct: false }, { text: 'النمر', correct: false }, { text: 'الفهد', correct: true }, { text: 'الغزال', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'من كتب "هاملت"؟', options: [{ text: 'تشارلز ديكنز', correct: false }, { text: 'جورج أورويل', correct: false }, { text: 'ويليام شكسبير', correct: true }, { text: 'جين أوستن', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو أكبر محيط في العالم؟', options: [{ text: 'الأطلسي', correct: false }, { text: 'الهندي', correct: false }, { text: 'الهادئ', correct: true }, { text: 'المتجمد الشمالي', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الغاز الذي نتنفسه لنبقى على قيد الحياة؟', options: [{ text: 'النيتروجين', correct: false }, { text: 'ثاني أكسيد الكربون', correct: false }, { text: 'الأكسجين', correct: true }, { text: 'الهيدروجين', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد الألوان في قوس قزح؟', options: [{ text: '5', correct: false }, { text: '6', correct: false }, { text: '7', correct: true }, { text: '8', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي العملة الرسمية للمملكة المتحدة؟', options: [{ text: 'الدولار', correct: false }, { text: 'اليورو', correct: false }, { text: 'الجنيه الإسترليني', correct: true }, { text: 'الفرنك', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'في أي بلد توجد الأهرامات؟', options: [{ text: 'السودان', correct: false }, { text: 'المكسيك', correct: false }, { text: 'مصر', correct: true }, { text: 'بيرو', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو أطول نهر في العالم؟', options: [{ text: 'الأمازون', correct: false }, { text: 'المسيسيبي', correct: false }, { text: 'النيل', correct: true }, { text: 'اليانغتسي', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'من رسم لوحة الموناليزا؟', options: [{ text: 'فان جوخ', correct: false }, { text: 'بيكاسو', correct: false }, { text: 'ليوناردو دافنشي', correct: true }, { text: 'رامبرانت', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الكوكب الأحمر؟', options: [{ text: 'الزهرة', correct: false }, { text: 'عطارد', correct: false }, { text: 'المريخ', correct: true }, { text: 'المشتري', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد أيام الأسبوع؟', options: [{ text: '6', correct: false }, { text: '8', correct: false }, { text: '7', correct: true }, { text: '5', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي عاصمة فرنسا؟', options: [{ text: 'لندن', correct: false }, { text: 'برلين', correct: false }, { text: 'باريس', correct: true }, { text: 'مدريد', correct: false }], points: 10, difficulty: 'سهل' },
    
    // متوسط - 20 نقطة
    { question: 'ما هو أعلى جبل في العالم؟', options: [{ text: 'جبل كليمنجارو', correct: false }, { text: 'جبل كي 2', correct: false }, { text: 'جبل إيفرست', correct: true }, { text: 'مون بلان', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من اخترع المصباح الكهربائي؟', options: [{ text: 'نيكولا تسلا', correct: false }, { text: 'ألكسندر جراهام بيل', correct: false }, { text: 'توماس إديسون', correct: true }, { text: 'ماري كوري', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي أكبر صحراء في العالم؟', options: [{ text: 'الصحراء الكبرى', correct: false }, { text: 'الصحراء العربية', correct: false }, { text: 'الصحراء القطبية الجنوبية', correct: true }, { text: 'صحراء جوبي', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي أصغر دولة في العالم؟', options: [{ text: 'موناكو', correct: false }, { text: 'ناورو', correct: false }, { text: 'الفاتيكان', correct: true }, { text: 'سان مارينو', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو العنصر الكيميائي الذي رمزه "Au"؟', options: [{ text: 'الفضة', correct: false }, { text: 'النحاس', correct: false }, { text: 'الذهب', correct: true }, { text: 'الألومنيوم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'في أي عام هبط الإنسان على سطح القمر لأول مرة؟', options: [{ text: '1965', correct: false }, { text: '1972', correct: false }, { text: '1969', correct: true }, { text: '1981', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من هو مؤلف "1984"؟', options: [{ text: 'ألدوس هكسلي', correct: false }, { text: 'راي برادبري', correct: false }, { text: 'جورج أورويل', correct: true }, { text: 'جي. آر. آر. تولكين', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو أعمق محيط في العالم؟', options: [{ text: 'الأطلسي', correct: false }, { text: 'الهندي', correct: false }, { text: 'الهادئ', correct: true }, { text: 'المتجمد الجنوبي', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي الدولة الأكثر سكاناً في العالم؟', options: [{ text: 'الولايات المتحدة', correct: false }, { text: 'إندونيسيا', correct: false }, { text: 'الهند', correct: true }, { text: 'الصين', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي نظرية النسبية؟', options: [{ text: 'نظرية الجاذبية لنيوتن', correct: false }, { text: 'نظرية التطور لداروين', correct: false }, { text: 'نظرية أينشتاين', correct: true }, { text: 'نظرية الانفجار العظيم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي المادة الأقسى على وجه الأرض؟', options: [{ text: 'الصلب', correct: false }, { text: 'الكوارتز', correct: false }, { text: 'الألماس', correct: true }, { text: 'التيتانيوم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو الاسم الكيميائي للملح؟', options: [{ text: 'بيكربونات الصوديوم', correct: false }, { text: 'حمض الأسيتيك', correct: false }, { text: 'كلوريد الصوديوم', correct: true }, { text: 'حمض الستريك', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي الحرب التي استمرت 100 عام؟', options: [{ text: 'الحرب العالمية الأولى', correct: false }, { text: 'الحروب النابليونية', correct: false }, { text: 'حرب المائة عام', correct: true }, { text: 'حرب الثلاثين عاما', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من بنى سور الصين العظيم؟', options: [{ text: 'سلالة هان', correct: false }, { text: 'سلالة تانغ', correct: false }, { text: 'سلالة تشين', correct: true }, { text: 'سلالة مينغ', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو أكبر حيوان على وجه الأرض؟', options: [{ text: 'الفيل الأفريقي', correct: false }, { text: 'القرش الأبيض الكبير', correct: false }, { text: 'الحوت الأزرق', correct: true }, { text: 'الحبار العملاق', correct: false }], points: 20, difficulty: 'متوسط' },

    // صعب - 30 نقطة
    { question: 'ما هو الثابت الرياضي الذي يبدأ بـ 3.14159؟', options: [{ text: 'ثابت أويلر (e)', correct: false }, { text: 'النسبة الذهبية (φ)', correct: false }, { text: 'باي (π)', correct: true }, { text: 'الجذر التربيعي لـ 2', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'في أي مدينة تم اغتيال الأرشيدوق فرانز فرديناند، مما أدى إلى اندلاع الحرب العالمية الأولى؟', options: [{ text: 'فيينا', correct: false }, { text: 'بلغراد', correct: false }, { text: 'سراييفو', correct: true }, { text: 'براغ', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو "مبدأ عدم اليقين" لهايزنبرج؟', options: [{ text: 'مبدأ في الديناميكا الحرارية', correct: false }, { text: 'قانون في الجاذبية الكونية', correct: false }, { text: 'مبدأ أساسي في ميكانيكا الكم', correct: true }, { text: 'نظرية في علم الأحياء التطوري', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من هو الفيلسوف اليوناني الذي كان تلميذًا لسقراط ومعلمًا لأرسطو؟', options: [{ text: 'فيثاغورس', correct: false }, { text: 'هيرقليطس', correct: false }, { text: 'أفلاطون', correct: true }, { text: 'ديوجين', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أندر فصيلة دم لدى البشر؟', options: [{ text: 'O سالب', correct: false }, { text: 'B سالب', correct: false }, { text: 'AB سالب', correct: true }, { text: 'A سالب', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أول فيلم رسوم متحركة طويل من إنتاج ديزني؟', options: [{ text: 'بينوكيو', correct: false }, { text: 'بامبي', correct: false }, { text: 'سنو وايت والأقزام السبعة', correct: true }, { text: 'دمبو', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي العملية التي تحول بها النباتات ضوء الشمس إلى طعام؟', options: [{ text: 'التنفس', correct: false }, { text: 'النتح', correct: false }, { text: 'التمثيل الضوئي', correct: true }, { text: 'الامتصاص', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أطول بناء في العالم حاليًا؟', options: [{ text: 'برج شنغهاي', correct: false }, { text: 'برج ساعة مكة الملكي', correct: false }, { text: 'برج خليفة', correct: true }, { text: 'برج تايبيه 101', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أقدم نظام كتابة معروف في العالم؟', options: [{ text: 'الهيروغليفية المصرية', correct: false }, { text: 'الأبجدية الفينيقية', correct: false }, { text: 'الكتابة المسمارية', correct: true }, { text: 'الكتابة الصينية القديمة', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ماذا يقيس مقياس ريختر؟', options: [{ text: 'سرعة الرياح', correct: false }, { text: 'الضغط الجوي', correct: false }, { text: 'قوة الزلازل', correct: true }, { text: 'درجة حرارة المحيطات', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ماذا يعني الاختصار "laser"؟', options: [{ text: 'تضخيم الضوء بانبعاث الإشعاع المحفز', correct: true }, { text: 'جهاز صوتي خفيف', correct: false }, { text: 'موجات الراديو', correct: false }, { text: 'لا شيء مما سبق', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو مرض أسقربوط؟', options: [{ text: 'نقص فيتامين سي', correct: true }, { text: 'نقص الحديد', correct: false }, { text: 'نقص الكالسيوم', correct: false }, { text: 'نقص فيتامين د', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من كتب "الجريمة والعقاب"؟', options: [{ text: 'ليو تولستوي', correct: true }, { text: 'فيودور دوستويفسكي', correct: false }, { text: 'أنطون تشيخوف', correct: false }, { text: 'إيفان تورغينيف', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أصل الشوكولاتة؟', options: [{ text: 'أمريكا الوسطى', correct: true }, { text: 'أوروبا', correct: false }, { text: 'آسيا', correct: false }, { text: 'أفريقيا', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي متلازمة ستوكهولم؟', options: [{ text: 'استجابة نفسية يظهر فيها الرهائن تعاطفًا مع آسريهم', correct: true }, { text: 'اضطراب نوم', correct: false }, { text: 'نوع من فقدان الذاكرة', correct: false }, { text: 'خوف من الأماكن المفتوحة', correct: false }], points: 30, difficulty: 'صعب' },

    // صعب جدا - 50 نقطة
    { question: 'ما هو مفارقة "سفينة ثيسيوس" الفلسفية؟', options: [{ text: 'مفارقة تتعلق بالسفر عبر الزمن', correct: false }, { text: 'مفارقة تتعلق بالاحتمالات الرياضية', correct: false }, { text: 'مفارقة حول الهوية والكينونة', correct: true }, { text: 'مفارقة منطقية حول الحركة', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي "فرضية ريمان"، وهي إحدى مسائل جائزة الألفية السبع؟', options: [{ text: 'مسألة في نظرية الأعداد', correct: true }, { text: 'مسألة في الطوبولوجيا', correct: false }, { text: 'مسألة في فيزياء الكم', correct: false }, { text: 'مسألة في علم الحاسوب', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "تأثير المراقب" في فيزياء الكم؟', options: [{ text: 'ظاهرة تغير سلوك الجسيمات عند ملاحظتها', correct: true }, { text: 'ظاهرة انحناء الضوء حول الأجسام الضخمة', correct: false }, { text: 'ظاهرة توسع الكون', correct: false }, { text: 'ظاهرة التشابك الكمي', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'من هو المهندس الذي صمم نظام الصرف الصحي في لندن في القرن التاسع عشر وأنهى مشكلة "الرائحة الكريهة العظيمة"؟', options: [{ text: 'إسامبارد كينجدم برونيل', correct: false }, { text: 'جوزيف بازالجيت', correct: true }, { text: 'توماس تيلفورد', correct: false }, { text: 'جون سن', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "تفاعل ميلارد"؟', options: [{ text: 'تفاعل نووي في النجوم', correct: false }, { text: 'تفاعل كيميائي بين الأحماض الأمينية والسكريات يعطي الطعام المطبوخ نكهته', correct: true }, { text: 'تفاعل مسؤول عن الصدأ', correct: false }, { text: 'تفاعل في عملية التخمر', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "الانفجار الكامبري"؟', options: [{ text: 'حدث انقراض جماعي', correct: false }, { text: 'ظهور مفاجئ وسريع لمعظم الشعب الحيوانية الرئيسية في السجل الأحفوري', correct: true }, { text: 'تصادم كويكب كبير بالأرض', correct: false }, { text: 'فترة من النشاط البركاني الشديد', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ماذا كانت "حرب الأفيون"؟', options: [{ text: 'حرب أهلية في الصين', correct: false }, { text: 'صراعان بين الصين وبريطانيا بسبب التجارة', correct: true }, { text: 'حرب بين كولومبيا والولايات المتحدة', correct: false }, { text: 'تمرد في الهند', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو الغرض من "مسبار فوياجر الذهبي"؟', options: [{ text: 'لتسجيل بيانات عن الغلاف الجوي للمشتري', correct: false }, { text: 'لإرسال رسالة إلى أي شكل من أشكال الحياة خارج كوكب الأرض قد تجده', correct: true }, { text: 'لتحليل تكوين حلقات زحل', correct: false }, { text: 'لتحديد مواقع الكواكب الخارجية', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو أصل كلمة "أفوكادو"؟', options: [{ text: 'من كلمة في لغة الناواتل الأزتكية تعني "الخصية"', correct: true }, { text: 'من كلمة إسبانية تعني "الكمثرى الخضراء"', correct: false }, { text: 'من اسم مستكشف برتغالي', correct: false }, { text: 'من كلمة في لغة المايا تعني "طعام الآلهة"', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "الحد الأقصى لـ Chandrasekhar"؟', options: [{ text: 'أقصى درجة حرارة يمكن أن يصل إليها نجم', correct: false }, { text: 'الكتلة القصوى التي يمكن أن يدعمها ضغط الإلكترون ضد الجاذبية في قزم أبيض', correct: true }, { text: 'السرعة القصوى التي يمكن أن يدور بها نجم نيوتروني', correct: false }, { text: 'أقصى حجم يمكن أن يصل إليه ثقب أسود', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي لغة الباسك؟', options: [{ text: 'لغة معزولة لا علاقة لها بأي لغة أخرى معروفة', correct: true }, { text: 'لهجة من الإسبانية', correct: false }, { text: 'لغة سلتية', correct: false }, { text: 'لغة جرمانية قديمة', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "تأثير الدواء الوهمي"؟', options: [{ text: 'ظاهرة يختبر فيها المريض تأثيرًا علاجيًا حقيقيًا من مادة غير فعالة', correct: true }, { text: 'رد فعل تحسسي تجاه دواء', correct: false }, { text: 'تأثير جانبي شائع للأدوية', correct: false }, { text: 'عندما يصبح الدواء أقل فعالية بمرور الوقت', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'من هو إراتوستينس؟', options: [{ text: 'عالم رياضيات يوناني حسب محيط الأرض بدقة ملحوظة', correct: true }, { text: 'فيلسوف روماني', correct: false }, { text: 'إمبراطور بيزنطي', correct: false }, { text: 'طبيب مصري قديم', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي مخطوطة فوينيتش؟', options: [{ text: 'مخطوطة مصورة مكتوبة بنظام كتابة غير معروف', correct: true }, { text: 'نص ديني قديم', correct: false }, { text: 'مجموعة من الخرائط القديمة', correct: false }, { text: 'رواية من العصور الوسطى', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ماذا كانت "أزمة صواريخ كوبا"؟', options: [{ text: 'مواجهة سياسية وعسكرية استمرت 13 يومًا بين الولايات المتحدة والاتحاد السوفيتي', correct: true }, { text: 'حرب أهلية في كوبا', correct: false }, { text: 'محاولة فاشلة لغزو كوبا', correct: false }, { text: 'أزمة اقتصادية في كوبا', correct: false }], points: 50, difficulty: 'صعب جدا' },
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