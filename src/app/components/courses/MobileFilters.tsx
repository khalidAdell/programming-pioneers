import { useState } from "react";
import { Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { CourseFilterOptions, ActiveFiltersType } from "../../types/courses";

interface MobileFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filterOptions: CourseFilterOptions;
  activeFilters: ActiveFiltersType;
  toggleFilter: (type: keyof ActiveFiltersType, value: string | number) => void;
  resetFilters: () => void;
  filteredCoursesCount: number;
}

export const MobileFilters = ({
  showFilters,
  setShowFilters,
  filterOptions,
  activeFilters,
  toggleFilter,
  resetFilters,
  filteredCoursesCount,
}: MobileFiltersProps) => {
  return (
    <>
      {/* Mobile Filters Bar */}
      <div className="md:hidden flex items-center justify-between mb-4 bg-white rounded-lg p-3 shadow-sm">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-gray-700 font-medium"
        >
          <Filter size={16} className="ml-1" />
          تصفية
        </button>

        <div className="text-gray-700">{filteredCoursesCount} دورة</div>

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
            <button onClick={resetFilters} className="text-xs text-yellow-600">
              إعادة ضبط
            </button>
          </div>

          {/* Accordion filters for mobile */}
          <Accordion
            title="التصنيفات"
            items={filterOptions.categories}
            activeItem={activeFilters.category}
            onToggle={(item) => toggleFilter("category", item)}
          />

          <Accordion
            title="المستويات"
            items={filterOptions.levels}
            activeItem={activeFilters.level}
            onToggle={(item) => toggleFilter("level", item)}
          />

          <Accordion
            title="السعر"
            items={filterOptions.priceRanges}
            activeItem={activeFilters.priceRange}
            onToggle={(item) => toggleFilter("priceRange", item)}
          />

          <div className="mt-4">
            <h4 className="font-bold text-sm mb-2 text-gray-400">التقييم</h4>
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
    </>
  );
};

interface AccordionProps {
  title: string;
  items: string[];
  activeItem: string | number | null;
  onToggle: (item: string) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  items,
  activeItem,
  onToggle,
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
                  type="checkbox"
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
