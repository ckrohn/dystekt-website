import { getVideoDate, videos } from "../lib/videos";

export function VideoGallery() {
  return (
    <section className="video-grid wrap" aria-label="Live gig videos">
      {videos.map((video) => {
        const url = new URL(video.url);
        const videoId = url.searchParams.get("v") ?? url.pathname.split("/").pop();
        return (
          <a className="video-tile" key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.name}, ${getVideoDate(video)} on YouTube (opens in a new tab)`}>
            <span className="video-thumbnail">
              <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" />
              <span className="video-play" aria-hidden="true">▶</span>
              <span className="video-watch">Watch on YouTube ↗</span>
            </span>
            <span className="video-tile-info">
              <time dateTime={video.date}>{getVideoDate(video)}</time>
              <span className="video-tile-title">{video.name}</span>
            </span>
          </a>
        );
      })}
    </section>
  );
}
