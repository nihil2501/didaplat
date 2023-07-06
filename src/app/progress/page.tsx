import CourseProgressCards from "./components/CourseProgressCards";
import { getCourses } from "./data";

export default async function Progress() {
  const courses = await getCourses();
  return <CourseProgressCards courses={courses} />;
};
