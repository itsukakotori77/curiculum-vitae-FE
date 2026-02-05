'use client'

import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import DatepickerInput from './DatepickerInput'

interface DatepickerForm extends HTMLProps<HTMLDivElement> {
  fieldLabel: LabelProps
  control: Control<any>
  name: string
  placeholder: string
  disableFuture?: boolean
  disablePast?: boolean
  disabled?: boolean
  onChangeCustom?: (val: any) => void
  showClearButton?: boolean
}

const DatepickerForm: React.FC<DatepickerForm> = ({
  fieldLabel,
  control,
  name,
  placeholder,
  disableFuture,
  disablePast,
  onChangeCustom = () => {},
  disabled,
  showClearButton = true,
  ...props
}) => {
  return (
    <div {...props}>
      <Label {...fieldLabel} />
      <Controller
        defaultValue={null}
        control={control}
        name={name}
        render={({
          field: { onBlur, onChange, ref, name, value },
          formState: { errors },
        }) => (
          <>
            <DatepickerInput
              name={name}
              className="!mt-1"
              value={value || null}
              onBlur={onBlur}
              ref={ref}
              format="ddd, DD MMM YYYY"
              onChange={() => {}}
              onAccept={(val) => {
                onChangeCustom(val)
                onChange(val)
              }}
              onClear={() => {
                onChangeCustom(null)
                onChange(null)
              }}
              isInvalid={Boolean(errors?.[name]?.message)}
              placeholder={
                placeholder ?? `Pilih ${fieldLabel.children}`
              }
              disableFuture={disableFuture}
              disablePast={disablePast}
              disabled={disabled}
              showClearButton={showClearButton}
            />
            {errors?.[name]?.message && (
              <span className="text-xs text-error">
                {errors?.[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </div>
  )
}

export default DatepickerForm