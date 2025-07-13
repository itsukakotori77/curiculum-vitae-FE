import { joinClass } from '@/utils/common';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { forwardRef } from 'react'

export interface RadioInputProps extends HTMLMotionProps<'input'> {
   isDisabled?: boolean
   isInvalid?: boolean
   isValid?: boolean
   checked?: boolean
   label?: React.ReactNode
   labelClassName?: string
   className?: string
}

const RadioInput: React.FC<RadioInputProps> = forwardRef(
   ({
      isDisabled,
      isInvalid,
      isValid,
      checked,
      label,
      labelClassName,
      className,
      ...props
   }, ref) => {
      return (
         <>
            <div className="form-control mt-1">
               <label className="flex items-center gap-3 cursor-pointer">
                  <motion.input
                     ref={ref}
                     className={joinClass(
                        'radio radio-info peer checked:bg-primary radio-xs rounded-full w-6 h-6 border-[0.1px]',
                        isInvalid ? 'border-error' : isValid ? 'border-success' : '',
                        className
                     )}
                     type="radio"
                     autoComplete="off"
                     {...props}
                  />
                  <span
                     className={joinClass(
                        'text-base font-nunito peer-checked:text-primary',
                        labelClassName
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

RadioInput.displayName = 'RadioInput'

export default RadioInput
