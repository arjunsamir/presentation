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
    this.count = 0;

  }

  isHost(id) {
    return this.getHost() === id;
  }

  join(code) {

    // Check if code is valid
    if (!code || !this.code || code !== this.code) return;

    // Add Guest
    const id = uniqid();
    this.addGuest(id);

    // Update Count
    this.count = this.getGuests().length;

    // Return Presentaiton
    return { presentation: this, id };

  }

  leave(id) {
      
      // Check if code is valid
      if (!id || !this.getGuests().includes(id)) return;
  
      // Remove Guest
      this.removeGuest(id);

      // Update Count
      this.count = this.getGuests().length;
  
  }

}


module.exports = Presentation;