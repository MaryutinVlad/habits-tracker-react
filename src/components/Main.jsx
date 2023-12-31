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
  const currentDate = new Date()
  const entryName = currentDate.toLocaleDateString()

  //   ---Popups section---

  const togglePopup = () => {
    setIsAddPopupOpened(!isAddPopupOpened)
  }

  const toggleTaskPopup = () => {
    setIsTaskPopupOpened(!isTaskPopupOpened)
  }

  //   ---Habits section---

  const addHabit = ({title, type, req, units}) => {

    const updatedData = {
      profile: {
        ...profile,
        slotsAvailable: profile.slotsAvailable - 1
      },
      tasks,
      habits: {
        ...habits,
        [entryName]: {
          ...habits[entryName],
          [title]: {
            type,
            value: type === 'boolean' ? false : 0,
            requirement: type === 'boolean' ? Boolean(req) : Number(req),
            streak: 0,
            units
          }
        }
      }
    }

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setHabits(updatedData.habits)
    setProfile(updatedData.profile)
    
    togglePopup()
  }

  const saveHabits = (savedData, reward) => {

    const updatedData = {
      profile: {
        ...profile,
        wp: profile.wp + reward
      },
      tasks,
      habits: [
        ...habits,
        {
          created: entryName,
          habits: savedData
        }
      ]
    }
    console.log(updatedData)
    //localStorage.setItem("habits-tracker", JSON.stringify(updatedData))

    setHabits(updatedData.habits)
    setProfile(updatedData.profile)
  }

  const buySlot = (slotCost) => {

    const updatedData = {
      profile: {
        ...profile,
        slotsAvailable: profile.slotsAvailable + 1,
        slotsTotal: profile.slotsTotal + 1,
        wp: profile.wp - slotCost
      },
      habits,
      tasks
    }

    setProfile(updatedData.profile)

    localStorage.setItem("habits-tracker", JSON.stringify(updatedData))
  }

  //   ---Tasks section---

  const addTask = (taskName, taskPriority, taskComplexity) => {

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
    //userData.habits = userData.habits.filter( (item, index) => index <= 5)

    // manipulations on saved data

    /*
    userData.profile.slotsAvailable = 1
    userData.profile.slotsTotal = 3
    userData.profile.wp = 3
    
    delete userData.habits['10/12/2023']['Language (Suo)']
    userData.habits['10/12/2023']['Lang (Suo)'] = {
      requirement: 30,
      streak: 0,
      type: 'number',
      units: 'mins',
      value: 30
    } */
    /*let initialDay = 10
    userData.habits.map(habit => {
      habit.created = `10/${initialDay}/ 2023`
      initialDay++
    })*/

    //localStorage.setItem('habits-tracker', JSON.stringify(userData))

    setHabits(userData.habits)
    setProfile(userData.profile)
    setTasks(userData.tasks)
  }
  , [])

  return (
    <main className="main">
      <Buttons
        profile={profile}
        onAddHabit={togglePopup}
        onBuySlot={buySlot}
      />
      <Habits
        habits={habits}
        current={habits.length > 0 ? habits[habits.length - 1] : {created: entryName}}
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