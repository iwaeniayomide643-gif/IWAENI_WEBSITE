import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { brand } from "@/data/brand";
import { scrollToId } from "@/lib/motion";
import { Background } from "@/components/site/Background";
import { Header, MobileCta } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { FeaturedTrailer } from "@/components/site/FeaturedTrailer";
import { TrailerReel } from "@/components/site/TrailerReel";
import { TrailerPlayer } from "@/components/site/TrailerPlayer";
import { Statement } from "@/components/site/Statement";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { PortfolioWorkspace, type WorkspaceKind } from "@/components/site/PortfolioWorkspace";
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

function Page() {
  const [player, setPlayer] = useState<number | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceKind | null>(null);
  const [service, setService] = useState("");

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
        <Hero onPlay={setPlayer} onWatch={() => scrollToId("trailers")} onOrder={() => order()} />
        <FeaturedTrailer
          onPlay={setPlayer}
          onSeeMore={() => scrollToId("reel")}
          onOrder={() => order()}
        />
        <TrailerReel onPlay={setPlayer} onOrder={() => order()} />
        <Statement />
        <Services onChoose={order} />
        <Portfolio
          onOpenTrailers={() => setPlayer(0)}
          onOpenFormatted={() => setWorkspace("formatted")}
          onOpenWebsites={() => setWorkspace("websites")}
        />
        <About onOrder={() => order()} onProcess={() => scrollToId("process")} />
        <Process />
        <Contact service={service} onServiceChange={setService} />
      </main>

      <Footer />
      <MobileCta onOrder={() => order()} />

      <TrailerPlayer
        index={player}
        onIndexChange={setPlayer}
        onClose={() => setPlayer(null)}
        onOrder={() => order()}
      />
      <PortfolioWorkspace
        kind={workspace}
        onClose={() => setWorkspace(null)}
        onOrder={() => order()}
      />
    </div>
  );
}
