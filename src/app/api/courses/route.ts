import { NextResponse } from "next/server";

const courses = [
  {
    id: 1,
    title: "احتراف React مع TypeScript",
    description: "تطوير تطبيقات ويب متقدمة باستخدام React وTypeScript",
    duration: "15 ساعة",
    price: "349",
    instructor: "أحمد توفيق",
    instructorTitle: "مطور واجهات أمامية متقدم",
    instructorImage: "https://picsum.photos/100/100?person=1",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?react",
    students: 2350,
    rating: 4.9,
    ratingCount: 342,
    category: "تطوير الويب",
    tags: ["React", "TypeScript", "Web Development"],
    featured: true,
    recent: false,
    language: "العربية",
    lastUpdate: "مارس 2025",
  },
  {
    id: 2,
    title: "تعلم Flutter من البداية",
    description: "بناء تطبيقات جوال متعددة المنصات باستخدام Flutter وDart",
    duration: "20 ساعة",
    price: "449",
    instructor: "ليانا محمد",
    instructorTitle: "مطوّرة تطبيقات موبايل",
    instructorImage: "https://picsum.photos/100/100?person=4",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?flutter",
    students: 1870,
    rating: 4.8,
    ratingCount: 215,
    category: "تطبيقات الجوال",
    tags: ["Flutter", "Mobile", "Dart"],
    featured: false,
    recent: true,
    language: "العربية",
    lastUpdate: "أبريل 2025",
  },
  {
    id: 3,
    title: "بايثون متقدم مع Django",
    description: "بناء تطبيقات ويب احترافية باستخدام بايثون وإطار عمل Django",
    duration: "18 ساعة",
    price: "399",
    instructor: "نورا عبدالله",
    instructorTitle: "مطوّرة باك إند متخصصة",
    instructorImage: "https://picsum.photos/100/100?person=6",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?python",
    students: 3120,
    rating: 4.7,
    ratingCount: 287,
    category: "تطوير الويب",
    tags: ["Python", "Django", "Backend"],
    featured: true,
    recent: true,
    language: "العربية",
    lastUpdate: "فبراير 2025",
  },

  {
    id: 4,
    title: "الذكاء الاصطناعي التطبيقي",
    description: "تعلم أساسيات التعلم الآلي ومعالجة البيانات باستخدام Python",
    duration: "25 ساعة",
    price: "599",
    instructor: "خالد السليم",
    instructorTitle: "خبير ذكاء اصطناعي",
    instructorImage: "https://picsum.photos/100/100?person=7",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?ai",
    students: 4280,
    rating: 4.9,
    ratingCount: 415,
    category: "الذكاء الاصطناعي",
    tags: ["AI", "Machine Learning", "Python"],
    featured: true,
    recent: false,
    language: "العربية",
    lastUpdate: "يناير 2025",
  },
  {
    id: 5,
    title: "تصميم UI/UX احترافي",
    description: "من الصفر إلى الاحتراف في تصميم تجارب المستخدم",
    duration: "12 ساعة",
    price: "299",
    instructor: "لمى القحطاني",
    instructorTitle: "مصممة تجارب مستخدم معتمدة",
    instructorImage: "https://picsum.photos/100/100?person=8",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?design",
    students: 1650,
    rating: 4.6,
    ratingCount: 132,
    category: "التصميم",
    tags: ["UI/UX", "Figma", "Adobe XD"],
    featured: false,
    recent: true,
    language: "العربية",
    lastUpdate: "ديسمبر 2024",
  },
  {
    id: 6,
    title: "الأمن السيبراني الأساسي",
    description: "حماية الأنظمة والشبكات من الهجمات الإلكترونية",
    duration: "10 ساعات",
    price: "499",
    instructor: "تركي الحربي",
    instructorTitle: "خبير أمن معلومات",
    instructorImage: "https://picsum.photos/100/100?person=9",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?security",
    students: 2750,
    rating: 4.8,
    ratingCount: 198,
    category: "الأمن السيبراني",
    tags: ["Security", "Ethical Hacking", "Networking"],
    featured: true,
    recent: false,
    language: "العربية",
    lastUpdate: "نوفمبر 2024",
  },
  {
    id: 7,
    title: "تطوير APIs مع Node.js",
    description: "بناء واجهات برمجة تطبيقات احترافية باستخدام Node.js",
    duration: "14 ساعة",
    price: "449",
    instructor: "ياسر الغامدي",
    instructorTitle: "مطوّر Full Stack",
    instructorImage: "https://picsum.photos/100/100?person=10",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?nodejs",
    students: 1890,
    rating: 4.5,
    ratingCount: 156,
    category: "تطوير الويب",
    tags: ["Node.js", "API", "Backend"],
    featured: false,
    recent: true,
    language: "العربية",
    lastUpdate: "أكتوبر 2024",
  },
  {
    id: 8,
    title: "علم البيانات مع Python",
    description: "تحليل البيانات وعرضها باستخدام Pandas وMatplotlib",
    duration: "16 ساعة",
    price: "549",
    instructor: "ندى الرشيد",
    instructorTitle: "عالمة بيانات",
    instructorImage: "https://picsum.photos/100/100?person=11",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?data",
    students: 3210,
    rating: 4.7,
    ratingCount: 245,
    category: "علم البيانات",
    tags: ["Data Science", "Python", "Pandas"],
    featured: true,
    recent: false,
    language: "العربية",
    lastUpdate: "سبتمبر 2024",
  },
  {
    id: 9,
    title: "تطوير تطبيقات مع Vue.js",
    description: "بناء تطبيقات ويب تفاعلية باستخدام Vue.js",
    duration: "12 ساعة",
    price: "379",
    instructor: "فهد العتيبي",
    instructorTitle: "مطوّر واجهات أمامية",
    instructorImage: "https://picsum.photos/100/100?person=12",
    level: "مبتدئ",
    imageUrl: "https://picsum.photos/640/360?vue",
    students: 1420,
    rating: 4.4,
    ratingCount: 98,
    category: "تطوير الويب",
    tags: ["Vue.js", "Frontend", "JavaScript"],
    featured: false,
    recent: true,
    language: "العربية",
    lastUpdate: "أغسطس 2024",
  },
  {
    id: 10,
    title: "Angular للمحترفين",
    description: "تطوير تطبيقات ويب معقدة باستخدام Angular",
    duration: "20 ساعة",
    price: "499",
    instructor: "عبدالعزيز السعد",
    instructorTitle: "مطوّر Angular معتمد",
    instructorImage: "https://picsum.photos/100/100?person=13",
    level: "متقدم",
    imageUrl: "https://picsum.photos/640/360?angular",
    students: 2345,
    rating: 4.6,
    ratingCount: 187,
    category: "تطوير الويب",
    tags: ["Angular", "TypeScript", "Frontend"],
    featured: true,
    recent: false,
    language: "العربية",
    lastUpdate: "يوليو 2024",
  },

  {
    id: 11,
    title: "DevOps الأساسيات",
    description: "إدارة البنية التحتية ونشر التطبيقات باستخدام أدوات DevOps",
    duration: "22 ساعة",
    price: "649",
    instructor: "نايف القحطاني",
    instructorTitle: "مهندس DevOps",
    instructorImage: "https://picsum.photos/100/100?person=14",
    level: "متوسط",
    imageUrl: "https://picsum.photos/640/360?devops",
    students: 1780,
    rating: 4.8,
    ratingCount: 210,
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    featured: true,
    recent: true,
    language: "العربية",
    lastUpdate: "يونيو 2024",
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
