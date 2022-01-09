import anime from 'animejs';
import { useRef, useEffect } from 'react';

const config = {
  circleRadius: 2,
  dotCount: 2240,
  numCanvas: {
    height: 420,
    width: 640
  },
  colors: ['61, 207, 236', '255, 244, 174', '255, 211, 218', '151, 211, 226'],
  spaceAlpha: 0.3,
  startingNumber: 5,
  duration: 2500
}

class Dot {
  constructor(x, y, color, alpha) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = alpha;
  }

  draw(ctx) {
    ctx.beginPath();
		ctx.arc(this.x, this.y, config.circleRadius, 0, 2 * Math.PI, false);
		ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
		ctx.fill();
  }
}

const Countdown = ({ counting, onComplete }) => {

  // Create Refs for height and width
  const stageHeight = useRef(window.innerHeight);
  const stageWidth = useRef(window.innerWidth);

  // Canvas Refs
  const stage = useRef(null);
  const numStage = useRef(null);
  const stageCtx = useRef(null);
  const numCtx = useRef(null);
  
  // Stateful Refs
  const dots = useRef([]);
  const number = useRef(config.startingNumber);
  const numberPixelCoords = useRef([]);
  const offsets = useRef({
    x: (stageWidth.current - config.numCanvas.width) / 2,
    y: (stageHeight.current - config.numCanvas.height) / 2
  });

  // Initialize The Canvas
  useEffect(() => {

    // Create Variables
    let animationFrameRef;

    // Animate Dots In Space
    const animateSpace = (dot) => anime({
      targets: dot,
      x: anime.random(0, stageWidth.current),
      y: anime.random(0, stageHeight.current),
      alpha: config.spaceAlpha,
      duration: 3 + Math.round(Math.random() * 100) / 100,
      easing: 'easeInOutQuad',
      complete: () => animateSpace(dot)
    });

    const animateText = (dot, pos) => anime({
      targets: dot,
      x: pos.x + offsets.current.x,
      y: pos.y + offsets.current.y,
      delay: 0,
      alpha: 1,
      easing: 'easeInOutQuad',
      duration: 1.5 + Math.round(Math.random() * 100) / 100,
      complete: () => {}
    })

    const formText = () => {

      for (let i = 0; i < numberPixelCoords.current.length; i++) {
        animateText(dots.current[i], numberPixelCoords.current[i]);
      }

      if (number.current) {
        setTimeout(() => breakText(), config.duration);
      }

    }

    const breakText = () => {
      for (let i = 0; i < numberPixelCoords.current.length; i++) {
        animateSpace(dots.current[i]);
      }

      if (number.current) setTimeout(() => countdown(), config.duration);
    }

    const drawText = (text) => {

      // Clear Previous Number
      numCtx.current.clearRect(0, 0, config.numCanvas.width, config.numCanvas.height);

      // Draw New Number
      numCtx.current.fillStyle = "#0A0C0D";
      numCtx.current.textAlign = "center";
      numCtx.current.font = "bold 418px Recoleta";
      numCtx.current.fillText(text, 340, 400);

      // Get Image Data
      const imageData = numCtx.current.getImageData(0, 0, config.numCanvas.width, config.numCanvas.height).data;

      // Clear Number Coordinated
      numberPixelCoords.current = [];

      for (let i = imageData.length; i >= 0; i -= 4) {
        if (imageData[i] === 0) continue;
        const x = i / 4 % config.numCanvas.width;
        const y = Math.floor(i /config.numCanvas.width / 4);
        if ((x && x%(config.circleRadius * 2 + 3) == 0) && (y && y%(config.circleRadius * 2 + 3) == 0)) {
          numberPixelCoords.current.push({ x, y });
        }
      }

      formText();

    };

    const countdown = () => {

      drawText(number.current.toString());
      if (!number.current) onComplete();
      else number.current--;

    }

    // Create Animation Frame Loop
    const loop = () => {
      stageCtx.current.clearRect(0, 0, stageWidth.current, stageHeight.current);
      
      for(let i = 0; i < dots.current.length; i++) {
        dots.current[i].draw(stageCtx.current);
      }

      animationFrameRef = requestAnimationFrame(loop);

    }

    // Get Canvas Contexts
    stageCtx.current = stage.current.getContext('2d');
    numCtx.current = numStage.current.getContext('2d');

    // Set Height Of Number Canvas
    numStage.current.width = config.numCanvas.width;
		numStage.current.height = config.numCanvas.height;

    // Set Height Of Dot Canvas
    stage.current.width = stageWidth.current;
    stage.current.height = stageHeight.current;

    // Draw Dots
    for (let i = 0; i < config.dotCount; i++) {
      // Create Dot
      const dot = new Dot(
        anime.random(0, stageWidth.current),
        anime.random(0, stageHeight.current),
        config.colors[anime.random(1, config.colors.length)],
        .3
      );

      // Add Dot To Array
      dots.current.push(dot);

      // Animate Dot
      animateSpace(dot);

    }

    // Initialize Loop
    countdown();
    loop();

    // Clean Up Animation Frames
    return () => cancelAnimationFrame(animationFrameRef);

  }, []);

  return (
    <div className="countdown">
      <canvas id="canvas-number" ref={numStage}></canvas>
      <canvas id="canvas-dots" ref={stage}></canvas>
    </div>
  )

}


export default Countdown;