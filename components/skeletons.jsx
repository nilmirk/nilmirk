export function VideoSkeleton() {
  return (
    <div className="video-frame v-12">
      <div className="thumbnail skeleton" />
      <div className="v-4 h6">
        <div className="skeleton skeleton-title" />
        <div className="h-16 b2">
          <span className="skeleton skeleton-info" />
        </div>
      </div>
    </div>
  );
}