'use client'

import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import TextareaForm from '@/components/globals/form/TextareaForm'
import TextForm from '@/components/globals/form/TextForm'
import { IGeneratorStep5 } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
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
  setState?: React.Dispatch<
    React.SetStateAction<IGeneratorStep5 | undefined>
  >
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
    .matches(/^@[a-zA-Z0-9_]+$/, 'Telegram is not valid')
    .optional(),
  instagram: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Instagram is not valid')
    .optional(),
  linkedin: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Linkedin is not valid')
    .optional(),
})

const GeneratorForm5 = forwardRef<GeneratorForm5Ref, FormGenerator5>(
  (
    { data, loading, onSubmit, onCancel, setState, className },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      formState: { isValid },
    } = useForm<IGeneratorStep5 | any>({
      resolver: yupResolver(Schema),
      mode: 'onChange',
      defaultValues: data ?? {},
    })

    const watchedValues = watch()

    return (
      <Card
        title="Contacts"
        className={joinClass('', className)}
        useShadow={false}
      >
        <form
          noValidate
          className="grid gap-2 py-3 px-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextForm
            fieldLabel={{ children: 'Phone', required: true }}
            fieldInput={{
              maxLength: 15,
              icon: (
                <span className="text-lg">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              ),
            }}
            name="phone"
            control={control}
            regexReplace={regexNumeric}
          />
          <TextForm
            fieldLabel={{ children: 'Email', required: true }}
            fieldInput={{
              maxLength: 50,
              type: 'email',
              icon: (
                <span className="text-lg">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              ),
            }}
            name="email"
            control={control}
          />
          <TextForm
            fieldLabel={{ children: 'Telegram', required: false }}
            fieldInput={{
              maxLength: 15,
              icon: (
                <span className="text-lg">
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              ),
            }}
            name="telegram"
            control={control}
          />
          <TextForm
            fieldLabel={{ children: 'Instagram', required: false }}
            fieldInput={{
              maxLength: 15,
              icon: (
                <span className="text-lg">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              ),
            }}
            name="instagram"
            control={control}
          />
          <TextForm
            fieldLabel={{ children: 'Linkedin', required: false }}
            fieldInput={{
              maxLength: 15,
              icon: (
                <span className="text-lg">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="w-5 h-5 text-gray-400"
                  />
                </span>
              ),
            }}
            name="linkedin"
            control={control}
          />
          <TextareaForm
            fieldLabel={{ children: 'Address', required: false }}
            fieldInput={{ maxLength: 255 }}
            name="address"
            control={control}
          />

          <div className="flex justify-end gap-5 w-full mt-4">
            <Button
              type="button"
              intent="default"
              className="w-40"
              onClick={() => onCancel(watchedValues, 4)}
            >
              <span className="font-bold">Back</span>
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
  },
)

GeneratorForm5.displayName = 'GeneratorForm5'

export default GeneratorForm5
