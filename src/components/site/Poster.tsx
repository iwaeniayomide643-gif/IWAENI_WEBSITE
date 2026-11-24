import { useState } from "react";
import { cn } from "@/lib/utils";
import { driveThumb, type Trailer } from "@/data/trailers";

interface PosterProps {
  trailer: Trailer;
  /** Pixel width requested from Drive; pick roughly 2x the displayed width. */
  width?: number;
  eager?: boolean;
  className?: string;
}

/**
 * A trailer still. It asks Google Drive for the real frame of each video,
 * falls back to a local still, and finally to a plain dark gradient, so a
 * frame is never empty.
 */
export function Poster({ trailer, width = 800, eager = false, className }: PosterProps) {
  const [stage, setStage] = useState<"drive" | "local" | "none">("drive");

  const src =
    stage === "drive"
      ? driveThumb(trailer.driveId, width)
      : stage === "local" && trailer.fallbackPoster
        ? trailer.fallbackPoster
        : null;

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
      onError={() => setStage((s) => (s === "drive" && trailer.fallbackPoster ? "local" : "none"))}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
