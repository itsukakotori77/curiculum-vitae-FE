import React from 'react'
import { HTMLMotionProps, motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';
import { joinClass } from '@/utils/common';

const variants = cva(
   'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-lg p-6',
   {
      variants: {
         size: {
            sm: ["w-[30%]", "h-auto"],
            md: ["w-[50%]", "h-auto"],
            lg: ["w-[80%]", "h-auto"]
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
         type: "spring",
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
}

const Modal = ({ isOpen, handleClose, children, className, size }: ModalProps) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Overlay */}
               <motion.div
                  className="absolute inset-0 bg-[#717171bf] z-40 opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 40 }}
                  exit={{ opacity: 0 }}
                  onClick={handleClose}
               />

               {/* Modal Content */}
               <motion.div
                  className={joinClass(variants({ size }), className)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  variants={dropIn}
                  style={{ transform: 'translate(-50%, -50%)' }}
               >
                  {children}
               </motion.div>
            </>
         )}
      </AnimatePresence>
   )
}

export default Modal;