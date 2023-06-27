import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
};

interface CourseProgressCardProps {
  course: Course;
};

export default function CourseProgressCard({
  course
}: CourseProgressCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            {course.title}
          </CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
