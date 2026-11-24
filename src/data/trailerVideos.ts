/**
 * FASTER PLAYBACK (optional, recommended).
 *
 * Trailers play from Google Drive by default. Drive's embedded player is slow to
 * start and needs a second press of its own play button.
 *
 * To make a trailer play instantly, with sound, inside the site:
 *   1. Upload the video to YouTube (set visibility to "Unlisted").
 *   2. Copy the video ID from its link. For https://www.youtube.com/watch?v=AbC123xyz
 *      the ID is AbC123xyz.
 *   3. Paste it below, next to the trailer's id (ids are in bookLaunchProjects.ts;
 *      the first one on the site is "featured").
 *
 * Example:
 *   "trailer-02-whispers-gilded-coast": "AbC123xyz",
 *
 * Any trailer without an entry keeps playing from Google Drive.
 */
export const youtubeIds: Record<string, string> = {};
