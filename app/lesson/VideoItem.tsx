import Image from 'next/image';

type VideoItemProps = {
  item: {
    id: string;
    duration: string;
    snippet: {
      title: string;
      description: string;
      resourceId: {
        videoId: string;
      };
      thumbnails: {
        maxres?: { url: string };
        high?: { url: string };
      };
    };
  };
};

function VideoItem({ item }: VideoItemProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
    >
      <div className='relative h-36 w-64 flex-shrink-0 md:h-40 md:w-72'>
        <Image
          src={item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || '/placeholder.jpg'}
          alt={`${item.snippet.title} 썸네일`}
          fill
          sizes='(max-width: 768px) 256px, 288px'
          style={{ objectFit: 'cover' }}
          className='bg-gray-200 dark:bg-gray-700'
        />
        <div className='absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white'>
          {item.duration || '00:00'}
        </div>
      </div>
      <div className='flex flex-col justify-center p-4'>
        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
          {item.snippet.title}
        </h3>
        <p className='mt-1 line-clamp-3 text-md text-gray-600 dark:text-gray-300'>
          {item.snippet.description}
        </p>
      </div>
    </a>
  );
}

export default VideoItem;
