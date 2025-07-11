import { A } from "@/components/server";
export default function NotFound() {
  return (
    <div className="page v-64 w-100">
      <div className="v-32 w-100">
        <div className="v-16">
          <h1 className="h1">Страница не найдена</h1>
          <h6 className="h6 text-white-hover">Код ошибки: 404</h6>
        </div>
        <A href='/' color="accent">На главную</A>
      </div>
    </div>
  );
}