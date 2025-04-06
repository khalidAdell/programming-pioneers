import { X } from "lucide-react";
import { ActiveFiltersType } from "../../types/courses";

interface ActiveFiltersDisplayProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: ActiveFiltersType;
  toggleFilter: (type: keyof ActiveFiltersType, value: string | number) => void;
  resetFilters: () => void;
}

export const ActiveFiltersDisplay = ({
  searchTerm,
  setSearchTerm,
  activeFilters,
  toggleFilter,
  resetFilters,
}: ActiveFiltersDisplayProps) => {
  const hasActiveFilters =
    activeFilters.category ||
    activeFilters.level ||
    activeFilters.priceRange ||
    activeFilters.rating ||
    searchTerm;

  if (!hasActiveFilters) return null;

  return (
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

      {activeFilters.category && (
        <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
          <span className="ml-1">{activeFilters.category}</span>
          <button
            onClick={() => toggleFilter("category", activeFilters.category!)}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {activeFilters.level && (
        <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
          <span className="ml-1">المستوى: {activeFilters.level}</span>
          <button onClick={() => toggleFilter("level", activeFilters.level!)}>
            <X size={14} />
          </button>
        </div>
      )}

      {activeFilters.priceRange && (
        <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
          <span className="ml-1">السعر: {activeFilters.priceRange}</span>
          <button
            onClick={() =>
              toggleFilter("priceRange", activeFilters.priceRange!)
            }
          >
            <X size={14} />
          </button>
        </div>
      )}

      {activeFilters.rating && (
        <div className="bg-yellow-100 text-yellow-700 rounded-lg px-3 py-1 text-sm flex items-center">
          <span className="ml-1">التقييم: {activeFilters.rating}★ وأكثر</span>
          <button onClick={() => toggleFilter("rating", activeFilters.rating!)}>
            <X size={14} />
          </button>
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="text-gray-500 hover:text-yellow-600 text-sm"
        >
          مسح الكل
        </button>
      )}
    </div>
  );
};
