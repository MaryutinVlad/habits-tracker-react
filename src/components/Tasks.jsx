import { useState } from "react"

import Task from "./Task"

export default function Tasks({
  data,
  onAddTask,
  onCompleteTask,
  onDeleteTask
}) {

  const [ showCompleted, setShowCompleted ] = useState(false)

  const complexityRewards = {
    easy: 2,
    medium: 4,
    hard: 6
  }

  const addTask = () => onAddTask()
  const completeTask = (data) => onCompleteTask(data, complexityRewards[data.complexity])
  const deleteTask = (title) => onDeleteTask(title)

  const showCompletionDate = (startedOn, completedOn) => {

    const [ stMonth, stDay, stYear ] = startedOn.split('/').map(value => Number(value))
    const [ comMonth, comDay, comYear ] = completedOn.split('/').map(value => Number(value))

    const yearsPassed = (comYear - stYear) === 0 ? ''
      : (comYear - stYear) === 1 ? '1 year '
      : `${comYear - stYear} years `
      
    const monthsPassed = (comMonth - stMonth) === 0 ? ''
      : (comMonth - stMonth) === 1 ? '1 month '
      : `${comMonth - stMonth} months `

    const daysPassed = (comDay - stDay) === 0 ? '0 days'
      : (comDay - stDay) === 1 ? '1 day'
      : `${comDay - stDay} days`

    return `${startedOn} - ${completedOn} (for ${yearsPassed}${monthsPassed}${daysPassed})`
  }

  return (
    <div className="tasks">
      <h3 className="main__title">
        Tasks
      </h3>
      <button
        className="buttons__toggler"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        {
          showCompleted ? 'Hide completed' : 'Show completed'
        }
      </button>
      <button
        className="buttons__submit"
        onClick={addTask}
      >
        Add task
      </button>
      <ul className="tasks__container">
        {
          data.available.map((task) => {
            return (
              <Task
                key={task.title}
                data={task}
                onCompleteTask={completeTask}
                onDeleteTask={deleteTask}
                completed={false}
              />
            )
          })
        }
        {
          showCompleted && 
            data.completed.map((task) => {
              return (
                <li
                  key={task.title}
                  className="task_completed"
                >
                  &#10003; {task.title} ({complexityRewards[task.complexity]} WP) {showCompletionDate(task.created, task.completedOn)}
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}