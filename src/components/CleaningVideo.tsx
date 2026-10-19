import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

type CleaningVideoProps = {
  variant?: "hero" | "care";
  src: string;
  poster: string;
  description: string;
  width?: number;
  height?: number;
};

export default function CleaningVideo({
  variant = "hero",
  src,
  poster,
  description,
  width = 1280,
  height = 720,
}: CleaningVideoProps) {
  const label = variant === "hero" ? "hero" : "care section";
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    let visible = false;
    const syncPlayback = () => {
      if (document.hidden || !visible || reduced || manuallyPaused.current) {
        video.pause();
      } else {
        void video.play().catch(() => {
          // Browsers may require a tap to start video; the play control stays available.
        });
      }
    };
    if (reduced) video.pause();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
        syncPlayback();
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduced, failed]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  };

  return (
    <div
      className={`cleaning-media ${variant === "hero" ? "hero-media" : "care-media"}`}
    >
      {failed ? (
        <img
          src={poster}
          alt={description}
          width={width}
          height={height}
          fetchPriority={variant === "hero" ? "high" : "auto"}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          autoPlay={variant === "hero" && reduced === false}
          muted
          loop
          playsInline
          preload={reduced || variant === "care" ? "none" : "metadata"}
          poster={poster}
          aria-label={description}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          width={width}
          height={height}
        />
      )}
      {!failed && (
        <button
          className={`cleaning-video-toggle ${variant === "hero" ? "hero-video-toggle" : "care-video-toggle"}`}
          type="button"
          onClick={togglePlayback}
          aria-label={`${playing ? "Pause" : "Play"} ${label} video`}
        >
          {playing ? (
            <Pause size={14} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={14} fill="currentColor" aria-hidden="true" />
          )}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}
