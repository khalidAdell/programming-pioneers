import Courses from "@/app/components/courses/Courses";

const CoursesPage = async ({
  params,
}: {
  params: {
    filter: string;
  };
}) => {
  const res = await fetch("http://localhost:3000/api/courses", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const courses = await res.json();

  return (
    <div>
      <Courses
        courses={courses}
        filterParam={decodeURIComponent(params.filter)}
      />
    </div>
  );
};

export default CoursesPage;
