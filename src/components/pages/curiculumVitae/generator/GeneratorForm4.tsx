'use client'

import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep4 } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import Switch from '@/components/globals/form/Switch'
import SwitchForm from '@/components/globals/form/SwitchForm'
import RatingForm from '@/components/globals/form/RatingForm'

interface FormGenerator4 {
   data?: IGeneratorStep4
   loading?: boolean
   onSubmit: (val: IGeneratorStep4) => void
   onCancel: (val: IGeneratorStep4) => void
   onChange?: (val: IGeneratorStep4) => void
   setState?: React.Dispatch<React.SetStateAction<IGeneratorStep4 | undefined>>
   className?: string
}

export interface GeneratorForm4Ref {
   submitForm: () => void
   resetForm: () => void
   getCurrentValue: () => IGeneratorStep4
}

const Schema = Yup.object().shape({
   name: Yup.string().required(),
   company: Yup.string().notRequired(),
   certificatedDate: Yup.string().notRequired()
})

const GeneratorForm4 = forwardRef<GeneratorForm4Ref, FormGenerator4>(
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
         watch,
         formState: { isValid },
         setValue
      } = useForm<IGeneratorStep4 | any>({
         resolver: yupResolver(Schema),
         mode: 'onChange'
      })

      const watchedValues = watch()
      const [checked, setChecked] = useState<boolean>(false)

      return (
         <Card
            title="Skils"
            className={joinClass('', className)}
            onSubmit={handleSubmit(onSubmit)}
         >
            <form
               noValidate
               className="grid gap-4 py-3 px-3"
            >
               <span className="font-semibold">Certificated</span>
               <hr className="w-full border-[2px] rounded-xl border-gray-600" />
               <TextForm
                  fieldLabel={{ children: 'Name', required: true }}
                  fieldInput={{ maxLength: 50 }}
                  name="certificateName"
                  control={control}
               />
               <TextForm
                  fieldLabel={{ children: 'Company', required: false }}
                  fieldInput={{ maxLength: 50 }}
                  name="company"
                  control={control}
               />
               <DatepickerForm
                  fieldLabel={{ children: 'Certificated', required: false }}
                  name="certificateDate"
                  control={control}
                  placeholder="Certificated Date"
               />

               <span className="font-semibold">Skills</span>
               <hr className="w-full border-[2px] rounded-xl border-gray-600" />
               <TextForm
                  fieldLabel={{ children: 'Skills Name' }}
                  fieldInput={{ maxLength: 50 }}
                  name="skillName"
                  control={control}
               />
               <div className="flex justify-between items-center">
                  <RatingForm
                     fieldLabel={{ children: '', required: false }}
                     control={control}
                     name="level"
                     label="Rate you level"
                  />
                  <SwitchForm
                     fieldLabel={{ children: '', required: false }}
                     control={control}
                     name="isHasLevel"
                     setChange={setChecked}
                     label="You want to use level in your skill ?"
                     // className="mt-6"
                  />
               </div>

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

GeneratorForm4.displayName = 'GeneratorForm4'

export default GeneratorForm4