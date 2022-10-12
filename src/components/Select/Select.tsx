import { useEffect, useRef, useState } from "react"
import "./select.css"

type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption | undefined
  onChange: (value: SelectOption | undefined) => void
}

export function Select ({value, onChange, options}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function selectOption(option: SelectOption) {
    if(option !== value) onChange(option)
  }

  function isOptionSelected(option: SelectOption) {
    return option === value
  }

  useEffect(() => {
    if(isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className="selectContainer">
      <span className="value">{value?.label}</span>
      <div className="caret"></div>
      <ul className={`options ${isOpen ? "show" : ""}`}>
        {options.map((option, index) => (
          <li onClick={e => {
            e.stopPropagation()
            selectOption(option)
            setIsOpen(false)
          }}
          onMouseEnter={() => setHighlightedIndex(index)}
          key={option.value} 
          className={`option ${
            isOptionSelected(option) ? "selected" : ""
          } ${index === highlightedIndex ? "highlighted" : ""
          }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}