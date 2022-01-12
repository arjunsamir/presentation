

module.exports = (io) => (client) => {

  console.log('New Websocket Connection 🚀');

  // Handle Client Connection
  if (instance.presentation) {
    const count = instance.presentation.join(client.id);
    client.broadcast.emit("guests-changed", { count });
  }

  // Handle Dissconect
  client.on('disconnect', () => {
    const count = instance.presentation?.leave(client.id) || 0;
    client.broadcast.emit("guests-changed", { count });
  })

  
  // Handle Start Countdown
  client.on("start-countdown", () => {
    client.emit("start-presentation");
    client.broadcast.emit("start-presentation");
    instance.presentation?.start()
  })


  // Handle Slide Change
  client.on("change-slide", ({ slide }) => {
    instance.presentation?.changeSlide(slide);
    client.emit("slide-change", { slide });
    client.broadcast.emit("slide-change", { slide });
  })


};