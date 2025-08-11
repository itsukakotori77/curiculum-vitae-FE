import React, { forwardRef } from 'react'


interface FormGenerator6 {
   loading?: boolean 
   setState?: React.Dispatch<React.SetStateAction<any>>
   className?: string
}

export interface GeneratorForm6Ref {
   submitForm: () => void 
   resetForm: () => void 
   getCurrentValues: () => void 
}

const GeneratorForm6 = forwardRef<GeneratorForm6Ref, FormGenerator6>(
   ({
      loading,
      setState,
      className
   }, ref) => {
      return (
         ''
      )
   }
)