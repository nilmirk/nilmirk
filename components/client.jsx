"use client";
import "@/styles/blocks.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

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