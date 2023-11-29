import Habits from "./Habits";
import Tasks from "./Tasks";

export default function NewMain(
  {
    habits,
    tasks
  }
) {
  return (
    <main>
      {
        habits.length > 0 ? (
          <>
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