import React from 'react';

export default function LessonDetailsPage() {
  return (
    <div className='w-full max-w-[1400px] mx-auto px-4 py-8 desktop:px-0 desktop:py-16 bg-[#f8f5f0]'>
      {/* 상단 제목 및 등록 버튼 */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold mb-6 text-gray-900 mobile:text-3xl tracking-tight'>
          REBOOT 배드민턴 레슨
        </h2>
        <a
          href='https://docs.google.com/forms/d/e/1FAIpQLSfSpwJI0X2mglcA5OBDHLOo4MWuL3A45T1Gtzmyl-YgUFRKcw/viewform?usp=sharing&ouid=108175387761759554020'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg mobile:w-full mobile:py-4'
        >
          레슨 등록하기
        </a>
      </div>

      {/* 레슨 정보 그리드: Mobile (1열) -> Desktop (3열) */}
      <div className='grid grid-cols-1 gap-6 desktop:grid-cols-3 desktop:gap-10 items-start'>

        {/* 새벽반 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            새벽반
          </h3>
          <ul className='space-y-4 text-gray-700 mobile:text-sm'>
            <li className='flex items-start'>
              <span className='font-bold mr-2'>✓</span>
              <div>
                <span className='font-semibold'>화요일/목요일 새벽반</span>
                <p className='text-sm text-gray-600 mt-1'>시간: AM 6:00 ~ AM 9:00 (총 3시간 자유+레슨 혼합 운영)</p>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='font-bold mr-2'>✓</span>
              <div>
                <span className='font-semibold'>수요일/금요일 새벽반</span>
                <p className='text-sm text-gray-600 mt-1'>시간: AM 6:00 ~ AM 9:00</p>
              </div>
            </li>
            <li className='pt-4 border-t border-gray-200'>
              <span className='block font-bold text-lg text-blue-600'>월 8회 / 레슨비용: 15만원</span>
            </li>
          </ul>
        </div>

        {/* 오전반 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            오전반
          </h3>
          <div className='space-y-4 text-gray-700 mobile:text-sm'>
            <p className='font-semibold mb-2'>오전반 시간표 (선택제 운영)</p>
            <div className='flex flex-wrap gap-2 mb-4'>
              {['월요일', '화요일', '수요일', '목요일', '금요일'].map((day) => (
                <span key={day} className='px-3 py-1 bg-gray-100 rounded-full text-sm font-medium'>
                  ✓ {day}
                </span>
              ))}
            </div>
            <ul className='space-y-2'>
              <li><span className='font-bold'>✓ 월 4회: 200,000원</span> (주 1회 고정)</li>
              <li><span className='font-bold'>✓ 월 8회: 390,000원</span> (주 2회 고정)</li>
            </ul>
            <div className='mt-6 p-4 bg-blue-50 rounded-xl'>
              <p className='font-bold text-blue-800 mb-1'>✓ 동반 할인 : 360,000원 (8회 기준)</p>
              <p className='text-sm text-blue-700'>두 명이 함께 등록 시 적용 (커플 / 친구 / 지인 동반 등록 가능)</p>
            </div>
          </div>
        </div>

        {/* 유소년반 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            유소년반
          </h3>
          <div className='space-y-4 text-gray-700 mobile:text-sm'>
            <p className='font-semibold mb-2'>유소년반 (Junior Academy)</p>
            <ul className='space-y-2 mb-4'>
              <li><span className='font-bold'>토요일:</span> 10:00 ~ 12:00 (2시간) / 12:00 ~ 14:00 (2시간)</li>
              <li><span className='font-bold'>일요일:</span> 1부: 12:00 ~ 14:00 / 2부: 14:00 ~ 16:00</li>
            </ul>
            <p className='font-bold text-lg text-blue-600 mb-4'>레슨비: 20만원 / 월 4회</p>
            <div className='text-sm bg-gray-50 p-4 rounded-xl'>
              <p className='mb-1'><span className='font-bold'>※ 방향성:</span> 단계별 기초 → 중급 → 실전 패턴</p>
              <p><span className='font-bold'>※ 특징:</span> 체력훈련 + 기본기 + 경기력 균형</p>
            </div>
          </div>
        </div>

        {/* 저녁반 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            저녁반
          </h3>
          <div className='space-y-4 text-gray-700 mobile:text-sm'>
            <p className='font-semibold mb-2'>저녁반 아카데미 (PM 18:00 ~ 22:30)</p>
            <p className='text-sm text-gray-600 mb-4'>✓ 회당 1시간 30분 / 월~금 운영</p>
            <ul className='space-y-2 mb-6 bg-gray-50 p-4 rounded-xl'>
              <li><span className='font-bold'>1부:</span> PM 6:00 ~ PM 7:30</li>
              <li><span className='font-bold'>2부:</span> PM 7:30 ~ PM 9:00</li>
              <li><span className='font-bold'>3부:</span> PM 9:00 ~ PM 10:30</li>
            </ul>
            <div className='space-y-2'>
              <p className='font-bold'>저녁반 레슨비용 안내</p>
              <ul className='list-disc list-inside space-y-1 pl-2'>
                <li>월 4회 = 20만원</li>
                <li>월 8회 = 39만원</li>
                <li>동반할인 36만원</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 주말반 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            주말반
          </h3>
          <div className='space-y-6 text-gray-700 mobile:text-sm'>
            <ul className='space-y-2'>
              <li><span className='font-bold'>토요일:</span> 10:00 ~ 16:00</li>
              <li><span className='font-bold'>일요일:</span> 10:00 ~ 16:00</li>
            </ul>
            <div className='bg-blue-50 p-4 rounded-xl'>
              <p className='font-bold text-lg mb-2'>2인 1조 레슨 프로그램</p>
              <ul className='space-y-1'>
                <li>2인 1조 레슨 가격: 24만원</li>
                <li>동반 할인: 22만원</li>
              </ul>
            </div>
            <div>
              <p className='font-bold mb-2'>특징</p>
              <ul className='list-disc list-inside space-y-1 text-sm pl-2'>
                <li>주말 집중 2인 1조</li>
                <li>개인교정 + 실전 패턴</li>
                <li>빠른 실력 향상 / 프리미엄 구성</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 개인레슨 */}
        <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition mobile:p-6'>
          <h3 className='text-3xl font-extrabold text-gray-900 mb-6 border-b-4 border-black pb-3 inline-block mobile:text-2xl'>
            개인레슨
          </h3>
          <div className='space-y-4 text-gray-700 mobile:text-sm'>
            <p className='font-semibold mb-4'>개인레슨 1시간 기준</p>
            <ul className='space-y-3 divide-y divide-gray-100'>
              <li className='flex justify-between items-center pt-2'><span>안진욱 코치</span><span className='font-bold'>회당 15만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>윤재원 코치</span><span className='font-bold'>회당 12만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>김태환 코치</span><span className='font-bold'>회당 12만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>김동현 코치</span><span className='font-bold'>회당 12만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>김아성 코치</span><span className='font-bold'>회당 12만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>이현승 코치</span><span className='font-bold'>회당 8만원</span></li>
              <li className='flex justify-between items-center pt-2'><span>이상무 코치</span><span className='font-bold'>회당 8만원</span></li>
              <li className='flex justify-between items-center pt-2 pb-2'><span>정상윤 코치</span><span className='font-bold'>회당 8만원</span></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
