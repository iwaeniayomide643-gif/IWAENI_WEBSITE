import { bookTrailers } from "./bookLaunchProjects";
import { localVideos } from "./localVideos";
import { youtubeIds } from "./trailerVideos";

/**
 * One honest shape for every trailer on the site.
 * Only facts that describe the trailer itself are kept: its title, genre, a short
 * description and its length. No client names or results are shown.
 */
export interface Trailer {
  id: string;
  title: string;
  genre: string;
  description: string;
  duration: string | null;
  driveId: string;
  /** Set in trailerVideos.ts. When present the trailer plays from YouTube, which starts much faster. */
  youtubeId: string | null;
  /** Set in localVideos.ts. When present the trailer plays from this site's own files, which is fastest. */
  videoSrc: string | null;
  /** A real frame from the local video, used as the still everywhere (falls back to Google Drive's frame). */
  poster: string | null;
  /** Older stand-in still from the original data. No longer shown, because it did not match the videos. */
  fallbackPoster: string | null;
}

export const driveThumb = (id: string, width = 800) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
export const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** The address to put in the player: YouTube when we have an ID, otherwise Google Drive. */
export const embedUrl = (t: Trailer) =>
  t.youtubeId ? youtubeEmbed(t.youtubeId) : drivePreview(t.driveId);
/** The "open in a new tab" fallback link for a trailer. */
export const watchUrl = (t: Trailer) =>
  t.youtubeId ? youtubeWatch(t.youtubeId) : driveView(t.driveId);

const featured: Trailer = {
  id: "featured",
  title: "Featured trailer",
  genre: "Showreel pick",
  description:
    "A featured sample trailer. Press play to watch it, or use fullscreen for the full effect.",
  duration: localVideos["featured"]?.duration ?? null,
  driveId: "1ZgGeS7-rhUve9H5NpJCcaeSpiPzAsu17",
  youtubeId: youtubeIds["featured"] ?? null,
  videoSrc: localVideos["featured"]?.src ?? null,
  poster: localVideos["featured"]?.poster ?? null,
  fallbackPoster: null,
};

export const trailers: Trailer[] = [
  featured,
  ...bookTrailers.map<Trailer>((t) => ({
    id: t.id,
    title: t.book,
    genre: t.genre,
    description: t.description,
    // The old data said "0:30" for everything, which was wrong. Only show a length we have measured.
    duration: localVideos[t.id]?.duration ?? null,
    driveId: t.googleDriveId,
    youtubeId: youtubeIds[t.id] ?? null,
    videoSrc: localVideos[t.id]?.src ?? null,
    poster: localVideos[t.id]?.poster ?? null,
    fallbackPoster: t.thumbnail,
  })),
];
