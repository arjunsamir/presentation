import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-button.svg'
import { useContext } from 'react';
import AppContext from '../store/AppContext';
import { join } from '../helpers/utils';

const HostControls = ({ slides }) => {

  // Manage State
  const { state, socket } = useContext(AppContext);

  // Shortcuts
  const isFirst = !state.slide;
  const isLast = state.slide === slides - 1;

  return (
    <div className="host-controls">
      <div className="host-controls__bar">
        <button
          className={join("host-controls__button back", [isFirst, "disabled"])}
          onClick={() => {
            if (isFirst) return;
            socket.emit("change-slide", { slide: state.slide - 1 });
          }}
        >
          <ArrowIcon />
        </button>
        <div className="host-controls__guests">
          <p>{state.count || "No"} Guest{state.count !== 1 && "s"}</p>
        </div>
        <button
          className={join("host-controls__button forward", [isLast, "disabled"])}
          onClick={() => {
            if (isLast) return;
            socket.emit("change-slide", { slide: state.slide + 1 });
          }}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  )

}


export default HostControls;