'use client'

import { calcHeight, joinClass, typeTextArea } from '@/utils/common';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { forwardRef, useState } from 'react'

export interface TextareaInputProps extends HTMLMotionProps<'textarea'> {
   isLoading?: boolean
   isDisabled?: boolean
   isInvalid?: boolean
   isValid?: boolean
   icon?: React.ReactNode
   isAutoHeight?: boolean
   type?: 'chat' | 'normal'
}

const TextareaInput: React.FC<TextareaInputProps> = forwardRef(
   ({ 
      className, 
      isDisabled, 
      isInvalid, 
      isValid, 
      icon, 
      type, 
      ...props 
   }, ref) => {

      const [height, setHeight] = useState<string>('40px')

      return (
         <>
            <motion.textarea
               ref={ref}
               disabled={isDisabled}
               className={joinClass(
                  'w-full py-2 px-3 border-2 border-black rounded-lg outline-none focus:border-primary/60',
                  'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white',
                  `${!!icon ? 'pl-9' : ''}`,
                  isInvalid
                     ? 'border-error'
                     : isValid
                        ? 'border-success'
                        : 'border-black',
                  className
               )}
               animate={isInvalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
               transition={{ duration: 0.4 }}
               autoComplete="off"
               style={{
                  height: props?.isAutoHeight ? height.toString() : 'auto',
                  maxHeight: props?.isAutoHeight ? '150px' : 'none'
               }}
               onKeyUp={() => {
                  if (props?.isAutoHeight) {
                     calcHeight(props.value!.toString()) == typeTextArea(type!) ? setHeight('100px')
                        : setHeight(`${calcHeight(props.value!.toString()).toString()}px`)
                  }
               }}
               {...props}
            >

            </motion.textarea>
         </>
      )
   }
)

TextareaInput.displayName = 'TextareaInput'

export default TextareaInput
