import { useState } from "react"

export default function AddHabitPopup({
  onSubmit,
  onClose
}) {

  const [ showRequirements, setShowRequirements ] = useState(false)
  const [ inputValues, setInputValues ] = useState({
    title: '',
    type: '',
    req: 0,
    units: ''
  })

  const addHabit = (e) => {
    e.preventDefault()

    if (inputValues.type === 'boolean') {
      setInputValues({
        ...inputValues,
        req: true 
      })
    }

    onSubmit(inputValues)

    setInputValues({
      title: '',
      type: '',
      req: 0,
      units: ''
    })
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
        onSubmit={addHabit}
      >
        <input
          type="text"
          placeholder="type in habit name"
          onKeyUp={(e) =>
            setInputValues({
              ...inputValues,
              title: e.target.value
            })
          }
          required
        />
        <select
          name="valueTypes"
          onClick={(e) => {

            setInputValues({
              ...inputValues,
              type: e.target.value
            })

            if (e.target.value === 'number') {
              setShowRequirements(true)
            } else {
              setShowRequirements(false)
            }
          }}
          onKeyUp={(e) => {
            
            setInputValues({
              ...inputValues,
              type: e.target.value
            })

            if (e.target.value === 'number') {
              setShowRequirements(true)
            } else {
              setShowRequirements(false)
            }
          }}
          required
        >
          <option value="">
            Choose a value type
          </option>
          <option value="number">
            Number
          </option>
          <option value="boolean">
            Boolean
          </option>
        </select>
        {
          inputValues.type === "boolean" ? (
            <select
              name="valueUnitsBool"
              onClick={(e) =>

                setInputValues({
                  ...inputValues,
                  units: e.target.value
                })
              }
              onKeyUp={(e) =>

                setInputValues({
                  ...inputValues,
                  units: e.target.value
                })
              }
            >
              <option value="restriction">
                Restriction
              </option>
              <option value="action">
                Action
              </option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="type in value units"
              onKeyUp={(e) =>
                setInputValues({
                  ...inputValues,
                  units: e.target.value
                })
              }
              required
            />
          )
        }
        {
          showRequirements && (
            <input
              type="number"
              placeholder="type in completion value"
              onClick={(e) =>
                setInputValues({
                  ...inputValues,
                  req: e.target.value
                })
              }
              onKeyUp={(e) =>
                setInputValues({
                  ...inputValues,
                  req: e.target.value
                })
              }
              required
            />
          )
        }
        <button type="submit">
          Add habit
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