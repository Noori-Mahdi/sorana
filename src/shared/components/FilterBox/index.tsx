'use client'

import { useState } from 'react'

interface FilterCheckboxGroupProps {
  title: string
  options: string[]
  onChange?: (selected: string[]) => void
}
export default function FilterCheckboxGroup({
  title,
  options = [],
  onChange,
}: FilterCheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (option: string) => {
    let updated: string[]

    if (selected.includes(option)) {
      updated = selected.filter((item) => item !== option)
    } else {
      updated = [...selected, option]
    }

    setSelected(updated)
    onChange?.(updated)
  }

  return (
    <div className="bg-bg-primary flex flex-col gap-3 rounded-md p-3 border-2 border-primary-800">
      <span className="font-medium">{title}:</span>

      <ul className="flex flex-col gap-2">
        {options.map((opt, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleToggle(opt)}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border border-gray-400 ${
                selected.includes(opt) && 'bg-black'
              }`}
            ></div>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
