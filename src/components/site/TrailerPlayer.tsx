import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { embedUrl, trailers, watchUrl, type Trailer } from "@/data/trailers";
import { wantsHd } from "@/lib/quality";
import { Poster } from "./Poster";

interface TrailerPlayerProps {
  /** Index into `trailers`, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  onOrder: () => void;
}

/**
 * Plays a trailer from the site's own files, with sound on. If the browser refuses to start
 * playback with sound (iPhones and some other browsers do), a big "Tap to play with sound"
 * button appears instead of leaving the visitor with a silent or frozen video.
 */
function LocalPlayer({
  trailer,
  src,
  onReady,
  onFail,
}: {
  trailer: Trailer;
  src: string;
  onReady: () => void;
  onFail: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => setNeedsTap(true));
  }, []);

  const playWithSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setNeedsTap(false);
    setSoundOff(false);
    video.play().catch(() => setNeedsTap(true));
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={trailer.poster ?? undefined}
        controls
        autoPlay
        playsInline
        preload="auto"
        aria-label={trailer.title}
        onCanPlay={onReady}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => {
          setBuffering(false);
          setNeedsTap(false);
        }}
        onVolumeChange={(e) => setSoundOff(e.currentTarget.muted || e.currentTarget.volume === 0)}
        onError={onFail}
        className="absolute inset-0 h-full w-full bg-black object-contain"
      />
      {buffering && !needsTap && (
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-gold border-t-transparent"
          role="status"
          aria-label="Buffering"
        />
      )}
      {needsTap && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute inset-0 grid place-items-center bg-ink/45 backdrop-blur-[2px]"
        >
          <span className="flex flex-col items-center gap-3">
            <span className="grid size-20 place-items-center rounded-full bg-foreground text-ink shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <Play className="ml-1 size-8 fill-current" aria-hidden="true" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
              Tap to play with sound
            </span>
          </span>
        </button>
      )}
      {soundOff && !needsTap && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute left-3 top-3 rounded-full border border-glass-border bg-ink/80 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground"
        >
          Sound off · tap to turn on
        </button>
      )}
    </>
  );
}

export function TrailerPlayer({ index, onIndexChange, onClose, onOrder }: TrailerPlayerProps) {
  const trailer = index === null ? undefined : trailers[index];
  const [loaded, setLoaded] = useState(false);
  // "auto" = best copy for this device, "sd" = the lighter copy, "embed" = Google Drive / YouTube
  const [tier, setTier] = useState<"auto" | "sd" | "embed">("auto");
  const [hd] = useState(() => wantsHd());
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setLoaded(false);
    setTier("auto");
  }, [trailer?.id]);

  // Our own files play first (sharp HD on a big screen, light copy otherwise).
  // If a file cannot load, step down: HD, then the light copy, then the embedded player.
  const localSrc = (() => {
    if (!trailer || tier === "embed") return null;
    if (tier === "auto" && hd && trailer.videoHd) return trailer.videoHd;
    return trailer.videoSrc;
  })();
  const playLocal = Boolean(localSrc);
  const onLocalFail = () => {
    setLoaded(false);
    setTier((t) => (t === "auto" && hd && trailer?.videoHd && trailer.videoSrc ? "sd" : "embed"));
  };

  const step = (direction: 1 | -1) => {
    if (index === null) return;
    onIndexChange((index + direction + trailers.length) % trailers.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Arrow keys on the video itself seek; only use them to change trailer elsewhere.
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <Dialog.Root open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/92 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          onOpenAutoFocus={() => {
            opener.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
          }}
          onCloseAutoFocus={(event) => {
            // Put focus back on whatever opened the player.
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
          onKeyDown={onKeyDown}
          onClick={(event) => event.target === event.currentTarget && onClose()}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 pt-20 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:p-6 sm:pt-24 lg:pt-6"
        >
          {/* Always on screen, even when the window is taller than the display and you scroll. */}
          <Dialog.Close asChild>
            <Button
              variant="glass"
              aria-label="Close trailer"
              className="fixed right-3 top-3 z-[60] min-h-12 gap-2 rounded-full border-glass-highlight bg-ink/90 px-5 text-sm font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.65)] backdrop-blur-md sm:right-6 sm:top-5"
            >
              <X size={20} aria-hidden="true" /> Close
            </Button>
          </Dialog.Close>
          {trailer && index !== null && (
            <div className="glass-panel my-auto w-full max-w-6xl animate-in rounded-3xl p-3 duration-300 fade-in-0 zoom-in-95 sm:p-5 lg:grid lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-6">
              <div className="min-w-0">
                <div className="mb-3 pl-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold sm:text-xs">
                    Sample trailer · {String(index + 1).padStart(2, "0")} /{" "}
                    {String(trailers.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-2xl border border-glass-border bg-black">
                  <div className="absolute inset-0" aria-hidden="true">
                    <Poster trailer={trailer} width={1280} eager />
                    <div className="absolute inset-0 bg-ink/60" />
                  </div>
                  {!loaded && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
                      role="status"
                    >
                      <span className="size-11 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/80 sm:text-xs">
                        {playLocal || trailer.youtubeId
                          ? "Loading trailer"
                          : "Loading from Google Drive. This can be slow"}
                      </span>
                    </div>
                  )}
                  {playLocal && localSrc ? (
                    <LocalPlayer
                      key={`${trailer.id}-${localSrc}`}
                      trailer={trailer}
                      src={localSrc}
                      onReady={() => setLoaded(true)}
                      onFail={onLocalFail}
                    />
                  ) : (
                    <iframe
                      key={trailer.id}
                      src={embedUrl(trailer)}
                      title={trailer.title}
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setLoaded(true)}
                      className={cn(
                        "absolute inset-0 h-full w-full border-0 transition-opacity duration-500",
                        loaded ? "opacity-100" : "opacity-0",
                      )}
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-4 px-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <Dialog.Title className="font-display text-3xl leading-tight sm:text-4xl">
                      {trailer.title}
                    </Dialog.Title>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold sm:text-xs">
                      {trailer.genre}
                    </p>
                    <Dialog.Description className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {trailer.description}
                    </Dialog.Description>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="glass"
                      size="icon"
                      aria-label="Previous trailer"
                      onClick={() => step(-1)}
                    >
                      <ChevronLeft size={20} aria-hidden="true" />
                    </Button>
                    <Button
                      variant="glass"
                      size="icon"
                      aria-label="Next trailer"
                      onClick={() => step(1)}
                    >
                      <ChevronRight size={20} aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-center">
                  <Button onClick={onOrder} className="w-full sm:w-auto">
                    Order a trailer like this <ArrowUpRight size={16} aria-hidden="true" />
                  </Button>
                  <a
                    href={watchUrl(trailer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex min-h-11 items-center gap-2 self-start text-sm text-muted-foreground hover:text-foreground sm:self-auto"
                  >
                    Video not playing? Open it in {trailer.youtubeId ? "YouTube" : "Google Drive"}{" "}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <aside aria-label="All sample trailers" className="mt-6 min-w-0 lg:mt-0">
                <p className="mb-3 px-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  All trailers
                </p>
                <ol className="scrollbar-none -mx-1 flex max-h-[26rem] flex-col gap-2 overflow-y-auto px-1 lg:max-h-[min(70svh,38rem)]">
                  {trailers.map((item, i) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onIndexChange(i)}
                        aria-current={i === index ? "true" : undefined}
                        className={cn(
                          "group flex min-h-16 w-full items-center gap-3 rounded-xl border p-2 text-left transition-colors",
                          i === index
                            ? "border-glass-highlight bg-glass-strong"
                            : "border-transparent hover:border-glass-border hover:bg-glass",
                        )}
                      >
                        <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-black">
                          <Poster trailer={item} width={320} />
                          {i === index && (
                            <span className="absolute inset-0 grid place-items-center bg-ink/55">
                              <Play
                                size={16}
                                className="fill-current text-gold"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="block truncate font-display text-lg leading-tight">
                            {item.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
