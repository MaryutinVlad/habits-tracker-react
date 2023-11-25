import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import NewMain from './NewMain';
import AddHabitPopup from './AddHabitPopup';

import { useState } from 'react';

export default function App() {

  const [ hasProfile, setHasProfile ] = useState(!(!localStorage.getItem("habits-tracker-new")))
  const [ user, setUser ] = useState(hasProfile ? JSON.parse(localStorage.getItem("habits-tracker-new")) : {})
  const [ isAddPopupOpened, setIsAddPopupOpened ] = useState(false)

  const currentDate = new Date()

  const createProfile = () => {

    const newProfile = {
      profile: {
        created: currentDate.toLocaleDateString(),
        name: "default name",
        slotsAvailable: 2,
        slotsTotal: 2,
        xp: 0,
        rank: 0
      },
      habits: [],
      tasks: {
        available: [],
        completed: []
      }
    }

    localStorage.setItem("habits-tracker-new", JSON.stringify(newProfile))

    setHasProfile(true)
    setUser(newProfile)
  }

  const toggleAddPopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const addHabit = (inputValues) => {
    console.log(inputValues)
    const updatedData = {
      ...user,
      habits: [
        ...user.habits,
        {
          //wrong way, you need to avoid duplication on the same date
        }
      ]
    }

    //localStorage.setItem("habits-tracker-new", JSON.stringify())
    toggleAddPopup()
  }

  return (
    <div className='page'>
      <Header
        hasProfile={hasProfile}
        onCreateProfile={createProfile}
        onAddHabit={toggleAddPopup}
        profile={user.profile}
      />
       {
        hasProfile && <NewMain
          habits={user.habits}
          tasks={user.tasks}
        />
       }
      <Footer/>
      {
        isAddPopupOpened && (
          <AddHabitPopup
            onSubmit={addHabit}
            onClose={toggleAddPopup}
          />
        )
      }
    </div>
  );
}
