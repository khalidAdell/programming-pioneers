import LessonPage from "@/app/components/lessons/LessonPage";

const LessonPageContainer = async ({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) => {
  const { lessonId } = await params;
  return <LessonPage lessonId={lessonId} />;
};

export default LessonPageContainer;
