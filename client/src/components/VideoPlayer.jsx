

const VideoPlayer = ({ sources, onLoad }) => {

  return (
    <div className="video-player">
      <video
        className="video-player__video"
        autoPlay
        loop
        muted 
        playsInline
        onLoadedData={onLoad}
      >
        {sources.map(source => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </div>
  )

}