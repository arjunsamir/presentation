import { useLayoutEffect, useRef } from "react";
import useCodepenCountdown from "../hooks/useCodepenCountdown";
import anime from "animejs";
import { delay } from "../helpers/utils";


const Countdown = ({ onComplete, name }) => {


  // Create Refs
  const overlay = useRef();
  const text = useRef();

  // Use The Canvas Effects
  useCodepenCountdown(async () => {
    const tl = anime.timeline({
      duration: 600,
      easing: "easeInQuad"
    });

    tl.add({
      targets: text.current,
      opacity: 1
    });

    tl.add({
      targets: overlay.current,
      opacity: 1,
      delay: 400
    })

    tl.add({
      targets: text.current,
      left: (text.current.offsetWidth - window.innerWidth) * -0.5,
      top: (text.current.offsetHeight - window.innerHeight) * -0.5,
      scale: 0.25,
      duration: 800,
      easing: "easeInOutQuad",
      delay: 200
    })

    tl.add({
      targets: text.current.querySelector("span"),
      opacity: 1,
    })


    tl.add({
      targets: text.current,
      opacity: 0,
      delay: 1600
    })

    await tl.finished;
    
    if (onComplete) onComplete();
  });

  useLayoutEffect(() => {

    const fadeIn = async () => {

      anime.set(text.current, { opacity: 0 });
      anime.set(text.current.querySelector("span"), { opacity: 0 });

      await delay(1000);
      anime({
        targets: overlay.current,
        opacity: 0,
        duration: 1200,
        easing: "easeOutQuad"
      });
    }

    fadeIn();
    
  }, [])

  return (
    <div className="waiting-room__countdown">
      <div
        className="waiting-room__overlay"
        ref={overlay}
      />
      <canvas id="canvas-number"></canvas>
      <canvas id="canvas-dots"></canvas>
      <div className="waiting-room__exit-text" ref={text}>
        <h1>Hi <span>{name}</span></h1>
      </div>
    </div>
  )

}


export default Countdown;