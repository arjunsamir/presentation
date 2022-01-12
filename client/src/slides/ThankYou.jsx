import { useLayoutEffect, useRef } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import anime from "animejs";

const ThankYou = ({ transitionOut }) => {

  // Create Refs
  const text = useRef();
  const slide = useRef();

  // Handle Slide Transitions
  useLayoutEffect(() => {

    const entryAnimation = () => {

      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });
  
      tl.add({
        targets: text.current,
        opacity: [0, 1]
      })

      tl.add({
        targets: slide.current.querySelector(".background-video"),
        opacity: [0, 1],
        duration: 1000,
        delay: 1000
      })

    }

    // Run Entry Animation
    entryAnimation();
    
    transitionOut.current = () => {

      const tl = anime.timeline({
        easing: "easeOutQuad",
        duration: 500
      });

      tl.add({
        targets: text.current,
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
      <BackgroundVideo
        sources={[
          {
            src: "/assets/video/arjun-blur.webm",
            type: "video/webm"
          },
          {
            src: "/assets/video/arjun-blur.mp4",
            type: "video/mp4"
          }
        ]}
        overlay={{
          opacity: 0.65,
          color: "var(--background)"
        }}
      />
      <div className="slide__centered">
        <div className="slide__content" ref={text}>
          <h1 className="slide__super-title hard-light centered-text" >Thank <span className="accent--primary">you</span></h1>
          <p className="slide__subtitle max-80">Thanks for joining this interactive presentation. The remainder of this presentation will take place via Zoom Screen-share</p>
        </div>
      </div>
    </div>
  )
};


export default ThankYou;

// This slide should be the generic intro slide