'use client'

import { IGeneratorStep3 } from '@/interface/curiculumVitae'
import * as Yup from 'yup'
import React, { forwardRef, useEffect } from 'react'
import Card from '@/components/CultUI/Card'
import { joinClass } from '@/utils/common'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from '@/components/globals/form/TextForm'
import SelectForm from '@/components/globals/form/SelectForm'
import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextareaForm from '@/components/globals/form/TextareaForm'
import Button from '@/components/CultUI/Button'
import RadioForm from '@/components/globals/form/RadioForm'
import NumberInputForm from '@/components/globals/form/NumberInputForm'

interface FormGenerator3 {
   data?: IGeneratorStep3
   loading?: boolean
   onSubmit: (val: IGeneratorStep3) => void
   onCancel: (val: IGeneratorStep3) => void
   onChange?: (val: IGeneratorStep3) => void
   setState?: React.Dispatch<React.SetStateAction<IGeneratorStep3 | undefined>>
   className?: string
}

export interface GeneratorForm3Ref {
   submitForm: () => void
   resetForm: () => void
   getCurrentValues: () => IGeneratorStep3
}

const Schema = Yup.object().shape({
   degree: Yup.string().required(),
   major: Yup.object().required(),
   gpaCheck: Yup.string().required(),
   graduatedStatus: Yup.string().required(),
   university: Yup.string().required(),

   graduated: Yup.string().when('graudatedStatus', {
      is: (val: string | any) => val === 'true',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired()
   }),

   gpa: Yup.string().when('gpaCheck', {
      is: (val: string | any) => val === 'true',
      then: (schema) => schema.required('GPA is required when GPA check is enabled'),
      otherwise: (schema) => schema.notRequired()
   }).matches(
      /^[0-5](\.[0-9]{1,2})?$/,
      'GPA not valid'
   ),

   gpaStatus: Yup.string().when('gpaCheck', {
      is: (val: string | any) => val === 'true',
      then: (schema) => schema.required('GPA Status is required when GPA check is enabled'),
      otherwise: (schema) => schema.notRequired()
   }),
})


const GeneratorForm3 = forwardRef<GeneratorForm3Ref, FormGenerator3>(
   ({
      data,
      loading,
      onSubmit,
      onCancel,
      onChange,
      setState,
      className,
   }, ref) => {

      const {
         handleSubmit,
         control,
         setValue,
         watch,
         formState: { isValid }
      } = useForm<IGeneratorStep3 | any>({
         resolver: yupResolver(Schema),
         mode: 'onChange',
         defaultValues: {
            ...data,
            gpaCheck: 'false'
         }
      })

      const watchedValues = watch()

      return (
         <Card
            title="Education"
            className={joinClass('', className)}
         >
            <form
               noValidate
               className="grid gap-4 py-3 px-3"
               onSubmit={handleSubmit(onSubmit)}
            >
               <TextForm
                  fieldLabel={{ children: 'Degree', required: true }}
                  fieldInput={{ maxLength: 200 }}
                  name="degree"
                  control={control}
               />
               <TextForm
                  fieldLabel={{ children: 'University', required: true }}
                  fieldInput={{ maxLength: 200 }}
                  name="university"
                  control={control}
               />
               <RadioForm
                  fieldLabel={{ children: 'Is Any GPA on Your school ?' }}
                  fieldInput={[
                     {
                        label: 'Yes',
                        value: 'true'
                     },
                     {
                        label: 'No',
                        value: 'false'
                     },
                  ]}
                  name="gpaCheck"
                  control={control}
               />

               {watchedValues.gpaCheck === 'true' && (
                  <>
                     <NumberInputForm
                        fieldLabel={{ children: 'GPA', required: true }}
                        fieldInput={{ maxLength: 4 }}
                        name="gpa"
                        control={control}
                        thousandSeparator=""
                        decimalSeparator="."
                     />
                     <TextForm
                        fieldLabel={{ children: 'Status GPA', required: true }}
                        fieldInput={{ maxLength: 200 }}
                        name="gpaStatus"
                        control={control}
                     />
                  </>
               )}

               <RadioForm
                  fieldLabel={{ children: 'Is you have been graduated ?' }}
                  fieldInput={[
                     {
                        label: 'Yes',
                        value: 'true'
                     },
                     {
                        label: 'No',
                        value: 'false'
                     },
                  ]}
                  name="graduatedStatus"
                  control={control}
               />

               {watchedValues.graduatedStatus === 'true' && (
                  <DatepickerForm
                     fieldLabel={{ children: 'Graduated', required: true }}
                     name="graduated"
                     control={control}
                     placeholder="Graduated"
                  />
               )}

               <SelectForm
                  fieldLabel={{ children: 'major', required: true }}
                  fieldInput={{ isMulti: false }}
                  name="major"
                  control={control}
                  setValue={setValue}
                  options={
                     [
                        {
                           label: 'Informatics',
                           value: 'informatics'
                        },
                        {
                           label: 'Phamacis',
                           value: 'phamacis'
                        },
                     ]
                  }
               />
               <TextareaForm
                  fieldLabel={{ children: 'Major Description', required: false }}
                  fieldInput={{ maxLength: 200 }}
                  name="majorDesc"
                  control={control}
               />
               <div className="flex justify-end gap-5 w-full mt-4">
                  <Button
                     type="button"
                     intent="default"
                     className="w-40"
                     onClick={() => onCancel(watchedValues)}
                  >
                     <span className="font-bold">Cancel</span>
                  </Button>
                  <Button  
                     type="submit"
                     intent="info"
                     className="w-40"
                     isLoading={loading}
                     disabled={!isValid}
                  >
                     <span className="font-bold">Submit</span>
                  </Button>
               </div>
            </form>
         </Card>
      )
   }
)

GeneratorForm3.displayName = 'GeneratorForm3'

export default GeneratorForm3

