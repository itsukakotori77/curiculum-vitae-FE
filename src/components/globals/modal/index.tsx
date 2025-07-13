import React from 'react'
import { HTMLMotionProps, motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
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
   hidden: {
      y: "-100vh",
      opacity: 0,
   },
   visible: {
      y: "0",
      opacity: 1,
      transition: {
         duration: 0.1,
         type: "spring" as const,
         damping: 15,
         stiffness: 500,
      },
   },
   exit: {
      y: "100vh",
      opacity: 0,
   },
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

   const defaultProps = {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.2 },
      ...props 
   }

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Overlay */}
               <motion.div
                  className={joinClass('fixed inset-0 bg-black/50 z-40', classNameOverlay)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleClose}
               />

               {/* Modal Content */}
               <motion.div
                  variants={dropIn}
                  className={joinClass(variants({ size }), className)}
                  {...defaultProps}
               >
                  {children}
               </motion.div>
            </>
         )}
      </AnimatePresence>
   )
}

export default Modal;