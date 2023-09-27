import { useState } from "react"

import Buttons from "./Buttons"
import Habits from "./Habits"
import AddHabitPopup from "./AddHabitPopup"

export default function Main() {

  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const addHabit = (inputValues) => {

    const currentDate = new Date()
    const entryName = JSON.stringify(currentDate.toLocaleDateString())

    localStorage.setItem(entryName, inputValues)
  }

  return (
    <main className="main">
      <Buttons
        onAddHabit={togglePopup}
      />
      <Habits/>
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