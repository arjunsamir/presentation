import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../store/AppContext";
import HostControls from "../components/HostControls";
import Branding from "../components/Branding";

// Import Slides
import Intro from "../slides/Intro";

// Register Slides
const Slides = [Intro];

const Presentation = () => {

  // Create State
  const { state } = useContext(AppContext);
  const [slideIndex, setSlideIndex] = useState(state.slide);

  // Manage Slide Transition Functions 
  const transitionOut = useRef();

  // Get Current Slide
  const Slide = Slides[slideIndex];

  // Manage Slide Transitions
  useEffect(() => {

    const changeSlides = async () => {

      // Wait For Slide Exit Animation
      if (transitionOut.current) await transitionOut.current();

      // Reset Ref Value
      transitionOut.current = null;

      setSlideIndex(state.slide);

    }

    changeSlides();

  }, [state.slide]);

  return (
    <>
      <Branding />
      <section className="presentation">
        <Slide transitionOut={transitionOut} />
        {state.role === "host" && <HostControls />}
      </section>
    </>
  )

}


export default Presentation;