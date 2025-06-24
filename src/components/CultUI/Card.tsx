'use client'

import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { joinClass } from '@/utils/common'
import { X, Square } from 'lucide-react'

const variants = cva(
   "flex justify-center text-sm font-medium",
   {
      variants: {
         intent: {
            primary: [
               "bg-[#F2CEAE]",
               "border-3",
               "shadow-lg",
               "opacity-100",
               "rounded-lg",
               "shadow-[3px_3px_0px_rgba(0,0,0,1)]"
            ],
            secondary: [
               "bg-[#F2CEAE]",
               "border-4",
               "shadow-lg",
               "opacity-100"
            ],
         },
         header: {
            primary: [
               ""
            ]
         },
         defaultVariants: {
            intent: "primary",
         },
      }
   }
)

export interface CardProps
   extends HTMLMotionProps<"div">,
   VariantProps<typeof variants> {
   children: React.ReactNode
   isClose?: boolean
   title?: string
   useHeader?: boolean
}

const Card: React.FC<CardProps> = ({
   className,
   children,
   intent,
   isClose,
   title,
   useHeader,
   ...props
}) => {

   return (
      <motion.div
         className={joinClass(variants({ intent }), className)}
         // whileHover={{
         //    y: [-2, 2, -2],
         //    transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
         // }}
         {...props}
      >
         <div className="grid w-full">
            {useHeader && (
               <div className="w-full h-4 bg-[#F37600] rounded-[3px_3px_0px_0px] outline-3 flex justify-between px-2 py-3.5">
                  <span className="flex items-center text-md font-bold">{title}</span>
                  {isClose && (
                     <div className="flex items-center">
                        <Square size={13} />
                        <X size={13} />
                     </div>
                  )}
               </div>
            )}
            <div className="px-4 py-2 w-full rounded-md border-3 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
               {children}
            </div>
         </div>
      </motion.div>
   )
}

export default Card
