'use client'

import { HTMLMotionProps } from 'framer-motion'
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form'
import Label, { LabelProps } from './Label'
import ColorPickerInput, {
  ColorPickerProps,
} from './ColorPickerInput'
import { motion } from 'framer-motion'
import React from 'react'
import { hexToRgba, joinClass } from '@/utils/common'
import { RgbaColor } from 'react-colorful'

export interface ColorPickerForm<T extends FieldValues>
  extends Omit<HTMLMotionProps<'div'>, 'defaultValue'> {
  name: Path<T>
  control: Control<T>
  fieldLabel: LabelProps
  className?: string
  rules?: any // Validation rules
  defaultValue?: RgbaColor
}

const ColorPickerForm = <T extends FieldValues>({
  fieldLabel,
  control,
  name,
  className,
  rules,
  defaultValue = hexToRgba('#FFF', 1),
  ...props
}: ColorPickerForm<T>) => {
  return (
    <motion.div className="flex flex-col gap-1" {...props}>
      <Label {...fieldLabel}></Label>
      <Controller
        defaultValue={defaultValue as any}
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState: { errors } }) => {
          const fieldError = errors?.[name]
          const isInvalid = !!fieldError

          return (
            <>
              <motion.div
                className={joinClass(
                  'flex items-center relative p-3 border rounded-lg border-3   border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]',
                  className,
                )}
              >
                <ColorPickerInput
                  {...field}
                  isInvalid={isInvalid}
                  value={field.value}
                  onChange={(color) => {
                    field.onChange(color)
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </motion.div>
              <div className="flex items-center justify-between mt-1">
                {fieldError?.message ? (
                  <span className="text-xs text-red-500">
                    {fieldError.message.toString()}
                  </span>
                ) : (
                  <span />
                )}
              </div>
            </>
          )
        }}
      />
    </motion.div>
  )
}

export default ColorPickerForm
