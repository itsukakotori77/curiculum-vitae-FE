'use client'

import { StepProps } from '@/interface/stepper'
import { joinClass } from '@/utils/common'
import { cva, VariantProps } from 'class-variance-authority'
import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'

const variantsStep = cva(
   `w-full flex items-center max-h-screen max-w-full`,
   {
      variants: {
         direction: {
            horizontal: ['flex-row justify-center'],
            vertical: ['flex-col h-screen py-7 overflow-auto']
         }
      }
   }
)

interface StepBubbleProps extends
   HTMLMotionProps<'div'>,
   VariantProps<typeof variantsStep>, StepProps {
   useNumber?: boolean
}

const StepperBubble: React.FC<StepBubbleProps> = ({
   size,
   current = 1,
   className,
   direction,
   onChangeCurr,
   useNumber,
   ...props
}) => {

   const handleStepClick = (index: number) => {
      onChangeCurr(index)
   }

   return (
      <motion.div
         className={joinClass(variantsStep({ direction }), className)}
         {...props}
      >
         {Array.from({ length: size }, (_, index) => (
            <React.Fragment key={index}>
               <motion.div
                  onClick={() => handleStepClick(index + 1)}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className={joinClass(`
                     ${current == index + 1 ? 'bg-[#F9773F] text-white' : 'bg-gray-400 text-black'}
                     border-3 border-black hover:cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]
                     `, `${useNumber ? 'px-3 py-1 rounded-md' : 'p-2 rounded-sm'}`)}
               >
                  {useNumber && (<span className="text-sm font-extrabold" >{index + 1}</span>)}
               </motion.div>
               {index + 1 < size && (
                  <div className={`bg-black ${direction === 'horizontal' ? 'h-2 flex-1' : 'w-1.5 flex-1'}`} />
               )}
            </React.Fragment>
         ))}
      </motion.div>
   )
}

export default StepperBubble