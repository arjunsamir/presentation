import { useLayoutEffect, useRef, useState } from "react";
import anime from "animejs";
import SlideTabs from "../components/SlideTabs";

import blacklaneImg from '../assets/img/cs-1.png'
import orlandoBlackCarImg from '../assets/img/cs-2.png'
import theBlackCarImg from '../assets/img/cs-3.png'

const CaseCompetition = ({ transitionOut }) => {

  // Create Refs
  const slide = useRef();

  // Handle Slide Transitions
  useLayoutEffect(() => {

    const entryAnimation = () => {

      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });
  
      tl.add({
        targets: slide.current,
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
        targets: slide.current,
        opacity: 0
      })

      return tl.finished;

    }

  }, [])

  return (
    <div className="slide" ref={slide}>

      <div className="slide__view">
        <h1 className="slide__title centered-text">Analyzing the Competition</h1>
        <hr />
        <SlideTabs
          tabs={[
            {
              title: "The Black Car Service",
              content: (
                <div className="slide__image-box">
                  <img src={theBlackCarImg} alt="Screenshot of website" />
                </div>
              )
            },
            {
              title: "Orlando Black Car",
              content: (
                <div className="slide__image-box">
                  <img src={orlandoBlackCarImg} alt="Screenshot of website" />
                </div>
              )
            },
            {
              title: "Blacklane",
              content: (
                <div className="slide__image-box">
                  <img src={blacklaneImg} alt="Screenshot of website" />
                </div>
              )
            }
          ]}
        />
      </div>

    </div>
  )
};


export default CaseCompetition;

// This slide should be the generic intro slide