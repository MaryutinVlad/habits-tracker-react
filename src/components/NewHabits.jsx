import Habit from "./Habit"
import NewHabit from "./NewHabit"

export default function NewHabits({
  habits,
  onSaveData
}) {

  let dataToSave = {}
  const currentDate = new Date()
  const lastActive = habits[habits.length - 1]
  const actualData = lastActive.created === currentDate.toLocaleDateString() ? lastActive : {

    created: currentDate.toLocaleDateString(),
    entries: lastActive.entries.map(habit => {

      typeof habit.req === 'boolean' ? habit.value = false : habit.value = 0
      return habit
    })
  }

  const saveInput = (input) => {
    dataToSave[input.title] = input
  }

  const saveData = (e) => {
    e.preventDefault()
    
    onSaveData({
      created: currentDate.toLocaleDateString(),
      entries: [
        ...actualData.entries.map(habit => {

          if (dataToSave[habit.title]) {
           return dataToSave[habit.title]
 
          } else {
           return habit
          }
       })
      ]
    }, lastActive.created === currentDate.toLocaleDateString())

    dataToSave = {}
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
          actualData.entries.map((habit) => {
            return (
              <NewHabit
                key={habit.title + Math.round(Math.random() * 1000)} // !!! there has to be some title validation to avoid key crossing issues if the key is based on title
                //createdOn = {current.created}
                habit={habit}
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