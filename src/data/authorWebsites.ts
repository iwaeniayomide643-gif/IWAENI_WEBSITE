export interface AuthorWebsiteProject {
  id: string;
  authorName: string;
  bookTitle: string;
  genre: string;
  conceptTitle: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  previewImage: string;
  projectType: string;
  colorPalette: { primary: string; secondary: string; accent: string };
}

/**
 * Ten design concepts. The authors and books are made up for the samples: they are not real
 * clients, and nothing here claims sales, reviews, awards or press.
 */
export const authorWebsites: AuthorWebsiteProject[] = [
  {
    id: "camille-laurent-website",
    authorName: "Camille Laurent",
    bookTitle: "The Autumn Atelier",
    genre: "Romance",
    conceptTitle: "The Parisian Atelier Experience",
    tagline: "Warm, romantic Parisian storytelling with a reader-magnet newsletter built in.",
    description:
      "An evocative romance author website with candlelit colours, delicate serif type, a floating 3D book, a chapter reader with narration, a series reading order, and an email sign-up that offers a free prequel.",
    keyFeatures: [
      "Floating 3D Book Cover with Sample Chapter Reader",
      "Series Reading Order Guide",
      "Chapter One Narration Widget & Playlist",
      "Reader-Magnet Newsletter Sign-Up",
      "Retailer Links for Every Store",
    ],
    previewImage: "/images/websites/romance-author-atelier.svg",
    projectType: "Full Author Hub & Reader Funnel",
    colorPalette: { primary: "#e3b97a", secondary: "#d4677f", accent: "#170811" },
  },
  {
    id: "kofi-mensah-website",
    authorName: "Kofi Mensah",
    bookTitle: "Chronicles of the Solar King",
    genre: "Fantasy",
    conceptTitle: "Immersive Realm Atlas & Lore Vault",
    tagline:
      "A fantasy portal with a clickable realm map, a lore codex, and a collector's edition countdown.",
    description:
      "A fantasy author website built for world-lovers: a rotating dark sun, an interactive map of five lands, a tabbed codex of houses, magic and history, a prologue reader, and a live launch countdown for a collector's edition.",
    keyFeatures: [
      "Interactive Realm Map with Five Lands",
      "Tabbed Codex: Houses, Magic & Timeline",
      "Collector's Edition Live Countdown",
      "Prologue Reader & Pre-Order Panel",
      "Fan Club Sign-Up",
    ],
    previewImage: "/images/websites/fantasy-author-realm.svg",
    projectType: "Interactive Worldbuilding Hub",
    colorPalette: { primary: "#e8ac3d", secondary: "#e0835f", accent: "#120b1c" },
  },
  {
    id: "declan-cross-website",
    authorName: "Declan Cross",
    bookTitle: "Terminal Protocol",
    genre: "Thriller",
    conceptTitle: "The Command Ops Terminal",
    tagline:
      "A surveillance-style thriller site with a declassify-the-excerpt dossier and a working console.",
    description:
      "A cinematic techno-thriller author site modelled on an intelligence terminal: a connection log that boots on load, redacted dossier text readers can declassify, a working command line, and case-file cards for the characters.",
    keyFeatures: [
      "Classified Dossier: Tap to Declassify the Excerpt",
      'Working Reader Console (type "help")',
      "Character Case Files with Clearance Meters",
      "Retailer Panel & First-Pages Reader",
      '"Request Clearance" Newsletter Sign-Up',
    ],
    previewImage: "/images/websites/thriller-author-terminal.svg",
    projectType: "Cinematic Thriller Launch Platform",
    colorPalette: { primary: "#4ade80", secondary: "#38bdf8", accent: "#070b10" },
  },
  {
    id: "soraya-al-mansoor-website",
    authorName: "Soraya Al-Mansoor",
    bookTitle: "Dust and Jasmine",
    genre: "Literary Fiction",
    conceptTitle: "The Minimalist Literary Salon",
    tagline:
      "Generous whitespace, refined editorial type, and an essay archive for literary readers.",
    description:
      "A calm literary fiction and poetry site focused on typography: a filterable essay archive with reading times, a poem that lights up line by line, a reading room with adjustable text, book-club questions, and an event booking form.",
    keyFeatures: [
      "Filterable Essay Archive with Reading Times",
      "Poem Player that Highlights Line by Line",
      "Reading Room: Text Size, Serif or Sans, Night Mode",
      "Book Club Discussion Questions",
      "Speaking & Event Invitation Form",
    ],
    previewImage: "/images/websites/literary-author-salon.svg",
    projectType: "Bespoke Literary Portfolio & Booking Hub",
    colorPalette: { primary: "#9a5b3a", secondary: "#4d5b4a", accent: "#f5f0e8" },
  },
  {
    id: "helena-vane-website",
    authorName: "Helena Vane",
    bookTitle: "Whispers of the Gilded Coast",
    genre: "Historical Fiction",
    conceptTitle: "The Victorian Manor Archives",
    tagline:
      "Antique gold-and-sepia styling, an interactive 1890s timeline, and a personalised signed-copy preview.",
    description:
      "A rich historical fiction destination with drifting gold dust, a clickable 1890s timeline that pairs real history with the novel, flip-over archive objects, and a live inscription preview for signed copies.",
    keyFeatures: [
      "Interactive 1890s Timeline: History and the Novel",
      "Archive Drawer with Flip-Over Objects",
      "Signed Copy Inscription Preview",
      "Reader Society Sign-Up with Book Club Guides",
      "Chapter Reader & Retailer Links",
    ],
    previewImage: "/images/websites/historical-author-archives.svg",
    projectType: "Historical Archive & Direct Store",
    colorPalette: { primary: "#dcb370", secondary: "#b4673f", accent: "#1b110b" },
  },
  {
    id: "beatrix-sterling-website",
    authorName: "Beatrix Sterling",
    bookTitle: "The Clockwork Kingdom",
    genre: "Young Adult",
    conceptTitle: "The Clockwork Academy Portal",
    tagline: "Spinning gears, a guild-sorting quiz readers can share, and a pre-order bonus claim.",
    description:
      "An energetic Young Adult fantasy site made for sharing: a five-question guild quiz with a copy-your-result button, animated clockwork, a pre-order bonus claim form, and a chapter-one reader.",
    keyFeatures: [
      "Guild Sorting Quiz with a Shareable Result",
      "Animated Clockwork Hero",
      "Pre-Order Bonus Claim Form",
      "Chapter One Reader",
      "Guild Newsletter Sign-Up",
    ],
    previewImage: "/images/websites/ya-author-academy.svg",
    projectType: "Interactive YA Community Hub",
    colorPalette: { primary: "#f472b6", secondary: "#c084fc", accent: "#120f2b" },
  },
  {
    id: "marcos-valdes-website",
    authorName: "Marcos Valdés",
    bookTitle: "Zero to Market",
    genre: "Business",
    conceptTitle: "The Growth Executive Platform",
    tagline:
      "A business-book site with a readiness scorecard, a free canvas download, and a bulk-order request.",
    description:
      "A sleek business author platform: an animated growth chart, a five-stage framework, a two-minute readiness scorecard, a downloadable go-to-market canvas, a bulk-order request with team tiers, and a speaking topics list.",
    keyFeatures: [
      "Readiness Scorecard with Live Result",
      "Five-Stage Framework Explorer",
      "Downloadable Go-to-Market Canvas (spreadsheet)",
      "Bulk Order Request for Teams",
      "Speaking Topics & Newsletter",
    ],
    previewImage: "/images/websites/business-author-executive.svg",
    projectType: "Executive Authority & Speaking Hub",
    colorPalette: { primary: "#38bdf8", secondary: "#f59e0b", accent: "#080c15" },
  },
  {
    id: "dr-julian-oreilly-website",
    authorName: "Julian O'Reilly",
    bookTitle: "Mastering Focus",
    genre: "Self-Help",
    conceptTitle: "The Habit & Productivity Lab",
    tagline:
      "A calm, clean focus check with a radar chart, a working focus timer, and a habit chain.",
    description:
      "A light, minimalist self-help companion site: a six-question focus check drawn as a radar chart with a personal first step, a working 5, 15 or 25 minute focus timer, a fourteen-day habit chain, and a Friday newsletter.",
    keyFeatures: [
      "Focus Check with a Live Radar Chart",
      "Working Focus Sprint Timer",
      "Fourteen-Day Habit Chain Tracker",
      '"Focus Friday" Newsletter Sign-Up',
      "Chapter Reader & Retailer Links",
    ],
    previewImage: "/images/websites/self-help-author-lab.svg",
    projectType: "Self-Help Diagnostic & Companion Portal",
    colorPalette: { primary: "#0b8a5d", secondary: "#2f6fdd", accent: "#f2faf6" },
  },
  {
    id: "amara-leo-fox-website",
    authorName: "Amara & Leo Fox",
    bookTitle: "The Dragon Who Lost His Spark",
    genre: "Children's Literature",
    conceptTitle: "The Enchanted Meadow Classroom",
    tagline:
      "A playful storybook site with a page-turner, a hide-and-seek game, and a printable colouring page.",
    description:
      "A colourful children's author hub for young readers, parents, teachers and librarians: a read-along storybook, a find-the-spark game with hot and cold hints, a downloadable colouring page, discussion questions, and a school-visit form.",
    keyFeatures: [
      "Read-Along Storybook with Page Turner",
      "Find-the-Spark Game with Hot and Cold Hints",
      "Downloadable Colouring Page",
      "Story-Circle Questions for Teachers",
      "School & Library Visit Request Form",
    ],
    previewImage: "/images/websites/childrens-author-meadow.svg",
    projectType: "Illustrated Educational & Story Hub",
    colorPalette: { primary: "#f59e0b", secondary: "#ef4f7b", accent: "#fff6e4" },
  },
  {
    id: "tariq-vance-website",
    authorName: "Tariq Vance",
    bookTitle: "Echoes of Nova Prime",
    genre: "Non-Fiction / Science",
    conceptTitle: "The Deep Space Observatory",
    tagline:
      "A starfield site with a moving solar system, a light-travel explorer, and a sky gallery with data sheets.",
    description:
      "A dark, elegant popular-science site: a live orbit viewer with real distances and years for five planets, a light-travel explorer from the Moon to the Andromeda Galaxy, a sky gallery with data sheets, and a monthly dispatch sign-up.",
    keyFeatures: [
      "Moving Solar System with Real Orbital Facts",
      "Light-Travel Explorer, from the Moon to Andromeda",
      "Sky Gallery with Data Sheets",
      "Talk & Keynote Enquiry",
      "Monthly Dispatch Newsletter",
    ],
    previewImage: "/images/websites/science-author-observatory.svg",
    projectType: "Science Communication & Media Hub",
    colorPalette: { primary: "#818cf8", secondary: "#c084fc", accent: "#050714" },
  },
];
