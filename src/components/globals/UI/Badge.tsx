import { cn } from '@/utils/common'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const variantsBadge = cva(
  'flex justify-center items-center rounded-full px-2 py-0.5 w-auto',
  {
    variants: {
      intent: {
        primary: ['bg-blue-500 text-white border-3 border-black'],
        secondary: [
          'bg-orange-100/60 text-black border-3 border-orange-600/70',
        ],
        success: ['bg-[#4FE023] text-white border-3 border-black'],
        info: ['bg-[#4999CF] text-white border-3 border-black'],
        default: ['bg-gray-500 text-black border-3 border-black'],
      },
      variant: {
        solid: '',
        outline: 'bg-transparent',
        transparent: 'bg-transparent border-0',
      },
    },
    compoundVariants: [
      // Outline variants
      {
        intent: 'primary',
        variant: 'outline',
        class: 'text-blue-500 border-blue-500',
      },
      {
        intent: 'secondary',
        variant: 'outline',
        class: 'text-orange-600 border-orange-600',
      },
      {
        intent: 'success',
        variant: 'outline',
        class: 'text-[#4FE023] border-[#4FE023]',
      },
      {
        intent: 'info',
        variant: 'outline',
        class: 'text-[#4999CF] border-[#4999CF]',
      },
      {
        intent: 'default',
        variant: 'outline',
        class: 'text-gray-500 border-gray-500',
      },
      // Transparent variants
      {
        intent: 'primary',
        variant: 'transparent',
        class: 'text-blue-500',
      },
      {
        intent: 'secondary',
        variant: 'transparent',
        class: 'text-orange-600',
      },
      {
        intent: 'success',
        variant: 'transparent',
        class: 'text-[#4FE023]',
      },
      {
        intent: 'info',
        variant: 'transparent',
        class: 'text-[#4999CF]',
      },
      {
        intent: 'default',
        variant: 'transparent',
        class: 'text-gray-500',
      },
    ],
    defaultVariants: {
      intent: 'default',
      variant: 'solid',
    },
  },
)

interface IProps extends VariantProps<typeof variantsBadge> {
  children?: React.ReactNode
  className?: string
}

const Badge: React.FC<IProps> = ({ children, intent, variant, className }) => {
  return (
    <div className={cn(variantsBadge({ intent, variant }), className)}>
      {children}
    </div>
  )
}

export default Badge
