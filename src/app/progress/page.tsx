import { getServerSession } from "@/lib/auth";
import CourseProgressCards from "./components/CourseProgressCards";

async function getCourses() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
    },
  ];
};

export default async function Progress() {
  const session = await getServerSession();
  if (!session) return "Please log in to see your progress.";

  const courses = await getCourses();
  return <CourseProgressCards courses={courses} />;
};
