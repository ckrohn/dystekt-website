import videos from "../../data/videos.json";

export type Video = (typeof videos)[number];

export function getVideoDate(video: Video) {
  return video.date.split("-").reverse().join(".");
}

export { videos };
