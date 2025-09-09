import { joinClass } from '@/utils/common'
import { HTMLMotionProps, motion } from 'framer-motion'
import React, { forwardRef } from 'react'

export interface TextInputProps extends HTMLMotionProps<'input'> {
  isLoading?: boolean
  type?: 'text' | 'tel' | 'email' | 'number' | 'password' | 'range'
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
  icon?: React.ReactNode
}

const TextInput: React.FC<TextInputProps> = forwardRef(
  (
    { className, isDisabled, isInvalid, isValid, icon, ...props },
    ref,
  ) => {
    return (
      <>
        <motion.input
          ref={ref}
          disabled={isDisabled}
          className={joinClass(
            'w-full py-2 px-3 border-2 border-black rounded-lg outline-none focus:border-primary/60',
            'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white',
            `${!!icon ? 'pl-9' : ''}`,
            isInvalid
              ? 'border-error'
              : isValid
                ? 'border-success'
                : 'border-black',
            className,
          )}
          animate={isInvalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          // whileTap={{ scale: 0.98 }}
          // whileHover={{ scale: 1.02 }}
          // transition={{ type: "spring", stiffness: 400, damping: 10 }}
          autoComplete="off"
          // autoComplete={
          //   props?.name === 'username' || props?.name === 'password'
          //     ? 'off'
          //     : 'none'
          // }
          {...props}
        />
        {!!icon && (
          <motion.div
            className="absolute left-3 mt-0.5 top-1/2 -translate-y-1/2"
            animate={
              Boolean(isInvalid) ? { x: [0, -6, 6, -6, 6, 0] } : {}
            }
            transition={{ duration: 0.4 }}
          >
            {icon}
          </motion.div>
        )}
      </>
    )
  },
)

TextInput.displayName = 'TextInput'

export default TextInput
