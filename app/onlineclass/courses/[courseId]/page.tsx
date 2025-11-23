
import { courseSections } from "../../data";
import CoursePlayer from "./CoursePlayer";

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
    const courses = courseSections.flatMap(section => section.courses);
    return courses.map(course => ({
        courseId: course.id,
    }));
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;

  // Find the course from the mock data
  const course = courseSections
    .flatMap((section) => section.courses)
    .find((c) => c.id === courseId);

  if (!course) {
    // This can be a proper 404 page in a real app
    return <div className="text-center p-8">강의를 찾을 수 없습니다.</div>;
  }

  // The server component fetches the data and passes it to the client component.
  return <CoursePlayer course={course} />;
}
