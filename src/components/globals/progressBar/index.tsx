'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { joinClass } from '@/utils/common'

interface IProps {
   total: number
   current: number
   className?: string
   usePercentage?: boolean
   title?: string
}

const ProgressBar: React.FC<IProps> = ({
   total = 80,
   current = 40,
   className,
   usePercentage = true,
   title
}) => {
   const progressPercentage = (current / total) * 100;

   return (
      <>
         <span className="font-bold text-md">{title ?? ''}</span>
         <div className="w-full bg-white border-4 border-black rounded-full h-full relative overflow-hidden">
            <motion.div
               className={joinClass(`bg-orange-500 h-full rounded-full`, className)}
               initial={{ x: "-100%" }}
               animate={{ x: `${progressPercentage - 100}%` }}
               transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2
               }}
            />
         </div>
         {usePercentage && (
            <span className="text-xs w-full flex justify-end font-bold mt-1 pr-2">{`${progressPercentage}%`}</span>
         )}
      </>
   )
}

ProgressBar.displayName = 'Progressbar'

export default ProgressBar