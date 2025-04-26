import Course from "@/app/components/course/Course";
import { authOptions } from "@/app/lib/next-auth";
import { getServerSession } from "next-auth";

const fetchCourseData = async ({ id }: { id: string }) => {
  const courseRes = await fetch(
    `https://programming-pioneers.vercel.app/api/course/${id}`,
    {
      cache: "no-store",
    }
  );

  return courseRes.json();
};
const fetchRelatedCourseData = async () => {
  const relatedCoursesRes = await fetch(
    `https://programming-pioneers.vercel.app/api/courses`,
    {
      cache: "no-store",
    }
  );
  return relatedCoursesRes.json();
};

const CoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const course = await fetchCourseData({ id });
  const relatedCourses = await fetchRelatedCourseData();

  return (
    <Course course={course} relatedCourses={relatedCourses} session={session} />
  );
};

export default CoursePage;
