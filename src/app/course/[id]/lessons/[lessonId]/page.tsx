import LessonPage from "@/app/components/lessons/LessonPage";

const LessonPageContainer = async ({
  params,
}: {
  params: { lessonId: string };
}) => {
  const { lessonId } = params;
  return <LessonPage lessonId={lessonId} />;
};

export default LessonPageContainer;
