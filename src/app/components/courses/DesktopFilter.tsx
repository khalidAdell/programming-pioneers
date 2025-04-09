import { CourseFilterOptions, ActiveFiltersType } from "../../types/courses";

interface DesktopFiltersProps {
  filterOptions: CourseFilterOptions;
  activeFilters: ActiveFiltersType;
  toggleFilter: (type: keyof ActiveFiltersType, value: string | number) => void;
  resetFilters: () => void;
}

export const DesktopFilters = ({
  filterOptions,
  activeFilters,
  toggleFilter,
  resetFilters,
}: DesktopFiltersProps) => {
  return (
    <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-sm h-fit sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">تصفية النتائج</h3>
        <button
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-yellow-600"
        >
          إعادة ضبط
        </button>
      </div>

      {/* Categories */}
      <div className="mb-4 border-b pb-3">
        <h4 className="font-bold text-sm mb-2 text-gray-400">التصنيفات</h4>
        <div className="space-y-2">
          {filterOptions.categories.map((category) => (
            <div key={category} className="flex items-center gap-2 ">
              <label className="flex items-center cursor-pointer w-full">
                <input
                  type="radio"
                  checked={activeFilters.category === category}
                  onChange={() => toggleFilter("category", category)}
                  className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                />
                <span className="text-gray-800 text-sm mr-2">{category}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div className="mb-4 border-b pb-3">
        <h4 className="font-bold text-sm mb-2 text-gray-400">المستويات</h4>
        <div className="space-y-2">
          {filterOptions.levels.map((level) => (
            <div key={level} className="flex items-center gap-2 ">
              <label className="flex items-center cursor-pointer w-full">
                <input
                  type="radio"
                  checked={activeFilters.level === level}
                  onChange={() => toggleFilter("level", level)}
                  className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                />
                <span className="text-gray-800 text-sm mr-2">{level}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4 border-b pb-3">
        <h4 className="font-bold text-sm mb-2 text-gray-400">السعر</h4>
        <div className="space-y-2">
          {filterOptions.priceRanges.map((range) => (
            <div key={range} className="flex items-center gap-2 ">
              <label className="flex items-center cursor-pointer w-full">
                <input
                  type="radio"
                  checked={activeFilters.priceRange === range}
                  onChange={() => toggleFilter("priceRange", range)}
                  className="form-checkbox h-4 w-4 text-yellow-500 rounded"
                />
                <span className="text-gray-800 text-sm mr-2">{range}</span>
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
                    {rating} <span className="text-yellow-400">★</span> وأعلى
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
