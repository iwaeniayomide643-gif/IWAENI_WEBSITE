/**
 * Chooses which copy of a trailer to play: the sharp HD file on a big screen with a good
 * connection, or the lighter file on phones, small screens, data-saver mode and slow networks.
 * Call it in the browser only (it needs the window).
 */
export function wantsHd(): boolean {
  if (typeof window === "undefined") return false;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-2g|2g|3g)$/.test(connection.effectiveType)) return false;
  return window.innerWidth >= 900;
}
