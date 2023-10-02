import { useState, useEffect } from "react"

import Buttons from "./Buttons"
import Habits from "./Habits"
import Tasks from "./Tasks"
import AddHabitPopup from "./AddHabitPopup"

export default function Main() {

  const [ habits, setData ] = useState({})
  const [ tasks, setTasks ] = useState({})
  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)
  const [ slotsAvailable, setSlotsAvailable ] = useState(2)

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const addHabit = (title, type, value) => {

    const currentDate = new Date()
    const entryName = String(currentDate.toLocaleDateString())
    const updatedData = { ...habits, [entryName]: {
      ...habits[entryName],
      [title]: {
        type,
        value
      }
    }}

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setData(updatedData)
    setSlotsAvailable(slotsAvailable - 1)
    
    togglePopup()
  }

  const saveHabits = (savedData) => {

    const currentDate = new Date()
    const entryName = String(currentDate.toLocaleDateString())

    const updatedData = {
      ...habits,
      [entryName]: savedData
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setData(updatedData)
  }

  useEffect(() => {

    if (localStorage.getItem("habits-tracker")) {
      setData(JSON.parse(localStorage.getItem("habits-tracker")))
    }

    if (localStorage.getItem("habits-tracker-tasks")) {
      setTasks(JSON.parse(localStorage.getItem("habits-tracker-tasks")))
    }
  }
  , [])

  return (
    <main className="main">
      <Buttons
        onAddHabit={togglePopup}
        slotsAvailable={slotsAvailable}
      />
      <Habits
        data={habits}
        onSaveData={saveHabits}
      />
      <Tasks
        data={tasks}
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
    </main>
  )
}