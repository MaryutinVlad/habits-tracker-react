import Task from "./Task"

export default function Tasks({
  data,
  onAddTask,
  onCompleteTask,
  onDeleteTask
}) {

  const addTask = () => {
    onAddTask()
  }

  const completeTask = () => {}

  const deleteTask = () => {}

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
            return (
              <Task
                key={task}
                title={task}
                data={data[task]}
                onCompleteTask={completeTask}
                onDeleteTask={deleteTask}
              />
            )
          })
        }
      </ul>
    </div>
  )
}