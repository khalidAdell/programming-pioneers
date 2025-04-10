"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  BarChart3,
  Star,
  CheckCircle,
  ShoppingCart,
  PlayCircle,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
  Award,
  Bookmark,
} from "lucide-react";

import SliderCards from "../../components/SliderCards";
import { SingleCourse } from "@/app/types/courses";

const Course = ({
  course,
  relatedCourses,
}: {
  course: SingleCourse;
  relatedCourses: SingleCourse[];
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (sectionId: number) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter((id) => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const calculateTotalDuration = () => {
    if (!course?.sections) return "0 ساعة";

    let totalMinutes = 0;
    course.sections.forEach((section) => {
      section.lessons.forEach((lesson) => {
        const [hours, minutes] = lesson.duration.split(":").map(Number);
        totalMinutes += hours * 60 + minutes;
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} ساعة${minutes > 0 ? ` و ${minutes} دقيقة` : ""}`;
  };

  const totalLessons =
    course?.sections?.reduce(
      (total: number, section) => total + section.lessons.length,
      0
    ) || 0;

  if (course.error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="container mx-auto px-4 py-20 flex-grow">
          <div className="text-center">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              عفواً، لم نتمكن من العثور على الدورة
            </h3>
            <p className="text-gray-600 mb-6">
              حدث خطأ أثناء تحميل بيانات الدورة، يرجى المحاولة مرة أخرى
            </p>
            <Link
              href="/courses"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              العودة إلى قائمة الدورات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Course Hero Section */}
      <div className="relative bg-linear-to-r from-indigo-900 to-purple-800 py-16">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-right">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href={`/courses/${course.category}`}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                {course.category}
              </Link>
              {course.tags?.slice(0, 3).map((tag, index) => (
                <Link
                  key={index}
                  href={`/courses/${tag}`}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-3xl">
              {course.description?.substring(0, 150)}...
            </p>

            <div className="flex flex-wrap gap-6 text-gray-200 mb-8">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{course.students?.toLocaleString()} طالب</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={18} />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span className="mr-1">{course.rating}</span>
                </div>
                <span className="text-gray-300">
                  ({course.ratingCount} تقييم)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={course.instructorImage}
                  alt={course.instructor}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-white">{course.instructor}</p>
                <p className="text-gray-300 text-sm">
                  {course.instructorTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Details */}
          <div className="w-full lg:w-2/3">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                    activeTab === "overview"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-600 hover:text-yellow-600"
                  }`}
                >
                  نظرة عامة
                </button>
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                    activeTab === "curriculum"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-600 hover:text-yellow-600"
                  }`}
                >
                  محتوى الدورة
                </button>
                <button
                  onClick={() => setActiveTab("instructor")}
                  className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                    activeTab === "instructor"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-600 hover:text-yellow-600"
                  }`}
                >
                  المدرب
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                    activeTab === "reviews"
                      ? "text-yellow-600 border-b-2 border-yellow-500"
                      : "text-gray-600 hover:text-yellow-600"
                  }`}
                >
                  التقييمات
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    نظرة عامة عن الدورة
                  </h2>

                  <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-700 mb-2">اللغة</p>
                        <p className="text-gray-600">{course.language}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-700 mb-2">
                          آخر تحديث
                        </p>
                        <p className="text-gray-600">{course.lastUpdate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ماذا ستتعلم
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.objectives?.map((objective, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle
                            className="text-green-500 flex-shrink-0 mt-1"
                            size={18}
                          />
                          <p className="text-gray-700">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      متطلبات الدورة
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements?.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-500 flex-shrink-0 mt-1">
                            •
                          </span>
                          <p className="text-gray-700">{requirement}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      لمن هذه الدورة؟
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0 mt-1">
                          •
                        </span>
                        <p className="text-gray-700">
                          مطوري الواجهات الأمامية الذين يرغبون في تعلم React و
                          NextJS
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0 mt-1">
                          •
                        </span>
                        <p className="text-gray-700">
                          مطوري الويب الذين يريدون تحسين مهاراتهم في بناء
                          تطبيقات ويب حديثة
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0 mt-1">
                          •
                        </span>
                        <p className="text-gray-700">
                          المبتدئين الذين لديهم معرفة أساسية بـ HTML و CSS و
                          JavaScript
                        </p>
                      </li>
                    </ul>
                  </div> */}
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === "curriculum" && (
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    محتوى الدورة
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-gray-600" />
                      <span className="text-gray-700">{totalLessons} درس</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-gray-600" />
                      <span className="text-gray-700">
                        {calculateTotalDuration()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-gray-600" />
                      <span className="text-gray-700">شهادة إتمام</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {course.sections.map((section) => (
                      <div
                        key={section.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full bg-gray-50 px-6 py-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {expandedSections.includes(section.id) ? (
                              <ChevronUp size={18} className="text-gray-600" />
                            ) : (
                              <ChevronDown
                                size={18}
                                className="text-gray-600"
                              />
                            )}
                            <h3 className="font-bold text-gray-800">
                              {section.title}
                            </h3>
                          </div>
                          <div className="text-gray-600 text-sm">
                            {section.duration}
                          </div>
                        </button>

                        {expandedSections.includes(section.id) && (
                          <div className="divide-y divide-gray-100">
                            {section.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="px-6 py-4 flex justify-between items-center"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isVideo ? (
                                    <PlayCircle
                                      size={18}
                                      className="text-gray-600"
                                    />
                                  ) : (
                                    <FileText
                                      size={18}
                                      className="text-gray-600"
                                    />
                                  )}
                                  <span className="text-gray-800">
                                    {lesson.title}
                                    {lesson.isFree && (
                                      <span className="mr-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                        مجاني
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <span className="text-gray-600 text-sm">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === "instructor" && (
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    مدرب الدورة
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden">
                        <Image
                          src={course.instructorImage}
                          alt={course.instructor}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {course.instructor}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {course.instructorTitle}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Star size={18} className="text-yellow-400" />
                          <span className="text-gray-800">{course.rating}</span>
                          <span className="text-gray-600">
                            ({course.ratingCount} تقييم)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-gray-600" />
                          <span className="text-gray-800">
                            {course.students?.toLocaleString()} طالب
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-gray-600" />
                          <span className="text-gray-800">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{course.description}</p>
                      <Link
                        href={`/instructors/${course.instructor}`}
                        className="text-yellow-600 hover:text-yellow-500 font-bold"
                      >
                        عرض المزيد عن المدرب
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    تقييمات الدورة
                  </h2>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Star size={24} className="text-yellow-400" />
                      <span className="text-3xl font-bold text-gray-800">
                        {course.rating}
                      </span>
                      <span className="text-gray-600">
                        ({course.ratingCount} تقييم)
                      </span>
                    </div>
                  </div>

                  {course.reviews?.length > 0 ? (
                    course.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white rounded-lg shadow-sm p-6 mb-6"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={review.userImage}
                              alt={review.user}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {review.user}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {review.userTitle}
                            </p>
                            <p className="text-yellow-400 mt-1 flex gap-0.5">
                              {Array.from({ length: review.rating }, (_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                              ))}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{review.comment}</p>

                        <div className="flex items-center justify-between text-gray-500 text-sm">
                          <span>{review.date}</span>
                          <button className="flex items-center gap-2 hover:text-yellow-600 transition-colors">
                            <Heart size={16} />
                            {review.helpful} شخص وجد هذا مفيداً
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">لا توجد تقييمات بعد.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Course Purchase */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              شراء الدورة
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">السعر:</span>
              <span className="text-xl font-bold text-yellow-600">
                {+course.price ? `${course.price} دولار` : course.price}
              </span>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 rounded-lg w-full transition-colors mb-4 flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> إضافة إلى السلة
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg w-full transition-colors mb-4 flex items-center justify-center gap-2">
              <Bookmark size={18} /> حفظ للدراسة لاحقاً
            </button>

            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-3 rounded-lg w-full transition-colors flex items-center justify-center gap-2">
              <Share2 size={18} /> مشاركة الدورة
            </button>
          </div>
        </div>
      </main>

      {/* Related Courses Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
            دورات ذات صلة
          </h2>
          {relatedCourses.length > 0 ? (
            <SliderCards cards={relatedCourses} />
          ) : (
            <p className="text-gray-600 text-right">
              لا توجد دورات ذات صلة في الوقت الحالي.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Course;
