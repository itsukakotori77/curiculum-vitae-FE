'use client'

import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep2 } from '@/interface/curiculumVitae'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaForm from '@/components/globals/form/TextareaForm'
import RadioForm from '@/components/globals/form/RadioForm'
import { Plus, Trash2 } from 'lucide-react'
import Card from '@/components/CultUI/Card'
import { joinClass } from '@/utils/common'
import DaterangepickerForm from '@/components/globals/form/DaterangepickerForm'

interface FormGeneratorStep2 {
  data?: IGeneratorStep2
  loading?: boolean
  onSubmit: (val: IGeneratorStep2) => void
  onCancel: (val: IGeneratorStep2) => void
  onChange?: (val: IGeneratorStep2) => void
  setState?: React.Dispatch<
    React.SetStateAction<IGeneratorStep2 | undefined>
  >
  className?: string
}

export interface GeneratorForm2Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep2
  setFieldValue: (
    fieldName: keyof IGeneratorStep2,
    value: string,
  ) => void
}

const Schema = Yup.object().shape({
  jobTitle: Yup.string().required(),
  company: Yup.string().required(),
  role: Yup.string().required(),
  date: Yup.array().required(),
})

const GeneratorForm2 = forwardRef<
  GeneratorForm2Ref,
  FormGeneratorStep2
>(
  (
    {
      data,
      loading,
      onSubmit,
      onCancel,
      onChange,
      setState,
      className,
    },
    ref,
  ) => {
    const {
      handleSubmit,
      watch,
      control,
      formState: { isDirty },
    } = useForm<IGeneratorStep2 | any>({
      resolver: yupResolver(Schema),
      mode: 'onChange',
      // defaultValues: {
      //    jobTitle: '',
      //    company: '',
      //    role: '',
      //    startDate: '',
      //    endDate: '',
      //    isCurrent: false,
      //    descJob: ''
      // }
    })

    const watchedValues = watch()

    return (
      <Card title="Experience" className={joinClass('', className)}>
        <form
          noValidate
          className="grid gap-4 py-3 px-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-2">
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

            <DaterangepickerForm
              fieldLabel={{ children: 'Entry Date' }}
              control={control}
              name="date"
              max={30}
              maxDate={new Date()}
            />

            <TextareaForm
              fieldLabel={{
                children: 'Job Description',
                required: true,
              }}
              fieldInput={{ maxLength: 255 }}
              name="descJob"
              control={control}
            />

            <RadioForm
              fieldLabel={{
                children: 'Is still work here ?',
                required: true,
              }}
              fieldInput={[
                {
                  label: 'Yes',
                  value: true,
                },
                {
                  label: 'No',
                  value: false,
                },
              ]}
              name={`isCurrent`}
              control={control}
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
              disabled={!isDirty}
            >
              <span className="font-bold">Submit</span>
            </Button>
          </div>
        </form>
      </Card>
    )
  },
)

GeneratorForm2.displayName = 'GeneratorForm1'

export default GeneratorForm2
