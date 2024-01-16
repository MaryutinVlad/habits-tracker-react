export default function NewHabit({
  habit,
  onInput
}) {

  const saveInput = (e) => {
    onInput({
      ...habit,
      value: habit.type === 'number' ? Number(e.target.value) : Boolean(e.target.value)
    })
  }

  return (
    <div className="habit">
      <label
        htmlFor="habit-value"
        className="habit__title"
        >
        {habit.title}
      </label>
      {
        habit.req === habit.value ? (
          <span>
            done
          </span>
        ) : (
          <input
            className="habit__input-field"
            id="habit-value"
            type={habit.type === 'number' ? habit.type : 'checkbox'}
            onKeyUp={saveInput}
            onClick={saveInput}
            placeholder={habit.type === 'number' ? String(habit.value) : 'none'}
          />
        )
      }
      {
        habit.units && (
          <span>
            {(habit.units === 'restriction' || habit.units === 'action') ? '' : `${habit.value} / ${habit.req}`} {habit.units}
          </span>
        )
      }
    </div>
  )
}