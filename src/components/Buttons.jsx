import { useState } from "react"

export default function Buttons({
  onAddHabit
}) {

  const [ habitSlots, setHabitSlots ] = useState(2)

  const addHabit = () => {
    setHabitSlots(habitSlots - 1)
    onAddHabit()
  }

  return (
    <div className="buttons">
      <p>
        Habit slots: {habitSlots}
      </p>
      <button
        className="button"
        disabled={!habitSlots}
        onClick={addHabit}
      >
        Add habit
      </button>
      <button
        className="button"
      >
        Submit
      </button>
    </div>
  )
}