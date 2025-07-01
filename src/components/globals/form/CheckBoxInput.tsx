import { joinClass } from '@/utils/common';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { forwardRef } from 'react'

type NewType = boolean;

export interface CheckBoxProps extends HTMLMotionProps<'input'> {
   isDisabled?: NewType
   isInvalid?: boolean
   isValid?: boolean
   color?: string
   titleClassname?: string
   checked?: boolean
   label?: React.ReactNode
}

const CheckBoxInput: React.FC<CheckBoxProps> = forwardRef(
   (
      {
         className,
         isDisabled,
         isInvalid,
         isValid,
         label,
         checked,
         titleClassname,
         color,
         ...props
      }, ref
   ) => {
      return (
         <>
            <div className="form-control">
               <label className="flex items-start gap-3 cursor-pointer items-center justify-center">
                  <motion.input
                     type="checkbox"
                     ref={ref}
                     disabled={isDisabled}
                     checked={checked}
                     {...{
                        ...props,
                        className: joinClass(`checkbox checkbox-info border-2 border-black`, className),
                     }}
                  />
                  <span
                     className={joinClass(
                        'text-base',
                        titleClassname,
                        color && `text-${color}`
                     )}
                  >
                     {label}
                  </span>
               </label>
            </div>
         </>
      )
   }
)


CheckBoxInput.displayName = 'CheckBoxInput'

export default CheckBoxInput
