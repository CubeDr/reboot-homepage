function VideoItemSkeleton() {
  return (
    <div className='flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='h-36 w-64 flex-shrink-0 bg-gray-200 dark:bg-gray-700 md:h-40 md:w-72'></div>
      <div className='flex flex-col justify-center p-4'>
        <div className='h-6 w-5/6 rounded bg-gray-200 dark:bg-gray-700'></div>
        <div className='mt-3 space-y-2'>
          <div className='h-4 w-full rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
    </div>
  );
}

export default VideoItemSkeleton;
