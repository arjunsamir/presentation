import { useLayoutEffect, useRef, useState } from "react";
import anime from "animejs";
import SlideTabs from "../components/SlideTabs";

const CaseContext = ({ transitionOut }) => {

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
        <h1 className="slide__title centered-text">Some context about the project</h1>
        <hr />
        <SlideTabs
          tabs={[
            {
              title: "The Goal",
              content: (
                <div className="slide__content-box">
                  <h4>Facilitating Online Booking</h4>
                  <p>United Travel lacked any sort of digital presence when this project started. The primary objective that they were after was the ability for their clients to schedule and book rides in advance. This would be the centerpiece of the project, with the website being designed to push the booking feature.</p>
                </div>
              )
            },
            {
              title: "The Customers",
              content: (
                <div className="slide__content-box">
                  <h4>Who are the users?</h4>
                  <p>Without any type of real analytics, I had to use some creativity to understand who the users were based on the general description of their customers. Since they operate in Orlando, a lot of their business comes from tourism, primarily from South American and European tourists. They drive a lot of families and their client base was generally in their 30s and 40s.</p>
                </div>
              )
            }
          ]}
        />
      </div>

    </div>
  )
};


export default CaseContext;

// This slide should be the generic intro slide