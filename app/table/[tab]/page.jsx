import { Table, TableCell, TableRow, ChipGame } from "@/components/server";
import { Tabs } from "@/components/client";
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const { tab } = await params;
  const { sortBy = 'name', order = 'asc' } = searchParams;

  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const file = await fs.promises.readFile(filePath, 'utf-8');
  const data = JSON.parse(file);
  const items = data[tab] || [];

  if (!items || items.length === 0) {
    notFound();
  }

  const statusOrder = {
    "in-progress": 1,
    "planned": 2,
    "completed": 3,
    "skipped": 4,
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      const valueA = a.name || '';
      const valueB = b.name || '';
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (sortBy === 'status') {
      const valueA = statusOrder[a.status] || 999;
      const valueB = statusOrder[b.status] || 999;
      return order === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    }
    return 0;
  });

  return (
      <div className="block">
        <div className="row gap-32 center-a">
          <h1 className="h1">Таблица</h1>
          <Tabs />
        </div>
        <Table>
          <TableRow header>
            <TableCell uncenter header>
              <Link className="link-accent" href={`/table/${tab}?sortBy=name&order=${sortBy === 'name' && order === 'asc' ? 'desc' : 'asc'}`}>
                Название {sortBy === 'name' && (order === 'asc' ? '↑' : '↓')}
              </Link>
            </TableCell>
            <TableCell header>
              <Link className="link-accent" href={`/table/${tab}?sortBy=status&order=${sortBy === 'status' && order === 'asc' ? 'desc' : 'asc'}`}>
                Статус {sortBy === 'status' && (order === 'asc' ? '↑' : '↓')}
              </Link>
            </TableCell>
            <TableCell header>Плейлист</TableCell>
            <TableCell header>Полное прохождение</TableCell>
          </TableRow>
          {sortedItems.map((item, i) => (
            (i % 2 == 0) ?
            (<TableRow key={i}>
              <TableCell uncenter>{item.name}</TableCell>
              <TableCell><ChipGame status={item.status} /></TableCell>
              <TableCell>{item.playlist == '#' ? ('нету') : (<Link target="_blank" href={item.playlist} className="link-white">Клик</Link>)}</TableCell>
              <TableCell>{item.full == '#' ? ('нету') : (<Link target="_blank" href={item.full} className="link-white">Клик</Link>)}</TableCell>
            </TableRow>) :
            (<TableRow color="black-hover" key={i}>
              <TableCell color="black-hover" uncenter>{item.name}</TableCell>
              <TableCell color="black-hover"><ChipGame status={item.status} /></TableCell>
              <TableCell color="black-hover">{item.playlist == '#' ? ('нету') : (<Link target="_blank" href={item.playlist} className="link-white">Клик</Link>)}</TableCell>
              <TableCell color="black-hover">{item.full == '#' ? ('нету') : (<Link target="_blank" href={item.full} className="link-white">Клик</Link>)}</TableCell>
            </TableRow>)
          ))}
        </Table>
      </div>
  );
}