"use client";

import { Eye, Like } from "@/components/icons";
import { A } from "@/components/server";
import { VideoSkeleton } from "./skeletons";
import "@/styles/blocks.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function VideoFrame({ videoData, videoUrl }) {
  const [internalData, setInternalData] = useState(videoData || null);

  useEffect(() => {
    if (videoData) return; // skip fetch if data is provided
    async function fetchData() {
      const res = await fetch(`/api/youtube?url=${encodeURIComponent(videoUrl)}`);
      const data = await res.json();
      setInternalData(data);
    }
    if (videoUrl) fetchData();
  }, [videoUrl, videoData]);

  if (!internalData) return <VideoSkeleton />;

  const { title, thumbnail, views, likes, publishedAt } = internalData;

  function formatNumber(num) {
    if (num === null || num === undefined) return "";
    if (num < 1000) return num.toString();
    if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  return (
    <A className="video-frame v-12" target='_blank' href={
      videoUrl
        ? videoUrl
        : internalData.videoId
          ? `https://www.youtube.com/watch?v=${internalData.videoId}`
          : (videoData && videoData.videoId)
            ? `https://www.youtube.com/watch?v=${videoData.videoId}`
            : "#"
    }>
      <div className="thumbnail">
        <img src={thumbnail} alt="Thumbnail" />
      </div>
      <div className="v-4 h6">
        {title}
        <div className="h-16 b2 text-white-hover">
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
          <span className="h-4 center"><Eye />{formatNumber(views)}</span>
          <span className="h-4 center"><Like />{formatNumber(likes)}</span>
        </div>
      </div>
    </A>
  );
}

export function VideoList({ }) {
  const [videos, setVideos] = useState(null);
  const [videoDataList, setVideoDataList] = useState(null);

  useEffect(() => {
    async function fetchLatest() {
      const res = await fetch(`/api/youtube-latest?channelId=UCW2ilTxJ7lVsLw6Rn58EPVA`);
      const { videos } = await res.json();
      setVideos(videos);
    }
    fetchLatest();
  }, []);

  useEffect(() => {
    if (!videos) return;
    async function fetchAllVideoData() {
      const results = await Promise.all(
        videos.map(video =>
          fetch(`/api/youtube?url=https://www.youtube.com/watch?v=${video.videoId}`)
            .then(res => res.json())
        )
      );
      setVideoDataList(results);
    }
    fetchAllVideoData();
  }, [videos]);

  if (!videoDataList) {
    // Render skeletons for all videos
    return (
      <div className="video-list">
        {[...Array(4)].map((_, i) => <VideoSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="video-list">
      {videoDataList.map((data, i) => (
        <VideoFrame key={data.videoId || i} videoData={data} />
      ))}
    </div>
  );
}

export function Tabs() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Игры', value: 'games' },
    { label: 'Аниме', value: 'anime' },
    { label: 'Сериалы', value: 'series' },
    { label: 'Фильмы', value: 'films' },
  ];

  return (
    <div className="tabs h-1 rad-8 bg-black-hover">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          className={`tab button-${pathname === `/table/${tab.value}` ? 'accent' : 'white'}`}
          href={`/table/${tab.value}?sortBy=status&order=asc`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}