// components/courses/CoursesGrid.tsx
import React from "react";
import CourseCard from "../CourseCard";
import { Course } from "../../types/courses";

interface CoursesGridProps {
  paginationCourses: Course[];
  resetFilters: () => void;
}

export const CoursesGrid = ({
  paginationCourses,
  resetFilters,
}: CoursesGridProps) => {
  if (false) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
      </div>
    );
  }

  if (paginationCourses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">😔</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          لم يتم العثور على دورات
        </h3>
        <p className="text-gray-600 mb-6">
          جرب تغيير معايير البحث أو إزالة بعض الفلاتر للحصول على نتائج أكثر
        </p>
        <button
          onClick={resetFilters}
          className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
        >
          إعادة ضبط الفلاتر
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginationCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;
