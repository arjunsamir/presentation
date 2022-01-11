

module.exports = (io) => (client) => {

  console.log('New Websocket Connection 🚀');

  client.on("start-countdown", () => {
    client.emit("start-presentation");
    client.broadcast.emit("start-presentation");
  })

  // Handle Dissconect
  client.on('disconnect', () => {
    console.log('Client Disconnected');
  })

};