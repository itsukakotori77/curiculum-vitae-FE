'use client'

import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep2 } from '@/interface/curiculumVitae'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaForm from '@/components/globals/form/TextareaForm'
import RadioForm from '@/components/globals/form/RadioForm'
import Card from '@/components/CultUI/Card'
import { joinClass } from '@/utils/common'
import DaterangepickerForm from '@/components/globals/form/DaterangepickerForm'

interface FormGeneratorStep2 {
  data?: IGeneratorStep2
  loading?: boolean
  onSubmit: (val: IGeneratorStep2) => void
  onCancel: (val: IGeneratorStep2, step?: number) => void
  onChange?: (val: IGeneratorStep2) => void
  onBackStep?: (step: number) => void
  setState?: React.Dispatch<React.SetStateAction<IGeneratorStep2 | undefined>>
  className?: string
}

export interface GeneratorForm2Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep2
  setFieldValue: (fieldName: keyof IGeneratorStep2, value: string) => void
}

const Schema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company is required'),
  role: Yup.string().required('Role is required'),
  date: Yup.array().required('Employment date is required'),
  descJob: Yup.string().required('Job description is required'),
  isCurrent: Yup.string().required('Please select if you still work here'),
})

const GeneratorForm2 = forwardRef<GeneratorForm2Ref, FormGeneratorStep2>(
  (
    {
      data,
      loading,
      onSubmit,
      onCancel,
      onChange,
      onBackStep,
      setState,
      className,
    },
    ref,
  ) => {
    const {
      handleSubmit,
      watch,
      control,
      reset,
      setValue,
      getValues,
      formState: { isDirty, isValid },
    } = useForm<IGeneratorStep2 | any>({
      resolver: yupResolver(Schema),
      mode: 'onChange',
      defaultValues: data || {
        jobTitle: '',
        company: '',
        role: '',
        date: [],
        descJob: '',
        isCurrent: '',
      },
    })

    const watchedValues = watch()

    useImperativeHandle(
      ref,
      () => ({
        submitForm: () => {
          handleSubmit(onSubmit)()
        },
        resetForm: () => {
          reset()
        },
        getCurrentValues: () => {
          return getValues()
        },
        setFieldValue: (fieldName: keyof IGeneratorStep2, value: string) => {
          setValue(fieldName, value)
        },
      }),
      [handleSubmit, onSubmit, reset, getValues, setValue],
    )

    return (
      <Card
        title="Work Experience"
        className={joinClass('w-full max-w-full overflow-hidden p-[3px]', className)}
      >
        <form
          noValidate
          className="grid gap-3 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 md:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Job Title & Company - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Job Title',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 100,
                  placeholder: 'e.g., Software Engineer, Product Manager',
                }}
                name="jobTitle"
                control={control}
              />
            </div>
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Company',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 100,
                  placeholder: 'Company name',
                }}
                name="company"
                control={control}
              />
            </div>
          </div>

          {/* Role */}
          <div className="w-full">
            <TextForm
              fieldLabel={{
                children: 'Role',
                required: true,
              }}
              fieldInput={{
                maxLength: 100,
                placeholder: 'e.g., Full-stack Developer, Team Lead',
              }}
              name="role"
              control={control}
            />
          </div>

          {/* Employment Period */}
          <div className="w-full">
            <DaterangepickerForm
              fieldLabel={{
                children: 'Employment Period',
                required: true,
              }}
              control={control}
              name="date"
              max={30}
              maxDate={new Date()}
            />
          </div>

          {/* Current Employment Status */}
          <div className="w-full">
            <RadioForm
              fieldLabel={{
                children: 'Do you still work here?',
                required: true,
              }}
              fieldInput={[
                {
                  label: 'Yes, I currently work here',
                  value: true,
                },
                {
                  label: 'No, I left this position',
                  value: false,
                },
              ]}
              name="isCurrent"
              control={control}
            />
          </div>

          {/* Job Description */}
          <div className="w-full">
            <TextareaForm
              fieldLabel={{
                children: 'Job Description',
                required: true,
              }}
              fieldInput={{
                maxLength: 500,
                rows: 4,
                placeholder:
                  'Describe your responsibilities, achievements, and key contributions...',
              }}
              name="descJob"
              control={control}
            />
          </div>

          {/* Helper Text */}
          <div className="text-xs sm:text-sm text-gray-500 px-1 bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
            <p className="font-medium text-blue-900 mb-1">
              💡 Tips for a great experience entry:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-800">
              <li>Use action verbs (developed, managed, led, created)</li>
              <li>Quantify achievements when possible (increased by 30%)</li>
              <li>Focus on impact and results</li>
              <li>Keep it concise and relevant</li>
            </ul>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 md:gap-5 w-full mt-2 sm:mt-4">
            <Button
              type="button"
              intent="default"
              className="w-full sm:w-32 md:w-40 order-2 sm:order-1"
              onClick={() => onCancel(watchedValues, 2)}
            >
              <span className="font-bold text-sm sm:text-base">Back</span>
            </Button>
            <Button
              type="submit"
              intent="info"
              className="w-full sm:w-32 md:w-40 order-1 sm:order-2"
              isLoading={loading}
              disabled={!isDirty || !isValid}
            >
              <span className="font-bold text-sm sm:text-base">
                {loading ? 'Submitting...' : 'Submit'}
              </span>
            </Button>
          </div>
        </form>
      </Card>
    )
  },
)

GeneratorForm2.displayName = 'GeneratorForm2'

export default GeneratorForm2
