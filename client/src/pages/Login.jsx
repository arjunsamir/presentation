// Import APIs
import { useState, useContext, useRef, useEffect } from "react"
import AppContext from "../store/AppContext"
import axios from "axios"
import anime from "animejs";
import { timer, delay } from "../helpers/utils"

// Import Components
import Input from "../components/Input"
import BackgroundVideo from "../components/BackgroundVideo"
import Branding from "../components/Branding"
import Preloader from "../components/Preloader";

// QueryString Example
// ?role=host&code=PRESENTATION-SECRET__PRESENTATION-CODE__PRESENTATION+NAME

const Login = () => {

  // Create State
  const { state, update } = useContext(AppContext)
  const [dataLoaded, setDataLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const container = useRef(null)
  const section = useRef(null)
  const loaded = dataLoaded && assetsLoaded;

  // Manage Host Mode
  const isHost = state.role === "host";

  // Transition Away From Login Page
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
        code: state.code,
        id: state.id
      });

      // Handle Errors
      if (!data.valid) throw data.message;

      // Wait For Minimum Response Time
      await t.hold();
      setIsFetching(false);

      // Update Global State & Session Storage
      window.sessionStorage.setItem("id", data.id);
      update("multiple", {
        id: data.id,
        name: data.presentation.name,
        count: data.presentation.count ?? state.count
      })
      
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

  // Make Initial Request
  useEffect(() => {

    const onPageLoad = async () => {

      // Start Loading Things
      const t = timer(2000).loop();
      const { data } = await axios(`${process.env.REACT_APP_API_DOMAIN}/api/presentation`);

      console.log(data);

      // Wait For Minimum Load Time
      await t.hold();

      const duration = 550;

      // Animate Preloader Out
      const tl = anime.timeline({
        easing: "easeOutQuad",
        duration
      });

      tl.add({
        targets: '.preload__dots',
        opacity: 0.01
      });

      tl.add({
        targets: '.preload',
        opacity: 0,
        duration: 1200
      })

      tl.add({
        targets: section.current,
        opacity: [0, 1]
      }, `-=${duration}`);

      tl.add({
        targets: container.current,
        opacity: [0, 1]
      })

      await tl.finished;

      setDataLoaded(true);

    }

    onPageLoad();

  }, []);

  return (
    <>
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
          onLoad={() => setAssetsLoaded(true)}
        />
        <div className="login__container" ref={container}>
          <h1 className="login__title">
            {
              isHost ? 
                "Hey Arjun, you know exactly what to do..." : 
                "Please enter your access code to join the presentation."
            }
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
      {!loaded  && <Preloader />}
    </>
  )

}


export default Login