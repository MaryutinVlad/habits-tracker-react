import { useState } from "react"

export default function AddHabitPopup({
  onSubmit,
  onClose
}) {

  const [ isNumberType, setIsNumberType ] = useState(false)

  const addHabit = (e) => {
    e.preventDefault()

    const inputValues = {}

    for (let i = 0; i < e.target.length - 1; i++) {

      const inputField = e.target[i]

      inputValues[inputField.name] = inputField.value
    }

    inputValues.streak = 0

    if (inputValues.type === 'boolean') {

      inputValues.req = true
      inputValues.value = false

    } else {
      inputValues.req = Number(inputValues.req)
      inputValues.value = 0
    }

    onSubmit(inputValues)
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
        <input
          type="text"
          name="title"
          placeholder="type in habit name"
          required
        />
        <select
          name="type"
          onClick={(e) => {

            if (e.target.value === 'number') {
              setIsNumberType(true)
            } else {
              setIsNumberType(false)
            }
          }}
          onKeyUp={(e) => {

            if (e.target.value === 'number') {
              setIsNumberType(true)
            } else {
              setIsNumberType(false)
            }
          }}
          required
        >
          <option value="">
            Choose a value type
          </option>
          <option value="number">
            Number
          </option>
          <option value="boolean">
            Boolean
          </option>
        </select>
        {
          !isNumberType ? (
            <select
              name="units"
            >
              <option value="restriction">
                Restriction
              </option>
              <option value="action">
                Action
              </option>
            </select>
          ) : (
            <input
              name="units"
              type="text"
              placeholder="type in value units"
              required
            />
          )
        }
        {
          isNumberType && (
            <input
              name="req"
              type="number"
              placeholder="type in completion value"
              required
            />
          )
        }
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