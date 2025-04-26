import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SliderCards from "../SliderCards";

async function getRecentCourses() {
  const res = await fetch(
    `https://programming-pioneers.vercel.app/api/courses?recent=${true}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return res.json();
}
async function getfeaturedCourses() {
  const res = await fetch(
    `https://programming-pioneers.vercel.app/api/courses?featured=${true}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return res.json();
}

const SliderCourses = async () => {
  const [recentCourses, featuredCourses] = await Promise.all([
    getRecentCourses(),
    getfeaturedCourses(),
  ]);

  return (
    <div>
      {/* Featured Courses */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">الدورات المميزة</h2>
          <Link
            href="/courses"
            className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            عرض الكل
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="">
          <SliderCards cards={recentCourses} />
        </div>
      </section>

      {/* Latest Courses */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">أحدث الدورات</h2>
          <Link
            href="/courses"
            className="flex items-center text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            عرض الكل
            <ChevronLeft size={16} />
          </Link>
        </div>

        <div className="">
          <SliderCards cards={featuredCourses} />
        </div>
      </section>
    </div>
  );
};

export default SliderCourses;
