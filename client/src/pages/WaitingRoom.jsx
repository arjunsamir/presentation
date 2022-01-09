import { useState, useContext, useRef, useEffect } from "react"
import AppContext from "../store/AppContext"
import anime from "animejs";

import { PlayButton } from "../components/Buttons";
import Countdown from "../components/Countdown";
import { insertScript } from "../helpers/utils";
import Branding from "../components/Branding";

const entryAnimation = (container) => {

  const tl = anime.timeline({
    easing: "easeInOutQuad",
    duration: 1000
  });

  tl.add({
    targets: container,
    opacity: [0, 1]
  })

  return tl.finished

}

const WaitingRoom = () => {

  const { state, update } = useContext(AppContext);
  const container = useRef();
  const [containerStyle, setContainerStyle] = useState({
    opacity: 0
  });
  const [loaded, setLoaded] = useState(false);


  const startCountdown = async () => {

    const tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000
    });
  
    tl.add({
      targets: container.current,
      opacity: 0
    })

    await tl.finished;

    setContainerStyle({ opacity: 0 })
    update("counting", true)
  }


  useEffect(() => {

    const loadAssets = async () => {
      await insertScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js");
      setLoaded(true);
    }
    
    if (!loaded) loadAssets();
    entryAnimation(container.current).then(() => setContainerStyle({ opacity: 1 }));

  }, [loaded]);

  return (<>
    <Branding />
    <section className="waiting-room">
      {state.counting && (
        <Countdown
          conuting={state.counting}
          onComplete={() => console.log("you bitch")}
        />
      )}
      <div className="waiting-room__container" ref={container} style={containerStyle}>
        <h1>The presentation will begin soon</h1>
        <p>This is an interactive presentation. You'll be able to interact and explore things on some of the slides.</p>
      </div>
      {loaded && (
        <div className="waiting-room__controls">
          <PlayButton
            onClick={startCountdown}
            disabled={state.counting}
          />
        </div>
      )}
    </section>
  </>);
}

export default WaitingRoom;