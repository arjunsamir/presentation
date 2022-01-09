

const BackgroundVideo = ({ sources, overlay, onLoad }) => {
  return (
    <div className="background-video">
      <video
        className="background-video__player"
        autoPlay
        loop
        muted
        playsInline
        style={overlay && overlay.blur ? { filter: `blur(${overlay.blur}px)` } : {}}
        onLoadedData={onLoad}
      >
        {sources.map(source => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {overlay && (
        <div className="background-video__overlay" style={{
          backgroundColor: overlay?.color ?? "#000",
          opacity: overlay?.opacity ?? 0.5
        }} />
      )}
    </div>
  )
}


export default BackgroundVideo;