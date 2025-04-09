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

// Single Course

export interface SingleCourse {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  instructor: string;
  error: "";
  instructorTitle: string;
  instructorImage: string;
  level: string;
  imageUrl: string;
  students: number;
  objectives: string[];
  requirements: string[];
  rating: number;
  ratingCount: number;
  category: string;
  tags: string[];
  featured: boolean;
  recent: boolean;
  language: string;
  lastUpdate: string;
  sections: Section[];
  reviews: Review[];
}

interface Section {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isVideo: boolean;
  isFree: boolean;
}

interface Review {
  id: number;
  user: string;
  userImage: string;
  userTitle: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}
