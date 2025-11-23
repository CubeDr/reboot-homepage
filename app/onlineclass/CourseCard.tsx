
import Link from "next/link";
import FittedImage from "../components/FittedImage";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  totalVideos: number;
  completedVideos: number;
  difficulty: "초급" | "중급" | "고급";
}

interface CourseCardProps {
  course: Course;
}

const difficultyColors = {
  초급: "bg-blue-500",
  중급: "bg-green-500",
  고급: "bg-red-500",
};

export default function CourseCard({ course }: CourseCardProps) {
  const progressPercentage =
    course.totalVideos > 0
      ? (course.completedVideos / course.totalVideos) * 100
      : 0;

  return (
    <Link href={`/onlineclass/courses/${course.id}`}>
      <div className="relative rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out w-full aspect-[16/9]">
        <FittedImage
          src={course.thumbnail}
          alt={course.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <span
          className={`absolute top-3 right-3 whitespace-nowrap inline-block px-2.5 py-1.5 text-xs font-semibold text-white rounded-full ${
            difficultyColors[course.difficulty]
          }`}
        >
          {course.difficulty}
        </span>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex justify-between items-center text-white mb-1">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-xs text-gray-200">
              {course.completedVideos} / {course.totalVideos}
            </p>
          </div>
          <div className="w-full bg-gray-200/50 rounded-full h-1.5">
            <div
              className="bg-blue-400 h-1.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
