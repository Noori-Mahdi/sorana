import { FC } from 'react'

interface CustomCheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  disabled?: boolean
  className?: string
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <label
      className={`flex cursor-pointer items-center select-none ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
    >
      <span
        className={`mr-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border transition-colors ${checked ? 'bg-accent-500 border-accent-400' : 'bg-bg-secondary border-primary-800'} `}
        onClick={(e) => {
          e.preventDefault()
          if (!disabled) onChange()
        }}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  )
}

export default CustomCheckbox
