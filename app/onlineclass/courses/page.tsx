import CourseCard from "../CourseCard";
import { courseSections } from "../data";

export default function OnlineClassCoursesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 tablet:p-6 desktop:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl desktop:text-4xl font-bold text-gray-800 mb-8">
          전체 강의 목록
        </h1>
        <div className="space-y-12">
          {courseSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                {section.title}
              </h2>
              {section.courses.length > 0 ? (
                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 desktop:gap-8">
                  {section.courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">해당 주제의 강의가 아직 없습니다. 곧 추가될 예정입니다!</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
