import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trailer } from "@/data/trailers";

/** Previews that are currently running. Only a few at once, so the page stays smooth. */
const running = new Set<HTMLVideoElement>();
const MAX_RUNNING = 4;

/** How loud a hovered preview plays (the clips are already level-matched). */
const VOLUME = 0.85;

/** The one preview that is audible right now. Only one at a time, so hovering never makes a noise pile-up. */
let audible: HTMLVideoElement | null = null;

/**
 * Browsers only allow sound after the visitor has clicked, tapped or pressed a key on the page.
 * Until then a hovered preview plays silently and asks for a click; the first click anywhere turns
 * the sound on for the preview under the pointer, and every later hover has sound straight away.
 */
let activated = false;
const waiting = new Set<(target: EventTarget | null) => void>();
let watching = false;

function hasActivation() {
  return (
    activated ||
    (typeof navigator !== "undefined" && navigator.userActivation?.hasBeenActive === true)
  );
}

function watchForActivation() {
  if (watching || typeof document === "undefined") return;
  watching = true;
  const onInput = (event: Event) => {
    activated = true;
    waiting.forEach((resume) => resume(event.target));
    waiting.clear();
  };
  document.addEventListener("pointerdown", onInput, true);
  document.addEventListener("keydown", onInput, true);
}

const fades = new WeakMap<HTMLVideoElement, number>();

/** Smooth volume change, so sound never starts or stops with a pop. */
function fadeTo(video: HTMLVideoElement, to: number, ms: number, done?: () => void) {
  cancelAnimationFrame(fades.get(video) ?? 0);
  const from = video.volume;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    video.volume = from + (to - from) * t;
    if (t < 1) fades.set(video, requestAnimationFrame(step));
    else done?.();
  };
  fades.set(video, requestAnimationFrame(step));
}

function quiet(video: HTMLVideoElement) {
  if (audible === video) audible = null;
  fadeTo(video, 0, 180, () => {
    video.muted = true;
  });
}

/** Starts the preview with sound. Resolves false when the browser refuses, after falling back to silent play. */
async function speak(video: HTMLVideoElement) {
  if (audible && audible !== video) quiet(audible);
  video.muted = false;
  video.volume = 0;
  try {
    await video.play();
    audible = video;
    fadeTo(video, VOLUME, 250);
    return true;
  } catch {
    video.muted = true;
    video.volume = VOLUME;
    void video.play().catch(() => {});
    return false;
  }
}

function previewsAllowed() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

/** Devices with a mouse can hover; phones and tablets cannot, so their previews play on their own. */
function canHover() {
  return (
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * A short preview that fills its thumbnail and plays with sound while it is hovered.
 *
 * The clip is tiny (about 6 seconds, a few hundred KB, with its own sound). It is fetched in
 * advance, as soon as the thumbnail is near the screen, so the moment the visitor hovers it starts
 * at once, even on the live site where files must travel over the internet. When the pointer
 * leaves, the sound fades out and the picture keeps looping quietly. Clicking the thumbnail mutes it
 * at once, because the full trailer opens. Place it right after the poster, inside a relatively
 * positioned, overflow-hidden box that sits within a <button>.
 */
export function PreviewVideo({
  trailer,
  className,
  hint = false,
}: {
  trailer: Trailer;
  className?: string;
  /** Show a small label about the sound while the preview is hovered. */
  hint?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sound, setSound] = useState<"off" | "on" | "blocked">("off");
  const src = trailer.videoPreview ?? trailer.videoSrc;

  useEffect(() => {
    const video = ref.current;
    const host = video?.closest("button");
    if (!video || !host || !src) return;
    watchForActivation();

    // 1. Load the clip ahead of time once the thumbnail is close to the screen.
    let observer: IntersectionObserver | undefined;
    let player: IntersectionObserver | undefined;
    if (previewsAllowed()) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setNear(true);
            observer?.disconnect();
          }
        },
        { rootMargin: canHover() ? "500px" : "300px" },
      );
      observer.observe(host);

      // Phones and tablets cannot hover, so the preview plays by itself (silently, as browsers
      // require) while most of the thumbnail is on screen, and pauses when it scrolls away.
      if (!canHover()) {
        player = new IntersectionObserver(
          ([entry]) => {
            const current = ref.current;
            if (!entry || !current) return;
            if (entry.intersectionRatio >= 0.6) {
              if (!current.src) current.src = new URL(src, window.location.href).href;
              current.muted = true;
              void current.play().catch(() => {});
            } else {
              current.pause();
            }
          },
          { threshold: [0, 0.6] },
        );
        player.observe(host);
      }
    }

    // 2. Start it, with sound, the moment the pointer arrives (or on keyboard focus).
    let hovering = false;

    const resume = (target: EventTarget | null) => {
      // The first click anywhere switches the sound on. A click on this very thumbnail opens the player instead.
      if (hovering && !(target instanceof Node && host.contains(target))) void listen();
    };

    const listen = async () => {
      if (!hasActivation()) {
        video.muted = true;
        void video.play().catch(() => {});
        waiting.add(resume);
        setSound("blocked");
        return;
      }
      const ok = await speak(video);
      if (!hovering) {
        quiet(video);
        return;
      }
      if (ok) {
        setSound("on");
      } else {
        waiting.add(resume);
        setSound("blocked");
      }
    };

    const begin = () => {
      if (!previewsAllowed()) return;
      hovering = true;
      setNear(true);
      const current = ref.current;
      if (!current) return;
      // setNear may not have attached the source yet when the very first hover is instant
      if (!current.src) current.src = new URL(src, window.location.href).href;
      void listen();
    };

    const end = () => {
      hovering = false;
      waiting.delete(resume);
      setSound("off");
      quiet(video);
    };

    /** A click opens the full trailer, so the preview must be silent immediately. */
    const mute = () => {
      hovering = false;
      waiting.delete(resume);
      cancelAnimationFrame(fades.get(video) ?? 0);
      if (audible === video) audible = null;
      video.muted = true;
      setSound("off");
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") begin();
    };
    const onFocus = (event: FocusEvent) => {
      // keyboard focus only: a click also focuses the button, and that opens the player instead
      if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) begin();
    };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", end);
    host.addEventListener("focusin", onFocus);
    host.addEventListener("focusout", end);
    host.addEventListener("click", mute);
    return () => {
      observer?.disconnect();
      player?.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", end);
      host.removeEventListener("focusin", onFocus);
      host.removeEventListener("focusout", end);
      host.removeEventListener("click", mute);
      waiting.delete(resume);
      if (audible === video) audible = null;
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
      {hint && visible && sound !== "off" && (
        <span className="pointer-events-none absolute bottom-3 left-3 flex animate-in items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/90 duration-300 fade-in-0">
          {sound === "on" ? (
            <Volume2 size={12} aria-hidden="true" />
          ) : (
            <VolumeX size={12} aria-hidden="true" />
          )}
          {sound === "on" ? "Sound on" : "Click anywhere for sound"}
        </span>
      )}
    </>
  );
}
