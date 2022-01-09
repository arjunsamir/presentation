import { useState, useContext, useRef, useEffect } from "react"
import AppContext from "../store/AppContext"
import anime from "animejs";

import { ReactComponent as PlayIcon } from '../assets/icons/play-button.svg'

const WaitingRoom = () => {

  const { state, update } = useContext(AppContext);
  const container = useRef();
  const [containerStyle, setContainerStyle] = useState({
    opacity: 0
  })

  useEffect(() => {

    const tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000
    });

    tl.add({
      targets: container.current,
      opacity: [0, 1]
    })

    tl.finished.then(() => setContainerStyle({ opacity: 1 }))

  }, []);

  return (
    <section className="waiting-room">
      <div className="waiting-room__container" ref={container} style={containerStyle}>
        <h1>The Presentation Will Begin Soon</h1>
      </div>
      {/* {state.role === "host" && (
        <div className="waiting-room__controls">
          <button>
            <PlayIcon />
          </button>
        </div>
      )} */}
    </section>
  );
}

export default WaitingRoom;