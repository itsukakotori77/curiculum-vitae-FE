'use client'

import React, { Fragment } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@/utils/common'
import { HTMLMotionProps, motion } from 'framer-motion'
import CheckBoxInput, { CheckBoxProps } from './CheckBoxInput'

export interface FieldInput extends CheckBoxProps {
  label: string | any
  value: string | any
  checked?: boolean
}

export interface CheckBoxForm extends HTMLMotionProps<'div'> {
  fieldLabel?: LabelProps
  fieldInput: FieldInput[]
  name: string
  control: Control<any>
  classNameWrapper?: string
  titleClassName?: string
  labelTitleClassname?: string
}

const CheckBoxForm: React.FC<CheckBoxForm> = ({
  fieldLabel,
  fieldInput,
  name,
  control,
  classNameWrapper,
  titleClassName,
  labelTitleClassname,
  ...props
}) => {
  return (
    <motion.div {...props}>
      {fieldLabel && fieldInput.length > 0 && (
        <Label
          {...fieldLabel}
          className={joinClass('', labelTitleClassname as string)}
        />
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => {
          const isSingleCheckbox = fieldInput.length === 1
          const fieldValue = field.value
          const isArray = Array.isArray(fieldValue)

          const handleChange = (checked: boolean, itemValue: any) => {
            if (isSingleCheckbox) {
              // Single checkbox: use boolean value
              field.onChange(checked)
            } else {
              // Multiple checkboxes: use array
              const currentValue = isArray ? fieldValue : []
              if (checked) {
                field.onChange([...currentValue, itemValue])
              } else {
                field.onChange(currentValue.filter((v: any) => v !== itemValue))
              }
            }
          }

          return (
            <>
              <div
                className={joinClass(
                  'flex flex-col gap-1 flex-wrap lg:gap-4 mt-1',
                  classNameWrapper as string,
                )}
              >
                {fieldInput.map((item, index) => {
                  let isChecked = false
                  if (isSingleCheckbox) {
                    // Single checkbox: check if value is truthy
                    isChecked = Boolean(fieldValue)
                  } else {
                    // Multiple checkboxes: check if value is in array
                    const currentValue = isArray ? fieldValue : []
                    isChecked = currentValue.includes(item.value)
                  }

                  return (
                    <Fragment key={`checkbox-item-${index}-${item.value}`}>
                      <label className="flex flex-row gap-1 items-center cursor-pointer">
                        <CheckBoxInput
                          className="max-h-[20px] max-w-[20px] rounded-md"
                          titleClassname={titleClassName}
                          {...item}
                          checked={isChecked}
                          onChange={(e) => {
                            handleChange(e.target.checked, item.value)
                            field.onBlur()
                          }}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      </label>
                    </Fragment>
                  )
                })}
              </div>
              {errors?.[name]?.message && (
                <span className="text-xs text-error">
                  {errors?.[name]?.message?.toString()}
                </span>
              )}
            </>
          )
        }}
      />
    </motion.div>
  )
}

export default CheckBoxForm
