

const Input = ({ value, onChange, placeholder, label, id, type, allowSubmit, onSubmit }) => {
  return (
    <div className="input">
      {label && <label className="input__label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="input__field"
        type={type ?? "text"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {allowSubmit && (
        <button
          className="input__submit"
          type="submit"
          onClick={onSubmit}
        >Submit</button>
      )}
    </div>
  )
}


export default Input;