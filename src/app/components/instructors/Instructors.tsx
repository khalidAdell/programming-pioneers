"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Users,
  BookOpen,
  Star,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  students: number;
  courses: number;
  rating: number;
  category: string;
  specialties: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface FilterOptions {
  specialties: string[];
  ratings: number[];
}

const Instructors = ({ instructors }: { instructors: Instructor[] }) => {
  const [pagesNum, setPagesNum] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [filteredInstructors, setFilteredInstructors] =
    useState<Instructor[]>(instructors);
  const [paginationInstructors, setPaginationInstructors] =
    useState<Instructor[]>(filteredInstructors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    specialty: string | null;
    rating: number | null;
  }>({
    specialty: null,
    rating: null,
  });

  const filtersRef = useRef<HTMLDivElement>(null);

  // Available filter options
  const filterOptions: FilterOptions = {
    specialties: [
      "تطوير الويب",
      "الذكاء الاصطناعي",
      "تطبيقات الجوال",
      "قواعد البيانات",
      "التصميم",
      "التسويق",
    ],
    ratings: [5, 4, 3, 2, 1],
  };

  useEffect(() => {
    setActivePage(1);
    let filtered = instructors;

    // Apply search term

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (instructor) =>
          instructor.category.toLowerCase().includes(lowerSearchTerm) ||
          instructor.name.toLowerCase().includes(lowerSearchTerm) ||
          instructor.title.toLowerCase().includes(lowerSearchTerm) ||
          instructor.bio.toLowerCase().includes(lowerSearchTerm) ||
          instructor.specialties.some((specialty) =>
            specialty.toLowerCase().includes(lowerSearchTerm)
          )
      );
    }

    // Apply filters
    if (activeFilters.specialty) {
      filtered = filtered.filter((instructor) =>
        instructor.category.includes(activeFilters.specialty!)
      );
    }
    if (activeFilters.rating) {
      filtered = filtered.filter(
        (instructor) =>
          activeFilters.rating !== null &&
          Math.floor(instructor.rating) >= activeFilters.rating
      );
    }

    setFilteredInstructors(filtered);
  }, [searchTerm, activeFilters, instructors]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 8;
    const endIndex = startIndex + 8;

    setPaginationInstructors(() =>
      filteredInstructors.slice(startIndex, endIndex)
    );
    setPagesNum(Math.ceil(filteredInstructors.length / 8));
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
  }, [activePage, filteredInstructors]);

  // Filter toggle
  const toggleFilter = (
    type: "specialty" | "rating",
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
      specialty: null,
      rating: null,
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Banner */}
      <div className="relative bg-linear-to-r from-indigo-900 to-purple-800">
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-10 md:py-16 relative">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              مدربو <span className="text-yellow-400">رواد</span> المحترفون
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              تعرّف على نخبة من المدربين المحترفين الذين يساعدونك على اكتساب
              المهارات وتحقيق أهدافك التعليمية
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن مدرب..."
                className="w-full px-6 py-4 rounded-xl text-gray-50 outline-none pr-12 text-lg border"
              />
              <Search
                className="absolute top-4 right-4 text-gray-500"
                size={24}
              />
            </div>

            {/* Popular specialties */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {filterOptions.specialties.slice(0, 5).map((specialty, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleFilter("specialty", specialty)}
                  className={`${
                    activeFilters.specialty === specialty
                      ? "bg-yellow-500 text-white"
                      : "bg-white/20 hover:bg-white/30 text-white"
                  } px-3 py-1.5 rounded-lg text-sm transition-colors`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block min-w-60 bg-white p-4 rounded-lg shadow-sm h-fit sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">تصفية النتائج</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-yellow-600"
              >
                إعادة ضبط
              </button>
            </div>

            {/* Specialties */}
            <div className="mb-4 border-b pb-3">
              <h4 className="font-bold text-sm mb-2 text-gray-400">التخصصات</h4>
              <div className="space-y-2">
                {filterOptions.specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-2 ">
                    <label className="flex items-center cursor-pointer w-full">
                      <input
                        type="radio"
                        checked={activeFilters.specialty === specialty}
                        onChange={() => toggleFilter("specialty", specialty)}
                        className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                      />
                      <span className="text-gray-800 text-sm mr-2">
                        {specialty}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <h4 className="font-bold text-sm mb-2 text-gray-400">التقييم</h4>
              <div className="space-y-2">
                {filterOptions.ratings.map((rating) => (
                  <div key={rating} className="flex items-center">
                    <label className="flex items-center cursor-pointer w-full">
                      <div className="flex items-center mr-2 gap-2">
                        <input
                          type="radio"
                          checked={activeFilters.rating === rating}
                          onChange={() => toggleFilter("rating", rating)}
                          className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                        />
                        <span className="text-gray-800 text-sm ml-1">
                          {rating} <span className="text-yellow-400">★</span>{" "}
                          وأعلى
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructors Section */}
          <div className="flex-grow" ref={filtersRef}>
            {/* Mobile Filters Bar */}
            <div className="md:hidden flex items-center justify-between mb-4 bg-white rounded-lg p-3 shadow-sm">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-gray-700 font-medium"
              >
                <Filter size={16} className="ml-1" />
                تصفية
              </button>

              <div className="text-gray-700">
                {filteredInstructors.length} مدرب
              </div>

              <div className="flex items-center">
                <SlidersHorizontal size={16} className="ml-1" />
                <span className="text-gray-700">ترتيب</span>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="md:hidden bg-white rounded-lg p-4 mb-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500"
                  >
                    <X size={18} />
                  </button>
                  <h3 className="font-bold text-gray-800">تصفية النتائج</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-yellow-600"
                  >
                    إعادة ضبط
                  </button>
                </div>

                {/* Accordion filters for mobile */}
                <Accordion
                  title="التخصصات"
                  items={filterOptions.specialties}
                  activeItem={activeFilters.specialty}
                  onToggle={(item) => toggleFilter("specialty", item)}
                />

                <div className="mt-4">
                  <h4 className="font-bold text-sm mb-2 text-gray-400">
                    التقييم
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => toggleFilter("rating", rating)}
                        className={`px-2 py-1 rounded text-sm flex items-center ${
                          activeFilters.rating === rating
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="ml-1">{rating}</span>
                        <span className="text-yellow-400">★</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {(activeFilters.specialty ||
              activeFilters.rating ||
              searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <span className="text-gray-700 ml-2">التصفية حسب:</span>

                {searchTerm && (
                  <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
                    <span className="ml-1">بحث: {searchTerm}</span>
                    <button onClick={() => setSearchTerm("")}>
                      <X size={14} />
                    </button>
                  </div>
                )}

                {activeFilters.specialty && (
                  <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
                    <span className="ml-1">{activeFilters.specialty}</span>
                    <button
                      onClick={() =>
                        toggleFilter("specialty", activeFilters.specialty!)
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {activeFilters.rating && (
                  <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
                    <span className="ml-1">
                      التقييم: {activeFilters.rating}★ وأكثر
                    </span>
                    <button
                      onClick={() =>
                        toggleFilter("rating", activeFilters.rating!)
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {(activeFilters.specialty ||
                  activeFilters.rating ||
                  searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="text-gray-500 hover:text-yellow-600 text-sm"
                  >
                    مسح الكل
                  </button>
                )}
              </div>
            )}

            {/* Results Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {filteredInstructors.length > 0
                  ? `${filteredInstructors.length} مدرب متاح`
                  : "لا يوجد مدربون متطابقون مع معايير البحث"}
              </h2>
              {filteredInstructors.length > 0 && (
                <p className="text-gray-600">
                  تعرف على المدربين المتميزين وتخصصاتهم والدورات التي يقدمونها
                </p>
              )}
            </div>

            {/* Loading State */}
            {paginationInstructors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginationInstructors.map((instructor) => (
                  <InstructorCard key={instructor.id} instructor={instructor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">😔</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  لم يتم العثور على مدربين
                </h3>
                <p className="text-gray-600 mb-6">
                  جرب تغيير معايير البحث أو إزالة بعض الفلاتر للحصول على نتائج
                  أكثر
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}

            {/* Pagination */}
            {instructors.length > 8 && (
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
    </div>
  );
};

// Simple accordion component for mobile filters
const Accordion = ({
  title,
  items,
  activeItem,
  onToggle,
}: {
  title: string;
  items: string[];
  activeItem: string | null;
  onToggle: (item: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b pb-2 mb-2">
      <button
        className="flex items-center justify-between w-full py-2 text-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-bold text-sm text-gray-400">{title}</h4>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="space-y-2 pt-2">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2 ">
              <label className="flex items-center cursor-pointer w-full">
                <input
                  type="radio"
                  checked={activeItem === item}
                  onChange={() => onToggle(item)}
                  className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                />
                <span className="text-gray-800 text-sm mr-2">{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Instructor Card Component
const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <Link href={`/instructors/${instructor.id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden">
              <Image
                src={instructor.imageUrl}
                alt={instructor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {instructor.name}
          </h3>
          <p className="text-gray-600 mb-3">{instructor.title}</p>

          <div className="flex justify-center flex-wrap gap-1 mb-4">
            {instructor.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {specialty}
              </span>
            ))}
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {instructor.bio}
          </p>

          <div className="flex justify-center items-center gap-4 text-gray-600 text-sm pt-4 border-t">
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{instructor.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{instructor.courses}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span>{instructor.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Instructors;
