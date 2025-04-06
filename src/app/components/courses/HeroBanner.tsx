// components/courses/HeroBanner.tsx
import React from "react";
import { Search } from "lucide-react";

interface HeroBannerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const HeroBanner = ({ searchTerm, setSearchTerm }: HeroBannerProps) => {
  const popularTags = [
    "React",
    "بايثون",
    "JavaScript",
    "تصميم UI/UX",
    "ذكاء اصطناعي",
  ];

  return (
    <div className="relative bg-linear-to-r from-indigo-900 to-purple-800">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-16 relative">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            دورات <span className="text-yellow-400">رواد</span> التعليمية
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الدورات عالية الجودة التي تساعدك على اكتساب
            المهارات الجديدة والتطور في مسارك المهني
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن دورة تعليمية..."
              className="w-full px-6 py-4 rounded-xl text-gray-300 outline-none pr-12 text-lg border"
            />
            <Search
              className="absolute top-4 right-4 text-gray-300"
              size={24}
            />
          </div>

          {/* Popular tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {popularTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(tag)}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
