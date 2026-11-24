import { useState } from "react";
import { cn } from "@/lib/utils";
import { driveThumb, type Trailer } from "@/data/trailers";

interface PosterProps {
  trailer: Trailer;
  /** Pixel width requested from Drive when it is used; pick roughly 2x the displayed width. */
  width?: number;
  eager?: boolean;
  className?: string;
}

/**
 * A trailer still. It uses a real frame from the trailer's own video when we have
 * one, then asks Google Drive for the frame, and finally shows a plain dark
 * gradient, so a frame is never empty and never the wrong picture.
 */
export function Poster({ trailer, width = 800, eager = false, className }: PosterProps) {
  const [attempt, setAttempt] = useState(0);

  const candidates = [trailer.poster, driveThumb(trailer.driveId, width)].filter(
    (src): src is string => Boolean(src),
  );
  const src = candidates[attempt] ?? null;

  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(214,180,119,0.25),transparent_60%),linear-gradient(160deg,#2a1627,#140a13)]",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={16}
      height={9}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setAttempt((n) => n + 1)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
