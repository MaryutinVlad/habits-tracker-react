export default function Habit({
  title,
  data,
  onInput
}) {

  const saveInput = (e) => {
    onInput(title, e.target.value, data.type)
  }

  return (
    <div className="habit">
      <label
        htmlFor="habitValue"
        className="habit__title"
        >
        {title}
      </label>
      <input
        className="habit__input-field"
        id="habitValue"
        type="text"
        onKeyUp={saveInput}
        placeholder="none"
        required
      />
    </div>
  )
}