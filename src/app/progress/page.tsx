import { getServerSession } from "@/lib/auth";
import CourseProgressCard, { Course } from "./components/CourseProgressCard";

async function getCourses() {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
      image: "https://github.com/identicons/app/oauth_app/2243746",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
      image: "https://github.com/identicons/app/oauth_app/2243746",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
      image: "https://github.com/identicons/app/oauth_app/2243746",
    },
    {
      id: 123,
      title: "Course Title",
      description: "A course description.",
      image: "https://github.com/identicons/app/oauth_app/2243746",
    },
  ] as Course[];
};

export default async function Progress() {
  const session = await getServerSession();
  if (!session) return "Please log in."

  const courses = await getCourses();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-normal tracking-tight">Progress</h2>
      </div>

      <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseProgressCard course={course} />
        ))}
      </div>
    </>
  );
};
