import { bookTrailers } from "./bookLaunchProjects";
import { localVideos } from "./localVideos";
import { trailerDetails } from "./trailerDetails";
import { vimeoIds, youtubeIds } from "./trailerVideos";

/**
 * One honest shape for every trailer on the site.
 * Only facts that describe the trailer itself are kept: its title, genre, a short
 * description and its length. No client names or results are shown.
 */
export interface Trailer {
  id: string;
  title: string;
  /** The book's author, read from the video's own title card. Null when we do not know it. */
  author: string | null;
  subtitle: string | null;
  /** True when the title is the real book title (so buyers can search for it). */
  titled: boolean;
  genre: string;
  description: string;
  duration: string | null;
  driveId: string;
  /** Set in trailerVideos.ts. When present the trailer plays from Vimeo (adaptive streaming). */
  vimeoId: string | null;
  /** Set in trailerVideos.ts. When present the trailer plays from YouTube, which starts much faster. */
  youtubeId: string | null;
  /** Set in localVideos.ts. When present the trailer plays from this site's own files, which is fastest. */
  videoSrc: string | null;
  /** The sharp 1080p copy, when we have one. Chosen for big screens on a good connection. */
  videoHd: string | null;
  /** Tiny silent clip for the hover preview (loaded ahead of time). */
  videoPreview: string | null;
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

/**
 * A Vimeo video can be given as its number ("123456789"), as number/hash for an unlisted video
 * ("123456789/ab12cd34ef"), or as the full link copied from Vimeo. This pulls out the parts.
 */
export const parseVimeo = (input: string): { id: string; hash: string | null } | null => {
  const match = input.trim().match(/(\d{6,})(?:[/?&#h=]+([0-9a-f]{6,}))?/i);
  return match?.[1] ? { id: match[1], hash: match[2] ?? null } : null;
};
export const vimeoEmbed = (input: string) => {
  const v = parseVimeo(input);
  if (!v) return "";
  const hash = v.hash ? `&h=${v.hash}` : "";
  return `https://player.vimeo.com/video/${v.id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1${hash}`;
};
export const vimeoWatch = (input: string) => {
  const v = parseVimeo(input);
  return v ? `https://vimeo.com/${v.id}${v.hash ? `/${v.hash}` : ""}` : "https://vimeo.com";
};

/** A search for the book, so a buyer can go and find it. Only for trailers with a real title. */
export const bookSearchUrl = (t: Trailer) =>
  `https://www.google.com/search?q=${encodeURIComponent(
    [t.title, t.author, "book"].filter(Boolean).join(" "),
  )}`;

/** The address to put in the player: Vimeo or YouTube when we have an ID, otherwise Google Drive. */
export const embedUrl = (t: Trailer) =>
  t.vimeoId
    ? vimeoEmbed(t.vimeoId)
    : t.youtubeId
      ? youtubeEmbed(t.youtubeId)
      : drivePreview(t.driveId);
/** The "open in a new tab" fallback link for a trailer. */
export const watchUrl = (t: Trailer) =>
  t.vimeoId
    ? vimeoWatch(t.vimeoId)
    : t.youtubeId
      ? youtubeWatch(t.youtubeId)
      : driveView(t.driveId);
/** Which site the embedded or fallback link goes to. */
export const hostName = (t: Trailer) =>
  t.vimeoId ? "Vimeo" : t.youtubeId ? "YouTube" : "Google Drive";

/** Default wording for a trailer, with the book's name when we know it. */
const describe = (details: (typeof trailerDetails)[string] | undefined, fallback: string) =>
  details?.description ??
  (details
    ? `A book trailer for ${details.title}${details.author ? ` by ${details.author}` : ""}. Press play to watch it.`
    : fallback);

const featuredDetails = trailerDetails["featured"];
const featured: Trailer = {
  id: "featured",
  title: featuredDetails?.title ?? "Featured trailer",
  author: featuredDetails?.author ?? null,
  subtitle: featuredDetails?.subtitle ?? null,
  titled: Boolean(featuredDetails),
  genre: featuredDetails?.genre ?? "Book trailer",
  description: describe(
    featuredDetails,
    "A featured sample trailer. Press play to watch it, or use fullscreen for the full effect.",
  ),
  duration: localVideos["featured"]?.duration ?? null,
  driveId: "1ZgGeS7-rhUve9H5NpJCcaeSpiPzAsu17",
  vimeoId: vimeoIds["featured"] ?? null,
  youtubeId: youtubeIds["featured"] ?? null,
  videoSrc: localVideos["featured"]?.src ?? null,
  videoHd: localVideos["featured"]?.hd ?? null,
  videoPreview: localVideos["featured"]?.preview ?? null,
  poster: localVideos["featured"]?.poster ?? null,
  fallbackPoster: null,
};

export const trailers: Trailer[] = [
  featured,
  ...bookTrailers.map<Trailer>((t, i) => {
    const details = trailerDetails[t.id];
    // The original titles and genres did not match the videos, so use neutral labels
    // until a real title is added in trailerDetails.ts. The featured trailer is number 01.
    const number = String(i + 2).padStart(2, "0");
    return {
      id: t.id,
      title: details?.title ?? `Sample trailer ${number}`,
      author: details?.author ?? null,
      subtitle: details?.subtitle ?? null,
      titled: Boolean(details),
      genre: details?.genre ?? "Book trailer",
      description: describe(details, "A sample book trailer. Press play to watch it."),
      // The old data said "0:30" for everything, which was wrong. Only show a length we have measured.
      duration: localVideos[t.id]?.duration ?? null,
      driveId: t.googleDriveId,
      vimeoId: vimeoIds[t.id] ?? null,
      youtubeId: youtubeIds[t.id] ?? null,
      videoSrc: localVideos[t.id]?.src ?? null,
      videoHd: localVideos[t.id]?.hd ?? null,
      videoPreview: localVideos[t.id]?.preview ?? null,
      poster: localVideos[t.id]?.poster ?? null,
      fallbackPoster: t.thumbnail,
    };
  }),
];
