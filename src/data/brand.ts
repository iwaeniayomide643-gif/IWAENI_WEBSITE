export interface Brand {
  name: string;
  role: string;
  tagline: string;
  portrait: string;
  /**
   * Where enquiries go. Fill in ONE or BOTH and the contact form starts working:
   *  - email:    "you@example.com"
   *  - whatsapp: digits only with country code, e.g. "2348012345678"
   * While both are empty the form still validates, but it cannot deliver messages.
   */
  contact: { email: string; whatsapp: string };
}

export const brand: Brand = {
  name: "Iwaeni Ayomide",
  role: "Book Trailers & Author Services",
  tagline: "Helping authors present, promote, and grow their books.",
  portrait: "/images/madeline-portrait.jpg",
  contact: { email: "iwaeni2019@gmail.com", whatsapp: "2348153922910" },
};

/** "2348153922910" becomes "+234 815 392 2910". */
export const prettyPhone = (digits: string) => {
  const d = digits.replace(/\D/g, "");
  return d.length === 13
    ? `+${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}`
    : `+${d}`;
};

export const nav = [
  { id: "trailers", label: "Trailers" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
] as const;
