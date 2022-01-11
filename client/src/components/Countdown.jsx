import { useLayoutEffect, useRef } from "react";
import useCodepenCountdown from "../hooks/useCodepenCountdown";
import anime from "animejs";
import { delay } from "../helpers/utils";


const Countdown = ({ onComplete }) => {


  // Create Refs
  const overlay = useRef();

  // Use The Canvas Effects
  useCodepenCountdown(async () => {
    const tl = anime.timeline({
      duration: 600,
      easing: "easeInQuad"
    });

    tl.add({
      targets: overlay.current,
      opacity: 1
    })

    await tl.finished;
    
    if (onComplete) onComplete();
  });

  useLayoutEffect(() => {

    const fadeIn = async () => {
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
    </div>
  )

}


export default Countdown;