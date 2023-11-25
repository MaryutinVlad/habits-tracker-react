import Buttons from "./Buttons"

export default function Header({
  hasProfile,
  profile,
  onCreateProfile,
  onAddHabit
}) {

  const createProfile = () => {
    onCreateProfile()
  }

  const buySlot = () => {

  }
  
  return (
    <header className='header'>
      <h1>
        Habits tracker
      </h1>
      {
        hasProfile ? (
          <Buttons
            profile={profile}
            onAddHabit={onAddHabit}
            onBuySlot={buySlot}
          />
        ) : (
          <>
            <p>
              No profile has been found
            </p>
            <p>
              You can create a new profile by clicking
              <button
                className="buttons__add"
                onClick={createProfile}
              >
                here
              </button>
            </p>
          </>
        )
      }
    </header>
  )
}