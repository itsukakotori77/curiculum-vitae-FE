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
        horizontal: ['flex-row justify-center px-2 sm:px-4 md:px-6 flex-nowrap overflow-x-auto'],
        vertical: ['flex-col h-full py-4 sm:py-6 md:py-7 overflow-auto'],
      },
    },
  },
)

interface StepBubbleProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof variantsStep>,
    StepProps {
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
  const handleStepClick = useCallback(
    (index: number) => {
      onChangeCurr(index)
    },
    [onChangeCurr],
  )

  return (
    <motion.div
      className={joinClass(variantsStep({ direction }), className)}
      {...props}
    >
      {Array.from({ length: size }, (_, index) => (
        <React.Fragment key={index}>
          {direction === 'horizontal' ? (
            <div
              className="flex flex-col justify-start items-start gap-0 relative cursor-pointer flex-shrink-0 py-2"
              onClick={() => handleStepClick(index + 1)}
            >
              <div className="hidden sm:flex justify-center items-center flex-row gap-1 sm:gap-2 pr-4 sm:pr-6 md:pr-10 absolute">
                {labels && labels[index] && (
                  <span className="font-bold text-xs md:text-sm py-1.5 sm:py-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] md:max-w-none">
                    {labels[index]}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-6 sm:mt-10 md:mt-12 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                  }}
                  className={joinClass(
                    `
                           ${current == index + 1 ? 'bg-[#F9773F] text-white' : 'bg-gray-400 text-black'}
                           border-2 sm:border-3 border-black hover:cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_rgba(0,0,0,1)]
                           `,
                    `${useNumber ? 'px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-md' : 'p-1 sm:p-1.5 md:p-2 rounded-sm'}`,
                  )}
                >
                  {useNumber && (
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold">
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                {index + 1 < size && (
                  <div
                    className="bg-black h-[2px] sm:h-0.5 md:h-1 flex-shrink-0"
                    style={{
                      width: `${Math.max(15, Math.min(80, 200 / size))}px`,
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex h-full gap-2 sm:gap-3 md:gap-4 justify-between w-full relative cursor-pointer"
              onClick={() => handleStepClick(index + 1)}
            >
              <>
                <div className="flex flex-col items-center h-full absolute">
                  <motion.div
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                    }}
                    className={joinClass(
                      `
                           ${current == index + 1 ? 'bg-[#F9773F] text-white' : 'bg-gray-400 text-black'}
                           border-2 sm:border-3 border-black hover:cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_rgba(0,0,0,1)]
                           `,
                      `${useNumber ? 'px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded-md' : 'p-1.5 sm:p-2 rounded-sm'}`,
                    )}
                  >
                    {useNumber && (
                      <span className="text-xs sm:text-sm font-extrabold">
                        {index + 1}
                      </span>
                    )}
                  </motion.div>
                  {index + 1 < size && (
                    <div className="bg-black w-1 sm:w-1.5 flex-1" />
                  )}
                </div>
                <div className="flex justify-start pl-8 sm:pl-10 md:pl-12">
                  {labels && labels[index] && (
                    <span className="hidden sm:inline font-bold text-xs sm:text-sm md:text-md py-1.5 sm:py-2 break-words max-w-[150px] sm:max-w-[200px] md:max-w-none">
                      {labels[index]}
                    </span>
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