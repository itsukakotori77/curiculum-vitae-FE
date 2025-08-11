'use client'

import { StepProps } from '@/interface/stepper'
import { joinClass } from '@/utils/common'
import { cva, VariantProps } from 'class-variance-authority'
import { HTMLMotionProps, motion } from 'framer-motion'
import React, { useCallback } from 'react'

const variantsStep = cva(
   `w-full flex items-center max-h-screen max-w-full`,
   {
      variants: {
         direction: {
            horizontal: ['flex-row justify-center flex-wrap px-4'],
            vertical: ['flex-col h-full py-7 overflow-auto']
         }
      }
   }
)

interface StepBubbleProps extends
   HTMLMotionProps<'div'>,
   VariantProps<typeof variantsStep>, StepProps {
   useNumber?: boolean
   labels?: string[]
}

const StepperBubble: React.FC<StepBubbleProps> = ({
   size,
   current = 1,
   className,
   direction,
   onChangeCurr,
   useNumber,
   labels,
   ...props
}) => {

   const handleStepClick = useCallback((index: number) => {
      onChangeCurr(index)
   }, [onChangeCurr])

   return (
      <motion.div
         className={joinClass(variantsStep({ direction }), className)}
         {...props}
      >
         {Array.from({ length: size }, (_, index) => (
            <React.Fragment key={index}>
               {direction === 'horizontal' ? (
                  <div
                     className="flex flex-col justify-start items-start gap-0 relative cursor-pointer"
                     onClick={() => handleStepClick(index + 1)}
                  >
                     <div className="flex justify-center items-center flex-row gap-2 pr-10 absolute">
                        {labels && labels[index] && (
                           <span className="font-bold sm:text-xs py-2">{labels[index]}</span>
                        )}
                     </div>
                     <div className="flex items-center mt-12">
                        <motion.div
                           whileHover={{ scale: 0.98 }}
                           whileTap={{ scale: 0.95 }}
                           transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                           className={joinClass(`
                           ${current == index + 1 ? 'bg-[#F9773F] text-white' : 'bg-gray-400 text-black'}
                           border-3 border-black hover:cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]
                           `, `${useNumber ? 'px-2 py-1 sm:px-3 sm:py-1 rounded-md' : 'p-1.5 sm:p-2 rounded-sm'}`)}
                        >
                           {useNumber && (
                              <span className="text-xs sm:text-sm font-extrabold">
                                 {index + 1}
                              </span>
                           )}
                        </motion.div>
                        {index + 1 < size && (
                           <div
                              className="bg-black h-0.5 sm:h-1"
                              style={{
                                 width: `${Math.max(20, Math.min(100, 300 / size))}px`
                              }}
                           />
                        )}
                     </div>
                  </div>
               ) : (
                  <div 
                     className="flex h-full gap-4 justify-between w-full relative cursor-pointer"
                     onClick={() => handleStepClick(index + 1)}
                  >
                     <>
                        <div className="flex flex-col items-center h-full absolute">
                           <motion.div
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
                              <div className="bg-black w-1.5 flex-1" />
                           )}
                        </div>
                        <div className="flex justify-start pl-12">
                           {labels && labels[index] && (
                              <span className="font-bold text-md py-2">{labels[index]}</span>
                           )}
                        </div>
                     </>
                  </div>
               )}
            </React.Fragment>
         ))}
      </motion.div>
   )
}

export default StepperBubble