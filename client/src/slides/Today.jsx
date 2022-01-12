import { useLayoutEffect, useRef } from "react";
import anime from "animejs";

const Intro = ({ transitionOut }) => {

  // Create Refs
  const text = useRef();
  const slide = useRef();
  const logos = useRef();
  const subtitle = useRef();

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
        targets: subtitle.current,
        opacity: [0, 1]
      })

      tl.add({
        targets: logos.current.querySelectorAll("span"),
        opacity: [0, 1],
        delay: anime.stagger([0, 250])
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
          <h1 className="slide__jumbo-title centered-text" ref={text}>Where am I <span className="accent--primary">now?</span></h1>
          <p className="slide__subtitle max-70" ref={subtitle}>I'm both a designer and developer working at Orlando based agency Purple Rock Scissors</p>
          <div className="slide__logos" ref={logos}>
            <span>Lego</span>
            <span>Target</span>
            <span>General Catalyst</span>
            <span>NorX</span>
            <span>Evermore Resort</span>
            <span>Simulmedia</span>
          </div>
        </div>
      </div>
    </div>
  )
};


export default Intro;

// This slide should be the generic intro slide