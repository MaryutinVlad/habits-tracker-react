export default function Habit({
  habit,
  createdOn,
  onInput
}) {

  console.log(habit)
  const currentDate = new Date()

  const saveInput = (e) => {
    onInput({
      ...habit,
      value: habit.req === 'number' ? Number(e.target.value) : Boolean(e.target.value)
    })
  }

  return (
    <div className="habit">
      <label
        htmlFor="habitValue"
        className="habit__title"
        >
        {habit.title}
      </label>
      {
        currentDate.toLocaleDateString() === createdOn ? habit.value === habit.requirement ? (
          <span
            id="habitValue"
          >
            done
          </span>
        ) : (
          <input
          className="habit__input-field"
          id="habitValue"
          type={habit.type}
          onKeyUp={saveInput}
          onClick={saveInput}
          placeholder={String(habit.value)}
      />
        ) : (
          <input
            className="habit__input-field"
            id="habitValue"
            type={habit.type}
            onKeyUp={saveInput}
            onClick={saveInput}
            placeholder="none"
        />)
      }
      {
        habit.units && (
          <span>
            {(habit.units === 'restriction' || habit.units === 'action') ? '' : `${habit.value} /`} {habit.requirement} {habit.units}
          </span>
        )
      }
    </div>
  )
}