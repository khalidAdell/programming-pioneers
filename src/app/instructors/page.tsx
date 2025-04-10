import Instructors from "../components/instructors/Instructors";

const InstructorsPage = async () => {
  const res = await fetch(
    "https://programming-pioneers-p394.vercel.app//api/instructors",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch instructors");
  }

  const instructors = await res.json();

  return (
    <div>
      <Instructors instructors={instructors} />
    </div>
  );
};

export default InstructorsPage;
