import { BookOpen, Clock, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CourseProps {
  course: {
    id: number;
    title: string;
    description: string;
    duration: string;
    price: string;
    instructor: string;
    level: string;
    imageUrl: string;
    students: number;
    rating: number;
    category: string;
    tags: string[];
  };
}

const CourseCard = ({ course }: CourseProps) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Course image */}
      <div className="relative h-48 w-full">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />

        {/* Price tag */}
        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
          {course.price} {+course.price > 0 && "دولار"}
        </div>

        {/* Category tag */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-yellow-600 px-3 py-1 rounded-lg text-sm">
          {course.category}
        </div>
      </div>

      {/* Course content */}
      <div className="p-4 flex-grow flex flex-col text-right">
        <div className="mb-2 flex items-center justify-end">
          <span className="text-sm text-gray-500">{course.level}</span>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 ml-1">{course.rating}</span>
            <Star size={14} className="text-amber-500" fill="currentColor" />
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

        <div className="mt-auto">
          {/* Instructor info */}
          <p className="text-sm text-gray-700 mb-3">{course.instructor}</p>

          {/* Course meta */}
          <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
            <div className="flex items-center">
              <span className="ml-1">{course.students}</span>
              <Users size={14} />
            </div>
            <div className="flex items-center">
              <span className="ml-1">{course.duration}</span>
              <Clock size={14} />
            </div>
            <div className="flex items-center">
              <span className="ml-1">{course.tags?.length || 0}</span>
              <BookOpen size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      <Link
        href={`/course/${course.id}`}
        className="bg-slate-100 hover:bg-slate-200 text-yellow-600 font-medium text-center py-3 block transition-colors"
      >
        عرض الدورة
      </Link>
    </div>
  );
};

export default CourseCard;
