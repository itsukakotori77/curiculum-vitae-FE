'use client'

import React, { forwardRef } from 'react'
import DatePicker, { DatePickerProps } from 'react-datepicker'
import TextInput from './TextInput'
import { checkTimeDay } from '@/utils/common'
import 'react-datepicker/dist/react-datepicker.css'

type DaterangepickerInputProps = DatePickerProps & {
  value: any
  max?: number
}

const DaterangepickerInput: React.FC<DaterangepickerInputProps> =
  forwardRef(
    (
      {
        value,
        max,
        onChange,
        maxDate,
        minDate,
        isClearable = true,
        ...props
      },
      ref,
    ) => {
      const addDays = (date: Date, days: number) => {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
      }

      return (
        <DatePicker
          name={props.name}
          ref={ref as any}
          selectsRange={true}
          startDate={value?.[0]}
          endDate={value?.[1]}
          onChange={(update) => {
            if (onChange) {
              onChange(update as any)
            }
          }}
          onKeyDown={(e) => {
            e.preventDefault()
          }}
          isClearable={isClearable}
          wrapperClassName="w-full"
          // maxDate={
          //   max && value?.[0]
          //     ? !value?.[1]
          //       ? checkTimeDay(new Date(value?.[0]), new Date()) <
          //         max!
          //         ? maxDate
          //         : addDays(value[0], max!)
          //       : value?.[1]
          //     : maxDate
          // }
          minDate={
            max && value?.[1] && !value?.[0]
              ? addDays(value[1], 0 - max)
              : minDate
          }
          customInput={
            <TextInput
              onKeyPress={(e: any) => {
                e.preventDefault()
              }}
            />
          }
          placeholderText="Pilih tanggal"
          dateFormat={'dd/MM/YYYY'}
          autoComplete="off"
        />
      )
    },
  )

DaterangepickerInput.displayName = 'DaterangepickerInput'

export default DaterangepickerInput
