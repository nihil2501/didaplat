import CourseProgressCards, {
  CourseProgressCardSkeleton
} from "./components/CourseProgressCards";

const courses = [
  {
    id: 1,
    title: "Test Title",
    description: "A test description.",
  },
  {
    id: 2,
    title: "Test Title",
    description: "A test description.",
  },
  {
    id: 3,
    title: "Test Title",
    description: "A test description.",
  },
  {
    id: 4,
    title: "Test Title",
    description: "A test description.",
  },
  {
    id: 5,
    title: "Test Title",
    description: "A test description.",
  },
];

// TODO: possibly refactor the re-use we set up here. Making N nonsense courses
// to satisfy some interface is strange, but I think it's also not a huge
// usability issue.
export default function ProgressLoading() {
  return <CourseProgressCards
    CardComponent={CourseProgressCardSkeleton}
    courses={courses}
  />;
};
