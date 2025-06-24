'use client'

import { joinClass } from '@/utils/common'
import React, { ComponentPropsWithRef, useMemo } from 'react'

export interface LabelProps extends ComponentPropsWithRef<'label'> {
   required?: boolean
   help?: string
   tooltipClassname?: string
   helpType?: 'info' | 'question' | 'info-fill'
   optional?: boolean,
   className?: string
}


const Label: React.FC<LabelProps> = ({
   className,
   children,
   required = false,
   optional = false,
   ...props
}) => {
   const star = useMemo(() => {
      if (required) return <span className="text-red-600">*</span>
      return null
   }, [required])

   const opt = useMemo(() => {
      if (optional)
         return <span className="italic text-stone-400">&nbsp;(optional)</span>
      return null
   }, [optional])

   return (
      <label
         className={joinClass('font-medium text-xs flex items-center', className)}
         {...props}
      >
         {children}
         {star || opt}
      </label>
   )
}

export default Label

