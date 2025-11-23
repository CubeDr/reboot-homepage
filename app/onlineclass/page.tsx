
import Link from "next/link";
import Image from "next/image";
import { FaPlayCircle, FaListAlt, FaStar, FaUserGraduate } from "react-icons/fa";

const curriculumSections = [
    { title: "스트로크", icon: <FaPlayCircle/> },
    { title: "풋워크 & 수비", icon: <FaListAlt/> },
    { title: "서브 & 리시브", icon: <FaStar/> },
    { title: "로테이션 & 전술", icon: <FaUserGraduate/> }
]

export default function OnlineClassIntroPage() {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <Image
          src="/introduction.jpeg"
          alt="Online Class Introduction"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl desktop:text-6xl font-extrabold tracking-tight">
            리부트 온라인 클래스
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            언제 어디서든 최고의 코치들과 함께 배드민턴 실력을 향상시켜보세요.
            체계적인 커리큘럼을 통해 여러분의 잠재력을 깨워드립니다.
          </p>
          <div className="mt-8">
            <Link
              href="/onlineclass/payment"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              수강신청 하러가기
            </Link>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              왜 리부트 온라인 클래스인가?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              국가대표 출신 코치진의 노하우가 담긴 강의를 통해, 여러분의 배드민턴 실력은 한 단계 더 성장할 것입니다.
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 tablet:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">전문적인 코칭</h3>
              <p className="mt-4 text-gray-600">
                국가대표 출신 코치진이 직접 설계한 커리큘럼
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">
                체계적인 학습
              </h3>
              <p className="mt-4 text-gray-600">
                기초부터 고급 기술까지, 단계별 학습 콘텐츠
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">
                언제 어디서든
              </h3>
              <p className="mt-4 text-gray-600">
                PC, 모바일, 태블릿 등 모든 기기에서 수강 가능
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              전체 커리큘럼
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              기초부터 실전까지, 당신의 실력 향상을 위한 모든 것이 준비되어 있습니다.
            </p>
          </div>
          <div className="mt-12 grid gap-5 grid-cols-2 tablet:grid-cols-4">
            {curriculumSections.map(section => (
                <div key={section.title} className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-blue-500 text-4xl mb-3 inline-block">{section.icon}</div>
                    <h3 className="text-lg font-bold">{section.title}</h3>
                </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Introduction Video Section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              클래스 소개 영상
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              리부트 온라인 클래스가 어떻게 여러분의 실력을 향상시키는지 직접 확인해보세요.
            </p>
          </div>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="aspect-[16/9] shadow-lg rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}