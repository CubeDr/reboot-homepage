import CourseCard from "../CourseCard";

// Mock data for the online courses, structured by skill-based sections
const courseSections = [
  {
    title: "스트로크",
    courses: [
      {
        id: "1",
        title: "배드민턴 기본기",
        description: "기본 스트로크, 풋워크, 그리고 경기 규칙을 마스터하세요.",
        thumbnail: "/catalog/0.jpg",
        totalVideos: 10,
        completedVideos: 3,
        difficulty: "초급",
      },
      {
        id: "2",
        title: "고급 스매시 기술",
        description: "강력하고 정확한 스매시를 구사하는 법을 배우세요.",
        thumbnail: "/catalog/0.jpg",
        totalVideos: 8,
        completedVideos: 0,
        difficulty: "중급",
      },
    ],
  },
  {
    title: "풋워크 & 수비",
    courses: [
      {
        id: "3",
        title: "수비 풋워크 훈련",
        description: "이 훈련을 통해 코트 커버리지와 민첩성을 향상시키세요.",
        thumbnail: "/catalog/0.jpg",
        totalVideos: 12,
        completedVideos: 12,
        difficulty: "중급",
      },
    ],
  },
  {
    title: "서브 & 리시브",
    courses: [],
  },
  {
    title: "로테이션 & 전술",
    courses: [],
  }
];

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
