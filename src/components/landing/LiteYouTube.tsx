import { useState } from "react";

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
}

export default function LiteYouTube({ videoId, title = "Video" }: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        backgroundColor: "#000",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => setActivated(true)}
    >
      {!activated ? (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "68px", height: "48px",
            backgroundColor: "#ff0000",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "18px solid white",
              marginLeft: "4px",
            }} />
          </div>
        </>
      ) : (
        <iframe
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            border: "none",
          }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
