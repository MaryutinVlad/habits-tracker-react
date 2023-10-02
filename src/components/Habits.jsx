import Habit from "./Habit"

export default function Habits({
  data,
  onSaveData
}) {

  const savedData = {}

  const currentDate = new Date()
  const habitSet = {}

  for (const entry in data) {
    for (const habit in data[entry]) {
      if (!habitSet[habit]) {
        habitSet[habit] = data[entry][habit]
      }
    }
  }

  const habitArray = Array.from(Object.keys(habitSet))

  const saveInput = (title, value, type) => {
    savedData[title] = {
      type,
      value
    }
  }

  const saveData = (e) => {
    e.preventDefault()
    onSaveData(savedData)
  }

  return (
    <div className="habits">
      <h2 className="main__title">
        Today is {currentDate.toDateString()}
      </h2>
      <form
        className="habits__container"
        onSubmit={saveData}
      >
        {
          habitArray.map((habit) => {
            return (
              <Habit
                key={habit}
                title={habit}
                data={habitSet[habit]}
                onInput={saveInput}
              />
            )
          })
        }
        <button
          type="submit"
          className="habits__submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  )
}