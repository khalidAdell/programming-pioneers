import Image from "next/image";
import Link from "next/link";
import { Search, Star, ChevronLeft } from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SliderCards from "./components/SliderCards";

interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

async function getRecentCourses() {
  const res = await fetch(
    `http://localhost:3000/api/courses?featured=${true}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
async function getfeaturedCourses() {
  const res = await fetch(`http://localhost:3000/api/courses?recent=${true}`, {
    cache: "no-store",
  });

  return res.json();
}

const Home = async () => {
  const recentCourses = await getRecentCourses();
  const featuredCourses = await getfeaturedCourses();

  const categories: Category[] = [
    { id: 1, name: "تطوير الويب", count: 24, icon: "🌐" },
    { id: 2, name: "الذكاء الاصطناعي", count: 12, icon: "🤖" },
    { id: 3, name: "تطوير تطبيقات الجوال", count: 18, icon: "📱" },
    { id: 4, name: "قواعد البيانات", count: 8, icon: "🗄️" },
    { id: 5, name: "التصميم", count: 15, icon: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-indigo-900 to-purple-800 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-400 rounded-full -translate-x-1/4 -translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="w-full md:w-1/2 text-right mb-10 md:mb-0 order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                <span className="text-yellow-400">طوّر</span> مهاراتك،
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-300">
                  وحقق أهدافك
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl">
                منصة تعليمية عربية متكاملة لتعلم أحدث التقنيات والمهارات
                البرمجية المطلوبة في سوق العمل
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="cursor-pointer flex-grow md:flex-grow-0 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors text-lg">
                  ابدأ التعلم مجاناً
                </button>
                <button className="cursor-pointer flex-grow md:flex-grow-0 border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-3 px-8 rounded-xl transition-colors text-lg">
                  تصفح الدورات
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-2 px-4 mb-8 md:mb-0">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-30 blur-lg"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400 rounded-full opacity-30 blur-lg"></div>

                {/* Search container */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6 text-right">
                    ابحث عن الدورة المناسبة
                  </h2>

                  <div className="relative w-full mb-6">
                    <input
                      type="text"
                      placeholder="ماذا تريد أن تتعلم؟"
                      className="w-full px-6 py-4 rounded-xl text-gray-50 outline-none text-right pr-12 text-lg"
                    />
                    <Search
                      className="absolute top-4 right-4 text-gray-500"
                      size={24}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end mb-6">
                    {[
                      "React",
                      "بايثون",
                      "JavaScript",
                      "تصميم UI/UX",
                      "ذكاء اصطناعي",
                    ].map((tag, idx) => (
                      <Link
                        href={`/courses/${tag}`}
                        key={idx}
                        className="bg-white/20 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  <button className="cursor-pointer w-full bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all">
                    بحث متقدم
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Redesigned */}
      <div className="bg-white relative z-10">
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: "100+", label: "دورة احترافية", icon: "📚" },
              { number: "500+", label: "ساعة تعليمية", icon: "⏱️" },
              { number: "100,00+", label: "متعلم", icon: "👨‍🎓" },
              { number: "98%", label: "رضا العملاء", icon: "⭐" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col items-center md:items-start text-right">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-indigo-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Categories Section */}
        <section className="mb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-gray-900">
                اكتشف التصنيفات
              </h2>
              <Link
                href="/categories"
                className="flex items-center text-yellow-600 hover:text-yellow-800 group"
              >
                <span className="ml-1">تصفح جميع التصنيفات</span>
                <ChevronLeft className="transform group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-100 transition-all"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.count} دورة متاحة
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              الدورات المميزة
            </h2>
            <Link
              href="/courses"
              className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>

          <div className="">
            <SliderCards cards={recentCourses} />
          </div>
        </section>

        {/* Latest Courses */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">أحدث الدورات</h2>
            <Link
              href="/courses/latest"
              className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              عرض الكل
              <ChevronLeft size={16} />
            </Link>
          </div>

          <div className="">
            <SliderCards cards={featuredCourses} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-right">
            آراء المتعلمين
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-right">
              <div className="flex mb-4 gap-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="صورة المستخدم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="font-bold text-gray-700">خالد العبدالله</p>
                    <p className="text-gray-500 text-sm">مهندس برمجيات</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                الدورات على هذه المنصة غيرت مساري المهني بشكل كامل. المحتوى عملي
                وسهل الفهم والمدربين متميزين
              </p>
              <div className="flex mt-4">
                <div className="flex items-center text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 text-right">
              <div className="flex mb-4 gap-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="صورة المستخدم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="font-bold text-gray-700">نورة السعيد</p>
                    <p className="text-gray-500 text-sm">مطورة ويب</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                استفدت كثيرًا من دورة React. المشاريع العملية ساعدتني على فهم
                المفاهيم بشكل أعمق وتطبيقها في عملي
              </p>
              <div className="flex mt-4">
                <div className="flex items-center text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden rounded-2xl mb-16">
          {/* Background with linear overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-violet-800 to-purple-900 opacity-95"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

          {/* Content container */}
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center">
            {/* Text content */}
            <div className="w-full md:w-3/5 text-right mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                <span className="text-yellow-400">استثمر</span> في مستقبلك{" "}
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-300">
                  وطوّر مهاراتك التقنية
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl">
                انضم إلى مجتمع من المتعلمين والخبراء واكتسب المهارات التي
                تحتاجها للنجاح في المجال التقني
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="cursor-pointer flex-grow md:flex-grow-0 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors text-lg">
                  <span className="relative z-10">ابدأ الآن مجاناً</span>
                </button>
                <button className="cursor-pointer flex-grow md:flex-grow-0 border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-3 px-8 rounded-xl transition-colors text-lg">
                  <span className="relative z-10">استكشف جميع الدورات</span>
                </button>
              </div>
            </div>

            {/* Stats/Features */}
            <div className="w-full md:w-2/5">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
                <ul className="space-y-4">
                  {[
                    {
                      icon: "🎓",
                      title: "دورات عالية الجودة",
                      desc: "محتوى تعليمي مصمم بعناية من قبل خبراء في المجال",
                    },
                    {
                      icon: "🔄",
                      title: "تحديثات مستمرة",
                      desc: "محتوى متجدد يواكب أحدث التقنيات والأدوات",
                    },
                    {
                      icon: "📊",
                      title: "شهادات معتمدة",
                      desc: "احصل على شهادات تعزز سيرتك الذاتية",
                    },
                    {
                      icon: "💬",
                      title: "دعم فني متواصل",
                      desc: "مساعدة مباشرة من المدربين ومجتمع المتعلمين",
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-right"
                    >
                      <div className="mt-1">
                        <div className="text-white text-lg">{item.desc}</div>
                        <h3 className="font-bold text-xl text-yellow-400 mb-1">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
