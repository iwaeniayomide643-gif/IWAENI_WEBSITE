import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { brand } from "@/data/brand";
import { scrollToId } from "@/lib/motion";
import { Background } from "@/components/site/Background";
import { Header, MobileCta } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { FeaturedTrailer } from "@/components/site/FeaturedTrailer";
import { TrailerReel } from "@/components/site/TrailerReel";
import { Statement } from "@/components/site/Statement";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import type { WorkspaceKind } from "@/components/site/PortfolioWorkspace";
import { About } from "@/components/site/About";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = `${brand.name} — Book Trailers & Author Services`;
const description =
  "Cinematic book trailers that make readers press play, plus author websites, formatting, editing and launch promotion to help your book find its readers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b060c" },
    ],
  }),
  component: Page,
});

// The player and the portfolio viewers are only needed after a click, so they are not part of
// the first download. They are fetched quietly once the page is up (see the effect below).
const loadPlayer = () => import("@/components/site/TrailerPlayer");
const loadWorkspace = () => import("@/components/site/PortfolioWorkspace");
const TrailerPlayer = lazy(() => loadPlayer().then((m) => ({ default: m.TrailerPlayer })));
const PortfolioWorkspace = lazy(() =>
  loadWorkspace().then((m) => ({ default: m.PortfolioWorkspace })),
);

function Page() {
  const [player, setPlayer] = useState<number | null>(null);
  const [playerSeen, setPlayerSeen] = useState(false);
  const [workspace, setWorkspace] = useState<WorkspaceKind | null>(null);
  const [workspaceSeen, setWorkspaceSeen] = useState(false);
  const [service, setService] = useState("");

  const showPlayer = useCallback((index: number) => {
    setPlayerSeen(true);
    setPlayer(index);
  }, []);
  const showWorkspace = useCallback((kind: WorkspaceKind) => {
    setWorkspaceSeen(true);
    setWorkspace(kind);
  }, []);

  // Fetch the player's code as soon as the browser is idle, so the first click feels instant.
  // The portfolio viewers are bigger, so they wait until the portfolio is about to be scrolled to.
  useEffect(() => {
    const idle = (
      window as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    ).requestIdleCallback;
    const timer = idle
      ? idle(() => void loadPlayer(), { timeout: 4000 })
      : window.setTimeout(() => void loadPlayer(), 2500);

    const portfolio = document.getElementById("portfolio");
    let observer: IntersectionObserver | undefined;
    if (portfolio) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            void loadWorkspace();
            observer?.disconnect();
          }
        },
        { rootMargin: "900px 0px" },
      );
      observer.observe(portfolio);
    }
    return () => {
      observer?.disconnect();
      if (!idle) window.clearTimeout(timer);
    };
  }, []);

  /** Choose a service (default: trailers), close anything open and jump to the form. */
  const order = useCallback((name = "Book Trailers") => {
    setService(name);
    setPlayer(null);
    setWorkspace(null);
    // let the modal unlock page scrolling before the jump
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId("contact")));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-gold px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Background />
      <Header onOrder={() => order()} />

      <main id="main">
        <Hero onPlay={showPlayer} onWatch={() => scrollToId("trailers")} onOrder={() => order()} />
        <FeaturedTrailer
          onPlay={showPlayer}
          onSeeMore={() => scrollToId("reel")}
          onOrder={() => order()}
        />
        <TrailerReel onPlay={showPlayer} onOrder={() => order()} />
        <Statement />
        <Services onChoose={order} />
        <Portfolio
          onOpenTrailers={() => showPlayer(0)}
          onOpenFormatted={() => showWorkspace("formatted")}
          onOpenWebsites={() => showWorkspace("websites")}
        />
        <About onOrder={() => order()} onProcess={() => scrollToId("process")} />
        <Process />
        <Contact service={service} onServiceChange={setService} />
      </main>

      <Footer />
      <MobileCta onOrder={() => order()} />

      {playerSeen && (
        <Suspense fallback={null}>
          <TrailerPlayer
            index={player}
            onIndexChange={setPlayer}
            onClose={() => setPlayer(null)}
            onOrder={() => order()}
          />
        </Suspense>
      )}
      {workspaceSeen && (
        <Suspense fallback={null}>
          <PortfolioWorkspace
            kind={workspace}
            onClose={() => setWorkspace(null)}
            onOrder={() => order()}
          />
        </Suspense>
      )}
    </div>
  );
}
