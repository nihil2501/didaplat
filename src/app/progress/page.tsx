import { getServerSession } from "@/lib/auth";
import CourseProgressCards from "./components/CourseProgressCards";
import { getCourses } from "./data";

export default async function Progress() {
  const session = await getServerSession();
  if (!session) return "Please log in to see your progress.";

  const courses = await getCourses();
  return <CourseProgressCards courses={courses} />;
};
