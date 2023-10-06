export default function Buttons({
  onAddHabit,
  onBuySlot,
  profile
}) {

  const slotCost = [ 0, 0, 3, 5, 8, 12, 17, 25, 35, 50]
  console.log(profile)

  const addHabit = () => {
    onAddHabit()
  }

  const buySlot = () => {
    onBuySlot()
  }

  return (
    <div className="buttons">
      <p>
        Habit slots: {profile.slotsAvailable}
      </p>
      <p>
        WP: {profile.wp}
      </p>
      <button
        className="buttons__add"
        disabled={!profile.slotsAvailable}
        onClick={addHabit}
      >
        Add habit
      </button>
      <button
        className="buttons__add"
        disabled={!profile.wp >= slotCost[profile.slotsTotal - 1]}
        onClick={buySlot}
      >
        Buy slot: {slotCost[profile.slotsTotal + profile.slotsAvailable]} WP
      </button>
    </div>
  )
}