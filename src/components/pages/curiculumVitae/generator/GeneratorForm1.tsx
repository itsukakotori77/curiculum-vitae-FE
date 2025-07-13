'use client'

import { IGeneratorStep1 } from '@/interface/curiculumVitae'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import TextForm from '@/components/globals/form/TextForm'
import TextareaForm from '@/components/globals/form/TextareaForm'
import Button from '@/components/CultUI/Button'

interface FormGeneratorStep1 {
   data?: IGeneratorStep1
   loading?: boolean
   onSubmit: (val: IGeneratorStep1) => void
   onCancel: (val: IGeneratorStep1) => void
   onChange?: (val: IGeneratorStep1) => void // Add this prop for live preview
}

const Schema = Yup.object().shape({
   firstName: Yup.string().required('firstname is required'),
   lastName: Yup.string().required('lastname is required'),
   nickname: Yup.string().required('nickname is required'),
   role: Yup.string().required('role is required'),
   profile: Yup.string().required('profile is required')
})

export default function GeneratorForm1({
   data,
   loading,
   onSubmit,
   onChange // Add this
}: FormGeneratorStep1) {

   const { handleSubmit, control, watch } = useForm<IGeneratorStep1>({
      resolver: yupResolver(Schema),
      mode: 'all',
      defaultValues: data || {
         firstName: '',
         lastName: '',
         nickname: '',
         role: '',
         profile: ''
      }
   })

   useEffect(() => {
      if (!onChange) return

      const subscription = watch((value) => {
         onChange(value as IGeneratorStep1)
      })

      return () => subscription.unsubscribe()
   }, [watch, onChange])

   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-2"
         >
            <div className="grid grid-cols-2 gap-5">
               <TextForm
                  fieldLabel={{ children: 'Firstname', required: true }}
                  fieldInput={{ maxLength: 100 }}
                  name="firstName"
                  control={control}
               />
               <TextForm
                  fieldLabel={{ children: 'Lastname', required: true }}
                  fieldInput={{ maxLength: 100 }}
                  name="lastName"
                  control={control}
               />
            </div>

            <TextForm
               fieldLabel={{ children: 'Nickname', required: true }}
               fieldInput={{ maxLength: 100 }}
               name="nickname"
               control={control}
            />

            <TextForm
               fieldLabel={{ children: 'Role', required: true }}
               fieldInput={{ maxLength: 100 }}
               name="role"
               control={control}
            />

            <TextareaForm
               fieldLabel={{ children: 'Profile', required: true }}
               fieldInput={{ maxLength: 500 }}
               name="profile"
               control={control}
            />

            <Button
               type="submit"
               className="w-full"
               intent="info"
               isLoading={loading}
            >
               <span className="font-bold">Submit</span>
            </Button>
         </form>
      </div>
   )
}