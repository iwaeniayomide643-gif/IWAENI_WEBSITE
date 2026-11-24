/**
 * REAL TITLES FOR THE TRAILERS (optional).
 *
 * The titles and genres in the original data did not match what the videos show,
 * so the site uses neutral labels ("Sample trailer 04", "Book trailer") until a
 * real title is added here.
 *
 * To name a trailer, add a line keyed by its id (the ids are in bookLaunchProjects.ts
 * and in localVideos.ts, for example "trailer-04-house-of-ravenswood"):
 *
 *   "trailer-04-house-of-ravenswood": {
 *     title: "The real book title",
 *     genre: "Real genre",
 *     description: "One honest sentence about this trailer.", // optional
 *   },
 *
 * Only use titles and genres that are true for that exact video.
 */
export interface TrailerDetails {
  title: string;
  genre: string;
  description?: string;
}

export const trailerDetails: Record<string, TrailerDetails> = {};
