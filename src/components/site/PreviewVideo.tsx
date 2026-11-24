import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trailer } from "@/data/trailers";

/** Previews that are currently running. Only a few at once, so the page stays smooth. */
const running = new Set<HTMLVideoElement>();
const MAX_RUNNING = 4;

function previewsAllowed() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

/** Only devices that can hover (a mouse) need the clip loaded ahead of time. */
function canHover() {
  return (
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * A silent preview that fills its thumbnail.
 *
 * The clip is tiny (about 6 seconds, a few hundred KB). It is fetched in advance, as soon as the
 * thumbnail is near the screen, so the moment the visitor hovers it starts at once, even on the
 * live site where files must travel over the internet. It loops quietly and keeps playing after the
 * pointer leaves. Place it right after the poster, inside a relatively positioned, overflow-hidden
 * box that sits within a <button>.
 */
export function PreviewVideo({
  trailer,
  className,
  hint = false,
}: {
  trailer: Trailer;
  className?: string;
  /** Show a small "Click to hear it" label while the silent preview plays. */
  hint?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const src = trailer.videoPreview ?? trailer.videoSrc;

  useEffect(() => {
    const video = ref.current;
    const host = video?.closest("button");
    if (!video || !host || !src) return;

    // 1. Load the clip ahead of time once the thumbnail is close to the screen.
    let observer: IntersectionObserver | undefined;
    if (canHover() && previewsAllowed()) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setNear(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "500px" },
      );
      observer.observe(host);
    }

    // 2. Start it the moment the pointer arrives (or on keyboard focus).
    const begin = () => {
      if (!previewsAllowed()) return;
      setNear(true);
      const current = ref.current;
      if (!current) return;
      // setNear may not have attached the source yet when the very first hover is instant
      if (!current.src) current.src = new URL(src, window.location.href).href;
      if (current.paused) void current.play().catch(() => {});
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") begin();
    };
    const onFocus = (event: FocusEvent) => {
      // keyboard focus only: a click also focuses the button, and that opens the player instead
      if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) begin();
    };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("focusin", onFocus);
      running.delete(video);
    };
  }, [src]);

  if (!src) return null;

  return (
    <>
      <video
        ref={ref}
        src={near ? src : undefined}
        muted
        loop
        playsInline
        preload={near ? "auto" : "none"}
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
        onPlaying={(event) => {
          setVisible(true);
          const video = event.currentTarget;
          running.add(video);
          if (running.size > MAX_RUNNING) {
            const oldest = running.values().next().value;
            if (oldest && oldest !== video) {
              oldest.pause();
              running.delete(oldest);
            }
          }
        }}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
          className,
        )}
      />
      {hint && visible && (
        <span className="pointer-events-none absolute bottom-3 left-3 flex animate-in items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/90 duration-500 fade-in-0">
          <VolumeX size={12} aria-hidden="true" /> Click to hear it
        </span>
      )}
    </>
  );
}
