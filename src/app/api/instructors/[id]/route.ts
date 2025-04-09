import { NextResponse } from "next/server";

const instructors = [
  {
    id: 1,
    name: "أحمد توفيق",
    title: "مطور واجهات أمامية متقدم",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "أحمد توفيق متخصص في تطوير واجهات المستخدم باستخدام تقنيات حديثة مثل React وTypeScript. لديه خبرة تزيد عن 5 سنوات في بناء تطبيقات ويب تفاعلية.",
    specialties: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
    students: 2350,
    courses: 15,
    rating: 4.9,
    reviewsCount: 380,
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "5+ سنوات في تطوير واجهات المستخدم",
      "العمل مع شركات ناشئة وكبيرة",
    ],
    education: [
      {
        degree: "بكالوريوس في علوم الحاسب",
        institution: "جامعة القاهرة",
        year: "2018",
      },
      { degree: "شهادة متقدمة في React", institution: "Udemy", year: "2020" },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ahmed-tawfik",
      twitter: "https://twitter.com/ahmedtawfikdev",
      website: "https://ahmedtawfik.dev",
    },
    achievements: [
      {
        icon: "award",
        title: "أفضل مدرب لعام 2023",
        description: "حصل على جائزة أفضل مدرب في مجال تطوير الويب.",
      },
      {
        icon: "users",
        title: "تجاوز 2000 طالب",
        description: "قام بتدريس أكثر من 2000 طالب بنجاح.",
      },
    ],
  },
  {
    id: 2,
    name: "ليانا محمد",
    title: "مطوّرة تطبيقات موبايل",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "ليانا محمد تمتلك خبرة واسعة في تطوير التطبيقات المحمولة باستخدام Flutter وDart، ولديها شغف بتعليم المبتدئين. شاركت في تطوير العديد من التطبيقات الناجحة على متجري Google Play وApp Store.",
    specialties: ["Flutter", "Dart", "UI/UX", "Firebase"],
    students: 1870,
    courses: 10,
    rating: 4.8,
    reviewsCount: 255,
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "4 سنوات في تطوير تطبيقات iOS وAndroid",
      "متحدثة في مؤتمرات تقنية",
    ],
    education: [
      {
        degree: "بكالوريوس في هندسة البرمجيات",
        institution: "جامعة الملك سعود",
        year: "2019",
      },
      {
        degree: "دورة متقدمة في تصميم تجربة المستخدم",
        institution: "Coursera",
        year: "2021",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/liyana-mohammed",
      twitter: "https://twitter.com/liyanadev",
    },
    achievements: [
      {
        icon: "award",
        title: "تطبيق الشهر",
        description: "تم اختيار أحد تطبيقاتها كأفضل تطبيق لهذا الشهر.",
      },
      {
        icon: "book",
        title: "مؤلفة كتاب إلكتروني",
        description: "ألفت كتابًا إلكترونيًا عن أساسيات Flutter.",
      },
    ],
  },
  {
    id: 3,
    name: "نورا عبدالله",
    title: "مطوّرة باك إند متخصصة",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "نورا عبدالله مختصة في بناء تطبيقات باك إند باستخدام Python وDjango وتطوير حلول متكاملة للتطبيقات الحديثة. لديها خبرة في تصميم قواعد البيانات وإدارة الخوادم.",
    specialties: ["Python", "Django", "APIs", "SQL", "Docker"],
    students: 3120,
    courses: 20,
    rating: 4.7,
    reviewsCount: 410,
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "6 سنوات في تطوير تطبيقات الويب باستخدام Python",
      "العمل على مشاريع كبيرة للقطاع الحكومي",
    ],
    education: [
      {
        degree: "ماجستير في علوم الحاسب",
        institution: "جامعة الأميرة نورة",
        year: "2017",
      },
      {
        degree: "شهادة في إدارة قواعد البيانات",
        institution: "Oracle",
        year: "2019",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/nora-abdullah",
      github: "https://github.com/nora-abdullah", // Added GitHub link
    },
    achievements: [
      {
        icon: "filetext",
        title: "نشر أوراق بحثية",
        description: "نشرت العديد من الأوراق البحثية في مجال تطوير الباك إند.",
      },
      {
        icon: "globe",
        title: "مساهمة في مشاريع مفتوحة المصدر",
        description: "ساهمت في العديد من المشاريع مفتوحة المصدر بلغة Python.",
      },
    ],
  },
  {
    id: 4,
    name: "خالد السليم",
    title: "خبير ذكاء اصطناعي",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "خالد السليم يعمل في مجال الذكاء الاصطناعي وتعلم الآلة منذ أكثر من 10 سنوات وشارك في العديد من المشاريع العالمية. متخصص في بناء نماذج تعلم الآلة وتطبيقات الذكاء الاصطناعي المتقدمة.",
    specialties: [
      "AI",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
    ],
    students: 4280,
    courses: 30,
    rating: 4.9,
    reviewsCount: 550,
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "10+ سنوات في مجال الذكاء الاصطناعي",
      "قيادة فرق الذكاء الاصطناعي في شركات عالمية",
    ],
    education: [
      {
        degree: "دكتوراه في الذكاء الاصطناعي",
        institution: "جامعة ستانفورد",
        year: "2015",
      },
      {
        degree: "ماجستير في الإحصاء",
        institution: "جامعة الملك عبدالله للعلوم والتقنية",
        year: "2012",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/khaled-alsulaiman",
      twitter: "https://twitter.com/khaled_ai",
      website: "https://khaledai.com",
    },
    achievements: [
      {
        icon: "award",
        title: "جائزة الابتكار في الذكاء الاصطناعي",
        description:
          "حصل على جائزة مرموقة في مجال الابتكار في الذكاء الاصطناعي.",
      },
      {
        icon: "filetext",
        title: "براءات اختراع متعددة",
        description: "يمتلك العديد من براءات الاختراع في تطبيقات تعلم الآلة.",
      },
    ],
  },
  {
    id: 5,
    name: "لمى القحطاني",
    title: "مصممة تجارب مستخدم معتمدة",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "لمى القحطاني تركز على تقديم حلول تصميم مبتكرة لتحسين تجربة المستخدم باستخدام أدوات مثل Figma وAdobe XD. لديها شغف بفهم سلوك المستخدمين وتصميم واجهات سهلة الاستخدام وجذابة.",
    specialties: [
      "UX Design",
      "Figma",
      "Adobe XD",
      "User Research",
      "Prototyping",
    ],
    students: 1650,
    courses: 12,
    rating: 4.6,
    reviewsCount: 210,
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "3 سنوات في تصميم تجارب المستخدم لتطبيقات الويب والموبايل",
      "العمل كاستشارية تصميم UX/UI",
    ],
    education: [
      {
        degree: "بكالوريوس في التصميم الجرافيكي",
        institution: "جامعة الفيصل",
        year: "2020",
      },
      {
        degree: "شهادة احترافية في تصميم تجربة المستخدم",
        institution: "Google UX Design Professional Certificate",
        year: "2022",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/lama-alqahtani",
      behance: "https://www.behance.net/lamaqahtani", // Added Behance link
    },
    achievements: [
      {
        icon: "award",
        title: "أفضل تصميم UX",
        description: "حصلت على جائزة لأفضل تصميم تجربة مستخدم لتطبيق جديد.",
      },
      {
        icon: "users",
        title: "ورش عمل ناجحة",
        description: "قدمت العديد من ورش العمل الناجحة في مجال تصميم UX.",
      },
    ],
  },
  {
    id: 6,
    name: "تركي الحربي",
    title: "خبير أمن معلومات",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    bio: "تركي الحربي متخصص في الأمن السيبراني وحماية الأنظمة والشبكات من الهجمات الإلكترونية. لديه خبرة عملية في اختبار الاختراق والاستجابة للحوادث الأمنية.",
    specialties: [
      "Cybersecurity",
      "Network Security",
      "Penetration Testing",
      "Ethical Hacking",
      "Risk Management",
    ],
    students: 2750,
    courses: 18,
    rating: 4.8,
    reviewsCount: 330,
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "7 سنوات في مجال أمن المعلومات",
      "العمل مع شركات كبرى في القطاع المالي",
    ],
    education: [
      {
        degree: "بكالوريوس في أمن المعلومات",
        institution: "جامعة الإمام محمد بن سعود الإسلامية",
        year: "2016",
      },
      { degree: "شهادة CISSP", institution: "ISC²", year: "2019" },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/turki-alharbi",
      twitter: "https://twitter.com/turki_security",
    },
    achievements: [
      {
        icon: "award",
        title: "مستشار أمن سيبراني معتمد",
        description: "حاصل على اعتماد كمستشار أمن سيبراني.",
      },
      {
        icon: "filetext",
        title: "نشر مقالات في الأمن السيبراني",
        description: "نشر العديد من المقالات المتخصصة في مجال الأمن السيبراني.",
      },
    ],
  },
  {
    id: 7,
    name: "ياسر الغامدي",
    title: "مطوّر Full Stack",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "ياسر الغامدي خبير في تطوير التطبيقات باستخدام تقنيات مثل Node.js وJavaScript وHTML/CSS. لديه القدرة على العمل على جميع جوانب تطوير الويب من الواجهة الأمامية إلى الخلفية وقواعد البيانات.",
    specialties: ["Node.js", "JavaScript", "HTML/CSS", "React", "MongoDB"],
    students: 1890,
    courses: 22,
    rating: 4.5,
    reviewsCount: 280,
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "8 سنوات في تطوير Full Stack",
      "العمل على مشاريع متنوعة في مختلف الصناعات",
    ],
    education: [
      {
        degree: "بكالوريوس في هندسة الحاسب",
        institution: "جامعة الملك فهد للبترول والمعادن",
        year: "2015",
      },
      {
        degree: "دورة متقدمة في تطوير Node.js",
        institution: "Pluralsight",
        year: "2017",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/yasser-alghamdi",
      github: "https://github.com/yasseralghamdi",
    },
    achievements: [
      {
        icon: "award",
        title: "مطور Full Stack متميز",
        description:
          "حصل على تقدير كمطور Full Stack متميز في الشركة التي يعمل بها.",
      },
      {
        icon: "users",
        title: "قيادة فريق تطوير",
        description: "قاد العديد من فرق التطوير الصغيرة والمتوسطة.",
      },
    ],
  },
  {
    id: 8,
    name: "ندى الرشيد",
    title: "عالمة بيانات",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    bio: "ندى الرشيد تعمل في مجال علم البيانات ولديها خبرة في تحليل البيانات باستخدام Python وأدوات مثل Pandas وMatplotlib. تهتم بتحويل البيانات إلى رؤى قابلة للتنفيذ.",
    specialties: ["Data Science", "Python", "Pandas", "Matplotlib", "SQL"],
    students: 3210,
    courses: 25,
    rating: 4.7,
    reviewsCount: 435,
    profileImage: "https://randomuser.me/api/portraits/men/8.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "6 سنوات في تحليل البيانات وعلم البيانات",
      "العمل على مشاريع تحليل بيانات للقطاع الصحي والمالي",
    ],
    education: [
      {
        degree: "ماجستير في علم البيانات",
        institution: "جامعة الملك سعود",
        year: "2018",
      },
      {
        degree: "شهادة في تصور البيانات",
        institution: "Tableau",
        year: "2020",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/nada-alrashid",
      medium: "https://medium.com/@nadaalrashid", // Added Medium link
    },
    achievements: [
      {
        icon: "filetext",
        title: "نشر نتائج أبحاث",
        description: "نشرت نتائج أبحاثها في مؤتمرات علمية متخصصة.",
      },
      {
        icon: "globe",
        title: "مشاريع تحليل بيانات مؤثرة",
        description:
          "شاركت في مشاريع تحليل بيانات كان لها تأثير إيجابي على القرارات التجارية.",
      },
    ],
  },
  {
    id: 9,
    name: "فهد العتيبي",
    title: "مطوّر واجهات أمامية",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "فهد العتيبي متخصص في تطوير واجهات المستخدم باستخدام Vue.js وJavaScript، ويعشق تحسين الأداء والتفاعل. يركز على كتابة كود نظيف وقابل للصيانة.",
    specialties: [
      "Vue.js",
      "JavaScript",
      "Performance Optimization",
      "Webpack",
      "Sass",
    ],
    students: 1420,
    courses: 8,
    rating: 4.4,
    reviewsCount: 190,
    profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
    coverImage: "https://picsum.photos/640/360?react",
    experience: [
      "3 سنوات في تطوير واجهات أمامية باستخدام Vue.js",
      "العمل على تطبيقات ويب ذات أداء عالي",
    ],
    education: [
      {
        degree: "بكالوريوس في علوم الحاسب",
        institution: "جامعة القصيم",
        year: "2021",
      },
      {
        degree: "دورة متقدمة في Vue.js",
        institution: "Vue Mastery",
        year: "2022",
      },
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/fahad-alotaibi",
      github: "https://github.com/fahad-otaibi",
    },
    achievements: [
      {
        icon: "award",
        title: "مساهم في مشاريع Vue.js مفتوحة المصدر",
        description:
          "ساهم في تطوير بعض المكتبات مفتوحة المصدر الخاصة بـ Vue.js.",
      },
      {
        icon: "users",
        title: "مساعدة المبتدئين",
        description: "يقدم المساعدة والإرشاد للمطورين الجدد في مجتمع Vue.js.",
      },
    ],
  },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id) {
    const instructorId = parseInt(id);
    const instructor = instructors.find((i) => i.id === instructorId);

    if (!instructor) {
      return NextResponse.json(
        { error: "instructor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(instructor);
  }
}
