import type { Metadata } from 'next';
import VideoItem from './VideoItem';

export const metadata: Metadata = {
  title: '리부트 배드민턴 | 레슨 영상',
  description: '리부트 배드민턴의 유용한 레슨 영상들을 만나보세요.',
};

interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
    };
    resourceId: {
      videoId: string;
    };
  };
}

async function getVideoDuration(videoId: string): Promise<string> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const VIDEO_API_URL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;

  try {
    const res = await fetch(VIDEO_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch video details:', await res.json());
      return '00:00';
    }

    const data = await res.json();
    const durationIso = data.items[0]?.contentDetails?.duration;

    if (durationIso) {
      const match = durationIso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;

      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
    return '00:00';
  } catch (error) {
    console.error('Error fetching video duration:', error);
    return '00:00';
  }
}

async function getYouTubePlaylistItems() {
  const PLAYLIST_ID = 'PLB8mtVIksti2C4E2jopmRJzok5Fa7_G1F';
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`;

  try {
    const res = await fetch(PLAYLIST_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch playlist:', await res.json());
      return [];
    }

    const data = await res.json();
    let items = data.items as YouTubePlaylistItem[];

    items.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime());

    const videosWithDuration = await Promise.all(
      items.map(async (item) => ({
        ...item,
        duration: await getVideoDuration(item.snippet.resourceId.videoId),
      }))
    );

    return videosWithDuration;
  } catch (error) {
    console.error('Error fetching from YouTube API:', error);
    return [];
  }
}

async function LessonVideoPage() {
  const videos = await getYouTubePlaylistItems();

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:py-16'>
        <div className='mb-8 text-center md:mb-12'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
            🏸 리부트 레슨 영상
          </h1>
          <p className='mt-3 text-lg text-gray-600 dark:text-gray-300'>
            리부트 배드민턴 코치님들의 전문적인 레슨 영상을 통해 실력을
            향상시켜 보세요.
          </p>
        </div>

        <div className='mx-auto max-w-4xl'>
          <div className='flex flex-col gap-6'>
            {videos && videos.length > 0 ? (
              videos.map((item) => <VideoItem key={item.id} item={item} />)
            ) : (
              <p className='text-center text-gray-500'>
                영상을 불러오는 데 실패했거나 재생목록이 비어있습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default LessonVideoPage;
