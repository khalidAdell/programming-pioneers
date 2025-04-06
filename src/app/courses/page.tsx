import Courses from "../components/courses/Courses";

const CoursesPage = async () => {
  const res = await fetch(
    "https://programming-pioneers-p394.vercel.app/api/courses",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const courses = await res.json();

  return (
    <div>
      <Courses courses={courses} />
    </div>
  );
};

export default CoursesPage;
