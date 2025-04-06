"use client";
import { useState, useEffect, useRef } from "react";
import { Metadata } from "next";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { HeroBanner } from "./HeroBanner";
import { MobileFilters } from "./MobileFilters";
import { DesktopFilters } from "./DesktopFilter";
import { ActiveFiltersDisplay } from "./ActiveFiltersDisplay";
import { CoursesGrid } from "./CoursesGrid";
import { filterCourses } from "../../utils/filterCourses";
import {
  CourseFilterOptions,
  ActiveFiltersType,
  Course,
} from "../../types/courses";

export const metadata: Metadata = {
  title: "دورات رواد",
};

interface CoursesProps {
  courses: Course[];
  filterParam?: string | null;
}

const Courses = ({ courses, filterParam = null }: CoursesProps) => {
  const [pagesNum, setPagesNum] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [paginationCourses, setPaginationCourses] =
    useState<Course[]>(filteredCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFiltersType>({
    category: filterParam,
    level: null,
    priceRange: null,
    rating: null,
  });

  const filtersRef = useRef<HTMLDivElement>(null);

  // Available filter options
  const filterOptions: CourseFilterOptions = {
    categories: [
      "تطوير الويب",
      "الذكاء الاصطناعي",
      "تطبيقات الجوال",
      "قواعد البيانات",
      "التصميم",
      "التسويق",
    ],
    levels: ["مبتدئ", "متوسط", "متقدم"],
    priceRanges: ["مجاني", "أقل من 50$", "$50 - $100", "أكثر من $100"],
    ratings: [5, 4, 3, 2, 1],
  };

  // Filter courses when search term or filters change
  useEffect(() => {
    setActivePage(1);
    setFilteredCourses(filterCourses(courses, searchTerm, activeFilters));
  }, [searchTerm, activeFilters, courses]);

  // Update pagination when page or filtered courses change
  useEffect(() => {
    const startIndex = (activePage - 1) * 6;
    const endIndex = startIndex + 6;

    setPaginationCourses(filteredCourses.slice(startIndex, endIndex));
    setPagesNum(Math.ceil(filteredCourses.length / 6));
    if (filtersRef.current) {
      const topPosition =
        filtersRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        150;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  }, [activePage, filteredCourses]);

  // Toggle a specific filter
  const toggleFilter = (
    type: keyof ActiveFiltersType,
    value: string | number
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      category: null,
      level: null,
      priceRange: null,
      rating: null,
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <HeroBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          <DesktopFilters
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />

          <div className="flex-grow" ref={filtersRef}>
            <MobileFilters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
              resetFilters={resetFilters}
              filteredCoursesCount={filteredCourses.length}
            />

            <ActiveFiltersDisplay
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
              resetFilters={resetFilters}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {filteredCourses.length > 0
                  ? `${filteredCourses.length} دورة متاحة`
                  : "لا توجد دورات متطابقة مع معايير البحث"}
              </h2>
              {filteredCourses.length > 0 && (
                <p className="text-gray-600">
                  تصفح دوراتنا المتنوعة واختر ما يناسب احتياجاتك ومستواك
                </p>
              )}
            </div>

            <CoursesGrid
              paginationCourses={paginationCourses}
              resetFilters={resetFilters}
            />

            {/* Pagination - Simple for now */}
            {courses.length > 6 && (
              <div className="flex justify-center mt-10">
                <div className="flex gap-2">
                  {Array.from({ length: pagesNum }, (_, page) => (
                    <button
                      key={page + 1}
                      onClick={() => {
                        setActivePage(page + 1);
                      }}
                      className={`cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center ${
                        page + 1 == activePage
                          ? "bg-yellow-500 text-white"
                          : "bg-white text-gray-700 hover:bg-yellow-100"
                      }
              }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
