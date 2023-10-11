import { useState, useEffect } from "react"

import Buttons from "./Buttons"
import Habits from "./Habits"
import Tasks from "./Tasks"
import AddHabitPopup from "./AddHabitPopup"
import AddTaskPopup from "./AddTaskPopup"

export default function Main() {

  const [ profile, setProfile ] = useState({})
  const [ habits, setHabits ] = useState({})
  const [ tasks, setTasks ] = useState({completed: [], available: []})
  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)
  const [ isTaskPopupOpened, setIsTaskPopupOpened ] = useState(false)

  //   ---Popups section---

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const toggleTaskPopup = () => {
    setIsTaskPopupOpened(!isTaskPopupOpened)
  }

  //   ---Habits section---

  const addHabit = (title, type, value) => {

    const currentDate = new Date()
    const entryName = currentDate.toLocaleDateString()

    const updatedData = {
      profile: {
        ...profile,
        slotsAvailable: profile.slotsAvailable - 1,
        slotsTotal: profile.slotsTotal + 1
      },
      tasks,
      habits: {
        ...habits,
        [entryName]: {
          ...habits[entryName],
          [title]: {
            type,
            value
          }
        }
      }
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setHabits(updatedData.habits)
    setProfile(updatedData.profile)
    
    togglePopup()
  }

  const saveHabits = (savedData) => {

    const currentDate = new Date()
    const entryName = String(currentDate.toLocaleDateString())

    const updatedData = {
      profile,
      tasks,
      habits: {
        ...habits,
        [entryName]: savedData
      }
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setHabits(updatedData.habits)
  }

  //   ---Tasks section---

  const addTask = (taskName, taskPriority, taskComplexity) => {

    const currentDate = new Date()
    const entryName = currentDate.toLocaleDateString()

    const updatedData = {
      profile,
      habits,
      tasks: {
        completed: tasks.completed,
        available: [...tasks.available,{
          created: entryName,
          title: taskName,
          priority: taskPriority,
          complexity: taskComplexity
        }]
      }
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setTasks(updatedData.tasks)

    toggleTaskPopup()
  }

  const completeTask = (data, reward) => {

    const updatedData = {
      profile: {
        ...profile,
        wp: profile.wp + reward
      },
      habits,
      tasks: {
        completed: [...tasks.completed, data],
        available: tasks.available.filter(task => task.title !== data.title)
      }
    }

    setProfile(updatedData.profile)
    setTasks(updatedData.tasks)

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))
  }

  const deleteTask = (title) => {

    const updatedData = {
      profile,
      habits,
      tasks: {
        completed: tasks.completed,
        available: tasks.available.filter(task => task.title !== title)
      }
    }

    setTasks(updatedData.tasks)

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))
  }

  useEffect(() => {

    if (!localStorage.getItem("habits-tracker")) {

      const newProfile = {
        profile: {
          created: new Date(),
          wp: 0,
          slotsAvailable: 2,
          slotsTotal: 0
        },
        habits: {},
        tasks: {
          completed: [],
          available: []
        }
      }

      localStorage.setItem("habits-tracker", JSON.stringify(newProfile))
    }

    const userData = JSON.parse(localStorage.getItem("habits-tracker"))

    setHabits(userData.habits)
    setProfile(userData.profile)
    setTasks(userData.tasks)
  }
  , [])

  return (
    <main className="main">
      <Buttons
        onAddHabit={togglePopup}
        profile={profile}
      />
      <Habits
        habits={habits}
        onSaveData={saveHabits}
      />
      <Tasks
        data={tasks}
        onAddTask={toggleTaskPopup}
        onCompleteTask={completeTask}
        onDeleteTask={deleteTask}
      />
      {
        isAddPopupOpened && (
          <AddHabitPopup
            isOpened={isAddPopupOpened}
            onSubmit={addHabit}
            onClose={togglePopup}
          />
        )
      }
      {
        isTaskPopupOpened && (
          <AddTaskPopup
            isOpened={isTaskPopupOpened}
            onSubmit={addTask}
            onClose={toggleTaskPopup}
          />
        )
      }
    </main>
  )
}