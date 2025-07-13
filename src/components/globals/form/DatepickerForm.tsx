'use client'

import { HTMLMotionProps, motion } from 'framer-motion';
import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label';
import { Control, Controller } from 'react-hook-form';
import DatepickerInput from './DatepickerInput';

interface DatepickerForm extends HTMLMotionProps<'div'> {
   fieldLabel: LabelProps
   control: Control<any>
   name: string
   placeholder: string
   disableFuture?: boolean
   disablePast?: boolean
   disabled?: boolean
   onChangeCustom?: (val: any) => void
}


const DatepickerForm: React.FC<DatepickerForm> = ({
   fieldLabel,
   control,
   name,
   placeholder,
   disableFuture,
   disablePast,
   onChangeCustom = () => { },
   disabled,
   ...props
}) => {
   return (
      <motion.div {...props}>
         <Label {...fieldLabel} />
         <Controller
            defaultValue={null}
            control={control}
            name={name}
            render={({
               field: { onBlur, onChange, ref, name, value },
               formState: { errors }
            }) => (
               <>
                  <DatepickerInput
                     name={name}
                     className="!mt-1"
                     value={value}
                     onBlur={onBlur}
                     ref={ref}
                     format="ddd, DD MMM YYYY"
                     onChange={() => { }}
                     onAccept={val => {
                        onChangeCustom(val)
                        onChange(val)
                     }}
                     isInvalid={Boolean(errors?.[name]?.message)}
                     placeholder={placeholder ?? `Pilih ${fieldLabel.children}`}
                     disableFuture={disableFuture}
                     disablePast={disablePast}
                     disabled={disabled}
                  />
               </>
            )}
         />
      </motion.div>
   )
}

export default DatepickerForm
