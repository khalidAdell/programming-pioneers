export interface Course {
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
}

export interface CourseFilterOptions {
  categories: string[];
  levels: string[];
  priceRanges: string[];
  ratings: number[];
}

export interface ActiveFiltersType {
  category: string | null;
  level: string | null;
  priceRange: string | null;
  rating: number | null;
}
