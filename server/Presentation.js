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

  join(code, currentId) {

    console.log(currentId);

    // Check if code is valid
    if (!code || !this.code || code !== this.code) return;

    // Check if user is already in presentation
    if (currentId && this.getGuests().includes(currentId)) return ({
      presentation: this, 
      id: currentId 
    })

    // Give Host Access Back To Host
    else if (currentId === this.getHost()) return ({
      presentation: this,
      id: currentId,
      role: 'host'
    });

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