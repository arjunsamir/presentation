export default class Timer {

  constructor( threshold = 2000 ) {

      this.threshold = threshold;
      this.timeout = null;
    
  }

  start( callback ) {
      this.initial = new Date();

      if ( !callback ) return this;

      clearTimeout( this.timeout );
      this.timeout = setTimeout( callback, this.threshold );

      return this;
  }

  stop() {
      this.final = new Date();
      this.elapsed = this.final - this.initial;
      this.remaining = ( this.elapsed >= this.threshold ) ? 0 : ( this.threshold - this.elapsed );
  }

  async hold() {
      this.stop();
      if ( this.remaining ) await new Promise(resolve => setTimeout(resolve, this.remaining));
      return true;
  }

  reset() {
      this.elapsed = 0;
      this.remaining = 0;
  }

}