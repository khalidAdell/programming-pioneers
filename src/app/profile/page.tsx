"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Book,
  Award,
  Settings,
  BookOpen,
  Heart,
  Calendar,
  Edit,
  LogOut,
  Bell,
  CheckCircle,
  StarIcon,
  TrophyIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("courses");
  const session = useSession();

  // Mock user data
  const user = {
    name: session.data?.user?.name || "",
    email: session.data?.user?.email || "",
    avatar: session.data?.user?.image || "",
    bio: "مهندس برمجيات متحمس للتعلم المستمر وتطوير المهارات في مجال تطوير الويب والذكاء الاصطناعي.",
    joinedDate: "يناير 2023",
    level: "متقدم",
    completedCourses: 8,
    inProgressCourses: 3,
    certificates: 5,
    points: 2450,
  };

  // Mock courses data
  const enrolledCourses = [
    {
      id: 1,
      title: "تطوير تطبيقات الويب باستخدام React و Next.js",
      instructor: "أحمد الحسن",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      progress: 85,
      lastAccessed: "منذ 3 أيام",
    },
    {
      id: 2,
      title: "أساسيات الذكاء الاصطناعي وتعلم ال Machine Learning",
      instructor: "سارة المالكي",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      progress: 45,
      lastAccessed: "منذ يومين",
    },
    {
      id: 3,
      title: "تطوير تطبيقات الموبايل باستخدام React Native",
      instructor: "محمد العمري",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      progress: 65,
      lastAccessed: "منذ أسبوع",
    },
  ];

  const completedCourses = [
    {
      id: 4,
      title: "أساسيات HTML و CSS",
      instructor: "نورة القحطاني",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      completionDate: "15 مارس 2023",
      certificate: true,
    },
    {
      id: 5,
      title: "JavaScript للمبتدئين",
      instructor: "أحمد الحسن",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      completionDate: "10 أبريل 2023",
      certificate: true,
    },
    {
      id: 6,
      title: "قواعد البيانات SQL",
      instructor: "سارة المالكي",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      completionDate: "2 مايو 2023",
      certificate: true,
    },
  ];

  const savedCourses = [
    {
      id: 7,
      title: "تحليل البيانات باستخدام Python",
      instructor: "محمد العمري",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      price: "150 دولار",
      rating: 4.8,
    },
    {
      id: 8,
      title: "تطوير الألعاب باستخدام Unity",
      instructor: "نورة القحطاني",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      price: "200 دولار",
      rating: 4.7,
    },
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "المتعلم النشط",
      description: "أكمل 5 دورات تدريبية",
      icon: "🏆",
      earned: true,
      date: "5 يونيو 2023",
    },
    {
      id: 2,
      title: "متقن JavaScript",
      description: "أكمل جميع دورات JavaScript",
      icon: "🌟",
      earned: true,
      date: "15 أغسطس 2023",
    },
    {
      id: 3,
      title: "متعلم ثابت",
      description: "سجل دخول لمدة 30 يوم متتالي",
      icon: "🔥",
      earned: true,
      date: "10 سبتمبر 2023",
    },
    {
      id: 4,
      title: "خبير البرمجة",
      description: "أكمل 10 مشاريع برمجية",
      icon: "💻",
      earned: false,
      progress: 70,
    },
  ];

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: "تطوير الواجهات الأمامية",
      issueDate: "15 مارس 2023",
      credentialId: "FRONT-123456",
    },
    {
      id: 2,
      title: "JavaScript للمبتدئين",
      issueDate: "10 أبريل 2023",
      credentialId: "JS-654321",
    },
    {
      id: 3,
      title: "قواعد البيانات SQL",
      issueDate: "2 مايو 2023",
      credentialId: "SQL-987654",
    },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 py-16">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-6xl flex items-center justify-center translate-y-1/2 text-yellow-500 font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-gray-200 mb-4">{user.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>انضم في {user.joinedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Book size={16} />
                  <span>{user.completedCourses} دورة مكتملة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={16} />
                  <span>{user.certificates} شهادات</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:mr-auto">
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                <Edit size={16} />
                تعديل الملف الشخصي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">الدورات الجارية</p>
              <p className="text-2xl font-bold text-gray-800">
                {user.inProgressCourses}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">الدورات المكتملة</p>
              <p className="text-2xl font-bold text-gray-800">
                {user.completedCourses}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
              <Award size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">الشهادات</p>
              <p className="text-2xl font-bold text-gray-800">
                {user.certificates}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <StarIcon size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">نقاط المكافآت</p>
              <p className="text-2xl font-bold text-gray-800">{user.points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 text-right">
                  القائمة الشخصية
                </h3>
                <nav className="space-y-2 text-right">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "courses"
                        ? "bg-yellow-100 text-yellow-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Book className="mr-2" size={18} />
                    <span>دوراتي</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("certificates")}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "certificates"
                        ? "bg-yellow-100 text-yellow-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Award className="mr-2" size={18} />
                    <span>شهاداتي</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("achievements")}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "achievements"
                        ? "bg-yellow-100 text-yellow-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <TrophyIcon className="mr-2" size={18} />
                    <span>الإنجازات</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("savedCourses")}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === "savedCourses"
                        ? "bg-yellow-100 text-yellow-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Heart className="mr-2" size={18} />
                    <span>الدورات المحفوظة</span>
                  </button>
                </nav>
              </div>
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 text-right">
                  الإعدادات
                </h3>
                <nav className="space-y-2 text-right">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <User className="mr-2" size={18} />
                    <span>معلومات الحساب</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <Bell className="mr-2" size={18} />
                    <span>الإشعارات</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <Settings className="mr-2" size={18} />
                    <span>إعدادات الحساب</span>
                  </a>
                </nav>
              </div>
              <div className="p-6">
                <button
                  onClick={() => {
                    handleSignOut();
                  }}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="mr-2" size={18} />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-right">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  دوراتي التعليمية
                </h2>

                {/* In Progress Courses */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="ml-2" size={20} />
                    دورات قيد التقدم
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 mb-2">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src={course.image}
                                alt={course.instructor}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {course.instructor}
                            </span>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>{course.progress}%</span>
                              <span>آخر نشاط: {course.lastAccessed}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <Link
                            href={`/course/${course.id}`}
                            className="block text-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            متابعة التعلم
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completed Courses */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="ml-2" size={20} />
                    دورات مكتملة
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 mb-2">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src={course.image}
                                alt={course.instructor}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {course.instructor}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600">
                              تاريخ الإكمال: {course.completionDate}
                            </span>
                            {course.certificate && (
                              <span className="bg-green-100 text-green-600 text-xs py-1 px-2 rounded-full">
                                شهادة
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 space-x-reverse">
                            <Link
                              href={`/course/${course.id}`}
                              className="flex-1 block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                            >
                              مراجعة
                            </Link>
                            {course.certificate && (
                              <Link
                                href={`/certificates/${course.id}`}
                                className="flex-1 block text-center bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                              >
                                عرض الشهادة
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-right">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  شهاداتي
                </h2>

                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {certificate.title}
                          </h3>
                          <p className="text-gray-600 mb-1">
                            تاريخ الإصدار: {certificate.issueDate}
                          </p>
                          <p className="text-gray-600 text-sm">
                            رقم التعريف: {certificate.credentialId}
                          </p>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                            عرض
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                            تحميل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-right">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  الإنجازات
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-4 flex items-center gap-4 ${
                        achievement.earned
                          ? "border-yellow-300 bg-yellow-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                          achievement.earned
                            ? "bg-yellow-200"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <p className="text-green-600 text-sm flex items-center gap-1">
                            <CheckCircle size={14} />
                            تم الحصول عليه في {achievement.date}
                          </p>
                        ) : (
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Courses Tab */}
            {activeTab === "savedCourses" && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-right">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  الدورات المحفوظة
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src={course.image}
                              alt={course.instructor}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {course.instructor}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center text-yellow-400">
                            <StarIcon size={16} fill="currentColor" />
                            <span className="mr-1">{course.rating}</span>
                          </div>
                          <span className="font-bold text-yellow-600">
                            {course.price}
                          </span>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <Link
                            href={`/course/${course.id}`}
                            className="flex-1 block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            عرض الدورة
                          </Link>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                            <Heart
                              size={18}
                              fill="currentColor"
                              className="text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
