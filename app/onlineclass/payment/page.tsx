
import Link from "next/link";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          수강신청 및 결제
        </h1>
        <div className="bg-gray-100 rounded-lg p-6 my-6">
          <h2 className="text-lg font-semibold text-gray-900">
            리부트 온라인 클래스 전체 수강권
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            모든 강의 무제한 수강
          </p>
          <p className="text-3xl font-extrabold text-gray-900 my-4">
            월 ₩29,900
          </p>
        </div>
        <div className="text-sm text-gray-500 mb-6">
          <p>결제 정보 제공 및 이용 약관에 동의합니다.</p>
        </div>
        <Link
          href="/onlineclass/courses"
          className="w-full inline-block bg-[#03C75A] text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
        >
          네이버페이로 결제하기
        </Link>
      </div>
    </main>
  );
}
