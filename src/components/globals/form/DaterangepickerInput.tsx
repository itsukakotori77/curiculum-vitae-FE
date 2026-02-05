'use client'

import React, { forwardRef, useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar, X } from 'lucide-react'
import 'react-day-picker/dist/style.css'
import { cn } from '@/utils/common'

type DaterangepickerInputProps = {
  value: [Date | null, Date | null]
  onChange: (value: [Date | null, Date | null]) => void
  max?: number
  maxDate?: Date
  minDate?: Date
  name?: string
  isClearable?: boolean
}

const DaterangepickerInput: React.FC<DaterangepickerInputProps> = forwardRef(
  (
    {
      value,
      max,
      onChange,
      maxDate,
      minDate,
      isClearable = true,
      name,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)

    const addDays = (date: Date, days: number) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    const dateRange: DateRange | undefined = {
      from: value[0] || undefined,
      to: value[1] || undefined,
    }

    const handleSelect = (range: DateRange | undefined) => {
      onChange([range?.from || null, range?.to || null])
      if (range?.from && range?.to) {
        setIsOpen(false)
      }
    }

    const handleClear = () => {
      onChange([null, null])
    }

    const formatDateRange = () => {
      if (value[0] && value[1]) {
        return `${format(value[0], 'dd/MM/yyyy')} - ${format(value[1], 'dd/MM/yyyy')}`
      } else if (value[0]) {
        return format(value[0], 'dd/MM/yyyy')
      }
      return 'Choose Date'
    }

    const calculatedMinDate =
      max && value[1] && !value[0] ? addDays(value[1], 0 - max) : minDate

    return (
      <div className="relative w-full" ref={ref as any}>
        <div
          className={cn(
            'w-full flex justify-center items-center gap-2 py-2 px-3 border-2 border-black rounded-lg outline-none focus:border-primary/60',
            'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Calendar className="w-5 h-5 text-gray-500" />
          <div className="flex items-center gap-2 flex-1">
            {/* Start Date */}
            <div className="flex-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded cursor-pointer hover:bg-gray-150 transition-colors">
              <span
                className={
                  value[0] ? 'text-gray-900 text-sm' : 'text-gray-400 text-sm'
                }
              >
                {value[0] ? format(value[0], 'dd/MM/yyyy') : 'Tanggal mulai'}
              </span>
            </div>

            {/* Separator */}
            <span className="text-gray-400 font-medium">-</span>

            {/* End Date */}
            <div className="flex-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded cursor-pointer hover:bg-gray-150 transition-colors">
              <span
                className={
                  value[1] ? 'text-gray-900 text-sm' : 'text-gray-400 text-sm'
                }
              >
                {value[1] ? format(value[1], 'dd/MM/yyyy') : 'Tanggal akhir'}
              </span>
            </div>
          </div>
          {isClearable && value[0] && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleSelect}
                locale={id}
                disabled={{
                  after: maxDate || new Date(),
                  before: calculatedMinDate,
                }}
                showOutsideDays
                captionLayout="dropdown"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                className="p-3"
                modifiersClassNames={{
                  selected: 'bg-blue-500 text-white hover:bg-blue-600',
                  today: 'font-bold text-blue-600',
                  range_middle: 'bg-blue-100',
                }}
                {...props}
              />
            </div>
          </>
        )}

        <input
          type="hidden"
          name={name}
          value={value[0]?.toISOString() || ''}
        />
      </div>
    )
  },
)

DaterangepickerInput.displayName = 'DaterangepickerInput'

export default DaterangepickerInput
