
// https://codepen.io/allanpope/pen/eNgGJm

import { useEffect } from "react";

const useCodepenCountdown = (callback) => {

  useEffect(() => {

    var numberStage,
      numberStageCtx,
      numberStageWidth = 680,
      numberStageHeight = 420,
      numberOffsetX,
      numberOffsetY,

      stage,
      stageCtx,
      stageWidth   = window.innerWidth,
      stageHeight  = window.innerHeight,

      countdownFrom = 3,
      countdownTimer = 2800,
      countdownRunning = true,

      loopRef,
      dots = [],
      numberPixelCoordinates,
      circleRadius = 2,
      colors = ['61, 207, 236', '167, 207, 135', '170, 146, 204', '151, 211, 226'];

    
    function updateCanvasSize() {
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;
    }

    window.addEventListener('resize', updateCanvasSize);

    function init() {

      // Init stage which will have numbers
      numberStage = document.getElementById("canvas-number");
      numberStageCtx = numberStage.getContext('2d');
      // Set the canvas to width and height of the window
      numberStage.width = numberStageWidth;
      numberStage.height = numberStageHeight;
      
      // Init Stage which will have dots
      stage = document.getElementById("canvas-dots");
      stageCtx = stage.getContext('2d');
      stage.width = stageWidth;
      stage.height = stageHeight;

      // Create offset so text appears in middle of screen
      numberOffsetX = (stageWidth - numberStageWidth) / 2;
      numberOffsetY = (stageHeight - numberStageHeight) / 2;
    }

    init();


    function Dot(x, y, color, alpha) {

      var _this = this;

      _this.x = x;
      _this.y = y;
      _this.color = color;
      _this.alpha = alpha;

      this.draw = function() {
      stageCtx.beginPath();
      stageCtx.arc(_this.x, _this.y, circleRadius, 0, 2*Math.PI, false);
      stageCtx.fillStyle = 'rgba(' + _this.color + ', ' + _this.alpha + ')';
      stageCtx.fill();
      }

    }


    for (var i = 0; i < 2240; i++) {

      // Create a dot
      var dot = new Dot(randomNumber(0, stageWidth), randomNumber(0, stageHeight), colors[randomNumber(1, colors.length)], .3);

      // Push to into an array of dots
      dots.push(dot);

      // Animate dots
      tweenDots(dot, '', 'space');	
    }


    function countdown() {

      // Send number to be drawn
      drawNumber(countdownFrom.toString());

      // When we hit zero stop countdown
      if (countdownFrom === 0) {
        countdownRunning = false;
        // Now that countdowns finised show the text Go
        drawNumber('Hi', '600 400px Recoleta');
        if (callback) setTimeout(callback, countdownTimer);
      }

      // Decrement number down
      countdownFrom--;
    }
    countdown();


    function loop() {

      stageCtx.clearRect(0,0,stageWidth, stageHeight);

      for(var i = 0; i < dots.length; i++) {
        dots[i].draw(stageCtx);
      }

      loopRef = requestAnimationFrame(loop);
    }

    loop();


    function drawNumber(num, font) {

    // Create a number on a seperate canvas
    // Use a seperate canvas thats smaller so we have less data to loop over when using getImagedata()

    //	Clear stage of previous numbers
    numberStageCtx.clearRect(0,0,numberStageWidth, numberStageHeight);

    numberStageCtx.fillStyle = "#0A0C0D";
    numberStageCtx.textAlign = 'center';
    numberStageCtx.font = font || "bold 418px Recoleta";
    numberStageCtx.fillText(num, 340, 400);

    var ctx = document.getElementById('canvas-number').getContext('2d');
      
      // getImageData(x, y, width, height)
      // note: is an exspenisve function, so make sure canvas is small as possible for what you grab
      // Returns 1 Dimensional array of pixel color value chanels
      // Red, blue, green, alpha chanel of single pixel
      // First chanel is red
      var imageData = ctx.getImageData(0,0,numberStageWidth,numberStageHeight).data;

      // Clear number coordinated
      numberPixelCoordinates = [];

      // i is equal to total image data(eg: 480,000)
      // run while i is greater or equal to 0
      // every time we run it minus 4 from i. Do this because each pixel has 4 chanels & we are only interested in individual pixels 
      for (var i = imageData.length; i >= 0; i -= 4) {

            // If not an empty pixel
            if (imageData[i] !== 0) {
              
                // i represents the position in the array a red pixel was found

                // (i / 4 ) and percentage by width of canvas
                // Need to divide i by 4 because it has 4 values and you need its orginal position
                // Then you need to percentage it by the width(600) because each row contains 600 pixels and you need its relative position in that row
                var x = (i / 4) % numberStageWidth;
              
                // (i divide by width) then divide by 4
                // Divide by width(600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its postion within the row
                var y = Math.floor(Math.floor(i/numberStageWidth)/4);

                // If position exists and number is divisble by circle plus a pixel gap then add cordinates to array. So circles do not overlap
                if((x && x%(circleRadius * 2 + 3) === 0) && (y && y%(circleRadius * 2 + 3) === 0)) {																															
                    // Push object to numberPixels array with x and y coordinates
                    numberPixelCoordinates.push({x: x, y: y});
                  
                }

            }
      }

      formNumber();

    }


    function formNumber() {

      for (var i = 0; i < numberPixelCoordinates.length; i++) {

      // Loop out as many coordionates as we need & pass dots in to animate
        tweenDots(dots[i], numberPixelCoordinates[i], '');
      }

      // Break number apart
      if (countdownRunning && countdownFrom > 0) {
      setTimeout(function() {
        breakNumber();
      }, countdownTimer);
      }
    }

    function breakNumber() {

      for (var i = 0; i < numberPixelCoordinates.length; i++) {
        tweenDots(dots[i], '', 'space');	
      }

      if (countdownRunning) {
        // Build next number
        setTimeout(function() {
          countdown();
        }, countdownTimer);
      }

    }


    function tweenDots(dot, pos, type) {

      // Move dots around canvas randomly
      if (type === 'space') {
          
      // Tween dot to coordinate to form number
      window.TweenMax.to(dot, (3 + Math.round(Math.random() * 100) / 100), {
        x: randomNumber(0, stageWidth),  
        y: randomNumber(0, stageHeight),
        alpha: 0.3,
        ease: window.Cubic.easeInOut,
        onComplete: function() {
          tweenDots(dot, '', 'space');
        }
      });

      } else {

        // Tween dot to coordinate to form number
        window.TweenMax.to(dot, (1.5 + Math.round(Math.random() * 100) / 100), {
          x: (pos.x + numberOffsetX),
          y: (pos.y + numberOffsetY),
          delay: 0,
          alpha: 1,
          ease: window.Cubic.easeInOut,
          onComplete: function() {
          }
        });

      }
    }


    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    return () => {
      cancelAnimationFrame(loopRef)
      window.removeEventListener('resize', updateCanvasSize)
    }

  }, [callback])

}


export default useCodepenCountdown;