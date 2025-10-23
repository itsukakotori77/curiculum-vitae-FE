'use client'

import { IGeneratorStep3 } from '@/interface/curiculumVitae'
import * as Yup from 'yup'
import React, { forwardRef, useImperativeHandle } from 'react'
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
import moment from 'moment'

interface FormGenerator3 {
  data?: IGeneratorStep3
  loading?: boolean
  onSubmit: (val: IGeneratorStep3) => void
  onCancel: (val: IGeneratorStep3, step?: number) => void
  onChange?: (val: IGeneratorStep3) => void
  setState?: React.Dispatch<React.SetStateAction<IGeneratorStep3 | undefined>>
  className?: string
}

export interface GeneratorForm3Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep3
}

const Schema3 = Yup.object().shape({
  degree: Yup.string().required('Degree is required'),
  major: Yup.object().required('Major is required'),
  gpaCheck: Yup.string().required('GPA check is required'),
  graduatedStatus: Yup.string().required('Graduation status is required'),
  university: Yup.string().required('University is required'),

  graduated: Yup.string().when('graduatedStatus', {
    is: (val: string | any) => val === 'true',
    then: (schema) => schema.required('Graduation date is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  gpa: Yup.string()
    .when('gpaCheck', {
      is: (val: string | any) => val === 'true',
      then: (schema) =>
        schema.required('GPA is required when GPA check is enabled'),
      otherwise: (schema) => schema.notRequired(),
    })
    .matches(/^[0-5](\.[0-9]{1,2})?$/, 'GPA not valid'),

  gpaStatus: Yup.string().when('gpaCheck', {
    is: (val: string | any) => val === 'true',
    then: (schema) =>
      schema.required('GPA Status is required when GPA check is enabled'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

export const GeneratorForm3 = forwardRef<GeneratorForm3Ref, FormGenerator3>(
  (
    { data, loading, onSubmit, onCancel, onChange, setState, className },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      setValue,
      watch,
      reset,
      getValues,
      formState: { isValid },
    } = useForm<IGeneratorStep3 | any>({
      resolver: yupResolver(Schema3),
      mode: 'onChange',
      defaultValues: {
        ...data,
        graduated: moment(data?.graduated),
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
      }),
      [handleSubmit, onSubmit, reset, getValues],
    )

    return (
      <Card
        title="Education"
        className={joinClass('w-full max-w-full overflow-hidden', className)}
      >
        <form
          noValidate
          className="grid gap-3 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 md:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Basic Info - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Degree',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 200,
                  placeholder: 'e.g., Bachelor, Master, PhD',
                }}
                name="degree"
                control={control}
              />
            </div>
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'University',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 200,
                  placeholder: 'Enter university name',
                }}
                name="university"
                control={control}
              />
            </div>
          </div>

          {/* GPA Check Radio */}
          <div className="w-full">
            <RadioForm
              fieldLabel={{ children: 'Is there any GPA in your school?' }}
              fieldInput={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
              name="gpaCheck"
              control={control}
            />
          </div>

          {/* Conditional GPA Fields - Responsive Grid */}
          {watchedValues.gpaCheck === 'true' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
              <div className="w-full">
                <NumberInputForm
                  fieldLabel={{
                    children: 'GPA',
                    required: true,
                  }}
                  fieldInput={{
                    maxLength: 4,
                    placeholder: 'e.g., 3.85',
                  }}
                  name="gpa"
                  control={control}
                  thousandSeparator=""
                  decimalSeparator="."
                />
              </div>
              <div className="w-full">
                <TextForm
                  fieldLabel={{
                    children: 'GPA Status',
                    required: true,
                  }}
                  fieldInput={{
                    maxLength: 200,
                    placeholder: 'e.g., Cum Laude, Magna Cum Laude',
                  }}
                  name="gpaStatus"
                  control={control}
                />
              </div>
            </div>
          )}

          {/* Graduation Status Radio */}
          <div className="w-full">
            <RadioForm
              fieldLabel={{ children: 'Have you graduated?' }}
              fieldInput={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
              name="graduatedStatus"
              control={control}
            />
          </div>

          {/* Conditional Graduation Date */}
          {watchedValues.graduatedStatus === 'true' && (
            <div className="w-full sm:w-1/2">
              <DatepickerForm
                fieldLabel={{
                  children: 'Graduation Date',
                  required: true,
                }}
                name="graduated"
                control={control}
                placeholder="Select graduation date"
              />
            </div>
          )}

          {/* Major Selection */}
          <div className="w-full">
            <SelectForm
              fieldLabel={{
                children: 'Major',
                required: true,
              }}
              fieldInput={{
                isMulti: false,
                placeholder: 'Select your major',
              }}
              name="major"
              control={control}
              setValue={setValue}
              options={[
                { label: 'Informatics', value: 'informatics' },
                { label: 'Pharmacy', value: 'pharmacy' },
                { label: 'Engineering', value: 'engineering' },
                { label: 'Business', value: 'business' },
              ]}
            />
          </div>

          {/* Major Description */}
          <div className="w-full">
            <TextareaForm
              fieldLabel={{
                children: 'Major Description',
                required: false,
              }}
              fieldInput={{
                maxLength: 200,
                rows: 4,
                placeholder: 'Describe your major and specialization...',
              }}
              name="majorDesc"
              control={control}
            />
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 md:gap-5 w-full mt-2 sm:mt-4">
            <Button
              type="button"
              intent="default"
              className="w-full sm:w-32 md:w-40 order-2 sm:order-1"
              onClick={() => onCancel(watchedValues, 3)}
            >
              <span className="font-bold text-sm sm:text-base">Back</span>
            </Button>
            <Button
              type="submit"
              intent="info"
              className="w-full sm:w-32 md:w-40 order-1 sm:order-2"
              isLoading={loading}
              disabled={!isValid}
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

GeneratorForm3.displayName = 'GeneratorForm3'

export default GeneratorForm3
