import { useLayoutEffect, useRef } from "react";
import anime from "animejs";

const DesignDNA = ({ transitionOut }) => {

  // Create Refs
  const text = useRef();
  const subtitle = useRef();
  const slide = useRef();
  const dna = useRef();

  // Mousmove Animation
  const mouseMove = useRef((e) => {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (centerX - e.clientX);
    const deltaY = (centerY- e.clientY);

    const angleX = ((deltaX / centerX) * 20) + 25;
    const scale = Math.abs((deltaX / centerX) * .2) + 1;

    const shift = -0.25;
  
    anime({
      targets: dna.current,
      translateX: shift * deltaX,
      translateY: shift * deltaY,
      rotate: angleX,
      scale,
      duration: 0
    })

  });

  // Handle Slide Transitions
  useLayoutEffect(() => {

    const entryAnimation = () => {

      window.addEventListener("mousemove", mouseMove.current);

      const tl = anime.timeline({
        easing: "easeInQuad",
        duration: 500
      });
  
      tl.add({
        targets: text.current,
        opacity: [0, 1]
      })

      tl.add({
        targets: subtitle.current,
        opacity: [0, 1]
      })

      tl.add({
        targets: dna.current,
        opacity: [0, 0.85],
        duration: 1000
      })

    }

    // Run Entry Animation
    entryAnimation();
    
    transitionOut.current = async () => {

      const tl = anime.timeline({
        easing: "easeOutQuad",
        duration: 500
      });

      tl.add({
        targets: subtitle.current,
        opacity: 0
      })

      tl.add({
        targets: text.current,
        opacity: 0
      }, "-=250")

      tl.add({
        targets: slide.current,
        opacity: 0
      }, "-=250")

      await tl.finished;

      window.removeEventListener("mousemove", mouseMove.current);

    }

  }, [])

  return (
    <div className="slide" ref={slide}>
      <div className="slide__centered">
        <div className="slide__content">
          <h4 className="slide__super-title" ref={text}>Design is in my <span className="accent--primary">DNA</span></h4>
          <p className="slide__subtitle large centered-text" ref={subtitle}>It turns out "design thinking" is just my normal mode of thinking.</p>
        </div>
      </div>
      <div className="dna" ref={dna}>
        {new Array(30).fill("dna__strand").map((c, i) => (
          <div 
            key={i} 
            className={c}
          />
        ))}
      </div>
    </div>
  )
};


export default DesignDNA;

// This slide should be the generic intro slide