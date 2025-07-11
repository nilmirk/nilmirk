"use client";
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
    <div className="tabs rad-8 row gap-1 bg-black-hover">
      {tabs.map((tab) => (
        <Link className={`${(pathname == `/table/${tab.value}`) ? 'bt-accent' : 'bt-white'} no-rad`} key={tab.value} href={`/table/${tab.value}?sortBy=status&order=asc`}>
          {tab.label}
        </Link>
      ))}
    </div>
  );
}