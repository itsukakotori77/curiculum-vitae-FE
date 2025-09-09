'use client'

import { joinClass } from '@/utils/common'
import { HTMLMotionProps, motion } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { StepProps } from '@/interface/stepper'

const variantsStep = cva(
  `flex w-full gap-1 justify-center items-center`,
  {
    variants: {
      direction: {
        horizontal: ['flex-row'],
        vertical: ['flex-col'],
      },
    },
  },
)

interface StepStripProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof variantsStep>,
    StepProps {
  useNumber?: boolean
}

const StepperStrips: React.FC<StepStripProps> = ({
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
      className={joinClass(
        'w-full flex justify-center items-center',
        className,
      )}
      {...props}
      whileHover={{
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
    >
      <ul className={joinClass(variantsStep({ direction }))}>
        {Array.from({ length: size }, (_, index) => (
          <li
            key={index + 1}
            className={`
                     flex justify-center items-center ${useNumber ? 'h-auto px-2 py-1' : 'h-2'} 
                     rounded-xl w-10 cursor-pointer transition-all duration-200 hover:scale-110 
                     active:scale-95 ${
                       index + 1 === current
                         ? 'bg-blue-500 shadow-md text-white'
                         : 'bg-gray-300 hover:bg-gray-400'
                     }`}
            onClick={() => handleStepClick(index + 1)}
            title={`Step ${index + 1}`} // Optional: tooltip
          >
            {useNumber && (
              <span className="font-bold text-sm">{index + 1}</span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default StepperStrips
