import Habit from "./Habit"

export default function Habits({
  habits,
  onSaveData
}) {

  let savedData = {}

  const currentDate = new Date()

  let lastEntry = habits.length ? habits[habits.length - 1] : {
    created: currentDate.toLocaleDateString(),
    habits: {}
  }

  const newHabitArray = [...Object.keys(lastEntry.habits)]

  const saveInput = (title, value, data) => {

    savedData[title] = {
      ...data,
      value
    }
  }

  const saveData = (e) => {

    e.preventDefault()

    let reward = 0
    const yesterday = new Date(currentDate.getDate() - 1)
    const lastHabitsEntry = habits.length > 0 ? habits[habits.length - 1] : {created: currentDate.toLocaleDateString()}
    const isDayInStreak = lastHabitsEntry ? ( lastHabitsEntry.created === yesterday ? true : false ) : false

    for (let key in savedData) {
      const habit = savedData[key]

      habit.value = habit.type === 'boolean' ?  Boolean(habit.value) : Number(habit.value)

      if (lastHabitsEntry) {
        if (lastHabitsEntry[key]) {
          habit.streak = lastHabitsEntry[key].streak + 1
        } else {
          habit.streak = 0
        }
      }

      if (habit.value >= habit.requirement) {
        reward += 1 + habit.streak
      }
    }

    if (lastHabitsEntry.created !== currentDate.toLocaleDateString()) {
      for (const habit in lastHabitsEntry.habits) {
        if (!savedData[habit]) {
          savedData[habit] = lastHabitsEntry.habits[habit]
          savedData[habit].value = savedData[habit].type === 'number' ? 0 : false
        }
      }
    } else {
      for (const habit in lastHabitsEntry.habits) {
        if (!savedData[habit]) {
          savedData[habit] = lastHabitsEntry.habits[habit]
        } else {
          savedData[habit].value += lastHabitsEntry.habits[habit].value
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
          newHabitArray.map((habit) => {
            return (
              <Habit
                key={habit}
                title={habit}
                createdOn = {lastEntry.created}
                data={lastEntry.habits[habit]}
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