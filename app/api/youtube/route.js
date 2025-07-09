export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');
  const apiKey = process.env.YOUTUBE_API_KEY;

  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/embed\/([^?&#]+)/
  ];
  let videoId = null;
  for (const pattern of patterns) {
    const match = videoUrl.match(pattern);
    if (match) {
      videoId = match[1];
      break;
    }
  }
  if (!videoId) return Response.json({ error: "Invalid YouTube URL" }, { status: 400 });

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  if (!data.items || !data.items.length) {
    return Response.json({ error: "Video not found", apiResponse: data }, { status: 404 });
  }
  const video = data.items[0];
  return Response.json({
    videoId: video.id, // <-- add videoId to response
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    views: video.statistics.viewCount,
    likes: video.statistics.likeCount,
    publishedAt: video.snippet.publishedAt,
  });
}