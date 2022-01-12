

const VideoPlayer = ({ sources, onLoad }) => {

  return (
    <div className="video-player">
      <div className="video-player__flash">
        <video
          className="video-player__video"
          autoPlay
          loop
          muted 
          playsInline
          controls={false}
          onLoadedData={onLoad}
        >
          {sources.map(source => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      </div>
    </div>
  )

}

export default VideoPlayer;