import { redirect } from "next/navigation";
import { getCourse } from "../data";
import CourseProgressDetails from "./components/CourseProgressDetails";

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

  return <CourseProgressDetails course={course} />
};
