import { VideoList } from "@/components/client";

export default function Page({ children }) {
  return (
    <div className="page v-64 w-100">
      <div className="v-32 w-100">
        <h1 className="h1">Видео</h1>
        <VideoList />
      </div>
    </div>
  );
}