import React from 'react'
import { HTMLMotionProps, motion } from "framer-motion";
import { cva, VariantProps } from 'class-variance-authority';
import { joinClass } from '@/utils/common';

const variants = cva(
   `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      z-50 bg-white rounded-xl shadow-lg p-6 h-auto
      overflow-auto
   `,
   {
      variants: {
         size: {
            sm: ["w-[100%] max-w-sm"],
            md: ["w-[100%] max-w-lg"],
            lg: ["w-[100%] max-w-4xl"],
            xl: ["w-[100%] max-w-7xl"]
         }
      },
      defaultVariants: {
         size: "lg"
      }
   }
)

const dropIn = {
   open: {
      y: "0",
      opacity: 1,
      pointerEvents: "auto",
      transition: {
         duration: 0.2,
         type: "spring" as const,
         damping: 70,
         stiffness: 500,
      },
   },
   closed: {
      y: "100vh",
      opacity: 0,
      pointerEvents: "none", // disables click when hidden
      transition: { 
         duration: 0.2,
         type: "spring" as const,
         damping: 80,
         stiffness: 600 
      },
   }
}

export interface ModalProps extends HTMLMotionProps<'div'>, VariantProps<typeof variants> {
   isOpen: boolean
   handleClose: (val?: any) => void
   children?: React.ReactNode
   text?: string
   className?: string
   classNameOverlay?: string
}

const Modal = ({
   isOpen,
   handleClose,
   children,
   className,
   classNameOverlay,
   size,
   ...props
}: ModalProps) => {
   return (
      <>
         {/* Overlay */}
         <motion.div
            className={joinClass('fixed inset-0 bg-black/50 z-40', classNameOverlay)}
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{
               opacity: isOpen ? 1 : 0,
               pointerEvents: isOpen ? "auto" : "none"
            }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
         />

         {/* Modal Content */}
         <motion.div
            variants={dropIn}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            className={joinClass(variants({ size }), className)}
            {...props}
         >
            {children}
         </motion.div>
      </>
   )
}

export default Modal;
