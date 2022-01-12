import { useLayoutEffect, useRef } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import anime from "animejs";

const CaseIntro = ({ transitionOut }) => {

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
            src: "https://storage.googleapis.com/utravel-site-content/video/hero-bg.mp4",
            type: "video/mp4"
          }
        ]}
        overlay={{
          opacity: 0.25,
          color: "var(--background)"
        }}
      />
      <div className="slide__centered">
        <div className="slide__content">
          <h4 className="slide__super-title hard-light" ref={text}>United Travel</h4>
        </div>
      </div>
    </div>
  )
};


export default CaseIntro;

// This slide should be the generic intro slide