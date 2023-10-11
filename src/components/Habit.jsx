export default function Habit({
  title,
  data,
  onInput
}) {

  const saveInput = (e) => {
    onInput(title, e.target.value, data)
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
        type={data.type}
        onKeyUp={saveInput}
        onClick={saveInput}
        placeholder="none"
        required
      />
    </div>
  )
}