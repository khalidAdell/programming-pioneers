"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Star,
  Clock,
  Book,
  FileText,
  Mail,
  Globe,
  Linkedin,
  Facebook,
  Youtube,
  PlayCircle,
  ChevronRight,
  Award,
} from "lucide-react";
import CourseCard from "../CourseCard";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Course } from "@/app/types/courses";

interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  students: number;
  courses: number;
  experience: string[];
  specialties: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  socialLinks: {
    website?: string;
    linkedin?: string;
    Youtube?: string;
    facebook?: string;
  };
  error: string;
  achievements: {
    icon: string;
    title: string;
    description: string;
  }[];
}
interface Review {
  id: number;
  user: string;
  userTitle: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  course: string;
}

interface Props {
  instructor: Instructor;
  courses: Course[];
}

const Instructor = ({ instructor, courses }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("courses");
  const reviews: Review[] = [];

  if (!instructor || instructor.error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex-grow">
          <div className="text-center">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              عفواً، لم نتمكن من العثور على المدرب
            </h3>
            <p className="text-gray-600 mb-6">
              حدث خطأ أثناء تحميل بيانات المدرب، يرجى المحاولة مرة أخرى
            </p>
            <Link
              href="/courses"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              العودة إلى قائمة الدورات
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <Image
          src={instructor.coverImage || "/images/default-cover.jpg"}
          alt={`${instructor.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Instructor Profile */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 mb-8">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
            <Image
              src={instructor.profileImage}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 pt-4 md:pt-0 text-right">
            <h1 className="text-3xl font-bold text-gray-100 mb-5 mt-4">
              {instructor.name}
            </h1>
            <p className="text-gray-600 mb-4">{instructor.title}</p>

            <div className="flex flex-wrap gap-6 text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{instructor.students?.toLocaleString()} طالب</span>
              </div>
              <div className="flex items-center gap-2">
                <Book size={18} />
                <span>{instructor.courses} دورة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-500">
                  <Star size={18} fill="currentColor" />
                  <span className="mr-1">{instructor.rating}</span>
                </div>
                <span className="text-gray-600">
                  ({instructor.reviewsCount} تقييم)
                </span>
              </div>
            </div>

            {/* Social Links */}
            {instructor.socialLinks && (
              <div className="flex gap-3 mb-4">
                {instructor.socialLinks.website && (
                  <Link
                    href={instructor.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Globe size={18} />
                  </Link>
                )}
                {instructor.socialLinks.linkedin && (
                  <Link
                    href={instructor.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin size={18} />
                  </Link>
                )}
                {instructor.socialLinks.Youtube && (
                  <Link
                    href={instructor.socialLinks.Youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Youtube size={18} />
                  </Link>
                )}
                {instructor.socialLinks.facebook && (
                  <Link
                    href={instructor.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Facebook size={18} />
                  </Link>
                )}
              </div>
            )}

            <button className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              <Mail size={18} />
              تواصل مع المدرب
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "courses"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              الدورات
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer z-10 ${
                activeTab === "about"
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-gray-600 hover:text-yellow-600"
              }`}
            >
              نبذة عن المدرب
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
        <div className="mb-16">
          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
                دورات المدرب
              </h2>

              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    لا توجد دورات حالياً
                  </h3>
                  <p className="text-gray-600">
                    هذا المدرب لا يملك دورات منشورة بعد
                  </p>
                </div>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="flex flex-col lg:flex-row gap-8 text-right">
              {/* Left Column */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    نبذة عن المدرب
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>

                {/* Experience */}
                {instructor.experience && instructor.experience.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      الخبرات
                    </h2>
                    <div className="space-y-4">
                      {instructor.experience.map((exp, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-gray-100 p-2 rounded-full flex-shrink-0 mt-1">
                            <Clock size={18} className="text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-gray-700">{exp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {instructor.education && instructor.education.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      التعليم
                    </h2>
                    <div className="space-y-4">
                      {instructor.education.map((edu, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-gray-100 p-2 rounded-full flex-shrink-0 mt-1">
                            <Award size={18} className="text-yellow-500" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {edu.degree}
                            </p>
                            <p className="text-gray-600">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-1/3">
                {/* Specialties */}
                {instructor.specialties &&
                  instructor.specialties.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        التخصصات
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Achievements */}
                {instructor.achievements &&
                  instructor.achievements.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        الإنجازات
                      </h2>
                      <div className="space-y-4">
                        {instructor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0 mt-1">
                              {achievement.icon === "award" ? (
                                <Award size={18} className="text-yellow-500" />
                              ) : achievement.icon === "users" ? (
                                <Users size={18} className="text-yellow-500" />
                              ) : (
                                <FileText
                                  size={18}
                                  className="text-yellow-500"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">
                                {achievement.title}
                              </p>
                              <p className="text-gray-600">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-500">
                    <Star size={24} fill="currentColor" />
                    <span className="mr-1 text-2xl font-bold text-gray-800">
                      {instructor.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({instructor.reviewsCount} تقييم)
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  تقييمات الطلاب
                </h2>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-lg shadow-sm p-6"
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
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-yellow-500 flex gap-0.5">
                              {Array.from({ length: review.rating }, (_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                              ))}
                            </div>
                            <span className="text-gray-600 text-sm">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      <Link
                        href={`/courses/${review.course}`}
                        className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-sm"
                      >
                        <PlayCircle size={16} />
                        دورة: {review.course}
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="text-5xl mb-4">⭐</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    لا توجد تقييمات بعد
                  </h3>
                  <p className="text-gray-600">
                    كن أول من يقيم دورات هذا المدرب
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Instructor;
