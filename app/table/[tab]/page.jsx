import { A } from "@/components/server";
import { Table, TableCell, TableRow, ChipGame } from "@/components/server";
import { Tabs } from "@/components/client";

import fs from 'fs';
import path from 'path';

export default async function Page({ params }) {
  const { tab } = await params;
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const file = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(file);
  const items = data[tab];

  return (
    <div className="page v-64 w-100">
      <div className="v-32 w-100">
        <div className="center h-32">
          <h1 className="h1">Таблица</h1>
          <Tabs />
        </div>
        <Table>
          <TableRow header>
            <TableCell uncenter header>Название</TableCell>
            <TableCell header>Статус</TableCell>
            <TableCell header>Плейлист</TableCell>
          </TableRow>
          {(
            items.map((item, i) => (
              <TableRow key={i}>
                <TableCell uncenter>{item.name}</TableCell>
                <TableCell><ChipGame status={item.status} /></TableCell>
                <TableCell><A href={item.playlist} color="black">Клик</A></TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </div>
    </div>
  );
}