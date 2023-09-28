import { useState, useEffect } from "react"

import Buttons from "./Buttons"
import Habits from "./Habits"
import AddHabitPopup from "./AddHabitPopup"

export default function Main() {

  const [ data, setData ] = useState({})
  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)
  const [ slotsAvailable, setSlotsAvailable ] = useState(2)

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const addHabit = (title, type, value) => {

    const currentDate = new Date()
    const entryName = String(currentDate.toLocaleDateString())
    const updatedData = { ...data, [entryName]: {
      ...data[entryName],
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("habits-tracker"))

    if (savedData) {
      setData(savedData)
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
        data={data}
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