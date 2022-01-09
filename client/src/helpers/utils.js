import Timer from "./Timer";

export const join = (...items) => {
  return items.map(i => {
    switch(typeof i) {
      case 'string':
        return i;
      case 'object':
        if (i[0] && i[1]) return i[1];
        else if (i[0]) return i[0];
        else return null;
      default:
        return null;
    }
  }).filter(i => i).join(' ') || null;
}


export const delay = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}


export const timer = (time) => new Timer(time);


export const insertScript = (src, id) => {

  return new Promise(resolve => {

      const ref = document.querySelector('script');

      if (document.getElementById(id)) return resolve();

      const js = document.createElement('script');
      js.id = id;
      js.src = src;
      js.addEventListener('load', resolve);

      ref.parentNode.insertBefore(js, ref);

  });

}