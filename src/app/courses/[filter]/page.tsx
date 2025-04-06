import Courses from "@/app/components/courses/Courses";

type Props = {
  params: Promise<{ filter: string }>;
};

const CoursesPage = async ({ params }: Props) => {
  const { filter } = await params;

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
      <Courses courses={courses} filterParam={decodeURIComponent(filter)} />
    </div>
  );
};

export default CoursesPage;
