/**
 * The page's fixed backdrop, built like a colour-graded film frame:
 * warm wine and antique gold light against a cool teal shadow, a hairline dot
 * texture, a very fine film grain and a soft vignette. Only gradients and
 * transforms, so it stays cheap on phones.
 */
const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base: near-black with a warm shift down the page */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0d070e 0%, #120913 42%, #09050b 100%)" }}
      />

      {/* coloured light */}
      <div
        className="ambient-a absolute -left-[22%] -top-[12%] h-[80vh] w-[68vw] will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(146,38,78,0.30), transparent)" }}
      />
      <div
        className="ambient-b absolute -right-[18%] top-[18%] h-[80vh] w-[60vw] will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(214,180,119,0.16), transparent)" }}
      />
      <div
        className="ambient-c absolute -bottom-[28%] left-[18%] h-[75vh] w-[72vw] will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(18,96,118,0.26), transparent)" }}
      />

      {/* hairline dot texture, fading out towards the bottom */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(247,239,229,0.16) 1px, transparent 1.2px)",
          backgroundSize: "30px 30px",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
        }}
      />

      {/* fine film grain */}
      <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: grain }} />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(125% 95% at 50% 38%, transparent 50%, rgba(5,2,6,0.62))",
        }}
      />
    </div>
  );
}
