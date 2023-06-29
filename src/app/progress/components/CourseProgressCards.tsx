import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export interface Course {
  id: number;
  title: string;
  description: string;
};

interface CourseProgressCardsProps {
  courses: Course[];
  CardComponent?: typeof CourseProgressCard;
};

export default function CourseProgressCards({
  courses,
  CardComponent = CourseProgressCard
}: CourseProgressCardsProps) {
  return (
    <div className="hidden items-start justify-center gap-6 rounded-lg md:grid
      lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          return <CardComponent
            key={course.id}
            course={course}
          />
        })}
    </div>
  );
};

interface CourseProgressCardProps {
  course: Course;
};

function CourseProgressCard({
  course
}: CourseProgressCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <BaseCourseProgressCard
        title={<>{course.title}</>}
        description={<>{course.description}</>}
      />
    </Link>
  );
};

export function CourseProgressCardSkeleton() {
  return (
    <BaseCourseProgressCard
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

interface BaseCourseProgressCardProps {
  title: JSX.Element;
  description: JSX.Element;
};

function BaseCourseProgressCard({
  title,
  description,
}: BaseCourseProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
