'use client'

import { joinClass } from '@/utils/common'
import { HTMLMotionProps, motion } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const variants = cva(
   `w-full flex justify-center items-center`,
   {
      variants: {
         direction: {
            horizontal: [
               "flex-row"
            ],
            vertical: [
               "flex-col"
            ]
         }
      }
   }
)

export interface StepProps
   extends HTMLMotionProps<'div'>,
   VariantProps<typeof variants> {
   size: number
   current: number
   useNumber: boolean
   className?: string
   onChangeCurr: (val: number) => void
}

const Stepper: React.FC<StepProps> = ({
   size,
   current = 1,
   useNumber,
   className,
   direction,
   onChangeCurr,
   ...props
}) => {

   const handleStepClick = (index: number) => {
      onChangeCurr(index)
   }

   return (
      <motion.div 
         className={joinClass(variants({ direction }), className)} 
         {...props}
         whileHover={{
            scale: 1.02,
            transition: {
               type: 'spring',
               stiffness: 400,
               damping: 10
            }
         }}
      >
         <ul className="flex w-full gap-1 justify-center items-center">
            {Array.from({ length: size }, (_, index) => (
               <li
                  key={index+1}
                  className={`h-2 rounded-xl w-10 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${index+1 === current
                        ? 'bg-blue-500 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'
                     }`}
                  onClick={() => handleStepClick(index+1)}
                  title={`Step ${index + 1}`} // Optional: tooltip
               />
            ))}
         </ul>
      </motion.div>
   )
}

export default Stepper

