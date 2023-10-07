export default function AddTaskPopup({
  onSubmit,
  onClose
}) {

  let inputValue, inputPriority, inputComplexity = ''

  const addTask = (e) => {
    e.preventDefault()

    onSubmit(inputValue, inputPriority, inputComplexity)
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
        <select
          name="priorities"
          onClick={(e) => inputPriority = e.target.value}
          onKeyUp={(e) => inputPriority = e.target.value}
          required
        >
          <option value=''>Choose priority</option>
          <option value='low'>Low</option>
          <option value='average'>Average</option>
          <option value='high'>High</option>
        </select>
        <select
          name="complexity"
          onClick={(e) => inputComplexity = e.target.value}
          onKeyUp={(e) => inputComplexity = e.target.value}
          required
        >
          <option value=''>Choose complexity</option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
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