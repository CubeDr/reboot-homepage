'use client';

import React, { useState, useEffect } from 'react';

// Define the structure for a single page's content
interface PageData {
  imageUrl: string;
  title: string;
  description: string;
}

// Create an array of data for the book's content
const bookData: PageData[] = Array.from({ length: 5 }, (_, i) => ({
  imageUrl: `https://placehold.co/600x800/e2e8f0/4a5568?text=Product+${i + 1}`,
  title: `Catalog Entry ${i + 1}`,
  description: `This is the detailed description for product ${i + 1}. It highlights the key features, materials, and unique design philosophy.`,
}));

// A flattened list of single pages for mobile view
const flatPages = bookData.flatMap(spread => [
  { type: 'image' as const, data: spread },
  { type: 'text' as const, data: spread },
]);

function Catalog(): JSX.Element {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 680);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset index when view mode changes to prevent out-of-bounds errors
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [isSmallScreen]);

  const totalPages = isSmallScreen ? flatPages.length : bookData.length;

  const handlePrevPage = (): void => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = (): void => {
    setCurrentPageIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const pageNumber = Number(e.target.value);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPageIndex(pageNumber - 1);
    }
  };

  // Get the data for the current page, ensuring it exists
  const currentSpreadData = bookData[currentPageIndex];
  const currentFlatPageData = flatPages[currentPageIndex];

  const largeScreenView = currentSpreadData ? (
    <div className='flex flex-row bg-white rounded-lg shadow-2xl overflow-hidden aspect-[2/1.2]'>
      {/* Left Page: Image */}
      <div className='w-1/2 flex-shrink-0'>
        <img
          className='object-cover w-full h-full'
          src={currentSpreadData.imageUrl}
          alt={currentSpreadData.title}
        />
      </div>
      {/* Right Page: Text */}
      <div className='w-1/2 flex-shrink-0 p-6 md:p-10 flex flex-col overflow-y-auto'>
        <div className='flex-grow'>
          <h2 className='text-xl md:text-3xl font-bold text-gray-800 mb-4'>
            {currentSpreadData.title}
          </h2>
          <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
            {currentSpreadData.description}
          </p>
        </div>
        <div className='mt-6'>
          <button className='bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm md:text-base focus:outline-none'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const smallScreenView = currentFlatPageData ? (
    <div className='bg-white rounded-lg shadow-2xl overflow-hidden aspect-[9/14] max-w-sm mx-auto'>
      {currentFlatPageData.type === 'image' ? (
        <img
          className='object-cover w-full h-full'
          src={currentFlatPageData.data.imageUrl}
          alt={currentFlatPageData.data.title}
        />
      ) : (
        <div className='p-8 flex flex-col overflow-y-auto h-full'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            {currentFlatPageData.data.title}
          </h2>
          <p className='text-base text-gray-600 leading-relaxed'>
            {currentFlatPageData.data.description}
          </p>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div className='max-w-5xl mx-auto my-8 font-sans p-4'>
      {/* Book Container */}
      {isSmallScreen ? smallScreenView : largeScreenView}

      {/* Paging Control */}
      <div className='flex justify-center items-center mt-8 space-x-4 text-gray-700'>
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className='p-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path></svg>
        </button>
        <div className='flex items-baseline space-x-2'>
          <input
            type='number'
            value={currentPageIndex + 1}
            onChange={handlePageInputChange}
            className='w-12 text-center bg-gray-50 border border-gray-300 rounded-md py-1 focus:outline-none'
            aria-label='Current Page'
          />
          <span className='text-gray-500'>/ {totalPages}</span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPageIndex === totalPages - 1}
          className='p-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path></svg>
        </button>
      </div>
    </div>
  );
}

export default Catalog;
