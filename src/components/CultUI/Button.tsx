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
               "bg-[#292929]",
               "rounded-md",
               "text-white",
               // "border-3",
               // "border-black",
               // "shadow-[2px_2px_0px_rgba(0,0,0,1)]",
               "hover:bg-[#5C5C5C]",
               "hover:cursor-pointer",
               "hover:text-white",
               "w-full",
               "h-10"
            ],
            secondary: [
               "bg-[#F9773F]",
               "rounded-md",
               "text-white",
               "border-3",
               "border-black",
               "shadow-[3px_3px_0px_rgba(0,0,0,1)]",
               "hover:bg-[#00000]",
               "hover:cursor-pointer",
               "hover:text-white",
               "disabled:bg-gray-400",
               "w-full",
               "h-10"
            ],
            success: [
               "bg-[#4FE023]",
               "rounded-md",
               "text-white",
               "border-3",
               "border-black",
               "shadow-[3px_3px_0px_rgba(0,0,0,1)]",
               "hover:bg-[#00000]",
               "hover:cursor-pointer",
               "hover:text-white",
               "disabled:bg-gray-400",
               "w-full",
               "h-10"
            ],
            info: [
               "bg-[#4999CF]",
               "rounded-md",
               "text-white",
               "border-3",
               "border-black",
               "shadow-[3px_3px_0px_rgba(0,0,0,1)]",
               "hover:bg-[#00000]",
               "hover:cursor-pointer",
               "hover:text-white",
               "disabled:bg-gray-400",
               "w-full",
               "h-10"
            ],
            default: [
               "bg-[#E2E2E2]",
               "rounded-md",
               "text-black",
               "border-3",
               "border-black",
               "shadow-[3px_3px_0px_rgba(0,0,0,1)]",
               "hover:bg-[#00000]",
               "hover:cursor-pointer",
               "hover:text-black",
               "w-full",
               "h-10"
            ]
         },
         size: {
            small: ["text-xs", "py-1", "px-2", "h-9", "rounded-[8px]"],
            medium: ["text-base", "py-2", "px-4", "h-11", "rounded-[9px]"],
            large: ["text-lg", "py-3", "px-6", "h-14", "rounded-[11px]"],
         },
      },
      compoundVariants: [
         {
            intent: ["primary", "secondary", "info", "default", "success"],
            className: "uppercase",
         },
      ],
      defaultVariants: {
         intent: "primary",
         size: "medium"
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
   size,
   ...props
}) => {
   return (
      <motion.button
         className={joinClass(variants({ intent, size }) + ' disabled:cursor-not-allowed', className)}
         whileTap={{ scale: 0.98 }}
         whileHover={{ scale: 1.02 }}
         transition={{ type: "spring", stiffness: 400, damping: 10 }}
         disabled={disabled || isLoading}
         {...props}
      >
         {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
         {children}
      </motion.button>
   )
}

export default Button
