/**
 * HOSTING THE FULL TRAILERS ON VIMEO OR YOUTUBE (optional).
 *
 * By default each trailer plays from this website's own files (public/videos), with Google Drive
 * only as a last-resort backup. To play a trailer from Vimeo instead (adaptive streaming, so it
 * starts quickly even on a slow connection), upload it to Vimeo and paste its link below, next to
 * the trailer's id (the ids are the file names in public/videos; the first one is "featured").
 *
 * VIMEO
 *   1. Upload the video to Vimeo. In its Privacy settings, keep it embeddable (Public, or a
 *      setting that lets it play on other websites).
 *   2. Copy the video's link from your browser, for example https://vimeo.com/123456789
 *      (or https://vimeo.com/123456789/ab12cd34ef if the video is unlisted).
 *   3. Paste the whole link below. The site reads the number and the hash for you.
 *
 *   Example:
 *     "trailer-02-whispers-gilded-coast": "https://vimeo.com/123456789",
 *
 * YOUTUBE
 *   Upload as "Unlisted", then paste only the video ID (for https://www.youtube.com/watch?v=AbC123xyz
 *   the ID is AbC123xyz). Vimeo wins if a trailer has both.
 *
 * Any trailer without an entry keeps playing from this website's own files.
 * The short hover previews on the thumbnails always stay on the website, so they start at once.
 */
export const vimeoIds: Record<string, string> = {};

export const youtubeIds: Record<string, string> = {};
