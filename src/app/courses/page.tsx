import Courses from "@/app/components/courses/Courses";

const CoursesPage = async () => {
  const res = await fetch("http://localhost:3000/api/courses", {
    cache: "no-store",
  });

  if (!res.ok) {
    // هنا ممكن تحط handling بسيط للأخطاء
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
