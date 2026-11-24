import {
  BookOpen,
  CheckCheck,
  Clapperboard,
  Compass,
  FileText,
  Globe,
  LayoutTemplate,
  Layers3,
  Megaphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  name: string;
  line: string;
  icon: LucideIcon;
}

/** Book Trailers leads the page, so it is kept apart from the rest. */
export const trailerService: Service = {
  name: "Book Trailers",
  line: "A short, cinematic film that makes readers curious about your book. Made for social feeds, book pages and launch day.",
  icon: Clapperboard,
};

export const trailerExtras: Service[] = [
  { name: "Social Media Book Promotion", line: "Posts and clips made to be shared.", icon: Share2 },
  { name: "Promotional Graphics", line: "Banners, quote cards and launch visuals.", icon: Layers3 },
  { name: "Author Spotlights", line: "A feature that introduces you to readers.", icon: Sparkles },
];

export const promoteServices: Service[] = [
  { name: "Book Promotion", line: "Put your book in front of new readers.", icon: Megaphone },
  { name: "Book Launch Promotion", line: "A clear plan for launch week.", icon: Rocket },
  { name: "Book Marketing", line: "A steady plan that keeps your book moving.", icon: Compass },
  {
    name: "Book SEO & Discoverability",
    line: "Help readers find your book when they search.",
    icon: Search,
  },
  {
    name: "Book Descriptions & Marketing Copy",
    line: "Blurbs and copy that sell the story.",
    icon: FileText,
  },
];

export const buildServices: Service[] = [
  { name: "Author Websites", line: "A home online for you and your books.", icon: Globe },
  {
    name: "Book Landing Pages",
    line: "One page, one book, one clear action.",
    icon: LayoutTemplate,
  },
  { name: "Author Branding", line: "A look and voice readers remember.", icon: Palette },
  { name: "Book Editing", line: "Clearer, stronger writing.", icon: PenTool },
  { name: "Book Proofreading", line: "A final check for errors.", icon: CheckCheck },
  { name: "Book Formatting", line: "Clean print and ebook layouts.", icon: BookOpen },
];

export const allServiceNames: string[] = [
  trailerService,
  ...trailerExtras,
  ...promoteServices,
  ...buildServices,
].map((s) => s.name);
