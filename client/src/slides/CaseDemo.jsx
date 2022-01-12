import { useLayoutEffect, useRef } from "react";
import anime from "animejs";
import VideoPlayer from "../components/VideoPlayer";
import { timer } from "../helpers/utils";

const holdTime = 1400;

const CaseDemo = ({ transitionOut }) => {

  // Create Refs
  const caption = useRef();
  const slide = useRef();
  const player = useRef();
  const video = useRef();
  const flash = useRef();
  const t = useRef();

  // Create Dope Tube TV
  const tubeTvAnimation = async () => {

    if (!t.current) t.current = timer(holdTime).start();

    // Wait for minimum animation time
    await t.current.hold();

    const tl = anime.timeline({
      easing: "easeInQuint",
      duration: 600
    });

    tl.add({
      targets: caption.current,
      translateY: 0
    })

    tl.add({
      targets: player.current,
      opacity: 1,
      scale: 1
    }, '-=600')

    tl.add({
      targets: flash.current,
      opacity: 1,
      scaleX: 1,
      scaleY: 0.01,
      duration: 200,
      easing: "easeInOutQuint"
    })

    tl.add({
      targets: flash.current,
      scaleY: 1,
      duration: 300,
      easing: "easeInOutQuint"
    })

    tl.add({
      targets: video.current,
      opacity: 1,
      duration: 300
    }, '-=150')
    
  }

  // Handle Slide Transitions
  useLayoutEffect(() => {

    const entryAnimation = () => {

      if (!t.current) t.current = timer(holdTime).start();

      // Define Video Player Refs
      player.current = slide.current.querySelector('.video-player');
      video.current = player.current.querySelector('.video-player__video');
      flash.current = player.current.querySelector('.video-player__flash');

      // Define Initial State
      anime.set(caption.current, {
        translateY: window.innerHeight * -0.25,
        opacity: 0
      });

      anime.set(player.current, {
        scale: 0.4,
        opacity: 0
      })

      anime.set(video.current, {
        opacity: 0
      })

      anime.set(flash.current, {
        opacity: 0,
        scaleX: 0,
        scaleY: 0
      })

      // Animate Into View
      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });

      tl.add({
        targets: player.current,
        opacity: 0.7
      })
  
      tl.add({
        targets: caption.current,
        opacity: [0, 1]
      })

    }

    // Run Entry Animation
    entryAnimation();
    
    transitionOut.current = () => {

      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });

      tl.add({
        targets: video.current,
        opacity: 0,
        duration: 300
      })

      tl.add({
        targets: flash.current,
        scaleY: 0.01,
        duration: 300,
        easing: "easeInOutQuint"
      }, '-=300');

      tl.add({
        targets: flash.current,
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 200,
        easing: "easeInOutQuint"
      })

      tl.add({
        targets: caption.current,
        opacity: 0
      })

      tl.add({
        targets: slide.current,
        opacity: 0
      })

      return tl.finished;

    }

  }, [])

  return (
    <div className="slide" ref={slide}>
      <div className="slide__centered">
        <div className="slide__video">
          <VideoPlayer
            sources={[
              {
                src: "/assets/video/united-travel.mp4",
                type: "video/mp4"
              }
            ]}
            onLoad={tubeTvAnimation}
          />
          <h1 className="slide__caption" ref={caption}>The first version of the booking tool</h1>
        </div>
      </div>
    </div>
  )
};


export default CaseDemo;

// This slide should be the generic intro slide