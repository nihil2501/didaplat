import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "../../data";

type CourseDetailsProps = {
    course: Course;
};

export default function CourseProgressDetails({
  course
}: CourseDetailsProps) {
  return (
    <BaseCourseProgressDetails
      title={<>{course.title}</>}
      description={<>{course.description}</>}
    />
  );
};

export function CourseProgressDetailsSkeleton() {
  return (
    <BaseCourseProgressDetails
      title={
        <Skeleton className="h-8 w-[225px]" />
      }

      description={
        <div className="space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      }
    />
  );
};

interface BaseCourseProgressDetailsProps {
  title: JSX.Element;
  description: JSX.Element;
};

function BaseCourseProgressDetails({
  title,
  description,
}: BaseCourseProgressDetailsProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h1>
      <p>{description}</p>
    </>
  );
};
