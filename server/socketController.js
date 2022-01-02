const Presentation = require("./Presentation");


module.exports = (io) => (client) => {

  console.log('New Websocket Connection 🚀');

  client.on('disconnect', () => {
    console.log('Client Disconnected');
  })

};