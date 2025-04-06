import { NextResponse } from "next/server";

const courses = [
  {
    id: 1,
    title: "احتراف React مع TypeScript",
    description: "تطوير تطبيقات ويب متقدمة باستخدام React وTypeScript",
    duration: "15 ساعة",
    price: "349",
    instructor: "أحمد توفيق",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?react", // صورة شاشة برمجة
    students: 2350,
    rating: 4.9,
    category: "تطوير الويب",
    tags: ["React", "TypeScript", "Web Development"],
    featured: true,
    recent: false,
  },
  {
    id: 2,
    title: "تعلم Flutter من البداية",
    description: "بناء تطبيقات جوال متعددة المنصات باستخدام Flutter",
    duration: "20 ساعة",
    price: "449",
    instructor: "ليانا محمد",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?flutter", // صورة هواتف متعددة
    students: 1870,
    rating: 4.8,
    category: "تطبيقات الجوال",
    tags: ["Flutter", "Mobile", "Dart"],
    featured: false,
    recent: true,
  },
  {
    id: 3,
    title: "الذكاء الاصطناعي العملي",
    description: "تطبيقات عملية في تعليم الآلة ومعالجة الصور",
    duration: "25 ساعة",
    price: "599",
    instructor: "عمر الخالد",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?ai", // صورة خوارزميات
    students: 920,
    rating: 4.7,
    category: "الذكاء الاصطناعي",
    tags: ["AI", "Python", "TensorFlow"],
    featured: false,
    recent: false,
  },
  {
    id: 4,
    title: "أمن المعلومات الأساسي",
    description: "مقدمة شاملة في أمان الشبكات والأنظمة",
    duration: "10 ساعات",
    price: "299",
    instructor: "نورا السعد",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?cybersecurity", // صورة قفل رقمي
    students: 1450,
    rating: 4.6,
    category: "الأمن السيبراني",
    tags: ["Security", "Ethical Hacking"],
    featured: true,
    recent: false,
  },
  {
    id: 5,
    title: "تصميم واجهات المستخدم Figma",
    description: "احتراف تصميم الويب والموبايل باستخدام Figma",
    duration: "8 ساعات",
    price: "249",
    instructor: "ريم عبدالله",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?figma", // صورة واجهة تصميم
    students: 2760,
    rating: 4.9,
    category: "التصميم",
    tags: ["Figma", "UI/UX", "Design"],
    featured: false,
    recent: true,
  },
  {
    id: 6,
    title: "DevOps مع Docker وKubernetes",
    description: "إدارة الحاويات والنشر الآلي للتطبيقات",
    duration: "18 ساعة",
    price: "549",
    instructor: "خالد الحربي",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?devops", // صورة خوادم
    students: 830,
    rating: 4.8,
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    featured: true,
    recent: false,
  },
  {
    id: 7,
    title: "تحليل البيانات باستخدام Python",
    description: "مقدمة في Pandas وNumPy لتحليل البيانات",
    duration: "12 ساعة",
    price: "399",
    instructor: "سلمى ناصر",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?data-analysis", // صورة مخططات بيانية
    students: 1980,
    rating: 4.7,
    category: "علم البيانات",
    tags: ["Python", "Data Science", "Pandas"],
    featured: false,
    recent: false,
  },
  {
    id: 8,
    title: "تطوير ألعاب Unity 3D",
    description: "صناعة ألعاب ثلاثية الأبعاد باستخدام محرك Unity",
    duration: "30 ساعة",
    price: "699",
    instructor: "فيصل الرشيد",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?unity", // صورة نموذج لعبة
    students: 670,
    rating: 4.5,
    category: "تطوير الألعاب",
    tags: ["Unity", "C#", "Game Development"],
    featured: false,
    recent: true,
  },
  {
    id: 9,
    title: "البرمجة الكينونية في Java",
    description: "مفاهيم البرمجة الكينونية مع تطبيقات عملية",
    duration: "14 ساعة",
    price: "349",
    instructor: "عبدالرحمن صالح",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?java", // صورة كود جافا
    students: 1120,
    rating: 4.6,
    category: "تطوير البرمجيات",
    tags: ["Java", "OOP", "Programming"],
    featured: false,
    recent: false,
  },
  {
    id: 10,
    title: "إدارة المشاريع باستخدام Agile",
    description: "إتقان منهجية Agile وإدارة الفرق التقنية",
    duration: "6 ساعات",
    price: "199",
    instructor: "لينا فاروق",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?agile", // صورة اجتماع عمل
    students: 2450,
    rating: 4.8,
    category: "الإدارة",
    tags: ["Agile", "Scrum", "Project Management"],
    featured: false,
    recent: false,
  },
  {
    id: 11,
    title: "التسويق الرقمي المتقدم",
    description: "استراتيجيات التسويق عبر وسائل التواصل الاجتماعي",
    duration: "8 ساعات",
    price: "299",
    instructor: "نادر حسين",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?digital-marketing", // صورة لوحة تحليل
    students: 3250,
    rating: 4.9,
    category: "التسويق",
    tags: ["Marketing", "SEO", "Social Media"],
    featured: false,
    recent: false,
  },
  {
    id: 12,
    title: "أتمتة المهام باستخدام Python",
    description: "بناء سكريبتات لأتمتة المهام اليومية",
    duration: "7 ساعات",
    price: "249",
    instructor: "ياسر علي",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?automation", // صورة روبوت
    students: 1780,
    rating: 4.7,
    category: "البرمجة",
    tags: ["Python", "Automation", "Scripting"],
    featured: false,
    recent: false,
  },
  {
    id: 13,
    title: "تطوير تطبيقات iOS باستخدام SwiftUI",
    description: "صناعة تطبيقات آبل الحديثة مع واجهات تفاعلية",
    duration: "22 ساعة",
    price: "599",
    instructor: "سحر محمد",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?swiftui", // صورة آيفون
    students: 920,
    rating: 4.8,
    category: "تطبيقات الجوال",
    tags: ["Swift", "iOS", "Mobile"],
    featured: false,
    recent: false,
  },
  {
    id: 14,
    title: "تعلم Linux للنظام",
    description: "إدارة الخوادم وأنظمة التشغيل مفتوحة المصدر",
    duration: "10 ساعات",
    price: "299",
    instructor: "رامي عادل",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?linux", // صورة سطر أوامر
    students: 1560,
    rating: 4.6,
    category: "أنظمة التشغيل",
    tags: ["Linux", "Bash", "Shell"],
    featured: false,
    recent: false,
  },
  {
    id: 15,
    title: "تحليل البيانات الضخمة مع Hadoop",
    description: "معالجة البيانات الكبيرة باستخدام Hadoop Ecosystem",
    duration: "18 ساعة",
    price: "549",
    instructor: "منى الكردي",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?bigdata", // صورة خوادم ضخمة
    students: 680,
    rating: 4.5,
    category: "علم البيانات",
    tags: ["Big Data", "Hadoop", "Spark"],
    featured: false,
    recent: false,
  },
  {
    id: 16,
    title: "أساسيات الشبكات CCNA",
    description: "تحضير لشهادة CCNA مع تطبيقات عملية",
    duration: "25 ساعة",
    price: "699",
    instructor: "عبدالله ناصر",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?network", // صورة معدات شبكات
    students: 420,
    rating: 4.7,
    category: "الشبكات",
    tags: ["Networking", "Cisco", "CCNA"],
    featured: false,
    recent: false,
  },
  {
    id: 17,
    title: "التصميم الجرافيكي باستخدام Photoshop",
    description: "احتراف تصميم الشعارات والمواد التسويقية",
    duration: "9 ساعات",
    price: "249",
    instructor: "هبة حسن",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?photoshop", // صورة واجهة فوتوشوب
    students: 2890,
    rating: 4.9,
    category: "التصميم",
    tags: ["Photoshop", "Graphic Design"],
    featured: false,
    recent: false,
  },
  {
    id: 18,
    title: "تطوير تطبيقات الويب التقدمية PWA",
    description: "بناء تطبيقات ويب سريعة تشبه التطبيقات الأصلية",
    duration: "14 ساعة",
    price: "449",
    instructor: "فارس عمر",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?pwa", // صورة تطبيقات ويب
    students: 1120,
    rating: 4.8,
    category: "تطوير الويب",
    tags: ["PWA", "JavaScript", "Web Apps"],
    featured: false,
    recent: false,
  },
  {
    id: 19,
    title: "إدارة قواعد البيانات MySQL",
    description: "تصميم وإدارة قواعد البيانات العلائقية",
    duration: "12 ساعة",
    price: "349",
    instructor: "نور الدين",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?database", // صورة مخطط قاعدة بيانات
    students: 1650,
    rating: 4.7,
    category: "قواعد البيانات",
    tags: ["MySQL", "Database", "SQL"],
    featured: false,
    recent: false,
  },
  {
    id: 20,
    title: "التعلم العميق Deep Learning",
    description: "بناء نماذج ذكاء اصطناعي باستخدام TensorFlow",
    duration: "30 ساعة",
    price: "799",
    instructor: "علياء سمير",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?deeplearning", // صورة شبكة عصبية
    students: 580,
    rating: 4.6,
    category: "الذكاء الاصطناعي",
    tags: ["Deep Learning", "TensorFlow", "Neural Networks"],
    featured: false,
    recent: true,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search")?.toLowerCase();
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const recent = searchParams.get("recent");
  const featured = searchParams.get("featured");

  let filteredCourses = courses;

  if (recent) {
    filteredCourses = filteredCourses.filter((course) => course.recent);
  }
  if (featured) {
    filteredCourses = filteredCourses.filter((course) => course.featured);
  }

  if (search) {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search) ||
        course.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  if (search) {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search) ||
        course.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  if (category) {
    filteredCourses = filteredCourses.filter(
      (course) => course.category === category
    );
  }

  if (level) {
    filteredCourses = filteredCourses.filter(
      (course) => course.level === level
    );
  }

  return NextResponse.json(filteredCourses);
}
