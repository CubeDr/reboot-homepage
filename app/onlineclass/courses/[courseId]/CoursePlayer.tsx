"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from 'next/link';
import { FaPlayCircle, FaCheckCircle, FaBars, FaAngleDoubleLeft, FaArrowLeft } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

// This is the interactive part of the page, now separated into a client component.

function VideoListItem({ video, isActive, onClick, isSidebarOpen }: { video: any, isActive: boolean, onClick: () => void, isSidebarOpen: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${isSidebarOpen ? 'w-full' : 'w-auto'} ${isActive ? "bg-blue-100" : "bg-white hover:bg-gray-50"}`}
        >
            <div className="flex items-center overflow-hidden">
                {video.completed ? (
                    <FaCheckCircle className={`${isSidebarOpen && 'mr-3'} flex-shrink-0 ${isActive ? "text-blue-600" : "text-green-500"}`} />
                ) : (
                    <FaPlayCircle className={`${isSidebarOpen && 'mr-3'} flex-shrink-0 ${isActive ? "text-blue-500" : "text-gray-300"}`} />
                )}
                {isSidebarOpen && <h3 className={`text-sm font-medium truncate ${isActive ? "text-blue-700" : "text-gray-800"}`}>{video.title}</h3>}
            </div>
            {isSidebarOpen && <span className={`text-xs ml-2 whitespace-nowrap ${isActive ? "text-blue-600" : "text-gray-500"}`}>{video.duration}</span>}
        </button>
    )
}

export default function CoursePlayer({ course }: { course: any }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const videoIdFromUrl = searchParams.get('videoId');
        if (videoIdFromUrl && course.videos.some((v: any) => v.id === videoIdFromUrl)) {
            setCurrentVideoId(videoIdFromUrl);
        } else if (course && course.videos.length > 0) {
            setCurrentVideoId(course.videos[0].id);
        }
    }, [searchParams, course]);

    const currentVideo = course.videos.find((v: any) => v.id === currentVideoId);

    const handleVideoSelect = (videoId: string) => {
        setCurrentVideoId(videoId);
        router.push(`/onlineclass/courses/${course.id}?videoId=${videoId}`, { scroll: false });
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`relative bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-80" : "w-20"}`}
            >
                <div className={`transition-opacity duration-200 ${isSidebarOpen ? "p-6 opacity-100" : "p-3 items-center opacity-0 h-0 overflow-hidden"}`}>
                    <Link href="/onlineclass/courses" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 mb-4">
                        <FaArrowLeft className="mr-2" />
                        모든 강의 목록으로
                    </Link>
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                        {course.title}
                    </h1>
                    <p className="text-sm text-gray-600 mb-6">
                        {course.description}
                    </p>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">커리큘럼</h2>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`p-2 rounded-md bg-transparent hover:bg-blue-50 filter-none hover:filter-none ${isSidebarOpen ? 'absolute top-5 right-4' : 'mx-auto mt-3 mb-4'}`}
                    aria-label="Toggle Sidebar"
                >
                    {isSidebarOpen ? <FaAngleDoubleLeft className="text-gray-600" /> : <FaBars className="text-gray-600" />}
                </button>

                <div className={`flex-1 overflow-y-auto space-y-2 ${isSidebarOpen ? 'px-6 pb-6' : 'px-3 flex flex-col items-center'}`}>
                    {course.videos.map((video: any) => (
                        <VideoListItem
                            key={video.id}
                            video={video}
                            isActive={video.id === currentVideoId}
                            onClick={() => handleVideoSelect(video.id)}
                            isSidebarOpen={isSidebarOpen}
                        />
                    ))}
                </div>
            </aside>

            {/* Main Content (Video Player) */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                {currentVideo ? (
                    <div className="aspect-[16/9] shadow-xl rounded-lg overflow-hidden max-w-6xl mx-auto bg-black">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                ) : (
                    <div className="aspect-[16/9] bg-black rounded-lg flex items-center justify-center max-w-6xl mx-auto">
                        <p className="text-white">영상을 선택해주세요.</p>
                    </div>
                )}
                <div className="mt-6 p-6 bg-white rounded-lg shadow-sm max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">{currentVideo?.title}</h2>
                    <div className="prose max-w-none text-gray-700">
                        <ReactMarkdown>{currentVideo?.markdownContent || ''}</ReactMarkdown>
                    </div>
                </div>
            </main>
        </div>
    );
}