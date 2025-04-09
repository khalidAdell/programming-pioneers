"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock data for blog posts
const BLOG_POSTS = [
  {
    id: 1,
    title: "كيف تبدأ رحلتك في تعلم البرمجة من الصفر",
    content:
      "في عالم التكنولوجيا المتسارع، أصبح تعلم البرمجة مهارة أساسية للنجاح في سوق العمل. سنستعرض في هذا المقال أفضل الطرق لبدء رحلتك في عالم البرمجة، بدءاً من اختيار اللغة المناسبة وحتى بناء أول مشروع برمجي خاص بك...",
    image: "https://picsum.photos/100/100?person=10",
    author: {
      name: "أحمد الخالدي",
      avatar: "/team/instructor-2.jpg",
      role: "مطور ويب أول",
    },
    publishedDate: "منذ 3 أيام",
    readTime: "7 دقائق للقراءة",
    likes: 156,
    comments: 32,
    tags: ["برمجة", "تعلم ذاتي", "تطوير مهارات"],
  },
  {
    id: 2,
    title: "الذكاء الاصطناعي وتأثيره على مستقبل التعليم",
    content:
      "يشهد قطاع التعليم تحولاً جذرياً مع دخول تقنيات الذكاء الاصطناعي إلى الفصول الدراسية والمنصات التعليمية. من التعلم الشخصي المخصص إلى أنظمة التقييم الآلي، نستكشف كيف يمكن لهذه التقنيات أن تعيد تشكيل مستقبل التعليم وتجربة المتعلمين...",
    image: "https://picsum.photos/100/100?person=14",
    author: {
      name: "سارة العمري",
      avatar: "/team/instructor-2.jpg",
      role: "باحثة في الذكاء الاصطناعي",
    },
    publishedDate: "منذ أسبوع",
    readTime: "10 دقائق للقراءة",
    likes: 243,
    comments: 45,
    tags: ["ذكاء اصطناعي", "تعليم", "تكنولوجيا"],
  },
  {
    id: 3,
    title: "لماذا يعتبر تعلم React ضرورياً لمطوري الواجهات الأمامية في 2025",
    content:
      "مع تطور تقنيات الويب بشكل مستمر، يظل React واحداً من أكثر مكتبات JavaScript شعبية وطلباً في سوق العمل. نناقش في هذا المقال الأسباب التي تجعل تعلم React استثماراً مهماً لمطوري الواجهات الأمامية، والفرص الوظيفية التي يفتحها...",
    image: "https://picsum.photos/100/100?person=15",
    author: {
      name: "محمد الشمري",
      avatar: "/team/instructor-3.jpg",
      role: "مطور React رئيسي",
    },
    publishedDate: "منذ 2 أسبوع",
    readTime: "8 دقائق للقراءة",
    likes: 198,
    comments: 27,
    tags: ["React", "تطوير الويب", "جافاسكريبت"],
  },
  {
    id: 4,
    title: "كيف تحسن مهاراتك في التعلم الذاتي: 7 استراتيجيات فعالة",
    content:
      "يعد التعلم الذاتي مهارة أساسية في العصر الرقمي، خاصة مع توفر مصادر المعرفة عبر الإنترنت. في هذا المقال، نستعرض 7 استراتيجيات مثبتة تساعدك على تحسين قدرتك على التعلم بشكل مستقل وفعال، مما يمكنك من اكتساب مهارات جديدة باستمرار...",
    image: "https://picsum.photos/100/100?person=16",
    author: {
      name: "نورا الحربي",
      avatar: "/team/instructor-4.jpg",
      role: "مستشارة تعليمية",
    },
    publishedDate: "منذ شهر",
    readTime: "6 دقائق للقراءة",
    likes: 315,
    comments: 64,
    tags: ["التعلم الذاتي", "تطوير ذاتي", "مهارات"],
  },
  {
    id: 5,
    title: "تصميم واجهات المستخدم: اتجاهات وممارسات معاصرة",
    content:
      "يتطور مجال تصميم واجهات المستخدم بشكل مستمر، مع ظهور اتجاهات وأدوات جديدة كل عام. نستعرض في هذا المقال أحدث الاتجاهات في مجال UI/UX، والممارسات المثلى التي يمكن للمصممين اتباعها لإنشاء تجارب مستخدم استثنائية...",
    image: "https://picsum.photos/100/100?person=18",
    author: {
      name: "لينا القحطاني",
      avatar: "/team/instructor-5.jpg",
      role: "مصممة UI/UX",
    },
    publishedDate: "منذ شهر",
    readTime: "9 دقائق للقراءة",
    likes: 178,
    comments: 39,
    tags: ["تصميم UI", "UX", "واجهات المستخدم"],
  },
];

// The main Blog component
const Blog = () => {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [visiblePosts, setVisiblePosts] = useState(3);

  // Function to load more posts
  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) => Math.min(prevVisible + 3, posts.length));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-linear-to-r from-indigo-900 to-purple-800">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              مدونة <span className="text-yellow-400">رواد</span> التعليمية
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              اكتشف أحدث المقالات والنصائح في مجالات البرمجة والتكنولوجيا
              والتعلم الذاتي
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex-grow">
        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-10">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <Image
                src={posts[0].image}
                alt="مقال مميز"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 text-right flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {posts[0].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-gray-700 mb-6">{posts[0].content}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={posts[0].image}
                      alt={posts[0].author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {posts[0].author.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {posts[0].publishedDate}
                    </p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  {posts[0].readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Feed */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            أحدث المقالات
          </h2>

          <div className="space-y-8">
            {posts.slice(0, visiblePosts).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  {/* Author and date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm">
                      {post.publishedDate} · {post.readTime}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          {post.author.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 order-2 md:order-1 text-right">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{post.content}</p>

                      {/* Interactions */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors">
                            <Share2 size={18} />
                            مشاركة
                          </button>
                          <button className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 transition-colors">
                            <Bookmark size={18} />
                            حفظ
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart size={18} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle size={18} />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 order-1 md:order-2 relative h-48 md:h-auto">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < posts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMorePosts}
                className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                تحميل المزيد من المقالات
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
