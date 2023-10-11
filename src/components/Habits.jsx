import Habit from "./Habit"

export default function Habits({
  habits,
  onSaveData
}) {

  let savedData = {}

  const currentDate = new Date()
  const habitSet = {}

  for (const entry in habits) {
    for (const habit in habits[entry]) {
      if (!habitSet[habit]) {
        habitSet[habit] = habits[entry][habit]
      }
    }
  }

  const habitArray = Array.from(Object.keys(habitSet))

  const saveInput = (title, value, data) => {
    savedData[title] = {
      ...data,
      value
    }
  }

  const saveData = (e) => {

    e.preventDefault()

    let reward = 0
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1))
    const yesterdayHabits = habits[yesterday.toLocaleDateString()]

    for (let key in savedData) {
      const habit = savedData[key]

      habit.value = habit.type === 'boolean' ?  Boolean(habit.value) : Number(habit.value)

      if (habit.value >= habit.requirement) {
        reward += 1 + habit.streak
      }

      if (yesterdayHabits) {
        if (yesterdayHabits[key]) {
          habit.streak += 1
        } else {
          habit.streak = 0
        }
      }
    }
    onSaveData(savedData, reward)

    savedData = {}
    e.target.reset()
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
          className="buttons__submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}