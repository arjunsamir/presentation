import { useContext, useRef, useEffect, useLayoutEffect } from "react"
import AppContext from "../store/AppContext"
import anime from "animejs";
import useAsyncScriptLoad from "../hooks/useAsyncScriptLoad";

import { PlayButton } from "../components/Buttons";
import Countdown from "../components/Countdown";
import Branding from "../components/Branding";


const WaitingRoom = () => {

  // Manage State
  const { state, update, socket } = useContext(AppContext);
  const moved = useRef(false);
  const container = useRef();
  const blob = useRef();

  // Create Function to track mousemovement
  const followMouse = useRef((e) => {
      
    const offset = window.innerHeight * 0.3;

    if (!moved.current) {
      anime({
        targets: blob.current,
        opacity: 1,
        duration: 1200,
        easing: "easeOutQuad"
      })
      moved.current = true;
    }
  
    anime({
      targets: blob.current,
      translateX: e.clientX - offset,
      translateY: e.clientY - offset,
      duration: 0
    })
  
  })

  // Create Function to handle socket events
  const handleCountdownStart = useRef(async () => {

    const tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000
    });

    tl.add({
      targets: blob.current,
      opacity: 0
    })
  
    tl.add({
      targets: container.current,
      opacity: 0
    }, "-=500")

    await tl.finished;

    update("counting", true)
    
  })

  // Load Scripts for countdown
  const loaded = useAsyncScriptLoad("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js")

  // Add Event Listeners
  useEffect(() => {

    if (!state.counting) {
      window.addEventListener("mousemove", followMouse.current);
      socket.on("start-presentation", handleCountdownStart.current)
    }
    else {
      window.removeEventListener("mousemove", followMouse.current);
      socket.off("start-presentation", handleCountdownStart.current);
    }
  
  }, [state.counting])

  // Animate Content Into View
  useLayoutEffect(() => {

    const tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000
    });
  
    tl.add({
      targets: container.current,
      opacity: [0, 1]
    })

    anime.set(blob.current, {
      opacity: 0
    });

  }, [])

  console.log(state)

  return (<>
    <Branding />
    <section className="waiting-room">
      {state.counting && (
        <Countdown
          name={state.name}
          onComplete={() => update("view", "Presentation")}
        />
      )}
      <div className="waiting-room__bg-accent">
        <span ref={blob} />
      </div>
      <div className="waiting-room__container" ref={container}>
        <h1>The presentation will begin soon</h1>
        <p>Welcome to my portfolio review. Some of the slides will have interactive elements that you can explore during the presentation.</p>
      </div>
      {loaded && state.role === "host" && (
        <div className="waiting-room__controls">
          <p>{state.count || "No"} Guest{state.count !== 1 && "s"}</p>
          <PlayButton
            disabled={state.counting}
            onClick={() => {

              // Start Countdown For Everyone
              socket.emit("start-countdown", { message: 'hello' });

              const tl = anime.timeline({
                easing: "easeInOutQuad"
              });

              tl.add({
                targets: '.waiting-room__controls > p',
                duration: 300,
                opacity: 0
              });

              tl.add({
                targets: '.waiting-room__controls > p',
                duration: 400,
                width: 0
              });

              tl.add({
                targets: '.waiting-room__controls',
                scale: 0,
                duration: 300
              });

            }}
          />
        </div>
      )}
    </section>
  </>);
}

export default WaitingRoom;