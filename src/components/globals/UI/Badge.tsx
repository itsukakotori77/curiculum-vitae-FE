import { cn } from '@/utils/common'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const variantsBadge = cva(
  'flex justify-center items-center rounded-full px-2 py-0.5 w-auto',
  {
    variants: {
      intent: {
        primary: ['bg-[#]'],
        secondary: [
          'bg-orange-100/60 text-black border-3 border-orange-600/70',
        ],
        success: ['bg-[#4FE023] text-white border-3 border-black'],
        info: ['bg-[#4999CF] text-white border-3 border-black'],
        default: ['bg-gray-500 text-black border-3 border-black'],
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
)

interface IProps extends VariantProps<typeof variantsBadge> {
  children?: React.ReactNode
  className?: string
}

const Badge: React.FC<IProps> = ({ children, intent, className }) => {
  return (
    <div className={cn(variantsBadge({ intent }), className)}>
      {children}
    </div>
  )
}

export default Badge
