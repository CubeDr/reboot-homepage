'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CatalogInfoItem({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className='text-lg font-bold text-gray-800 mb-1.5'>{title}</h3>
      <ul className='space-y-1 text-sm text-gray-600'>
        {items.map((item, index) => (
          <li key={index} className='flex items-start'>
            <span className='mr-1.5 text-blue-600 font-semibold leading-tight'>
              ■
            </span>
            <span className='leading-tight'>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TextContent = React.forwardRef<HTMLDivElement>(function TextContent(
  props,
  ref
) {
  const curriculumItems = [
    '자세 및 스윙 교정: 그립, 타점, 스텝, 체중 이동',
    '기술 응용 훈련: 드라이브, 푸시, 언더, 하이클리어 등',
    '게임 전술·판단력 향상: 포지션, 셔틀 선택, 상황 판단 훈련',
  ];
  const differentiationPoints = [
    '통합된 커리큘럼 (코치 간 수업 차이 없음)',
    '교정 중심 진행',
    '실전 게임 연결 강화',
    '영상 피드백 및 자세 분석 제공',
  ];
  const recommendedFor = [
    '스윙, 자세 교정이 필요한 분',
    '게임 응용이 약한 중급자',
    '대회 준비 또는 실전 능력 향상 희망자',
  ];

  return (
    <div ref={ref} className='p-4 desktop:p-0 space-y-3 relative pb-8'>
      <CatalogInfoItem title='커리큘럼 구성' items={curriculumItems} />
      <CatalogInfoItem title='차별화 포인트' items={differentiationPoints} />
      <CatalogInfoItem title='추천 대상' items={recommendedFor} />
      <div className='absolute bottom-0 right-0'>
        <p className='text-xs text-gray-600'>
          <span className='font-bold'>문의:</span> 010-3105-6212 | 인스타그램
          @an_troke
        </p>
      </div>
    </div>
  );
});

export default function Lessons() {
  return (
    <section className='bg-gray-50 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
            레슨 프로그램 및 안내
          </h2>
          <p className='mt-4 text-lg text-gray-600 max-w-3xl mx-auto'>
            리부트 배드민턴 아카데미는 체계적인 커리큘럼과 전문 코치진의
            밀착 지도를 통해 여러분의 실력 향상을 책임집니다.
          </p>
        </div>

        <div className='w-full'>
          <TextContent />
        </div>

        <div className='mt-4 text-center border-t pt-10'>
          <h3 className='text-2xl font-bold text-gray-800 mb-6'>
            지금 바로 리부트와 함께 시작하세요
          </h3>
          <div className='flex flex-col mobile:flex-row justify-center items-center gap-4'>
            <Link
              href='/lesson-details'
              className='inline-block w-full mobile:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg'
            >
              레슨 상세 보기
            </Link>
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLSfSpwJI0X2mglcA5OBDHLOo4MWuL3A45T1Gtzmyl-YgUFRKcw/viewform?usp=sharing&ouid=108175387761759554020'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block w-full mobile:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg'
            >
              레슨 등록하기
            </a>
            <Link
              href='/lesson'
              className='inline-block w-full mobile:w-auto bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg'
            >
              레슨 영상 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
