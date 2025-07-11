import Link from "next/link";

export default function NotFound() {
  return (
    <div className="block">
        <div>
          <h1 className="h1">Страница не найдена</h1>
          <h6 className="h6 text-white-hover">Код ошибки: 404</h6>
        </div>
        <Link href='/' className="link-accent">На главную</Link>
      </div>
  );
}