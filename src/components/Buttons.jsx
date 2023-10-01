export default function Buttons({
  onAddHabit,
  slotsAvailable
}) {

  const addHabit = () => {
    onAddHabit()
  }

  return (
    <div className="buttons">
      <p>
        Habit slots: {slotsAvailable}
      </p>
      <button
        className="button"
        disabled={!slotsAvailable}
        onClick={addHabit}
      >
        Add habit
      </button>
    </div>
  )
}