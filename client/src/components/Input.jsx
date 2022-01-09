import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-button.svg'
import { ReactComponent as XIcon } from '../assets/icons/x-button.svg'
import { join } from '../helpers/utils';
import { useRef } from 'react';

const Input = ({ value, onChange, placeholder, label, id, type, inlineForm, valid, onSubmit, error, showLoader }) => {

  const inputRef = useRef(null);
  
  const innerInput = (
    <div className="input__field">
      {label && <label className="input__label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="input__input"
        type={type ?? "text"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );


  return (
    <div className={join("input", [error, "error"], [!valid, "submit-not-allowed"])}>
      {inlineForm ? (
        <form
          className="input__main"
          onSubmit={e => {
            e.preventDefault();
            if (onSubmit && !error) onSubmit();
          }}
        >
          {innerInput}
          {error ? (
            <div
              className={join("input__submit", [showLoader, "loading"])}
              type="submit"
              onClick={() => {
                onChange("")
                inputRef.current.focus();
              }}
            >
              <XIcon />
            </div>
          ) : (
            <button
              className={join("input__submit", [showLoader, "loading"])}
              type="submit"
            >
              <ArrowIcon />
            </button>
          )}
        </form>
      ) : (
        <div className="input__main">
          {innerInput}
        </div>
      )}
      
      <p className="input__error">{error}</p>
    </div>
  );

}


export default Input;