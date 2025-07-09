export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId) return Response.json({ error: "Missing channelId" }, { status: 400 });

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=4&type=video`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!data.items) return Response.json({ error: "No videos found", apiResponse: data }, { status: 404 });

  const videos = data.items.map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
  }));

  return Response.json({ videos });
}