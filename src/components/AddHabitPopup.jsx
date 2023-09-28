export default function AddHabitPopup({
  onSubmit,
  onClose
}) {

  let inputValue, inputValueType = ''

  const addHabit = (e) => {
    e.preventDefault()

    const initialValue = inputValueType === 'number' ? 0 : 'no'

    onSubmit(inputValue, inputValueType, initialValue)
  }

  const closePopup = () => {
    onClose()
  }

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="overlay"
      onClick={closeOnOverlayClick}
    >
      <form
        className="form"
        name="addHabit"
        onSubmit={addHabit}
      >
        <input type="text" onKeyUp={(e) => inputValue = e.target.value} required />
        <select name="valueTypes" onClick={(e) => inputValueType = e.target.value} onKeyDown={(e) => inputValueType = e.target.value} required >
          <option value="">Choose a value type</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
        <button type="submit">
          Add habit
        </button>
      </form>
      <button
        onClick={closePopup}
      >
        X
      </button>
    </div>
  )
}