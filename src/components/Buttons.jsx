export default function Buttons({
  onAddHabit,
  onBuySlot,
  profile
}) {

  const slotCost = [ 0, 0, 3, 7, 10, 15, 21, 29, 40, 65]

  const addHabit = () => {
    onAddHabit()
  }

  const buySlot = () => {
    onBuySlot(slotCost[profile.slotsTotal])
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
        disabled={!(profile.wp >= slotCost[profile.slotsTotal])}
        onClick={buySlot}
      >
        Buy slot: {slotCost[profile.slotsTotal]} WP
      </button>
    </div>
  )
}