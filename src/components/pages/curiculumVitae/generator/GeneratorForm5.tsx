'use client'

import Card from '@/components/CultUI/Card'
import { IGeneratorStep5 } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import React, { forwardRef } from 'react'


interface FormGenerator5 {
   data?: IGeneratorStep5
   loading?: boolean
   onSubmit: (val: IGeneratorStep5) => void
   onCancel: (val: IGeneratorStep5) => void
   onChange?: (val: IGeneratorStep5) => void
   setState?: React.Dispatch<React.SetStateAction<IGeneratorStep5 | undefined>>
   className?: string 
}

export interface Generator5Ref {
   submitForm: () => void 
   resetForm: () => void 
   getCurrentValues: () => IGeneratorStep5
}


const GeneratorForm5 = forwardRef<Generator5Ref, FormGenerator5>(
   ({
      data,
      loading,
      onSubmit,
      onCancel,
      setState,
      className,
   }, ref) => {
      return (
         <Card
            title="Contacts"
            className={joinClass('', className)}
         >
            <form
               noValidate
               className="grid gap-4 py-3 px-3"
            >
               
            </form>
         </Card>
      )
   }
)

GeneratorForm5.displayName = 'GeneratorForm5'

export default GeneratorForm5


