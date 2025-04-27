"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  List,
  Download,
  Share2,
  CheckCircle,
  PlayCircle,
  FileText,
  X,
} from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

// Dummy data for the lesson
const lessonData = {
  id: 102,
  courseId: 1,
  title: "مقدمة في أساسيات البرمجة بلغة JavaScript",
  description:
    "في هذا الدرس سنتعرف على أساسيات لغة JavaScript وكيفية استخدامها في تطوير تطبيقات الويب. سنتعلم المفاهيم الأساسية مثل المتغيرات، الدوال، المصفوفات والكائنات.",
  videoUrl: "/videos/javascript.mkv",
  videoPoster: "/images/JS.png",
  duration: "45:20",
  isCompleted: false,
  resources: [
    {
      id: 1,
      title: "شرح المفاهيم الأساسية في JavaScript",
      type: "pdf",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "أمثلة وتمارين عملية",
      type: "zip",
      size: "1.8 MB",
    },
  ],
  instructor: {
    name: "أحمد محمد",
    image: "https://picsum.photos/100/100?person=1",
    title: "مطور واجهات أمامية ومدرس JavaScript",
  },
  course: {
    title: "البرمجة بلغة JavaScript للمبتدئين",
    totalLessons: 24,
    progress: 42,
  },
  nextLesson: {
    id: 103,
    title: "المتغيرات وأنواع البيانات في JavaScript",
  },
  prevLesson: {
    id: 101,
    title: "مقدمة في تطوير الويب",
  },
  sections: [
    {
      id: 1,
      title: "مقدمة في تطوير الويب",
      lessons: [
        {
          id: 101,
          title: "مقدمة في تطوير الويب",
          duration: "30:15",
          isCompleted: true,
        },
        {
          id: 102,
          title: "مقدمة في أساسيات البرمجة بلغة JavaScript",
          duration: "45:20",
          isCompleted: false,
        },
        {
          id: 103,
          title: "المتغيرات وأنواع البيانات في JavaScript",
          duration: "38:45",
          isCompleted: false,
        },
      ],
    },
    {
      id: 2,
      title: "أساسيات JavaScript",
      lessons: [
        {
          id: 104,
          title: "العمليات الحسابية والمنطقية",
          duration: "42:10",
          isCompleted: false,
        },
        {
          id: 105,
          title: "هياكل التحكم: الشروط والحلقات",
          duration: "50:30",
          isCompleted: false,
        },
        {
          id: 106,
          title: "الدوال في JavaScript",
          duration: "55:20",
          isCompleted: false,
        },
      ],
    },
  ],
  comments: [
    {
      id: 1,
      user: "سارة أحمد",
      userImage: "https://picsum.photos/100/100?person=1",
      comment:
        "شرح ممتاز! استفدت كثيراً من هذا الدرس في فهم أساسيات JavaScript بشكل واضح.",
      date: "منذ 3 أيام",
      replies: [
        {
          id: 101,
          user: "أحمد محمد",
          userImage: "https://picsum.photos/100/100?person=1",
          comment: "شكراً لك سارة، سعيد أن الشرح كان مفيداً!",
          date: "منذ يومين",
        },
      ],
    },
    {
      id: 2,
      user: "محمد علي",
      userImage: "https://picsum.photos/100/100?person=1",
      comment: "هل يمكن توضيح الفرق بين let و const بشكل أكبر؟",
      date: "منذ 5 أيام",
      replies: [],
    },
  ],
};

const VideoPlayer = ({
  videoUrl,
  poster,
}: {
  videoUrl: string;
  poster: string;
}) => {
  const source = {
    type: "video",
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
        size: 1080,
      },
    ],
    poster: poster,
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video">
      <Plyr source={source as never} />
    </div>
  );
};
const LessonPage = ({ lessonId }: { lessonId: string }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Mark lesson as completed handler
  const handleMarkAsCompleted = () => {
    setMarkAsCompleted(!markAsCompleted);
    // Here you would normally update the database
  };

  // Navigate to the next lesson
  const handleNextLesson = () => {
    router.push(
      `/course/${lessonData.courseId}/lessons/${lessonData.nextLesson.id}`
    );
  };

  // Navigate to the previous lesson
  const handlePrevLesson = () => {
    router.push(
      `/course/${lessonData.courseId}/lessons/${lessonData.prevLesson.id}`
    );
  };

  // Handle comment submission
  const handleCommentSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // In a real application, you would send this comment to your API
    console.log("Submitting comment:", newComment);

    // Clear the comment field
    setNewComment("");

    // For demo purposes, you could add the comment locally
    // This would be replaced with API response data in a real app
    // setComments([...comments, { /* new comment object */ }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm py-3 px-4 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center text-gray-700 hover:text-yellow-500 transition-colors"
        >
          <List size={20} className="ml-2" />
          <span className="hidden md:inline">محتوى الدورة</span>
        </button>

        <Link
          href={`/course/${lessonData.courseId}`}
          className="text-gray-800 font-bold hover:text-yellow-500 transition-colors"
        >
          {lessonData.course.title}
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4"></div>
          <button className="text-gray-700 hover:text-yellow-500 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex">
        {/* Course content sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out pt-16 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 lg:static lg:w-80`}
        >
          <div className="h-full overflow-y-auto pb-20">
            <div className="p-4 border-b">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <X size={20} />
              </button>
              <h3 className="font-bold text-lg text-gray-800 text-right">
                {lessonData.course.title}
              </h3>
              <div className="mt-2 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${lessonData.course.progress}%` }}
                  className="h-full bg-yellow-500"
                ></div>
              </div>
              <p className="text-gray-600 text-sm mt-1 text-right">
                {lessonData.course.progress}% مكتمل (
                {Math.round(
                  (lessonData.course.progress / 100) *
                    lessonData.course.totalLessons
                )}
                /{lessonData.course.totalLessons} درس)
              </p>
            </div>

            {lessonData.sections.map((section) => (
              <div key={section.id} className="border-b">
                <div className="p-4 bg-gray-50 font-bold text-gray-800 text-right">
                  {section.title}
                </div>
                <div>
                  {section.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/course/${lessonData.courseId}/lessons/${lesson.id}`}
                    >
                      <div
                        className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          `${lesson.id}` === lessonId ? "bg-yellow-50" : ""
                        } ${
                          lesson.isCompleted ? "text-gray-500" : "text-gray-800"
                        }`}
                      >
                        <span className="text-gray-600 text-sm">
                          {lesson.duration}
                        </span>
                        <div className="flex items-center text-right">
                          <span className="mx-2">{lesson.title}</span>
                          {lesson.isCompleted ? (
                            <CheckCircle size={18} className="text-green-500" />
                          ) : `${lesson.id}` === lessonId ? (
                            <PlayCircle size={18} className="text-yellow-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow pb-20 px-4 md:px-8 lg:pr-0 pt-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Video player */}
            <VideoPlayer
              videoUrl={lessonData.videoUrl}
              poster={lessonData.videoPoster}
            />

            {/* Lesson content */}
            <div className="text-right mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {lessonData.title}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {lessonData.description}
              </p>

              {/* Lesson navigation and mark as completed */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-3">
                  {lessonData.prevLesson && (
                    <button
                      onClick={handlePrevLesson}
                      className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      <ChevronRight className="ml-1" size={18} />
                      <span>الدرس السابق</span>
                    </button>
                  )}

                  {lessonData.nextLesson && (
                    <button
                      onClick={handleNextLesson}
                      className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      <span>الدرس التالي</span>
                      <ChevronLeft className="mr-1" size={18} />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleMarkAsCompleted}
                  className={`flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                    markAsCompleted
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  <CheckCircle size={18} className="ml-2" />
                  <span>{markAsCompleted ? "تم الإكمال" : "تحديد كمكتمل"}</span>
                </button>
              </div>

              {/* Resources */}
              {lessonData.resources.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    الموارد المرفقة
                  </h2>
                  <div className="space-y-3">
                    {lessonData.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <button className="text-yellow-500 hover:text-yellow-600 transition-colors">
                          <Download size={18} />
                        </button>
                        <div className="flex items-center">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {resource.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {resource.type.toUpperCase()} · {resource.size}
                            </p>
                          </div>
                          <div className="mr-3">
                            {resource.type === "pdf" ? (
                              <FileText size={24} className="text-red-500" />
                            ) : (
                              <Download size={24} className="text-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  مدرس الدورة
                </h2>
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">
                      {lessonData.instructor.name}
                    </h3>
                    <p className="text-gray-600">
                      {lessonData.instructor.title}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={lessonData.instructor.image}
                        alt={lessonData.instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  التعليقات ({lessonData.comments.length})
                </h2>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="mb-2">
                    <label
                      htmlFor="comment"
                      className="block text-gray-700 mb-1"
                    >
                      أضف تعليقاً
                    </label>
                    <textarea
                      id="comment"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700"
                      rows={3}
                      placeholder="اكتب تعليقك هنا..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      إرسال التعليق
                    </button>
                  </div>
                </form>

                <div className="space-y-6">
                  {lessonData.comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-4">
                      <div className="flex items-start mb-3">
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-500 text-sm">
                              {comment.date}
                            </span>
                            <div className="flex items-center">
                              <span className="font-bold text-gray-800">
                                {comment.user}
                              </span>
                              <div className="mr-2 relative w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={comment.userImage}
                                  alt={comment.user}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      </div>

                      {comment.replies.length > 0 && (
                        <div className="mr-8 space-y-3 mt-3">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-gray-500 text-sm">
                                  {reply.date}
                                </span>
                                <div className="flex items-center">
                                  <span className="font-bold text-gray-800">
                                    {reply.user}
                                  </span>
                                  <div className="mr-2 relative w-6 h-6 rounded-full overflow-hidden">
                                    <Image
                                      src={reply.userImage}
                                      alt={reply.user}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-end mt-2">
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
                          الرد على التعليق
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
