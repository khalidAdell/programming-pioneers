import Courses from "@/app/components/courses/Courses";

type Props = {
  params: Promise<{ filter: string }>;
};

const CoursesPage = async ({ params }: Props) => {
  const { filter } = await params;

  const res = await fetch("http://localhost:3000/api/courses", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const courses = await res.json();

  return <Courses courses={courses} filterParam={decodeURIComponent(filter)} />;
};

export default CoursesPage;
