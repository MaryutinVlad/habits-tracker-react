import { useState } from "react"

export default function Task({
  data,
  onCompleteTask,
  onDeleteTask,
  completed
}) {

  const [ isTaskExpanded, setIsTaskExpanded ] = useState(false)

  const completeTask = () => {

    const currentDate = new Date()

    const taskToComplete = {
      ...data,
      completedOn: currentDate.toLocaleDateString()
    }

    onCompleteTask(taskToComplete)
  }

  const deleteTask = () => onDeleteTask(data.title)

  return (
    <li
      className="task"
      style={data.priority === 'low' ? { color: 'green'} : data.priority === 'high' ? { color: 'red'} : { color: 'orange'}}
      onClick={() => setIsTaskExpanded(!isTaskExpanded)}
    >
      {data.title}
      {
        (isTaskExpanded && !completed) && (
          <>
            <button
              onClick={completeTask}
            >
              done
            </button>
            <button
              onClick={deleteTask}
            >
              delete
            </button>
          </>
        )
      }
    </li>
  )
}