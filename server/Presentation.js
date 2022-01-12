const uniqid = require('uniqid');

class Presentation {

  constructor(code, name, host) {

    const _private = {
      host: host ?? uniqid(),
      guests: []
    };

    // Manage Presentation Variables
    this.getHost = () => _private.host;
    this.getGuests = () => _private.guests;
    this.addGuest = (guest) => _private.guests.push(guest);
    this.removeGuest = (guest) => _private.guests.splice(_private.guests.indexOf(guest), 1);
    this.setGuests = (guests) => _private.guests = guests;

    // Manage Presentation Properties
    this.code = code;
    this.name = name;
    this.view =  "WaitingRoom";
    this.slide = 0;
    this.count = 0;

  }

  isHost(key) {
    return this.getHost() === key;
  }

  updateCount() {
      
      // Update Count
      this.count = this.getGuests().length - 1;
      if (this.count < 0) this.count = 0;

      return this.count;
  
  }

  join(id) {

    this.addGuest(id);

    // Update Count
    return this.updateCount();

  }

  validate(code, key) {

    // Check if user is Host trying to re-join
    if (key && this.isHost(key) && code === this.code) return ({
      presentation: this,
      role: "host"
    })

    if (code === this.code) return ({
      presentation: this,
      role: "guest"
    })

  }

  leave(id) {
      
      // Check if code is valid
      if (!id || !this.getGuests().includes(id)) return;
  
      // Remove Guest
      this.removeGuest(id);

      // Update Count
      return this.updateCount();
  
  }

  start() {
    this.view = "Presentation";
  }

  changeSlide(slide) {
    this.slide = slide;
  }

}


module.exports = Presentation;