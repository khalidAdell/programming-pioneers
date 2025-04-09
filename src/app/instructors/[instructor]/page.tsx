import Instructor from "@/app/components/instructor/Instructor";

const fetchInstructorData = async ({ instructor }: { instructor: string }) => {
  const instructorRes = await fetch(
    `https://programming-pioneers-p394.vercel.app/api/instructors/${instructor}`,
    {
      cache: "no-store",
    }
  );

  return instructorRes.json();
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

const InstructorPage = async ({
  params,
}: {
  params: Promise<{ instructor: string }>;
}) => {
  const { instructor } = await params;
  const instructorData = await fetchInstructorData({ instructor });
  const relatedCourses = await fetchRelatedCourseData();
  console.log(instructor);

  return <Instructor instructor={instructorData} courses={relatedCourses} />;
};

export default InstructorPage;
