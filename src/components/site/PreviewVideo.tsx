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

/**
 * A silent preview that fills its thumbnail. It begins the moment the visitor hovers the
 * thumbnail's button (or tabs to it), loops quietly, and keeps playing after the pointer
 * leaves. Nothing is downloaded until the first hover. Place it right after the poster, inside
 * a relatively positioned, overflow-hidden box that sits within a <button>.
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
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const src = trailer.videoSrc;

  useEffect(() => {
    const video = ref.current;
    const host = video?.closest("button");
    if (!video || !host || !src) return;

    const begin = () => {
      if (!previewsAllowed()) return;
      setArmed(true);
      const current = ref.current;
      // If it was started before (and paused by the limit), start it again.
      if (current && current.src && current.paused) void current.play().catch(() => {});
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
        src={armed ? src : undefined}
        autoPlay={armed}
        muted
        loop
        playsInline
        preload="none"
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
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
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
