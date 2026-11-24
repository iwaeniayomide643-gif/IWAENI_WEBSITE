/**
 * Trailers that play straight from this website's own files (instant start, with sound).
 *
 * To add or replace one:
 *   1. Put the web-ready MP4 in  public/videos/<trailer-id>.mp4
 *      and a still frame in      public/videos/<trailer-id>.jpg
 *   2. Add its trailer id below, with its real length as m:ss.
 *
 * Any trailer not listed here still plays from YouTube (trailerVideos.ts) or Google Drive.
 */
export interface LocalVideo {
  src: string;
  poster: string;
  /** Real length of the video, as m:ss. */
  duration: string;
}

export const localVideos: Record<string, LocalVideo> = {
  featured: { src: "/videos/featured.mp4", poster: "/videos/featured.jpg", duration: "0:20" },
  "trailer-01-terminal-protocol": {
    src: "/videos/trailer-01-terminal-protocol.mp4",
    poster: "/videos/trailer-01-terminal-protocol.jpg",
    duration: "0:20",
  },
  "trailer-02-whispers-gilded-coast": {
    src: "/videos/trailer-02-whispers-gilded-coast.mp4",
    poster: "/videos/trailer-02-whispers-gilded-coast.jpg",
    duration: "0:20",
  },
  "trailer-03-redeeming-love": {
    src: "/videos/trailer-03-redeeming-love.mp4",
    poster: "/videos/trailer-03-redeeming-love.jpg",
    duration: "0:20",
  },
  "trailer-04-house-of-ravenswood": {
    src: "/videos/trailer-04-house-of-ravenswood.mp4",
    poster: "/videos/trailer-04-house-of-ravenswood.jpg",
    duration: "0:20",
  },
  "trailer-05-project-hail-mary": {
    src: "/videos/trailer-05-project-hail-mary.mp4",
    poster: "/videos/trailer-05-project-hail-mary.jpg",
    duration: "0:20",
  },
  "trailer-06-la-conspiracion-inmortales": {
    src: "/videos/trailer-06-la-conspiracion-inmortales.mp4",
    poster: "/videos/trailer-06-la-conspiracion-inmortales.jpg",
    duration: "0:20",
  },
  "trailer-07-chronicles-iron-realm": {
    src: "/videos/trailer-07-chronicles-iron-realm.mp4",
    poster: "/videos/trailer-07-chronicles-iron-realm.jpg",
    duration: "0:20",
  },
  "trailer-08-quantum-paradox": {
    src: "/videos/trailer-08-quantum-paradox.mp4",
    poster: "/videos/trailer-08-quantum-paradox.jpg",
    duration: "0:30",
  },
  "trailer-09-shadows-eternity": {
    src: "/videos/trailer-09-shadows-eternity.mp4",
    poster: "/videos/trailer-09-shadows-eternity.jpg",
    duration: "0:30",
  },
  "trailer-10-echoes-forgotten": {
    src: "/videos/trailer-10-echoes-forgotten.mp4",
    poster: "/videos/trailer-10-echoes-forgotten.jpg",
    duration: "0:30",
  },
  "trailer-11-beneath-crimson-sky": {
    src: "/videos/trailer-11-beneath-crimson-sky.mp4",
    poster: "/videos/trailer-11-beneath-crimson-sky.jpg",
    duration: "0:30",
  },
  "trailer-12-silent-cipher": {
    src: "/videos/trailer-12-silent-cipher.mp4",
    poster: "/videos/trailer-12-silent-cipher.jpg",
    duration: "0:30",
  },
  "trailer-13-embers-awakening": {
    src: "/videos/trailer-13-embers-awakening.mp4",
    poster: "/videos/trailer-13-embers-awakening.jpg",
    duration: "0:20",
  },
  "trailer-14-realm-sun-king": {
    src: "/videos/trailer-14-realm-sun-king.mp4",
    poster: "/videos/trailer-14-realm-sun-king.jpg",
    duration: "0:30",
  },
};
