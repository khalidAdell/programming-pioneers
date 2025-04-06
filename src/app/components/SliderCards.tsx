"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Course } from "../types/courses";
import CourseCard from "./CourseCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SliderCards = ({ cards }: { cards: Course[] }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative">
      {/* Custom Arrows */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 disabled:bg-gray-100 cursor-pointer disabled:cursor-default bg-white disabled:text-gray-400 text-gray-800 shadow-md p-2 rounded-full hover:bg-yellow-100 transition"
      >
        <ChevronRight size={20} />
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 disabled:bg-gray-100 cursor-pointer disabled:cursor-default bg-white disabled:text-gray-400 text-gray-800 shadow-md p-2 rounded-full hover:bg-yellow-100 transition"
      >
        <ChevronLeft size={20} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((course: Course) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCards;
