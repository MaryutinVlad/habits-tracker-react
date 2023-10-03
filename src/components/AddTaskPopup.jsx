export default function AddTaskPopup({
  onSubmit,
  onClose
}) {

  let inputValue = ''

  const addTask = (e) => {
    e.preventDefault()

    onSubmit(inputValue)
  }

  const closePopup = () => {
    onClose()
  }

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="overlay"
      onClick={closeOnOverlayClick}
    >
      <form
        className="form"
        name="addHabit"
        onSubmit={addTask}
      >
        <input type="text" onKeyUp={(e) => inputValue = e.target.value} required />
        <button type="submit">
          Add task
        </button>
      </form>
      <button
        onClick={closePopup}
      >
        X
      </button>
    </div>
  )
}