import { A } from "@/components/server";
export default function InDev() {
  return (
    <div className="page v-64 w-100">
      <div className="v-32 w-100">
        <div className="v-16">
          <h1 className="h1">Страница находится в разработке</h1>
          <h6 className="h6 text-white-hover">Код ошибки: подождите</h6>
        </div>
        <A href='/' color="accent">На главную</A>
      </div>
    </div>
  );
}