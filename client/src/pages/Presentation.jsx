import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../store/AppContext";
import HostControls from "../components/HostControls";
import Branding from "../components/Branding";

// Import Slides
import Intro from "../slides/Intro";
import DesignDNA from "../slides/DesignDNA";
import Perspective from "../slides/Perspective";
import EarlyWork from "../slides/EarlyWork";
import Today from '../slides/Today';
import CaseIntro from '../slides/CaseIntro';
import CaseContext from '../slides/CaseContext';
import CaseConstraints from "../slides/CaseConstraints";
import CaseDemo from '../slides/CaseDemo';
import CaseCompetition from "../slides/CaseCompetition";
import CaseInspiration from "../slides/CaseInspiration";
import ThankYou from "../slides/ThankYou";

// Register Slides
const Slides = [Intro, DesignDNA, Perspective, EarlyWork, Today, CaseIntro, CaseContext, CaseConstraints, CaseDemo, CaseCompetition, CaseInspiration, ThankYou];

const Presentation = () => {

  // Create State
  const { state, update, socket } = useContext(AppContext);

  // Manage Slide Transition Functions 
  const transitionOut = useRef();

  const changeSlides = useRef(async ({ slide }) => {

    // Wait For Slide Exit Animation
    if (transitionOut.current) await transitionOut.current();

    // Reset Ref Value
    transitionOut.current = null;

    // Update State
    update("slide", slide);

  });

  // Get Current Slide
  const Slide = Slides[state.slide];

  // Manage Slide Transition Listeners
  useEffect(() => {

    socket.on("slide-change", changeSlides.current);

    return () => socket.off("slide-change", changeSlides.current);

  }, []);

  return (
    <>
      <Branding />
      <section className="presentation">
        <Slide transitionOut={transitionOut} />
        {state.role === "host" && <HostControls slides={Slides.length} />}
      </section>
    </>
  )

}


export default Presentation;