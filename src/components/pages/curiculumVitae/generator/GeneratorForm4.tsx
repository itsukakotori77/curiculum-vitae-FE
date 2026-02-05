'use client'

import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import DatepickerForm from '@/components/globals/form/DatepickerForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep4 } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import SwitchForm from '@/components/globals/form/SwitchForm'
import RatingForm from '@/components/globals/form/RatingForm'
import moment from 'moment'

interface FormGenerator4 {
  data?: IGeneratorStep4
  loading?: boolean
  onSubmit: (val: IGeneratorStep4) => void
  onCancel: (val: IGeneratorStep4, step?: number) => void
  onChange?: (val: IGeneratorStep4) => void
  setState?: React.Dispatch<React.SetStateAction<IGeneratorStep4 | undefined>>
  className?: string
}

export interface GeneratorForm4Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValue: () => IGeneratorStep4
}

const Schema4 = Yup.object().shape({
  certificateName: Yup.string().notRequired(),
  company: Yup.string().notRequired(),
  certificatedDate: Yup.string().notRequired(),
  skillName: Yup.string().required('Skill name is required'),
  isHasLevel: Yup.mixed().required(''),
  level: Yup.number().notRequired(),
})

export const GeneratorForm4 = forwardRef<GeneratorForm4Ref, FormGenerator4>(
  (
    { data, loading, onSubmit, onCancel, onChange, setState, className },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      reset,
      getValues,
      formState: { isValid },
    } = useForm<IGeneratorStep4 | any>({
      resolver: yupResolver(Schema4),
      mode: 'onChange',
      defaultValues: {
        ...data,
        certificateDate: moment(data?.certificateDate),
      },
    })

    const watchedValues = watch()
    const [checked, setChecked] = useState<boolean>(data?.isHasLevel || false)

    useImperativeHandle(
      ref,
      () => ({
        submitForm: () => {
          handleSubmit(onSubmit)()
        },
        resetForm: () => {
          reset()
        },
        getCurrentValue: () => {
          return getValues()
        },
      }),
      [handleSubmit, onSubmit, reset, getValues],
    )

    return (
      <Card
        title="Skills & Certificates"
        className={joinClass(
          'w-full max-w-full overflow-hidden p-[3px]',
          className,
        )}
      >
        <form
          noValidate
          className="grid gap-3 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 md:px-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Certificates Section */}
          <div className="w-full">
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Certificates
            </h3>
            <hr className="w-full border-2 rounded-xl border-gray-600 mb-3 sm:mb-4" />
          </div>

          {/* Certificate Fields - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Certificate Name',
                  required: false,
                }}
                fieldInput={{
                  maxLength: 50,
                  placeholder: 'e.g., AWS Certified Developer',
                }}
                name="certificateName"
                control={control}
              />
            </div>
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Issuing Organization',
                  required: false,
                }}
                fieldInput={{
                  maxLength: 50,
                  placeholder: 'e.g., Amazon Web Services',
                }}
                name="company"
                control={control}
              />
            </div>
          </div>

          {/* Certificate Date */}
          <div className="w-full sm:w-1/2">
            <DatepickerForm
              fieldLabel={{
                children: 'Issue Date',
                required: false,
              }}
              name="certificateDate"
              control={control}
              placeholder="Select certificate issue date"
            />
          </div>

          {/* Skills Section */}
          <div className="w-full mt-4">
            <h3 className="font-semibold text-base sm:text-lg mb-2">Skills</h3>
            <hr className="w-full border-2 rounded-xl border-gray-600 mb-3 sm:mb-4" />
          </div>

          {/* Skill Name */}
          <div className="w-full">
            <TextForm
              fieldLabel={{
                children: 'Skill Name',
                required: true,
              }}
              fieldInput={{
                maxLength: 50,
                placeholder: 'e.g., JavaScript, React, Python',
              }}
              name="skillName"
              control={control}
            />
          </div>

          {/* Skill Level - Responsive Layout */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 w-full bg-gray-50 p-3 sm:p-4 rounded-lg">
            {/* Rating */}
            <div className="flex-1 order-2 sm:order-1">
              <RatingForm
                fieldLabel={{
                  children: '',
                  required: false,
                }}
                control={control}
                name="level"
                label="Rate your skill level"
                disabled={!checked}
              />
            </div>

            {/* Switch */}
            <div className="order-1 sm:order-2">
              <SwitchForm
                fieldLabel={{
                  children: '',
                  required: false,
                }}
                control={control}
                name="isHasLevel"
                setChange={setChecked}
                label="Show skill level?"
              />
            </div>
          </div>

          {/* Helper Text */}
          <div className="text-xs sm:text-sm text-gray-500 px-1">
            <p>
              Toggle the switch to enable/disable skill level rating. When
              enabled, you can rate your proficiency from 1 to 5 stars.
            </p>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 md:gap-5 w-full mt-2 sm:mt-4">
            <Button
              type="button"
              intent="default"
              className="w-full sm:w-32 md:w-40 order-2 sm:order-1"
              onClick={() => onCancel(watchedValues, 4)}
            >
              <span className="font-bold text-sm sm:text-base">Back</span>
            </Button>
            <Button
              type="submit"
              intent="info"
              className="w-full sm:w-32 md:w-40 order-1 sm:order-2"
              isLoading={loading}
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

GeneratorForm4.displayName = 'GeneratorForm4'

export default GeneratorForm4
