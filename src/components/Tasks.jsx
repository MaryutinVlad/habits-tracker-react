import Task from "./Task"

export default function Tasks({
  data,
  onAddTask
}) {

  const addTask = () => {
    onAddTask()
  }

  const taskArray = Object.keys(data)

  return (
    <div className="tasks">
      <h3 className="main__title">
        Tasks
      </h3>
      <button
        className="buttons__submit"
        onClick={addTask}
      >
        Add task
      </button>
      <ul className="tasks__container">
        {
          taskArray.map((task) => {
            console.log(task)
            return (
              <Task
                data={task}
              />
            )
          })
        }
      </ul>
    </div>
  )
}