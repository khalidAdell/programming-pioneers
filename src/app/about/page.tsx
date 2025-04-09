"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  CheckCircle,
  Globe,
  BookmarkCheck,
  Lightbulb,
  Briefcase,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<string>("mission");

  const team = [
    {
      name: "أحمد الحسن",
      role: "المؤسس والرئيس التنفيذي",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      bio: "خبير في تطوير التعليم الإلكتروني مع أكثر من 15 عامًا من الخبرة في قطاع التعليم والتكنولوجيا.",
    },
    {
      name: "سارة المالكي",
      role: "مديرة المحتوى التعليمي",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      bio: "حاصلة على الدكتوراه في تكنولوجيا التعليم وعملت مع أكبر المؤسسات التعليمية في المنطقة.",
    },
    {
      name: "محمد العمري",
      role: "رئيس قسم التكنولوجيا",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "مهندس برمجيات سابق في شركات عالمية، متخصص في تطوير منصات التعلم الإلكتروني.",
    },
    {
      name: "نورة القحطاني",
      role: "مديرة تجربة المستخدم",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "مصممة ومطورة واجهات مستخدم تركز على تحسين تجربة التعلم وجعلها أكثر متعة وفعالية.",
    },
  ];

  const values = [
    {
      icon: <BookmarkCheck size={24} />,
      title: "الجودة",
      description:
        "نقدم محتوى تعليمي عالي الجودة يواكب المعايير العالمية ويلبي احتياجات سوق العمل.",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "الإبداع",
      description:
        "نشجع التفكير الإبداعي والابتكار في كل جوانب عملنا وفي المحتوى الذي نقدمه.",
    },
    {
      icon: <Users size={24} />,
      title: "التعاون",
      description:
        "نؤمن بقوة العمل الجماعي وبناء شراكات قوية مع المؤسسات التعليمية والشركات.",
    },
    {
      icon: <Globe size={24} />,
      title: "الشمولية",
      description:
        "نسعى لتوفير فرص تعليمية متكافئة للجميع، بغض النظر عن خلفياتهم وظروفهم.",
    },
    {
      icon: <Briefcase size={24} />,
      title: "العملية",
      description:
        "نركز على المهارات العملية التي يمكن تطبيقها مباشرة في بيئة العمل الحقيقية.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "التطور المستمر",
      description:
        "نلتزم بالتحسين المستمر لمنصتنا ومحتوانا لمواكبة التطورات التكنولوجية والتعليمية.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-linear-to-r from-indigo-900 to-purple-800 py-16">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              عن منصة <span className="text-yellow-400">رواد</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
              منصة تعليمية رائدة تهدف إلى تمكين الشباب العربي من اكتساب المهارات
              الرقمية والتقنية اللازمة للنجاح في سوق العمل المتغير
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { number: "100+", label: "دورة احترافية", icon: "📚" },
              { number: "500+", label: "ساعة تعليمية", icon: "⏱️" },
              { number: "100,00+", label: "متعلم", icon: "👨‍🎓" },
              { number: "98%", label: "رضا العملاء", icon: "⭐" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 transform hover:-translate-y-1 transition-all"
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
      </section>

      {/* About Tabs */}
      <section className="container mx-auto px-4 py-12">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "mission"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              رؤيتنا ورسالتنا
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "story"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              قصتنا
            </button>
            <button
              onClick={() => setActiveTab("values")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "values"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              قيمنا
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "team"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              فريقنا
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-right">
          {/* Mission & Vision Tab */}
          {activeTab === "mission" && (
            <div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="ml-2 bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                    <Lightbulb size={24} />
                  </span>
                  رؤيتنا
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  أن نكون المنصة التعليمية الرائدة في العالم العربي التي تمكّن
                  الأفراد من تطوير مهاراتهم وتحقيق طموحاتهم المهنية في مجالات
                  التكنولوجيا والأعمال.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-700 italic">
                    &quot;نتطلع إلى بناء جيل جديد من المتخصصين والمبدعين
                    القادرين على قيادة التحول الرقمي في منطقتنا والمنافسة
                    عالمياً.&quot;
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="ml-2 bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                    <BookmarkCheck size={24} />
                  </span>
                  رسالتنا
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  توفير تعليم عالي الجودة وميسر التكلفة يركز على المهارات
                  العملية والتطبيقية، من خلال الاستعانة بأفضل المدربين والخبراء
                  في مجالاتهم، وتوظيف أحدث التقنيات التعليمية لضمان تجربة تعلم
                  فعالة وممتعة.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-500" size={18} />
                      <h3 className="font-bold text-gray-700">
                        محتوى عالي الجودة
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      دورات مصممة بعناية لتلبي احتياجات سوق العمل
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-500" size={18} />
                      <h3 className="font-bold text-gray-700">
                        مدربون محترفون
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      خبراء ذوو خبرة عملية في مجالاتهم
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-500" size={18} />
                      <h3 className="font-bold text-gray-700">
                        تقنيات تعليمية حديثة
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      منصة تفاعلية تضمن تجربة تعلم مميزة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Tab */}
          {activeTab === "story" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                قصة منصة رواد
              </h2>

              <div className="mb-8 relative border-r-2 border-yellow-500 pr-6">
                <div className="absolute right-0 top-0 transform translate-x-1/2 bg-yellow-500 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  البداية - 2018
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  بدأت فكرة منصة رواد على يد مجموعة من المهندسين والمعلمين الذين
                  لاحظوا فجوة كبيرة بين ما يتم تدريسه في الجامعات وما يتطلبه سوق
                  العمل في مجالات التكنولوجيا. كانت الرؤية بسيطة: إنشاء منصة
                  تعليمية تركز على المهارات العملية التي يحتاجها الشباب العربي
                  للنجاح في العصر الرقمي.
                </p>
              </div>

              <div className="mb-8 relative border-r-2 border-yellow-500 pr-6">
                <div className="absolute right-0 top-0 transform translate-x-1/2 bg-yellow-500 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  النمو والتطور - 2020
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  بعد عامين من العمل المتواصل، أطلقنا النسخة الأولى من المنصة مع
                  15 دورة تدريبية فقط. سرعان ما لاقت المنصة إقبالاً كبيراً، خاصة
                  مع انتشار جائحة كورونا والتحول نحو التعليم عن بعد. استطعنا
                  توسيع فريق العمل واستقطاب مدربين من مختلف التخصصات.
                </p>
              </div>

              <div className="mb-8 relative border-r-2 border-yellow-500 pr-6">
                <div className="absolute right-0 top-0 transform translate-x-1/2 bg-yellow-500 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  التوسع والشراكات - 2022
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  مع تزايد عدد المستخدمين، بدأنا في عقد شراكات استراتيجية مع
                  شركات تقنية كبرى ومؤسسات تعليمية مرموقة. هذه الشراكات ساعدتنا
                  على تطوير برامج تدريبية متخصصة وإتاحة فرص عمل للمتعلمين
                  المتميزين على منصتنا.
                </p>
              </div>

              <div className="relative pr-6">
                <div className="absolute right-0 top-0 transform translate-x-1/2 bg-yellow-500 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  اليوم ونظرة للمستقبل
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  اليوم، أصبحت منصة رواد واحدة من أكبر المنصات التعليمية باللغة
                  العربية، مع أكثر من 25,000 متعلم و150 دورة تدريبية في مختلف
                  المجالات. نستمر في التطوير والابتكار، مع التركيز على تقنيات
                  الذكاء الاصطناعي والواقع المعزز لتحسين تجربة التعلم، ونتطلع
                  إلى توسيع نطاق تأثيرنا في جميع أنحاء العالم العربي.
                </p>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === "values" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                قيمنا الأساسية
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                تشكل هذه القيم جوهر عملنا وتوجه قراراتنا وتفاعلاتنا مع المتعلمين
                والمدربين وجميع شركائنا:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-yellow-300 transition-colors"
                  >
                    <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg inline-block mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                فريق القيادة
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                يقود منصة رواد فريق من الخبراء والمتخصصين الذين يشتركون في شغفهم
                بالتعليم والتكنولوجيا:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 relative">
                      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                        <Image
                          alt={member.name}
                          src={member.image}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-yellow-600 text-sm mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            شركاؤنا
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-24 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <div className="text-gray-400">شعار الشريك {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              انضم إلى مجتمع رواد التعليمي
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              ابدأ رحلتك التعليمية اليوم واكتسب المهارات التي تحتاجها للنجاح في
              المستقبل
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                استعرض الدورات
              </Link>
              <Link
                href="/instructors"
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                تعرف على المدربين
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
