import { useRef } from "react"

export default function AddHabitPopup({
  onSubmit,
  isOpened,
  onClose
}) {

  const inputTitle = useRef()
  const inputValueType = useRef()

  const addHabit = (e) => {
    e.preventDefault()

    const entryValues = {
      title: '111',
      valueType: 'number',
      value: 0
    }

    onSubmit(JSON.stringify(entryValues))
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
        onSubmit={addHabit}
      >
        <input type="text" ref={inputTitle} />
        <select name="valueTypes" ref={inputValueType}>
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