// Import APIs
import { useState, useContext, useRef } from "react"
import AppContext from "../store/AppContext"
import axios from "axios"
import anime from "animejs";
import { timer } from "../helpers/utils"

// Import Components
import Input from "../components/Input"
import BackgroundVideo from "../components/BackgroundVideo"
import Branding from "../components/Branding"

// QueryString Example
// ?role=host&code=PRESENTATION-SECRET__PRESENTATION-CODE__PRESENTATION+NAME

const Login = () => {

  // Create State
  const { state, update } = useContext(AppContext)
  const [error, setError] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const container = useRef(null)
  const section = useRef(null)

  // Manage Host Mode
  const isHost = state.role === "host";

  const transitionOut = async () => {

    const tl = anime.timeline({
      easing: "easeInOutQuad",
      duration: 700
    });

    tl.add({
      targets: container.current,
      opacity: 0
    })

    tl.add({
      targets: section.current.querySelector(".background-video"),
      opacity: 0,
      duration: 1300
    })

    await tl.finished;

  }

  // Manage Submit Event
  const onSubmit = async () => {

    // Prepare for minimum response time for animation
    setIsFetching(true);
    const t = timer(1000).start();

    try {

      // Send Request
      const { data } = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/${isHost ? "authenticate" : "validate"}`, {
        code: state.code
      });

      // Handle Errors
      if (!data.valid) throw data.message;

      // Wait For Minimum Response Time
      await t.hold();
      setIsFetching(false);

      // Update Global State & Session Storage
      // window.sessionStorage.setItem("id", data.id);
      update("multiple", {
        id: data.id,
        name: data.presentation.name,
        count: data.presentation.count ?? state.count
      })
      // update("id", data.id);
      // update("name", data.presentation.name);
      
      // Go To Waiting Room
      await transitionOut();
      update("view", data.presentation.view ?? "WaitingRoom");
      
    }
    catch (err) {
      await t.hold();
      setError(err || "Something went wrong. Please try again.");
      setIsFetching(false);
    }
  }

  return (<>
    <Branding />
    <section className="login" ref={section}>
      <BackgroundVideo
        sources={[
          {
            src: "/assets/video/arjun-blur.webm",
            type: "video/webm"
          },
          {
            src: "/assets/video/arjun-blur.mp4",
            type: "video/mp4"
          }
        ]}
        overlay={{
          opacity: 0.65
        }}
      />
      <div className="login__container" ref={container}>
        <h1 className="login__title">{isHost ? 
          "Hey Arjun, you know exactly what to do..." : 
          "Please enter your access code to join the presentation."}
        </h1>
        <Input
          id="accessCode"
          label="Access Code"
          placeholder="quantum-chakras"
          value={state.code}
          onChange={code => {
            update("code", code)
            if (error) setError("");
          }}
          valid={state.code.length > 6}
          error={error}
          inlineForm
          showLoader={isFetching}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  </>)

}


export default Login