import { QuizQuestion, QuizCategory, LeaderboardUser, EventType, StoreItem } from './types';

export const QUIZ_DATA: Record<QuizCategory, QuizQuestion[]> = {
  'أسئلة عامة': [
    // --- سهل ---
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
    { question: 'ما هو أكبر حيوان ثديي بري؟', options: [{ text: 'الزرافة', correct: false }, { text: 'وحيد القرن', correct: false }, { text: 'الفيل الأفريقي', correct: true }, { text: 'فرس النهر', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ماذا تسمى صغار الدببة؟', options: [{ text: 'جراء', correct: false }, { text: 'أشبال', correct: false }, { text: 'دياسم', correct: true }, { text: 'مهرات', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد أضلاع المثلث؟', options: [{ text: '2', correct: false }, { text: '4', correct: false }, { text: '3', correct: true }, { text: '5', correct: false }], points: 10, difficulty: 'سهل' },
    
    // --- متوسط ---
    { question: 'ما هو أعلى جبل في العالم؟', options: [{ text: 'جبل كليمنجارو', correct: false }, { text: 'جبل كي 2', correct: false }, { text: 'جبل إيفرست', correct: true }, { text: 'مون بلان', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من اخترع المصباح الكهربائي؟', options: [{ text: 'نيكولا تسلا', correct: false }, { text: 'ألكسندر جراهام بيل', correct: false }, { text: 'توماس إديسون', correct: true }, { text: 'ماري كوري', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي أكبر صحراء في العالم؟', options: [{ text: 'الصحراء الكبرى', correct: false }, { text: 'الصحراء العربية', correct: false }, { text: 'الصحراء القطبية الجنوبية', correct: true }, { text: 'صحراء جوبي', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي أصغر دولة في العالم؟', options: [{ text: 'موناكو', correct: false }, { text: 'ناورو', correct: false }, { text: 'الفاتيكان', correct: true }, { text: 'سان مارينو', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو العنصر الكيميائي الذي رمزه "Au"؟', options: [{ text: 'الفضة', correct: false }, { text: 'النحاس', correct: false }, { text: 'الذهب', correct: true }, { text: 'الألومنيوم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'في أي عام هبط الإنسان على سطح القمر لأول مرة؟', options: [{ text: '1965', correct: false }, { text: '1972', correct: false }, { text: '1969', correct: true }, { text: '1981', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من هو مؤلف "1984"؟', options: [{ text: 'ألدوس هكسلي', correct: false }, { text: 'راي برادبري', correct: false }, { text: 'جورج أورويل', correct: true }, { text: 'جي. آر. آر. تولكين', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو أعمق خندق محيطي في العالم؟', options: [{ text: 'خندق بورتوريكو', correct: false }, { text: 'خندق تونغا', correct: false }, { text: 'خندق ماريانا', correct: true }, { text: 'خندق كيرماديك', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي الدولة الأكثر سكاناً في العالم؟', options: [{ text: 'الولايات المتحدة', correct: false }, { text: 'إندونيسيا', correct: false }, { text: 'الهند', correct: true }, { text: 'الصين', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي المادة الأقسى على وجه الأرض؟', options: [{ text: 'الصلب', correct: false }, { text: 'الكوارتز', correct: false }, { text: 'الألماس', correct: true }, { text: 'التيتانيوم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو الاسم الكيميائي لملح الطعام؟', options: [{ text: 'بيكربونات الصوديوم', correct: false }, { text: 'حمض الأسيتيك', correct: false }, { text: 'كلوريد الصوديوم', correct: true }, { text: 'حمض الستريك', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من بنى سور الصين العظيم بشكل أساسي؟', options: [{ text: 'سلالة هان', correct: false }, { text: 'سلالة تانغ', correct: false }, { text: 'سلالة تشين', correct: true }, { text: 'سلالة مينغ', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو أكبر حيوان على وجه الأرض؟', options: [{ text: 'الفيل الأفريقي', correct: false }, { text: 'القرش الأبيض الكبير', correct: false }, { text: 'الحوت الأزرق', correct: true }, { text: 'الحبار العملاق', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي القوة التي تبقي الكواكب في مدارها حول الشمس؟', options: [{ text: 'القوة المغناطيسية', correct: false }, { text: 'الاحتكاك', correct: false }, { text: 'الجاذبية', correct: true }, { text: 'الطرد المركزي', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو أطول جسر بحري في العالم؟', options: [{ text: 'جسر الملك فهد', correct: false }, { text: 'جسر خليج هانغزو', correct: false }, { text: 'جسر هونغ كونغ-تشوهاي-ماكاو', correct: true }, { text: 'جسر بحيرة بونتشارترين', correct: false }], points: 20, difficulty: 'متوسط' },

    // --- صعب ---
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
    { question: 'ما هو مرض الأسقربوط؟', options: [{ text: 'نقص فيتامين سي', correct: true }, { text: 'نقص الحديد', correct: false }, { text: 'نقص الكالسيوم', correct: false }, { text: 'نقص فيتامين د', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من كتب "الجريمة والعقاب"؟', options: [{ text: 'ليو تولستوي', correct: false }, { text: 'فيودور دوستويفسكي', correct: true }, { text: 'أنطون تشيخوف', correct: false }, { text: 'إيفان تورغينيف', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو أصل الشوكولاتة؟', options: [{ text: 'أمريكا الوسطى', correct: true }, { text: 'أوروبا', correct: false }, { text: 'آسيا', correct: false }, { text: 'أفريقيا', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي متلازمة ستوكهولم؟', options: [{ text: 'استجابة نفسية يظهر فيها الرهائن تعاطفًا مع آسريهم', correct: true }, { text: 'اضطراب نوم', correct: false }, { text: 'نوع من فقدان الذاكرة', correct: false }, { text: 'خوف من الأماكن المفتوحة', correct: false }], points: 30, difficulty: 'صعب' },

    // --- صعب جدا ---
    { question: 'ما هي مفارقة "سفينة ثيسيوس" الفلسفية؟', options: [{ text: 'مفارقة تتعلق بالسفر عبر الزمن', correct: false }, { text: 'مفارقة تتعلق بالاحتمالات الرياضية', correct: false }, { text: 'مفارقة حول الهوية والكينونة', correct: true }, { text: 'مفارقة منطقية حول الحركة', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي "فرضية ريمان"، وهي إحدى مسائل جائزة الألفية السبع؟', options: [{ text: 'مسألة في نظرية الأعداد', correct: true }, { text: 'مسألة في الطوبولوجيا', correct: false }, { text: 'مسألة في فيزياء الكم', correct: false }, { text: 'مسألة في علم الحاسوب', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "تأثير المراقب" في فيزياء الكم؟', options: [{ text: 'ظاهرة تغير سلوك الجسيمات عند ملاحظتها', correct: true }, { text: 'ظاهرة انحناء الضوء حول الأجسام الضخمة', correct: false }, { text: 'ظاهرة توسع الكون', correct: false }, { text: 'ظاهرة التشابك الكمي', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'من هو المهندس الذي صمم نظام الصرف الصحي في لندن في القرن التاسع عشر وأنهى مشكلة "الرائحة الكريهة العظيمة"؟', options: [{ text: 'إسامبارد كينجدم برونيل', correct: false }, { text: 'جوزيف بازالجيت', correct: true }, { text: 'توماس تيلفورد', correct: false }, { text: 'جون سنو', correct: false }], points: 50, difficulty: 'صعب جدا' },
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
    // --- سهل ---
    { question: 'ما هو العنصر الأكثر وفرة في الكون؟', options: [{ text: 'الأكسجين', correct: false }, { text: 'الهيدروجين', correct: true }, { text: 'الكربون', correct: false }, { text: 'الهيليوم', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد العظام في جسم الإنسان البالغ؟', options: [{ text: '206', correct: true }, { text: '300', correct: false }, { text: '150', correct: false }, { text: '256', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الغاز الذي تتنفسه النباتات من الهواء؟', options: [{ text: 'الأكسجين', correct: false }, { text: 'ثاني أكسيد الكربون', correct: true }, { text: 'النيتروجين', correct: false }, { text: 'الهيدروجين', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ماذا يسمى صغير الضفدع؟', options: [{ text: 'الشرغوف', correct: true }, { text: 'اليرقة', correct: false }, { text: 'الجرو', correct: false }, { text: 'الحمل', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي درجة تجمد الماء المئوية؟', options: [{ text: '100 درجة', correct: false }, { text: '0 درجة', correct: true }, { text: '-10 درجات', correct: false }, { text: '10 درجات', correct: false }], points: 10, difficulty: 'سهل' },
    
    // --- متوسط ---
    { question: 'ما هو أكبر عضو في جسم الإنسان؟', options: [{ text: 'الكبد', correct: false }, { text: 'الدماغ', correct: false }, { text: 'الجلد', correct: true }, { text: 'القلب', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي سرعة الضوء في الفراغ؟', options: [{ text: '300,000 كم/ثانية', correct: true }, { text: '150,000 كم/ثانية', correct: false }, { text: '500,000 كم/ثانية', correct: false }, { text: '1,000,000 كم/ثانية', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو الكوكب الذي يشتهر بحلقاته؟', options: [{ text: 'المشتري', correct: false }, { text: 'زحل', correct: true }, { text: 'أورانوس', correct: false }, { text: 'نبتون', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو الحمض الموجود في المعدة؟', options: [{ text: 'حمض الكبريتيك', correct: false }, { text: 'حمض الهيدروكلوريك', correct: true }, { text: 'حمض النيتريك', correct: false }, { text: 'حمض الستريك', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من هو العالم الذي وضع نظرية التطور؟', options: [{ text: 'إسحاق نيوتن', correct: false }, { text: 'ألبرت أينشتاين', correct: false }, { text: 'تشارلز داروين', correct: true }, { text: 'غاليليو غاليلي', correct: false }], points: 20, difficulty: 'متوسط' },

    // --- صعب ---
    { question: 'ما هي الوحدة الأساسية للحياة؟', options: [{ text: 'الذرة', correct: false }, { text: 'الجزيء', correct: false }, { text: 'الخلية', correct: true }, { text: 'العضو', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو الفرق بين السرعة والسرعة المتجهة؟', options: [{ text: 'لا يوجد فرق', correct: false }, { text: 'السرعة المتجهة لها اتجاه', correct: true }, { text: 'السرعة لها اتجاه', correct: false }, { text: 'السرعة المتجهة هي مقياس التسارع', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ماذا يسمى تحول المادة من الحالة الصلبة إلى الغازية مباشرة؟', options: [{ text: 'التبخر', correct: false }, { text: 'التسامي', correct: true }, { text: 'الانصهار', correct: false }, { text: 'التكثف', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو البنسلين؟', options: [{ text: 'نوع من الفيروسات', correct: false }, { text: 'مضاد حيوي', correct: true }, { text: 'هرمون', correct: false }, { text: 'مسكن للألم', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو الثقب الأسود؟', options: [{ text: 'نجم متفجر', correct: false }, { text: 'منطقة في الفضاء جاذبيتها قوية جدًا', correct: true }, { text: 'كوكب غازي', correct: false }, { text: 'نوع من المجرات', correct: false }], points: 30, difficulty: 'صعب' },

    // --- صعب جدا ---
    { question: 'ما هو "بوزون هيغز"؟', options: [{ text: 'جسيم دون ذري يعتقد أنه يكسب الجسيمات الأخرى كتلتها', correct: true }, { text: 'نوع من الكواركات', correct: false }, { text: 'جسيم يحمل القوة النووية الضعيفة', correct: false }, { text: 'مضاد المادة للإلكترون', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'اشرح مبدأ عمل تقنية "كريسبر" (CRISPR-Cas9).', options: [{ text: 'تقنية لتعديل الجينات بدقة', correct: true }, { text: 'تقنية لتوليد الطاقة النووية', correct: false }, { text: 'تلسكوب فضائي', correct: false }, { text: 'خوارزمية لضغط البيانات', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي "المادة المظلمة"؟', options: [{ text: 'مادة افتراضية يعتقد أنها تشكل معظم مادة الكون', correct: true }, { text: 'المادة داخل الثقوب السوداء', correct: false }, { text: 'نوع من النجوم النيوترونية', correct: false }, { text: 'غبار كوني كثيف', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي معادلات ماكسويل الأربعة؟', options: [{ text: 'مجموعة من المعادلات تصف الكهرومغناطيسية', correct: true }, { text: 'قوانين الحركة لنيوتن', correct: false }, { text: 'قوانين الديناميكا الحرارية', correct: false }, { text: 'معادلات تصف ميكانيكا الموائع', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو التشابك الكمي (Quantum Entanglement)؟', options: [{ text: 'ظاهرة ترتبط فيها جسيمات بحيث يؤثر قياس حالة أحدها فوريًا على الآخر بغض النظر عن المسافة', correct: true }, { text: 'ظاهرة وجود الجسيم في حالتين في نفس الوقت', correct: false }, { text: 'نفق افتراضي عبر الزمكان', correct: false }, { text: 'مبدأ عدم اليقين', correct: false }], points: 50, difficulty: 'صعب جدا' },
  ],
  'التاريخ': [
     // --- سهل ---
    { question: 'متى انتهت الحرب العالمية الثانية؟', options: [{ text: '1945', correct: true }, { text: '1918', correct: false }, { text: '1939', correct: false }, { text: '1950', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'من هو أول رائد فضاء سار على سطح القمر؟', options: [{ text: 'يوري غاغارين', correct: false }, { text: 'نيل أرمسترونج', correct: true }, { text: 'باز ألدرين', correct: false }, { text: 'جون جلين', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'في أي حضارة بنيت الأهرامات الشهيرة في الجيزة؟', options: [{ text: 'الحضارة الرومانية', correct: false }, { text: 'الحضارة اليونانية', correct: false }, { text: 'الحضارة المصرية القديمة', correct: true }, { text: 'حضارة المايا', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'من اكتشف القارة الأمريكية عام 1492؟', options: [{ text: 'كريستوفر كولومبوس', correct: true }, { text: 'فاسكو دا غاما', correct: false }, { text: 'جيمس كوك', correct: false }, { text: 'ماركو بولو', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'متى تأسست الأمم المتحدة؟', options: [{ text: '1920', correct: false }, { text: '1945', correct: true }, { text: '1960', correct: false }, { text: '1980', correct: false }], points: 10, difficulty: 'سهل' },

    // --- متوسط ---
    { question: 'ما هي الإمبراطورية التي حكمت منطقة البحر المتوسط وكانت عاصمتها روما؟', options: [{ text: 'الإمبراطورية الفارسية', correct: false }, { text: 'الإمبراطورية الرومانية', correct: true }, { text: 'الإمبراطورية البيزنطية', correct: false }, { text: 'الإمبراطورية العثمانية', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من هو القائد المغولي الذي أسس أكبر إمبراطورية متصلة في التاريخ؟', options: [{ text: 'أتيلا الهوني', correct: false }, { text: 'تيمورلنك', correct: false }, { text: 'جنكيز خان', correct: true }, { text: 'قوبلاي خان', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي الثورة التي أدت إلى إعدام الملك لويس السادس عشر؟', options: [{ text: 'الثورة الأمريكية', correct: false }, { text: 'الثورة الفرنسية', correct: true }, { text: 'الثورة الروسية', correct: false }, { text: 'الثورة الصناعية', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما اسم السفينة التي غرقت في أول رحلة لها عام 1912؟', options: [{ text: 'لوسيتانيا', correct: false }, { text: 'بريتانيك', correct: false }, { text: 'تايتانيك', correct: true }, { text: 'أوليمبيك', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو الاسم القديم لمدينة إسطنبول؟', options: [{ text: 'أنقرة', correct: false }, { text: 'أثينا', correct: false }, { text: 'القسطنطينية', correct: true }, { text: 'سميرنا', correct: false }], points: 20, difficulty: 'متوسط' },
    
    // --- صعب ---
    { question: 'ما هي "حرب المائة عام"؟', options: [{ text: 'حرب بين روما وقرطاج', correct: false }, { text: 'سلسلة من الصراعات بين إنجلترا وفرنسا', correct: true }, { text: 'حرب أهلية في اليابان', correct: false }, { text: 'الحروب الصليبية', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من هو الفرعون الذي وحّد مصر العليا والسفلى وأسس الأسرة الأولى؟', options: [{ text: 'خوفو', correct: false }, { text: 'رمسيس الثاني', correct: false }, { text: 'نارمر (مينا)', correct: true }, { text: 'توت عنخ آمون', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي "طريق الحرير"؟', options: [{ text: 'طريق تجاري قديم يربط الصين بالبحر المتوسط', correct: true }, { text: 'اسم معركة شهيرة', correct: false }, { text: 'نهر في الهند', correct: false }, { text: 'كتاب فلسفي صيني', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو الحدث الذي يعتبر بداية الإصلاح البروتستانتي عام 1517؟', options: [{ text: 'تتويج هنري الثامن', correct: false }, { text: 'نشر مارتن لوثر "الأطروحات الـ 95"', correct: true }, { text: 'اختراع المطبعة', correct: false }, { text: 'انعقاد مجمع ترنت', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من كان آخر قياصرة روسيا؟', options: [{ text: 'بطرس الأكبر', correct: false }, { text: 'إيفان الرهيب', correct: false }, { text: 'نيكولاس الثاني', correct: true }, { text: 'ألكسندر الأول', correct: false }], points: 30, difficulty: 'صعب' },

    // --- صعب جدا ---
    { question: 'ما هي "معاهدة وستفاليا" وما أهميتها التاريخية؟', options: [{ text: 'أنهت حرب المائة عام', correct: false }, { text: 'أنهت حرب الثلاثين عامًا وأرست مبدأ سيادة الدول', correct: true }, { text: 'قسّمت إمبراطورية الإسكندر الأكبر', correct: false }, { text: 'أسست عصبة الأمم', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'من هو "مانسا موسى" ولماذا يشتهر في التاريخ؟', options: [{ text: 'قائد عسكري مصري', correct: false }, { text: 'إمبراطور مالي اشتهر بثروته الهائلة وحجه إلى مكة', correct: true }, { text: 'فيلسوف صيني', correct: false }, { text: 'مستكشف برتغالي', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ماذا كانت "الحروب البونيقية"؟', options: [{ text: 'حروب بين أثينا وإسبرطة', correct: false }, { text: 'سلسلة من ثلاث حروب بين روما وقرطاج', correct: true }, { text: 'حروب بين الإمبراطورية الرومانية والفرس', correct: false }, { text: 'حروب الاستقلال في أمريكا اللاتينية', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "استعراش مييجي" (Meiji Restoration) في اليابان؟', options: [{ text: 'فترة عزلة تامة لليابان', correct: false }, { text: 'حرب أهلية بين الساموراي', correct: false }, { text: 'سلسلة أحداث أعادت الحكم الإمبراطوري وبدأت تحديث اليابان', correct: true }, { text: 'فترة حكم الشوغون في طوكيو', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي أهمية "حجر رشيد"؟', options: [{ text: 'أقدم قانون مكتوب', correct: false }, { text: 'مفتاح فك رموز الكتابة الهيروغليفية المصرية', correct: true }, { text: 'خريطة للعالم القديم', correct: false }, { text: 'نص ديني سومري', correct: false }], points: 50, difficulty: 'صعب جدا' },
  ],
  'الرياضيات': [
    // --- سهل ---
    { question: 'ما هو ناتج 12 × 5 ؟', options: [{ text: '50', correct: false }, { text: '60', correct: true }, { text: '70', correct: false }, { text: '65', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'كم عدد أضلاع الشكل السداسي؟', options: [{ text: '5', correct: false }, { text: '6', correct: true }, { text: '7', correct: false }, { text: '8', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الجذر التربيعي للعدد 81؟', options: [{ text: '7', correct: false }, { text: '8', correct: false }, { text: '9', correct: true }, { text: '10', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو مجموع زوايا المثلث؟', options: [{ text: '90 درجة', correct: false }, { text: '180 درجة', correct: true }, { text: '270 درجة', correct: false }, { text: '360 درجة', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الرقم التالي في المتسلسلة: 2, 4, 6, 8, ...؟', options: [{ text: '9', correct: false }, { text: '10', correct: true }, { text: '12', correct: false }, { text: '11', correct: false }], points: 10, difficulty: 'سهل' },

    // --- متوسط ---
    { question: 'ما هي قيمة باي (π) مقربة لأقرب منزلتين عشريتين؟', options: [{ text: '3.14', correct: true }, { text: '2.71', correct: false }, { text: '1.62', correct: false }, { text: '4.13', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'إذا كانت مساحة المربع 49 سم مربع، فما طول ضلعه؟', options: [{ text: '5 سم', correct: false }, { text: '6 سم', correct: false }, { text: '7 سم', correct: true }, { text: '8 سم', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'حل المعادلة: 2x + 5 = 15', options: [{ text: 'x = 10', correct: false }, { text: 'x = 5', correct: true }, { text: 'x = 7.5', correct: false }, { text: 'x = 20', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو العدد الأولي؟', options: [{ text: 'عدد يقبل القسمة على نفسه وعلى 1 فقط', correct: true }, { text: 'عدد فردي', correct: false }, { text: 'عدد زوجي', correct: false }, { text: 'عدد أكبر من 10', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو محيط دائرة نصف قطرها 10 سم؟ (استخدم π ≈ 3.14)', options: [{ text: '31.4 سم', correct: false }, { text: '62.8 سم', correct: true }, { text: '314 سم', correct: false }, { text: '100 سم', correct: false }], points: 20, difficulty: 'متوسط' },
    
    // --- صعب ---
    { question: 'ما هو مضروب العدد 5 (5!)؟', options: [{ text: '25', correct: false }, { text: '120', correct: true }, { text: '60', correct: false }, { text: '100', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي نظرية فيثاغورس؟', options: [{ text: 'a² + b² = c²', correct: true }, { text: 'E = mc²', correct: false }, { text: 'F = ma', correct: false }, { text: 'a + b > c', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو اللوغاريتم؟', options: [{ text: 'عملية عكسية للأسس', correct: true }, { text: 'نوع من الكسور', correct: false }, { text: 'نظرية هندسية', correct: false }, { text: 'عدد ثابت', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو الرقم التالي في متتالية فيبوناتشي: 0, 1, 1, 2, 3, 5, 8, ...؟', options: [{ text: '10', correct: false }, { text: '13', correct: true }, { text: '12', correct: false }, { text: '11', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو المشتق (derivative) في حساب التفاضل والتكامل؟', options: [{ text: 'معدل التغير اللحظي للدالة', correct: true }, { text: 'المساحة تحت المنحنى', correct: false }, { text: 'طول المنحنى', correct: false }, { text: 'قيمة قصوى للدالة', correct: false }], points: 30, difficulty: 'صعب' },
    
    // --- صعب جدا ---
    { question: 'ما هي "متطابقة أويلر" (Euler\'s Identity)؟', options: [{ text: 'e^(iπ) + 1 = 0', correct: true }, { text: 'a² + b² = c²', correct: false }, { text: 'sin²θ + cos²θ = 1', correct: false }, { text: '1 + 1 = 2', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "تحويل فورييه" (Fourier Transform)؟', options: [{ text: 'أداة رياضية لتحليل دالة إلى تردداتها المكونة', correct: true }, { text: 'طريقة لحل المعادلات التفاضلية', correct: false }, { text: 'نظرية في الاحتمالات', correct: false }, { text: 'خوارزمية للفرز', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ماذا تنص "مبرهنة فيرما الأخيرة"؟', options: [{ text: 'لا توجد أعداد صحيحة موجبة a, b, c تحقق المعادلة aⁿ + bⁿ = cⁿ لـ n > 2', correct: true }, { text: 'كل عدد زوجي أكبر من 2 هو مجموع عددين أوليين', correct: false }, { text: 'عدد الأعداد الأولية لا نهائي', correct: false }, { text: 'لا يمكن تربيع الدائرة', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي "الأعداد المركبة" (Complex Numbers)؟', options: [{ text: 'أعداد تتكون من جزء حقيقي وجزء تخيلي', correct: true }, { text: 'أعداد غير نسبية', correct: false }, { text: 'أعداد أولية كبيرة جدًا', correct: false }, { text: 'أعداد سالبة', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "الفركتل" (Fractal)؟', options: [{ text: 'شكل هندسي يتميز بالتشابه الذاتي على كل المقاييس', correct: true }, { text: 'مضلع له عدد لا نهائي من الأضلاع', correct: false }, { text: 'نوع من الشبكات العصبية', correct: false }, { text: 'عدد أكبر من أي كمية يمكن تصورها', correct: false }], points: 50, difficulty: 'صعب جدا' },
  ],
  'البرمجة': [
    // --- سهل ---
    { question: 'ماذا يعني اختصار HTML؟', options: [{ text: 'Hyper Text Markup Language', correct: true }, { text: 'High Tech Modern Language', correct: false }, { text: 'Hyperlink and Text Markup Language', correct: false }, { text: 'Home Tool Markup Language', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي اللغة المستخدمة لتنسيق وتصميم صفحات الويب؟', options: [{ text: 'HTML', correct: false }, { text: 'CSS', correct: true }, { text: 'JavaScript', correct: false }, { text: 'Python', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ماذا يسمى الخطأ في برنامج الكمبيوتر؟', options: [{ text: 'فيروس (Virus)', correct: false }, { text: 'علة (Bug)', correct: true }, { text: 'ميزة (Feature)', correct: false }, { text: 'ملف (File)', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ماذا تفعل حلقة `for`؟', options: [{ text: 'تكرار الكود لعدد محدد من المرات', correct: true }, { text: 'اتخاذ قرار بناءً على شرط', correct: false }, { text: 'تخزين البيانات', correct: false }, { text: 'تعريف دالة', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'أي من التالي ليس لغة برمجة؟', options: [{ text: 'JavaScript', correct: false }, { text: 'Photoshop', correct: true }, { text: 'Ruby', correct: false }, { text: 'Go', correct: false }], points: 10, difficulty: 'سهل' },

    // --- متوسط ---
    { question: 'ما هو الـ API؟', options: [{ text: 'واجهة برمجة التطبيقات', correct: true }, { text: 'محرر نصوص متقدم', correct: false }, { text: 'قاعدة بيانات', correct: false }, { text: 'نظام تشغيل', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما الفرق بين `==` و `===` في JavaScript؟', options: [{ text: 'لا يوجد فرق', correct: false }, { text: '`===` يتحقق من القيمة والنوع، بينما `==` يتحقق من القيمة فقط', correct: true }, { text: '`==` أسرع من `===`', correct: false }, { text: '`===` يستخدم للمقارنة بين النصوص فقط', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هي "البرمجة كائنية التوجه" (OOP)؟', options: [{ text: 'نموذج برمجة يعتمد على "الكائنات" التي تحتوي على بيانات ورمز', correct: true }, { text: 'كتابة الأكواد في ملف واحد طويل', correct: false }, { text: 'برمجة واجهات المستخدم الرسومية فقط', correct: false }, { text: 'لغة برمجة محددة', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو "Git"؟', options: [{ text: 'لغة برمجة', correct: false }, { text: 'نظام تحكم في الإصدارات', correct: true }, { text: 'قاعدة بيانات', correct: false }, { text: 'إطار عمل للويب', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ما هو JSON؟', options: [{ text: 'لغة برمجة', correct: false }, { text: 'صيغة خفيفة لتبادل البيانات', correct: true }, { text: 'قاعدة بيانات', correct: false }, { text: 'مكتبة JavaScript', correct: false }], points: 20, difficulty: 'متوسط' },
    
    // --- صعب ---
    { question: 'ما هو "التعاود" (Recursion)؟', options: [{ text: 'دالة تستدعي نفسها', correct: true }, { text: 'نوع من الحلقات التكرارية', correct: false }, { text: 'هيكل بيانات لتخزين العناصر', correct: false }, { text: 'طريقة لمعالجة الأخطاء', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما الفرق بين قاعدة بيانات SQL و NoSQL؟', options: [{ text: 'SQL علائقية وجدولة، و NoSQL غير علائقية وموجهة نحو المستندات', correct: true }, { text: 'SQL أسرع دائمًا', correct: false }, { text: 'NoSQL تستخدم فقط لـ JavaScript', correct: false }, { text: 'لا يوجد فرق جوهري', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو "الوعد" (Promise) في JavaScript؟', options: [{ text: 'كائن يمثل الإكمال أو الفشل النهائي لعملية غير متزامنة', correct: true }, { text: 'نوع من المتغيرات لتخزين النصوص', correct: false }, { text: 'طريقة لإنشاء الرسوم المتحركة', correct: false }, { text: 'دالة رياضية', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو "إطار العمل" (Framework) في البرمجة؟', options: [{ text: 'مجموعة من المكتبات والأدوات التي توفر هيكلًا لبناء التطبيقات', correct: true }, { text: 'محرر أكواد', correct: false }, { text: 'لغة برمجة', correct: false }, { text: 'نظام تشغيل', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هو الفرق بين HTTP و HTTPS؟', options: [{ text: 'HTTPS هو الإصدار الآمن والمشفر من HTTP', correct: true }, { text: 'HTTPS أسرع من HTTP', correct: false }, { text: 'لا يوجد فرق', correct: false }, { text: 'HTTP يستخدم للصور فقط', correct: false }], points: 30, difficulty: 'صعب' },
    
    // --- صعب جدا ---
    { question: 'ما هي مبادئ SOLID في تصميم البرمجيات؟', options: [{ text: 'خمسة مبادئ تصميم لجعل البرامج أكثر قابلية للفهم والصيانة', correct: true }, { text: 'خوارزميات للفرز والبحث', correct: false }, { text: 'أنماط تصميم واجهات المستخدم', correct: false }, { text: 'بروتوكولات للشبكات', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "ترميز Big O" (Big O Notation) ولماذا هو مهم؟', options: [{ text: 'لوصف أداء أو تعقيد الخوارزمية مع نمو حجم الإدخال', correct: true }, { text: 'نوع من التشفير', correct: false }, { text: 'صيغة لكتابة التعليقات في الكود', correct: false }, { text: 'طريقة لتصحيح الأخطاء', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'اشرح كيفية عمل "البلوك تشين" (Blockchain) بشكل مبسط.', options: [{ text: 'سجل رقمي موزع وغير قابل للتغيير للمعاملات', correct: true }, { text: 'قاعدة بيانات مركزية عالية الأداء', correct: false }, { text: 'بروتوكول لإرسال البريد الإلكتروني', correct: false }, { text: 'خوارزمية لضغط الفيديو', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو "Docker" وما هي الفائدة الرئيسية من استخدامه؟', options: [{ text: 'منصة لإنشاء ونشر وتشغيل التطبيقات في حاويات (containers)', correct: true }, { text: 'لغة برمجة جديدة', correct: false }, { text: 'محرر أكواد سحابي', correct: false }, { text: 'نظام لإدارة قواعد البيانات', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي "البرمجة الوظيفية" (Functional Programming)؟', options: [{ text: 'نموذج برمجة يعامل الحسابات كتقييم للدوال الرياضية ويتجنب تغيير الحالة والبيانات القابلة للتغيير', correct: true }, { text: 'برمجة الدوال في Excel', correct: false }, { text: 'كتابة كل الكود داخل دوال', correct: false }, { text: 'نموذج برمجة يستخدم فقط للعمليات الرياضية', correct: false }], points: 50, difficulty: 'صعب جدا' },
  ],
  'الثقافة': [
    // --- سهل ---
    { question: 'في أي بلد تقع مدينة البتراء الأثرية؟', options: [{ text: 'مصر', correct: false }, { text: 'الأردن', correct: true }, { text: 'السعودية', correct: false }, { text: 'لبنان', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هي العملة الرسمية لليابان؟', options: [{ text: 'اليوان', correct: false }, { text: 'الوون', correct: false }, { text: 'الدولار', correct: false }, { text: 'الين', correct: true }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو أكبر متحف فني في العالم ويقع في باريس؟', options: [{ text: 'متحف اللوفر', correct: true }, { text: 'المتحف البريطاني', correct: false }, { text: 'متحف المتروبوليتان للفنون', correct: false }, { text: 'متحف برادو', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'ما هو الطبق الوطني لإسبانيا؟', options: [{ text: 'البيتزا', correct: false }, { text: 'الباييلا', correct: true }, { text: 'السوشي', correct: false }, { text: 'الهامبرغر', correct: false }], points: 10, difficulty: 'سهل' },
    { question: 'من هو مؤلف روايات هاري بوتر؟', options: [{ text: 'ج. ر. ر. تولكين', correct: false }, { text: 'ج. ك. رولينغ', correct: true }, { text: 'جورج ر. ر. مارتن', correct: false }, { text: 'ستيفن كينغ', correct: false }], points: 10, difficulty: 'سهل' },

    // --- متوسط ---
    { question: 'ما هي المدينة التي تشتهر ببرجها المائل؟', options: [{ text: 'روما', correct: false }, { text: 'بيزا', correct: true }, { text: 'فلورنسا', correct: false }, { text: 'فينيسيا', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'في أي بلد نشأت رياضة السومو؟', options: [{ text: 'الصين', correct: false }, { text: 'كوريا', correct: false }, { text: 'اليابان', correct: true }, { text: 'تايلاند', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من هو المخرج الذي أخرج سلسلة أفلام "سيد الخواتم"؟', options: [{ text: 'ستيفن سبيلبرغ', correct: false }, { text: 'جيمس كاميرون', correct: false }, { text: 'بيتر جاكسون', correct: true }, { text: 'جورج لوكاس', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'ماذا يمثل "تمثال الحرية" في نيويورك؟', options: [{ text: 'القوة العسكرية', correct: false }, { text: 'الحرية والديمقراطية', correct: true }, { text: 'الثروة والازدهار', correct: false }, { text: 'الفن والثقافة', correct: false }], points: 20, difficulty: 'متوسط' },
    { question: 'من كتب رواية "مئة عام من العزلة"؟', options: [{ text: 'خورخي لويس بورخيس', correct: false }, { text: 'بابلو نيرودا', correct: false }, { text: 'غابرييل غارسيا ماركيز', correct: true }, { text: 'ماريو فارغاس يوسا', correct: false }], points: 20, difficulty: 'متوسط' },

    // --- صعب ---
    { question: 'ما هي "الأوبرا"؟', options: [{ text: 'نوع من المسرحيات الموسيقية الدرامية', correct: true }, { text: 'رقصة شعبية إسبانية', correct: false }, { text: 'مهرجان سينمائي', correct: false }, { text: 'معرض فني', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'من هو الفنان الذي قطع جزءًا من أذنه؟', options: [{ text: 'بابلو بيكاسو', correct: false }, { text: 'فنسنت فان جوخ', correct: true }, { text: 'سلفادور دالي', correct: false }, { text: 'كلود مونيه', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي حركة "النهضة" (Renaissance)؟', options: [{ text: 'فترة ازدهار ثقافي وفني في أوروبا', correct: true }, { text: 'ثورة صناعية', correct: false }, { text: 'حركة سياسية', correct: false }, { text: 'عصر استكشاف جغرافي', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'ما هي اللغة الأكثر تحدثًا في العالم (من حيث عدد الناطقين بها كلغة أم)؟', options: [{ text: 'الإنجليزية', correct: false }, { text: 'الإسبانية', correct: false }, { text: 'الماندرين الصينية', correct: true }, { text: 'الهندية', correct: false }], points: 30, difficulty: 'صعب' },
    { question: 'في أي بلد تقع "مدينة ماتشو بيتشو" القديمة؟', options: [{ text: 'المكسيك', correct: false }, { text: 'البرازيل', correct: false }, { text: 'بيرو', correct: true }, { text: 'كولومبيا', correct: false }], points: 30, difficulty: 'صعب' },

    // --- صعب جدا ---
    { question: 'ما هي الحركة الفنية التي ينتمي إليها سلفادور دالي؟', options: [{ text: 'التكعيبية', correct: false }, { text: 'الانطباعية', correct: false }, { text: 'السريالية', correct: true }, { text: 'التعبيرية', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي مبادئ مدرسة "الباوهاوس" (Bauhaus) المعمارية؟', options: [{ text: 'الزخرفة المفرطة والتفاصيل الكلاسيكية', correct: false }, { text: 'دمج الفنون الجميلة مع الحرف اليدوية والوظائفية', correct: true }, { text: 'استخدام المواد الطبيعية فقط', correct: false }, { text: 'تصميم المباني الشاهقة فقط', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'من هو الملحن الذي ألف "طقوس الربيع" (The Rite of Spring) والذي أثار عرضه الأول ضجة كبيرة؟', options: [{ text: 'كلود ديبوسي', correct: false }, { text: 'إيغور سترافينسكي', correct: true }, { text: 'أرنولد شوينبيرج', correct: false }, { text: 'بيتر إليتش تشايكوفسكي', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هو مفهوم "الإيكيغاي" (Ikigai) في الثقافة اليابانية؟', options: [{ text: 'نوع من فنون القتال', correct: false }, { text: 'مفهوم يعني "سبب للوجود" أو الشغف في الحياة', correct: true }, { text: 'احتفال تقليدي بالزهور', correct: false }, { text: 'طريقة لترتيب المنزل', correct: false }], points: 50, difficulty: 'صعب جدا' },
    { question: 'ما هي السينما الموجة الجديدة الفرنسية (French New Wave)؟', options: [{ text: 'حركة سينمائية تتميز بالابتكار التجريبي ورفض التقاليد السينمائية', correct: true }, { text: 'نوع من الأفلام الوثائقية', correct: false }, { text: 'أفلام الرسوم المتحركة الفرنسية', correct: false }, { text: 'الأفلام الصامتة في فرنسا', correct: false }], points: 50, difficulty: 'صعب جدا' },
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