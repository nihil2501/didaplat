export interface Course {
  id: number;
  title: string;
  description: string;
};

const courses: Map<Course["id"], Course> = new Map();

courses.set(1, {
  id: 1,
  title: "Course 1",
  description: "A course description.",
});

courses.set(2, {
  id: 2,
  title: "Course 2",
  description: "A course description.",
});

courses.set(3, {
  id: 3,
  title: "Course 3",
  description: "A course description.",
});

courses.set(4, {
  id: 4,
  title: "Course 4",
  description: "A course description.",
});

export async function getCourses() {
  return Array.from(courses.values());
};

export async function getCourse(id: number) {
  return courses.get(id);
};
