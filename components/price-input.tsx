'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { formatIndianRupee, parseIndianRupee } from '@/lib/currency'

interface PriceInputProps {
  label: string
  value: number | undefined
  onChange: (value: number | undefined) => void
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

export function PriceInput({
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  disabled = false,
  required = false,
}: PriceInputProps) {
  const [displayValue, setDisplayValue] = useState<string>('')

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setDisplayValue(formatIndianRupee(value))
    } else {
      setDisplayValue('')
    }
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    setDisplayValue(rawValue) // Update display immediately

    const parsedValue = parseIndianRupee(rawValue)
    if (!isNaN(parsedValue)) {
      onChange(parsedValue)
    } else {
      onChange(undefined)
    }
  }

  const handleBlur = () => {
    // Reformat on blur to ensure consistent display
    if (value !== undefined && value !== null) {
      setDisplayValue(formatIndianRupee(value))
    } else {
      setDisplayValue('')
    }
  }

  return (
    <div>
      <label htmlFor={id || name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">₹</span>
        </div>
        <input
          type="text"
          id={id || name}
          name={name}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder || '0.00'}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            INR
          </span>
        </div>
      </div>
    </div>
  )
}