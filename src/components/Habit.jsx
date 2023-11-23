export default function Habit({
  title,
  data,
  createdOn,
  onInput
}) {

  const currentDate = new Date()

  const saveInput = (e) => {
    onInput(title, e.target.value, data)
  }

  return (
    <div className="habit">
      <label
        htmlFor="habitValue"
        className="habit__title"
        >
        {title}
      </label>
      {
        currentDate.toLocaleDateString() === createdOn ? data.value === data.requirement ? (
          <span
            id="habitValue"
          >
            done
          </span>
        ) : (
          <input
          className="habit__input-field"
          id="habitValue"
          type={data.type}
          onKeyUp={saveInput}
          onClick={saveInput}
          placeholder={String(data.value)}
      />
        ) : (
          <input
            className="habit__input-field"
            id="habitValue"
            type={data.type}
            onKeyUp={saveInput}
            onClick={saveInput}
            placeholder="none"
        />)
      }
      {
        data.units && (
          <span>
            {(data.units === 'restriction' || data.units === 'action') ? '' : `${data.value} /`} {data.requirement} {data.units}
          </span>
        )
      }
    </div>
  )
}