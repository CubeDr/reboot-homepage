
import Link from "next/link";
import Image from "next/image";

export default function OnlineClassIntroPage() {
  return (
    <div className="bg-gray-100">
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
              강의 보러가기
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              왜 리부트 온라인 클래스인가?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              안진욱 코치 노하우가 담긴 강의를 통해, 여러분의 배드민턴 실력은 한 단계 더 성장할 것입니다.
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 tablet:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">전문적인 코칭</h3>
              <p className="mt-4 text-gray-600">
                국가대표 출신 코치진이 직접 설계한 커리큘럼
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">
                체계적인 학습
              </h3>
              <p className="mt-4 text-gray-600">
                기초부터 고급 기술까지, 단계별 학습 콘텐츠
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">
                언제 어디서든
              </h3>
              <p className="mt-4 text-gray-600">
                PC, 모바일, 태블릿 등 모든 기기에서 수강 가능
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
