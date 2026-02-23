import { useState, useCallback } from "react";
import { Play } from "lucide-react";

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const LiteYouTube = ({ videoId, title = "Video", className = "" }: LiteYouTubeProps) => {
  const [activated, setActivated] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const handleClick = useCallback(() => {
    setActivated(true);
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden bg-muted rounded-lg cursor-pointer group ${className}`}
      style={{ paddingTop: "56.25%" }}
      onClick={!activated ? handleClick : undefined}
      role={!activated ? "button" : undefined}
      tabIndex={!activated ? 0 : undefined}
      aria-label={!activated ? `Reproducir: ${title}` : undefined}
      onKeyDown={!activated ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } } : undefined}
    >
      {activated ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0&iv_load_policy=3`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
