/**
 * Trailers that play straight from this website's own files (instant start, with sound).
 *
 * Each trailer has two copies so every visitor gets the best one:
 *   public/videos/<trailer-id>-hd.mp4   sharp 1080p, for big screens on a good connection
 *   public/videos/<trailer-id>.mp4      light 720p, for phones, small screens and slow networks
 *   public/videos/<trailer-id>.jpg      a still frame, shown while the video loads
 *
 * To add or replace one: put the files in public/videos and add its trailer id below, with its
 * real length as m:ss. The hd copy is optional.
 *
 * Any trailer not listed here still plays from YouTube (trailerVideos.ts) or Google Drive.
 */
export interface LocalVideo {
  /** The light copy (720p). Used on phones, small screens, data saver and slow connections. */
  src: string;
  /** The sharp copy (1080p), used on big screens with a good connection. Optional. */
  hd?: string;
  /** A tiny silent clip (first 6 seconds) used for the hover preview. Loads ahead of time so a hover starts at once. */
  preview?: string;
  poster: string;
  /** Real length of the video, as m:ss. */
  duration: string;
}

export const localVideos: Record<string, LocalVideo> = {
  featured: {
    src: "/videos/featured.mp4",
    hd: "/videos/featured-hd.mp4",
    preview: "/videos/featured-preview.mp4",
    poster: "/videos/featured.jpg",
    duration: "0:20",
  },
  "trailer-01-terminal-protocol": {
    src: "/videos/trailer-01-terminal-protocol.mp4",
    hd: "/videos/trailer-01-terminal-protocol-hd.mp4",
    preview: "/videos/trailer-01-terminal-protocol-preview.mp4",
    poster: "/videos/trailer-01-terminal-protocol.jpg",
    duration: "0:20",
  },
  "trailer-02-whispers-gilded-coast": {
    src: "/videos/trailer-02-whispers-gilded-coast.mp4",
    hd: "/videos/trailer-02-whispers-gilded-coast-hd.mp4",
    preview: "/videos/trailer-02-whispers-gilded-coast-preview.mp4",
    poster: "/videos/trailer-02-whispers-gilded-coast.jpg",
    duration: "0:20",
  },
  "trailer-03-redeeming-love": {
    src: "/videos/trailer-03-redeeming-love.mp4",
    hd: "/videos/trailer-03-redeeming-love-hd.mp4",
    preview: "/videos/trailer-03-redeeming-love-preview.mp4",
    poster: "/videos/trailer-03-redeeming-love.jpg",
    duration: "0:20",
  },
  "trailer-04-house-of-ravenswood": {
    src: "/videos/trailer-04-house-of-ravenswood.mp4",
    hd: "/videos/trailer-04-house-of-ravenswood-hd.mp4",
    preview: "/videos/trailer-04-house-of-ravenswood-preview.mp4",
    poster: "/videos/trailer-04-house-of-ravenswood.jpg",
    duration: "0:20",
  },
  "trailer-05-project-hail-mary": {
    src: "/videos/trailer-05-project-hail-mary.mp4",
    hd: "/videos/trailer-05-project-hail-mary-hd.mp4",
    preview: "/videos/trailer-05-project-hail-mary-preview.mp4",
    poster: "/videos/trailer-05-project-hail-mary.jpg",
    duration: "0:20",
  },
  "trailer-06-la-conspiracion-inmortales": {
    src: "/videos/trailer-06-la-conspiracion-inmortales.mp4",
    hd: "/videos/trailer-06-la-conspiracion-inmortales-hd.mp4",
    preview: "/videos/trailer-06-la-conspiracion-inmortales-preview.mp4",
    poster: "/videos/trailer-06-la-conspiracion-inmortales.jpg",
    duration: "0:20",
  },
  "trailer-07-chronicles-iron-realm": {
    src: "/videos/trailer-07-chronicles-iron-realm.mp4",
    hd: "/videos/trailer-07-chronicles-iron-realm-hd.mp4",
    preview: "/videos/trailer-07-chronicles-iron-realm-preview.mp4",
    poster: "/videos/trailer-07-chronicles-iron-realm.jpg",
    duration: "0:20",
  },
  "trailer-08-quantum-paradox": {
    src: "/videos/trailer-08-quantum-paradox.mp4",
    hd: "/videos/trailer-08-quantum-paradox-hd.mp4",
    preview: "/videos/trailer-08-quantum-paradox-preview.mp4",
    poster: "/videos/trailer-08-quantum-paradox.jpg",
    duration: "0:30",
  },
  "trailer-09-shadows-eternity": {
    src: "/videos/trailer-09-shadows-eternity.mp4",
    hd: "/videos/trailer-09-shadows-eternity-hd.mp4",
    preview: "/videos/trailer-09-shadows-eternity-preview.mp4",
    poster: "/videos/trailer-09-shadows-eternity.jpg",
    duration: "0:30",
  },
  "trailer-10-echoes-forgotten": {
    src: "/videos/trailer-10-echoes-forgotten.mp4",
    hd: "/videos/trailer-10-echoes-forgotten-hd.mp4",
    preview: "/videos/trailer-10-echoes-forgotten-preview.mp4",
    poster: "/videos/trailer-10-echoes-forgotten.jpg",
    duration: "0:30",
  },
  "trailer-11-beneath-crimson-sky": {
    src: "/videos/trailer-11-beneath-crimson-sky.mp4",
    hd: "/videos/trailer-11-beneath-crimson-sky-hd.mp4",
    preview: "/videos/trailer-11-beneath-crimson-sky-preview.mp4",
    poster: "/videos/trailer-11-beneath-crimson-sky.jpg",
    duration: "0:30",
  },
  "trailer-12-silent-cipher": {
    src: "/videos/trailer-12-silent-cipher.mp4",
    hd: "/videos/trailer-12-silent-cipher-hd.mp4",
    preview: "/videos/trailer-12-silent-cipher-preview.mp4",
    poster: "/videos/trailer-12-silent-cipher.jpg",
    duration: "0:30",
  },
  "trailer-13-embers-awakening": {
    src: "/videos/trailer-13-embers-awakening.mp4",
    hd: "/videos/trailer-13-embers-awakening-hd.mp4",
    preview: "/videos/trailer-13-embers-awakening-preview.mp4",
    poster: "/videos/trailer-13-embers-awakening.jpg",
    duration: "0:20",
  },
  "trailer-14-realm-sun-king": {
    src: "/videos/trailer-14-realm-sun-king.mp4",
    hd: "/videos/trailer-14-realm-sun-king-hd.mp4",
    preview: "/videos/trailer-14-realm-sun-king-preview.mp4",
    poster: "/videos/trailer-14-realm-sun-king.jpg",
    duration: "0:30",
  },
};
