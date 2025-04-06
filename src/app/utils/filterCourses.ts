// utils/filterUtils.ts
import { Course, ActiveFiltersType } from "../types/courses";

export const filterCourses = (
  courses: Course[],
  searchTerm: string,
  activeFilters: ActiveFiltersType
): Course[] => {
  let filtered = [...courses];

  // Apply search term
  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.title.toLowerCase().includes(lowerSearchTerm) ||
        course.description.toLowerCase().includes(lowerSearchTerm) ||
        course.instructor.toLowerCase().includes(lowerSearchTerm) ||
        course.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }

  // Apply category filter
  if (activeFilters.category) {
    filtered = filtered.filter(
      (course) => course.category === activeFilters.category
    );
  }

  // Apply level filter
  if (activeFilters.level) {
    filtered = filtered.filter(
      (course) => course.level === activeFilters.level
    );
  }

  // Apply price range filter
  if (activeFilters.priceRange) {
    switch (activeFilters.priceRange) {
      case "مجاني":
        filtered = filtered.filter((course) => course.price === "مجاني");
        break;
      case "أقل من $50":
        filtered = filtered.filter(
          (course) => course.price !== "مجاني" && parseFloat(course.price) < 50
        );
        break;
      case "$50 - $100":
        filtered = filtered.filter((course) => {
          const price = parseFloat(course.price);
          return price >= 50 && price <= 100;
        });
        break;
      case "أكثر من $100":
        filtered = filtered.filter(
          (course) =>
            course.price !== "مجاني" &&
            parseFloat(course.price.replace("$", "")) > 100
        );
        break;
    }
  }

  // Apply rating filter
  if (activeFilters.rating) {
    filtered = filtered.filter(
      (course) =>
        activeFilters.rating !== null &&
        Math.floor(course.rating) >= activeFilters.rating
    );
  }

  return filtered;
};
