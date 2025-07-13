'use client'

import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep2 } from '@/interface/curiculumVitae'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaForm from '@/components/globals/form/TextareaForm'
import RadioForm from '@/components/globals/form/RadioForm'

interface FormGeneratorStep2 {
   data?: IGeneratorStep2
   loading?: boolean
   onSubmit: (val: IGeneratorStep2) => void
   onCancel: (val: IGeneratorStep2) => void
   onChange: (val: IGeneratorStep2) => void
}

const Schema = Yup.object().shape({
   jobTitle: Yup.string().required(),
   company: Yup.string().required(),
   role: Yup.string().required(),
   startDate: Yup.mixed().test(
      'is-string-or-date',
      'Invalid date',
      value => typeof value === 'string' || value instanceof Date
   ).required(),
   endDate: Yup.mixed().test(
      'is-string-or-date',
      'Invalid date',
      value => typeof value === 'string' || value instanceof Date
   ).required(),
   isCurrent: Yup.boolean().required()
})

export default function GeneratorForm2({
   data,
   loading,
   onSubmit,
   onCancel,
   onChange
}: FormGeneratorStep2) {

   const { handleSubmit, watch, control, register } = useForm<IGeneratorStep2>({
      resolver: yupResolver(Schema),
      mode: 'onChange',
      defaultValues: data
   })

   const inputVal = watch()
   const isMounted = useRef(false)

   useEffect(() => {
      if(!isMounted.current) {
         isMounted.current = true
         return
      }

      if(data) {
         onChange(data)
      }

   }, [inputVal, onChange])
   
   return (
      <>
         <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-2"
         >
            <TextForm
               fieldLabel={{ children: 'Job Title', required: true }}
               fieldInput={{ maxLength: 100 }}
               name="jobTitle"
               control={control}
            />
            <TextForm
               fieldLabel={{ children: 'Company', required: true }}
               fieldInput={{ maxLength: 100 }}
               name="company"
               control={control}
            />
            <TextForm
               fieldLabel={{ children: 'Role', required: true }}
               fieldInput={{ maxLength: 100 }}
               name="role"
               control={control}
            />

            <div className="grid grid-cols-2 gap-4 my-2">
               <DatepickerForm
                  fieldLabel={{ children: 'Date From', required: true }}
                  name="startDate"
                  disablePast
                  control={control}
                  placeholder="Date From"
               // onChangeCustom={val => {
               //    if (val && watch('waktuLelang')) {
               //       trigger('waktuLelang')
               //    }
               // }}
               />

               <DatepickerForm
                  fieldLabel={{ children: 'Date End', required: true }}
                  name="endDate"
                  disablePast
                  control={control}
                  placeholder="Date End"
               // onChangeCustom={val => {
               //    if (val && watch('waktuLelang')) {
               //       trigger('waktuLelang')
               //    }
               // }}
               />
            </div>

            <TextareaForm
               fieldLabel={{ children: 'Job Description', required: true }}
               fieldInput={{ maxLength: 255 }}
               name="descJob"
               control={control}
            />

            <RadioForm
               fieldLabel={{ children: 'Is still work here ?', required: true }}
               fieldInput={[
                  {
                     label: 'Yes',
                     value: true,
                  },
                  {
                     label: 'No',
                     value: false
                  },
               ]}
               name="isCurrent"
               control={control}
            />

            <Button
               type="submit"
               intent="info"
               className="w-full"
               isLoading={loading}
            >
               <span className="font-bold">Submit</span>
            </Button>
         </form>
      </>
   )
}
