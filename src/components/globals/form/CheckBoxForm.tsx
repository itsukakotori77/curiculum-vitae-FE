'use client'

import React, { Fragment } from 'react'
import Label, { LabelProps } from './Label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { joinClass } from '@/utils/common';
import { HTMLMotionProps, motion } from 'framer-motion';
import CheckBoxInput, { CheckBoxProps } from './CheckBoxInput';

export interface FieldInput extends CheckBoxProps {
   label: string | any
   value: string | any
   checked?: boolean
}

export interface CheckBoxForm extends HTMLMotionProps<'div'> {
   fieldLabel?: LabelProps
   fieldInput: FieldInput[]
   name: string
   register: UseFormRegister<any>
   classNameWrapper?: string
   titleClassName?: string
   labelTitleClassname?: string
   errors?: FieldErrors<any>
}

const CheckBoxForm: React.FC<CheckBoxForm> = ({
   fieldLabel,
   fieldInput,
   name,
   register,
   classNameWrapper,
   titleClassName,
   labelTitleClassname,
   errors,
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
         <div
            className={joinClass(
               'flex flex-col gap-1 lg:flex-row flex-wrap lg:items-center lg:gap-4 mt-1',
               classNameWrapper as string
            )}
         >
            {fieldInput.map((item, index) => (
               <Fragment key={`radio-item-${index}-${item.value}`}>
                  <label className="flex flex-row gap-1 items-center cursor-pointer">
                     <CheckBoxInput
                        className="max-h-[20px] max-w-[20px] rounded-md"
                        titleClassname={titleClassName}
                        {...item}
                        {...register(name)}
                     />
                  </label>
               </Fragment>
            ))}
         </div>
         {errors?.[name]?.message && (
            <span className="text-xs text-error">
               {errors?.[name]?.message?.toString()}
            </span>
         )}
      </motion.div>
   )
}

export default CheckBoxForm

