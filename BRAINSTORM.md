domain
  materials
    videos
    articles

  tasks
    readings
    assessments
    projects
    notes

  lessons
  courses
  series

app
  explore
  create
  progress

* publish to move from `create` to `progress`?
* scheduling

schema
  users
    id (primary_key, foreign_key: course_owners.id)

  series
    id (primary_key, foreign_key: course_owners.id)
    user_id (foreign_key: users.id)

  course_owners
    id (primary_key, foreign_key: lesson_owners.id)

  courses
    id (primary_key, foreign_key: lesson_owners.id)
    course_owner_id (foreign_key: course_owners.id)

  lesson_owners
    id (primary_key)

  lessons
    id (primary_key)
    lesson_owner_id (foreign_key: lesson_owners.id)
