import Link from "next/link";
import { Logo, CircleUser } from "@/components/icons";

export function A({ children, href, color = "white", className, ...props }) {
  return (
    <Link href={href} className={`link-${color} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Header() {
  const pages = [
    { name: "ссылки", href: "/links" },
    { name: "таблица", href: "/table/games" },
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