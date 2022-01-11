import { ReactComponent as Morph } from '../assets/icons/loader.svg';

const Preloader = () => {

  return (
    <section className="preload">
      <div className="preload__loader">
        <div className="preload__dots">
          <span />
          <span />
          <span />
        </div>
        <Morph />
      </div>
    </section>
  )

}


export default Preloader;