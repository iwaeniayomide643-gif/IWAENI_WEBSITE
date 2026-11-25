/**
 * THE BOOK EACH TRAILER IS FOR.
 *
 * Each title and author below was read from the title card at the end of that exact video, so
 * buyers can search for the book. Trailers with no entry show a neutral label ("Sample trailer 06")
 * until the real title is added.
 *
 * To name a trailer, add a line keyed by its id (the ids are the file names in public/videos,
 * for example "trailer-04-house-of-ravenswood"):
 *
 *   "trailer-04-house-of-ravenswood": {
 *     title: "The real book title",
 *     author: "Author name",          // optional
 *     subtitle: "A subtitle",         // optional
 *     genre: "Real genre",            // optional
 *     description: "One honest sentence about this trailer.", // optional
 *   },
 *
 * Only use titles and authors that are true for that exact video.
 */
export interface TrailerDetails {
  title: string;
  author?: string;
  subtitle?: string;
  genre?: string;
  description?: string;
}

export const trailerDetails: Record<string, TrailerDetails> = {
  featured: { title: "El Reino de Cartón", author: "Mónika Feren" },
  "trailer-01-terminal-protocol": { title: "A Moça do Coreto", author: "Antonio Costta" },
  "trailer-02-whispers-gilded-coast": {
    title: "Uncharted Waters",
    subtitle: "Discover Your Hidden Depth",
    author: "Julie Miles Lewis",
  },
  "trailer-03-redeeming-love": {
    title: "Disciples Obey",
    subtitle: "Following Jesus Changes What You Do",
    author: "Edward N. Gross",
  },
  "trailer-04-house-of-ravenswood": {
    title: "Introducing Biblical Discipleship",
    subtitle: "Volume 2",
    author: "Professor P. V. Ntintili",
  },
  // trailer-05-project-hail-mary: no title card in the video, so it stays unnamed for now
  "trailer-06-la-conspiracion-inmortales": {
    title: "Saint Antony in His Desert",
    author: "Anthony Uhlmann",
  },
  "trailer-07-chronicles-iron-realm": {
    title: "Adam Returns",
    subtitle: "The Five New Commandments: The Uniting Testament",
    author: "Michael J. Simmons",
  },
  "trailer-08-quantum-paradox": { title: "Project Hail Mary", author: "Andy Weir" },
  "trailer-09-shadows-eternity": { title: "Redeeming Love", author: "Francine Rivers" },
  // trailer-10-echoes-forgotten and trailer-11-beneath-crimson-sky: no title card, unnamed for now
  "trailer-12-silent-cipher": { title: "The Silent Patient", author: "Alex Michaelides" },
  "trailer-13-embers-awakening": {
    title: "The Call of the Silver Cockatoo",
    author: "Jeremy O'Carroll",
  },
  "trailer-14-realm-sun-king": {
    title: "La Conspiración de los Inmortales",
    subtitle: "El Círculo Protector",
  },
};
