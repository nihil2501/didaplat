import { redirect } from "next/navigation";
import { getCourse } from "../data";

interface CourseProgressProps {
  params: {
    id: string;
  };
};

export default async function CourseProgress({
  params: { id }
}: CourseProgressProps) {
  const course = await getCourse(+id);
  if (!course) redirect("/progress");

  return (
    <>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        {course.title}
      </h1>
      <p>{course.description}</p>
    </>
  )
};
