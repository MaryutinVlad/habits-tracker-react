import { useState, useEffect } from "react"

import Buttons from "./Buttons"
import Habits from "./Habits"
import Tasks from "./Tasks"
import AddHabitPopup from "./AddHabitPopup"
import AddTaskPopup from "./AddTaskPopup"

export default function Main() {

  const [ profile, setProfile ] = useState({})
  const [ habits, setHabits ] = useState({})
  const [ tasks, setTasks ] = useState({})
  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)
  const [ isTaskPopupOpened, setIsTaskPopupOpened ] = useState(false)

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const toggleTaskPopup = () => {
    setIsTaskPopupOpened(!isTaskPopupOpened)
  }

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

  const addTask = (taskName) => {

    const currentDate = new Date()
    const entryName = currentDate.toLocaleDateString()

    const updatedData = {
      profile,
      habits,
      tasks: {
        ...tasks,
        [taskName]: {
          created: entryName
        }
      }
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setTasks(updatedData.tasks)

    toggleTaskPopup()
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
        tasks: {}
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