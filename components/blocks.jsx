"use client";

import { Logo, CircleUser, Eye, Like } from "@/components/icons";
import { A } from "@/components/kit";
import { VideoSkeleton } from "./skeletons";
import "@/styles/blocks.scss";
import { useEffect, useState } from "react";

export function Header() {
  const pages = [
    { name: "ссылки", href: "/links" },
    { name: "таблица", href: "/table" },
    { name: "подписка", href: "/subscribe" },
  ]

  return (
    <header className="header center between pad-v-8 pad-h-16 bg-black rad-16">
      <A href='/'><Logo /></A>
      <nav className="h-16 b2">
        {pages.map((page) => (
          <A key={page.name} href={page.href} className="header-link">
            {page.name}
          </A>
        ))}
      </nav>
      <A href="/profile" className="header-user h-8 center b2">
        <CircleUser />
        аккаунт
      </A>
    </header>
  );
}

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

export function LinkCard({ link, href, title, children }) {
  return (
    <A className="link-card center rad-8 h-12 pad-h-12 pad-v-8" href={href} target="_blank">
      {children}
      <div className="v-0">
        <span className="b2 text-white-hover">{title}</span>
        <span className="bt">{link}</span>
      </div>
    </A>
  );
}

export function LinkCardGroup({ children }) {
  return (
    <div className="h4 v-16 rad-16 pad-v-16 pad-h-16 bg-white text-black">
      {children}
    </div>
  )
}

export function TableCell({ children, color = "white", header = false, uncenter = false }) {
  return (
    <div className={`h-0 ${uncenter ? "" : "center"} pad-v-4 pad-h-8 bt bg-${header ? "accent" : color} text-${header ? "white" : "black"}`}>
      {children}
    </div>
  );
}

export function TableRow({ children, header = false }) {
  return (
    <div className={`table-row ${header ? "bg-white-hover" : ""}`}>
      {children}
    </div>
  );
}

export function Table({ children }) {
  return (
    <div className={`table bg-black-hover rad-16`}>
      {children}
    </div>
  );
}

export function ChipGame({ children, status }) {
  switch (status) {
    case "success": children = "Прошёл"; break;
    case "info": children = "В планах"; break;
    case "warning": children = "Прохожу"; break;
    case "error": children = "Бросил"; break;
  }
  return (
    <div className={`chip rad-8 h-0 center text-white bg-${status}`}>
      {children}
    </div>
  );
}

const tabs = [
  { label: 'Игры', value: 'games' },
  { label: 'Аниме', value: 'anime' },
  { label: 'Сериалы', value: 'series' },
  { label: 'Фильмы', value: 'films' },
];

export function Tabs({ data }) {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div className="tabs h-1 rad-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={``}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}