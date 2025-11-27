import React, { useEffect } from 'react'
import { HTMLMotionProps, motion, Variants } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'
import { joinClass } from '@/utils/common'

const variants = cva(
  `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      z-50 bg-white rounded-xl shadow-lg p-6 h-auto
      overflow-auto
   `,
  {
    variants: {
      size: {
        sm: ['w-[100%] max-w-sm'],
        md: ['w-[100%] max-w-lg'],
        lg: ['w-[100%] max-w-4xl'],
        xl: ['w-[100%] max-w-6xl'],
        xxl: ['w-[100%] max-w-8xl'],
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
)

const dropIn = {
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    pointerEvents: 'auto',
    transition: {
      y: {
        duration: 0.5,
        type: 'spring',
        damping: 26,
        stiffness: 360,
        mass: 0.9,
      },
      opacity: {
        duration: 0.25,
        ease: 'easeOut',
      },
      scale: {
        duration: 0.45,
        type: 'spring',
        damping: 30,
        stiffness: 400,
      },
    },
  },
  closed: {
    y: '100vh',
    opacity: 0,
    scale: 0.95,
    pointerEvents: 'none',
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
} as const satisfies Variants

export interface ModalProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof variants> {
  isOpen: boolean
  handleClose: (val?: any) => void
  children?: React.ReactNode
  text?: string
  className?: string
  classNameOverlay?: string
  useCloseButton?: boolean
  data?: any
}

const Modal = ({
  isOpen,
  handleClose,
  children,
  className,
  classNameOverlay,
  size,
  useCloseButton = true,
  data,
  ...props
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, handleClose])

  return (
    <>
      {/* Overlay */}
      <motion.div
        className={joinClass(
          'fixed inset-0 bg-black/50 z-40',
          classNameOverlay,
        )}
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <motion.div
        variants={dropIn}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className={joinClass(variants({ size }), className)}
        {...props}
      >
        {useCloseButton && (
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {children}
      </motion.div>
    </>
  )
}

export default Modal
