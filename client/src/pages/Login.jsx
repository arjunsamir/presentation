// Import APIs
import { useState, useContext, useRef, useEffect } from "react"
import AppContext from "../store/AppContext"
import axios from "axios"
import anime from "animejs";
import { timer } from "../helpers/utils"

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
  const [loaded, setLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const container = useRef(null)
  const section = useRef(null)
  const loopTimer = useRef(null)

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

    // Prevent Multiple Submits
    if (isFetching) return;

    // Prepare for minimum response time for animation
    setIsFetching(true);
    const t = timer(1000).start();

    try {

      // Send Request
      const { data } = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/authenticate`, {
        code: state.code,
        key: state.key
      });

      // Handle Errors
      if (!data.valid) throw data.message;

      // Wait For Minimum Response Time
      await t.hold();
      setIsFetching(false);

      // Update Global State & Session Storage
      window.sessionStorage.setItem("code", data.presentation.code);
      if (data.key) window.sessionStorage.setItem("key", data.key);

      // Update Global State
      update("multiple", {
        name: data.presentation.name,
        count: data.presentation.count ?? state.count,
        key: data.key ?? state.key,
        role: data.role ?? state.role,
        code: data.presentation.code ?? state.code,
      })
      
      // Transition Out
      await transitionOut();

      // Go To Waiting Room
      update("multiple", {
        slide: data.presentation.slide ?? state.slide,
        view: data.presentation.view ?? "WaitingRoom"
      })
      
    }

    catch (err) {
      await t.hold();
      setError(err || "Something went wrong. Please try again.");
      setIsFetching(false);
    }

  }

  // Hanadle Preloader State
  useEffect(() => {

    const onPageLoad = async (duration) => {

      // Wait For Minimum Load Time
      await loopTimer.current.hold();

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

      setLoaded(true);

    }

    if (assetsLoaded) onPageLoad(550)
    else loopTimer.current = timer(2000).loop()

  }, [assetsLoaded]);

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
          <h1 className="login__title">Please enter your access code to join the presentation.</h1>
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