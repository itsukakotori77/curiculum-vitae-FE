'use client'

import React, { forwardRef, useCallback } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { cn } from '@/utils/common'
import { cva, type VariantProps } from 'class-variance-authority'

const switchVariants = cva(
  `px-1 flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] 
   rounded-full relative cursor-pointer transition duration-200`,
  {
    variants: {
      intent: {
        primary:
          'data-[checked=true]:bg-blue-500 data-[checked=false]:bg-slate-700 data-[checked=false]:border-slate-500',
        secondary:
          'data-[checked=true]:bg-green-500 data-[checked=false]:bg-slate-700 data-[checked=false]:border-slate-500',
        warning:
          'data-[checked=true]:bg-yellow-500 data-[checked=false]:bg-slate-700 data-[checked=false]:border-slate-500',
        danger:
          'data-[checked=true]:bg-red-500 data-[checked=false]:bg-slate-700 data-[checked=false]:border-slate-500',
        info: 'data-[checked=true]:bg-cyan-500 data-[checked=false]:bg-slate-700 data-[checked=false]:border-slate-500',
      },
      size: {
        sm: 'h-5 w-10',
        md: 'h-7 w-[60px]',
        lg: 'h-9 w-20',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

const thumbVariants = cva(
  'block rounded-full bg-white shadow-md z-10',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-[20px] w-[20px]',
        lg: 'h-7 w-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface IProps
  extends Omit<HTMLMotionProps<'input'>, 'size'>,
    VariantProps<typeof switchVariants> {
  isChecked: boolean
  isDisabled?: boolean
  onChangeSwitch: (val: boolean) => void
  label?: string
}

const Switch = forwardRef<HTMLInputElement, IProps>(
  (
    {
      isChecked,
      isDisabled,
      onChangeSwitch,
      label = 'Test',
      intent = 'primary',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const handleChecked = useCallback(
      (val: boolean) => {
        onChangeSwitch(val)
      },
      [onChangeSwitch],
    )

    // Define size-specific animation values
    const sizeConfig = {
      sm: {
        thumbSize: { width: '12px', height: '12px' },
        animateWidth: ['12px', '18px', '12px', '12px'],
        animateHeight: ['12px', '8px', '12px'],
        translateX: { checked: 22, unchecked: 0 },
      },
      md: {
        thumbSize: { width: '20px', height: '20px' },
        animateWidth: ['20px', '30px', '20px', '20px'],
        animateHeight: ['20px', '10px', '20px'],
        translateX: { checked: 32, unchecked: 0 },
      },
      lg: {
        thumbSize: { width: '28px', height: '28px' },
        animateWidth: ['28px', '38px', '28px', '28px'],
        animateHeight: ['28px', '14px', '28px'],
        translateX: { checked: 44, unchecked: 0 },
      },
    }

    const config = sizeConfig[(size as 'sm' | 'md' | 'lg') || 'md']

    return (
      <div className="flex space-x-4 antialiased items-center">
        <label
          htmlFor="checkbox"
          className={cn(switchVariants({ intent, size }), className)}
          data-checked={isChecked}
        >
          <motion.div
            initial={{
              width: config.thumbSize.width,
              height: config.thumbSize.height,
              x: isChecked
                ? config.translateX.unchecked
                : config.translateX.checked,
            }}
            animate={{
              height: config.animateHeight,
              width: config.animateWidth,
              x: isChecked
                ? config.translateX.checked
                : config.translateX.unchecked,
            }}
            transition={{
              duration: 0.3,
              delay: 0.1,
            }}
            key={String(isChecked)}
            className={cn(thumbVariants({ size }))}
            {...props}
          />
          <input
            ref={ref}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => handleChecked(e.target.checked)}
            className="hidden"
            id="checkbox"
            disabled={isDisabled}
          />
        </label>
        <p className="font-medium text-black-300 -ml-2">{label}</p>
      </div>
    )
  },
)

Switch.displayName = 'Switch'

export default Switch
