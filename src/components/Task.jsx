import { useState } from "react"

export default function Task({
  title,
  data,
  onCompleteTask,
  onDeleteTask
}) {

  const [ isTaskExpanded, setIsTaskExpanded ] = useState(false)

  const completeTask = (e) => {
    onCompleteTask(e.target.value)
  }

  const deleteTask = (e) => {
    onDeleteTask(e.target.value)
  }

  return (
    <>
      <li
        className="task"
        style={data.priority === 'low' ? { color: 'green'} : data.priority === 'high' ? { color: 'red'} : ''}
        onClick={() => setIsTaskExpanded(!isTaskExpanded)}
      >
        {title}
      </li>
      {
        isTaskExpanded && (
          <>
            <button
              onClick={completeTask}
              value="done"
            >
              done
            </button>
            <button
              onClick={deleteTask}
              value="delete"
            >
              delete
            </button>
          </>
        )
      }
    </>
  )
}