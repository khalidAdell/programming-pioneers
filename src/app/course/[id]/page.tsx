import Course from "@/app/components/course/Course";

const fetchCourseData = async ({ id }: { id: string }) => {
  const courseRes = await fetch(
    `https://programming-pioneers-p394.vercel.app/api/course/${id}`,
    {
      cache: "no-store",
    }
  );

  return courseRes.json();
};
const fetchRelatedCourseData = async () => {
  const relatedCoursesRes = await fetch(
    `https://programming-pioneers-p394.vercel.app/api/courses`,
    {
      cache: "no-store",
    }
  );
  return relatedCoursesRes.json();
};
const CoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const course = await fetchCourseData({ id });
  const relatedCourses = await fetchRelatedCourseData();

  return <Course course={course} relatedCourses={relatedCourses} />;
};

export default CoursePage;
