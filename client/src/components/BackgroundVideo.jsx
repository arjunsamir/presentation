import { useState } from "react";

const BackgroundVideo = ({ sources, overlay, onLoad, fadeIn }) => {

  const alpha = overlay?.opacity ?? 0.5;

  const [opacity, setOpacity] = useState(fadeIn ? 1 : alpha);


  return (
    <div className="background-video">
      <video
        className="background-video__player"
        autoPlay
        loop
        muted
        playsInline
        style={overlay && overlay.blur ? { filter: `blur(${overlay.blur}px)` } : {}}
        onLoadedData={() => {
          if (fadeIn) setOpacity(alpha);
          if (onLoad) onLoad();
        }}
      >
        {sources.map(source => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {overlay && (
        <div className="background-video__overlay" style={{
          backgroundColor: overlay?.color ?? "#000",
          opacity
        }} />
      )}
    </div>
  )
}


export default BackgroundVideo;