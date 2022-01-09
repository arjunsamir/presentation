import { ReactComponent as PlayIcon } from '../assets/icons/play-button.svg'
import { join } from '../helpers/utils'

export const PlayButton = ({ disabled, onClick }) => {

  return (
    <button
      className={join("play-button", [disabled, "disabled"])}
      onClick={onClick}
    >
      <PlayIcon />
    </button>
  )

}