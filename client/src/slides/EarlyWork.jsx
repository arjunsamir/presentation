import { useLayoutEffect, useRef } from "react";
import anime from "animejs";

const EarlyWork = ({ transitionOut }) => {

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
      <div className="slide__centered">
        <div className="slide__content">
          <h1 className="slide__jumbo-title" ref={text}>My early work</h1>
        </div>
      </div>
    </div>
  )
};


export default EarlyWork;

// This slide should be the generic intro slide