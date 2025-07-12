import Link from "next/link";
import { Logo, CircleUser } from "@/components/icons";

export function Header() {
  const pages = [
    { name: "ссылки", href: "/links" },
    { name: "таблица", href: "/table/games?sortBy=status&order=asc" },
    { name: "подписка", href: "/subscribe" },
  ]

  return (
    <header className="row between center-a padL-16 padR-16 padT-8 padB-8 rad-16">
      <Link className="link-white" href='/'><Logo /></Link>
      <nav className="row center-a gap-16">
        {pages.map((page) => (
          <Link key={page.name} href={page.href} className="link-white">
            {page.name}
          </Link>
        ))}
      </nav>
      <Link href="/profile" className="row center-a gap-8 link-white">
        <CircleUser />
        аккаунт
      </Link>
    </header>
  );
}

export function LinkCard({ link, href, title, children }) {
  return (
    <Link href={href} target="_blank" className="bt-black h4 row padL-12 padR-12 padT-8 padB-8">
      {children}
      <div className="col">
        <span className="b2 text-white-hover">{title}</span>
        <span className="bt">{link}</span>
      </div>
    </Link>
  );
}

export function LinkCardGroup({ children, title, titleIcon }) {
  return (
    <div className="bg-white text-black padL-16 padR-16 padT-16 padB-16 rad-16 col gap-16">
      <div className="row gap-12 h4 center-a">
        {titleIcon}{title}
      </div>
      {children}
    </div>
  )
}

export function TableCell({ children, color = "black", header = false, uncenter = false }) {
  if (header) color = "black";
  return (
    <div className={`row ${uncenter ? '' : 'center-j'} bg-${color} ${header ? 'text-accent' : 'text-white'} padL-8 padR-8 padT-4 padB-4 bt`}>
      {children}
    </div>
  );
}

export function TableRow({ children, color = "black", }) {
  return (
    <div className={`table-row gap-2 bg-${color}`}>
      {children}
    </div>
  );
}

export function Table({ children, className }) {
  return (
    <div className={`w100 ofh center-a-self table col-gr gap-2 bg-white rad-16 ${className}`}>
      {children}
    </div>
  );
}

export function ChipGame({ children, status }) {
  switch (status) {
    case "completed": children = "Прошёл"; status = "success"; break;
    case "planned": children = "В планах"; status = "info"; break;
    case "in-progress": children = "Прохожу"; status = "warning"; break;
    case "skipped": children = "Бросил"; status = "error"; break;
  }
  return (
    <div className={`b2b rad-8 text-white row w100 h100 center-j center-a bg-${status}`}>
      {children}
    </div>
  );
}