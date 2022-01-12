import { useLayoutEffect, useRef, useState } from "react";
import anime from "animejs";

// Import assets
import orb from '../assets/img/orb.png';
import code from "../assets/img/code.png";
import { ReactComponent as LayersIcon } from '../assets/icons/layers.svg';

const Perspective = ({ transitionOut }) => {

  // Create Refs
  const smallTitle = useRef();
  const bigTitle = useRef();
  const layerBtn = useRef();
  const orbLayer = useRef();
  const orbImg = useRef();
  const titleLayer = useRef();
  const codeLayer = useRef();
  const slide = useRef();
  const stack = useRef();

  const isTilted = useRef(false);

  const triggerLayers = useRef(async (forceClose) => {

    const duration = 600;

    const tl = anime.timeline({
      easing: "easeOutQuad",
      duration
    });

    // Tilt the screen
    if (!isTilted.current && !forceClose) {

      tl.add({
        targets: stack.current,
        rotate: -30,
        skew: 25,
        translateX: 200,
        translateY: -200
      })

      tl.add({
        targets: titleLayer.current,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        translateX: 100,
        translateY: -100
      }, `-=${duration / 2}`)

      tl.add({
        targets: orbLayer.current,
        backgroundColor: "rgba(255, 255, 255, 0.25)"
      }, `-=${duration}`)

      tl.add({
        targets: codeLayer.current,
        translateX: -100,
        translateY: 100
      }, `-=${duration}`)

    }

    // Un-Tilt the screen
    if (isTilted.current) {

      tl.add({
        targets: stack.current,
        rotate: 0,
        skew: 0,
        translateX: 0,
        translateY: 0
      })

      tl.add({
        targets: titleLayer.current,
        backgroundColor: "rgba(255, 255, 255, 0)",
        translateX: 0,
        translateY: 0
      }, `-=${duration / 2}`)

      tl.add({
        targets: orbLayer.current,
        backgroundColor: "#0A0C0D"
      }, `-=${duration}`)

      tl.add({
        targets: codeLayer.current,
        translateX: 0,
        translateY: 0
      }, `-=${duration}`)

    }

    await tl.finished;

    isTilted.current = !isTilted.current;

  })

  // Handle Slide Transitions
  useLayoutEffect(() => {

    const entryAnimation = () => {

      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });

      tl.add({
        targets: smallTitle.current,
        opacity: [0, 1]
      })
      
      tl.add({
        targets: bigTitle.current,
        opacity: [0, 1]
      })

      tl.add({
        targets: orbImg.current,
        opacity: [0, 1]
      }, "-=500")

      tl.add({
        targets: layerBtn.current,
        scale: [0, 1],
        duration: 200,
        delay: 100
      })

      

    }

    // Run Entry Animation
    entryAnimation();
    
    transitionOut.current = async () => {

      await triggerLayers.current(true);

      const tl = anime.timeline({
        easing: "easeOutQuad",
        duration: 500
      });

      tl.add({
        targets: slide.current,
        opacity: 0
      })

      return tl.finished;

    }

  }, [])

  return (
    <div className="slide" ref={slide}>
      <div className="perspective" ref={stack}>

        <div className="perspective__code" ref={codeLayer}>
          <img src={code} alt="Visual Studio Code" />
        </div>

        <div className="perspective__orb" ref={orbLayer}>
          <img src={orb} alt="Swirling orb" ref={orbImg} />
        </div>

        <div className="perspective__title" ref={titleLayer}>
          <h1 className="slide__jumbo-title" ref={smallTitle}>A designer with</h1>
          <h1 className="slide__super-title" ref={bigTitle}><span className="accent--primary">perspective</span></h1>
          <button
            className="perspective__switch"
            onClick={() => triggerLayers.current()}
            ref={layerBtn}
          >
            <LayersIcon />
          </button>
        </div>
        
      </div>
    </div>
  )
};


export default Perspective;

// This slide should be the generic intro slide