'use client'

import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import TextareaForm from '@/components/globals/form/TextareaForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep5 } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faLinkedin,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { regexNumeric } from '@/utils/regex'

interface FormGenerator5 {
  data?: IGeneratorStep5
  loading?: boolean
  onSubmit: (val: IGeneratorStep5) => void
  onCancel: (val: IGeneratorStep5, step?: number) => void
  onChange?: (val: IGeneratorStep5) => void
  setState?: React.Dispatch<React.SetStateAction<IGeneratorStep5 | undefined>>
  className?: string
}

export interface GeneratorForm5Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep5
}

const Schema = Yup.object().shape({
  address: Yup.string().optional(),
  phone: Yup.string()
    .matches(/^(?:\+62|0)[2-9]\d{3,15}$/, 'Phone is not valid')
    .required('Phone is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[\w\\.-]+@[\w\\.-]+\.\w+$/, 'Email is not valid')
    .required('Email is required'),
  telegram: Yup.string()
    .nullable()
    .notRequired()
    .test('telegram-format', 'Telegram is not valid', function (value) {
      if (!value) return true // Allow empty
      return /^@[a-zA-Z0-9_]+$/.test(value)
    }),
  instagram: Yup.string()
    .nullable()
    .notRequired()
    .test('instagram-format', 'Instagram is not valid', function (value) {
      if (!value) return true // Allow empty
      return /^[a-zA-Z0-9_]+$/.test(value)
    }),
  linkedin: Yup.string()
    .nullable()
    .notRequired()
    .test('linkedin-format', 'Linkedin is not valid', function (value) {
      if (!value) return true // Allow empty
      return /^[a-zA-Z0-9_]+$/.test(value)
    }),
})

const GeneratorForm5 = forwardRef<GeneratorForm5Ref, FormGenerator5>(
  (
    { data, loading, onSubmit, onChange, onCancel, className, setState },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      reset,
      getValues,
      formState: { isValid, isDirty },
    } = useForm<IGeneratorStep5 | any>({
      resolver: yupResolver(Schema),
      mode: 'onChange',
      defaultValues: data ?? {
        phone: '',
        email: '',
        telegram: '',
        instagram: '',
        linkedin: '',
        address: '',
      },
    })

    const watchedValues = watch()

    useEffect(() => {
      const subscription = watch((value) => {
        if (onChange) {
          onChange(value as IGeneratorStep5)
        }
        if (setState) {
          setState(value as IGeneratorStep5)
        }
      })

      return () => subscription.unsubscribe()
    }, [watch, onChange, setState])

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
        title="Contacts"
        className={joinClass('w-full max-w-full overflow-hidden p-[3px]', className)}
      >
        <form
          noValidate
          className="grid gap-3 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 md:px-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Primary Contact Fields - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full">
            {/* Phone Field */}
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Phone',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 15,
                  placeholder: '+62 or 08xx-xxxx-xxxx',
                  icon: (
                    <span className="text-base sm:text-lg">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      />
                    </span>
                  ),
                }}
                name="phone"
                control={control}
                regexReplace={regexNumeric}
              />
            </div>

            {/* Email Field */}
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Email',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 50,
                  type: 'email',
                  placeholder: 'example@email.com',
                  icon: (
                    <span className="text-base sm:text-lg">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      />
                    </span>
                  ),
                }}
                name="email"
                control={control}
              />
            </div>
          </div>

          {/* Social Media Fields - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
            {/* Telegram Field */}
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Telegram',
                  required: false,
                }}
                fieldInput={{
                  maxLength: 15,
                  placeholder: '@username',
                  icon: (
                    <span className="text-base sm:text-lg">
                      <FontAwesomeIcon
                        icon={faTelegram}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      />
                    </span>
                  ),
                }}
                name="telegram"
                control={control}
              />
            </div>

            {/* Instagram Field */}
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Instagram',
                  required: false,
                }}
                fieldInput={{
                  maxLength: 15,
                  placeholder: 'username',
                  icon: (
                    <span className="text-base sm:text-lg">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      />
                    </span>
                  ),
                }}
                name="instagram"
                control={control}
              />
            </div>

            {/* LinkedIn Field */}
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <TextForm
                fieldLabel={{
                  children: 'LinkedIn',
                  required: false,
                }}
                fieldInput={{
                  maxLength: 15,
                  placeholder: 'username',
                  icon: (
                    <span className="text-base sm:text-lg">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      />
                    </span>
                  ),
                }}
                name="linkedin"
                control={control}
              />
            </div>
          </div>

          {/* Address Field - Full Width */}
          <div className="w-full">
            <TextareaForm
              fieldLabel={{
                children: 'Address',
                required: false,
              }}
              fieldInput={{
                maxLength: 255,
                rows: 4,
                placeholder: 'Enter your full address...',
              }}
              name="address"
              control={control}
            />
          </div>

          {/* Action Buttons - Responsive Layout */}
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
              disabled={!isValid || !isDirty}
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

GeneratorForm5.displayName = 'GeneratorForm5'

export default GeneratorForm5
