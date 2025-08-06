'use client';

import Image from 'next/image';
import { useState, useRef, useLayoutEffect, forwardRef } from 'react';

function CatalogInfoItem({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className='text-base font-bold text-gray-800 mb-1.5'>{title}</h3>
      <ul className='space-y-1 text-xs text-gray-600'>
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

const TextContent = forwardRef<HTMLDivElement>(function TextContent(props, ref) {
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
    <div ref={ref} className='p-4 desktop:p-0 space-y-3'>
      <div>
        <h3 className='text-base font-bold text-gray-800 mb-1.5'>운영 시간</h3>
        <p className='text-xs text-gray-600 flex items-center'>
          <span className='mr-1.5 text-blue-600 font-semibold'>■</span>
          <span>주 1~2회, 회당 60~90분 (코치 1명 : 수강생 2~3명)</span>
        </p>
      </div>
      <CatalogInfoItem title='커리큘럼 구성' items={curriculumItems} />
      <CatalogInfoItem title='차별화 포인트' items={differentiationPoints} />
      <CatalogInfoItem title='추천 대상' items={recommendedFor} />
      <div>
        <h3 className='text-base font-bold text-gray-800 mb-1.5'>문의</h3>
        <p className='text-xs text-gray-600 flex items-center'>
          <span className='mr-1.5 text-blue-600 font-semibold'>■</span>
          <span>010-3105-6212</span>
        </p>
        <p className='text-xs text-gray-600 flex items-center'>
          <span className='mr-1.5 text-blue-600 font-semibold'>■</span>
          <span>인스타그램 @an_troke</span>
        </p>
      </div>
    </div>
  );
});

export default function Catalog() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | 'auto'>('auto');
  const textContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (textContentRef.current) {
      setCardHeight(textContentRef.current.scrollHeight + 16);
    }
  }, []);

  return (
    <section className='bg-gray-50 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h2 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
            레슨 안내
          </h2>
        </div>

        <div className='hidden desktop:flex flex-row gap-10 items-center'>
          <div className='w-2/5'>
            <div className='relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg'>
              <Image
                src='/catalog/0.jpg'
                alt='리부트 배드민턴 레슨'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
          <div className='w-3/5'>
            <TextContent />
          </div>
        </div>

        <div className='desktop:hidden'>
          <div
            className='scene w-full mx-auto'
            style={{ maxWidth: '400px', height: cardHeight }}
          >
            <div
              className={`card ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className='card__face card__face--front'>
                <div className='relative w-full h-full'>
                  <Image
                    src='/catalog/0.jpg'
                    alt='리부트 배드민턴 레슨'
                    layout='fill'
                    objectFit='cover'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-4 text-center'>
                    <p className='text-white text-xl font-bold'>리부트 레슨 안내</p>
                    <p className='text-white text-sm mt-2'>
                      자세히 보려면 터치하세요
                    </p>
                  </div>
                </div>
              </div>
              <div className='card__face card__face--back'>
                <TextContent ref={textContentRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
