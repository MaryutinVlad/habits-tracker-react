import Habits from "./Habits";
import Tasks from "./Tasks";
import NewHabits from "./NewHabits";

export default function NewMain({
  habits,
  tasks,
  onSaveHabits
}) {

  const saveHabits = (updatedHabits, toReplace) => {
    if (!toReplace) {
      onSaveHabits([
        ...habits, updatedHabits
      ])
    } else {
      onSaveHabits([
        ...habits.filter((habit, index) => index < habits.length), updatedHabits
      ])
    }
  }

  return (
    <main>
      {
        habits.length > 0 ? (
          <>
            <NewHabits
              habits={habits}
              onSaveData={saveHabits}
            />
          </>
        ) : (
          <>
            <p>
              You don't have any habits yet
            </p>
            <p>
              Click 'Add habit' button to add one
            </p>
          </>
        )
      }
    </main>
  )
}