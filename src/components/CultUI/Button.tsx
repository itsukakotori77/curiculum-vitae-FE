'use client'

import { cva, VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'
import React from 'react'
import { joinClass } from '@/utils/common'
import { Loader2 } from 'lucide-react'

const variants = cva(
   'flex justify-center items-center',
   {
      variants: {
         intent: {
            primary: [
               "bg-[#5e5fed]",
               "rounded-md",
               "text-white",
               "border-3",
               "border-black",
               "shadow-[2px_2px_0px_rgba(0,0,0,1)]",
               "hover:bg-gray-200",
               "hover:cursor-pointer",
               "hover:text-black",
               "w-full",
               "h-10"
            ]
         }
      },
      defaultVariants: {
         intent: "primary",
      },
   }
)

export interface ButtonProps
   extends HTMLMotionProps<'button'>,
   VariantProps<typeof variants> {
   children: React.ReactNode
   className?: string
   isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
   children,
   className,
   intent,
   isLoading,
   disabled,
   ...props
}) => {
   return (
      <motion.button
         className={joinClass(variants({ intent }) + ' disabled:cursor-not-allowed', className)}
         whileTap={{ scale: 0.98 }}
         whileHover={{ scale: 1.02 }}
         transition={{ type: "spring", stiffness: 400, damping: 10 }}
         disabled={disabled || isLoading}
         {...props}
      >
         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
         {children}
      </motion.button>
   )
}

export default Button
