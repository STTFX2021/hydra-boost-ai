import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const LiteYouTube = ({ videoId, title = "Video", className = "" }: LiteYouTubeProps) => {
  const [open, setOpen] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <>
      {/* Thumbnail + Play button */}
      <div
        className={`relative w-full overflow-hidden bg-muted rounded-lg cursor-pointer group ${className}`}
        style={{ paddingTop: "56.25%" }}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label={`Reproducir: ${title}`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9 ml-1" fill="#2563eb">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.80)" }}
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition z-10"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Video container */}
          <div
            className="relative w-[90vw] max-w-4xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
