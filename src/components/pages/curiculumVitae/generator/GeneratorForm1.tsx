'use client'

import {
  IGeneratorStep1,
  IGeneratorStep2,
} from '@/interface/curiculumVitae'
import { yupResolver } from '@hookform/resolvers/yup'
import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import TextForm from '@/components/globals/form/TextForm'
import TextareaForm from '@/components/globals/form/TextareaForm'
import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import FileForm from '@/components/globals/form/FileForm'
import {
  ActualFileObject,
  FilePondFile,
  FilePondInitialFile,
} from 'filepond'

interface FormGeneratorStep1 {
  data?: IGeneratorStep1
  loading?: boolean
  onSubmit: (val: IGeneratorStep1) => void
  onCancel: (val: IGeneratorStep1) => void
  onChange?: (val: IGeneratorStep1) => void
  setState?: React.Dispatch<
    React.SetStateAction<IGeneratorStep1 | undefined>
  >
}

// Define the ref methods that will be exposed
export interface GeneratorForm1Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep1
  setFieldValue: (
    fieldName: keyof IGeneratorStep1,
    value: string,
  ) => void
}

const Schema = Yup.object().shape({
  firstName: Yup.string().required('firstname is required'),
  lastName: Yup.string().required('lastname is required'),
  nickname: Yup.string().required('nickname is required'),
  role: Yup.string().required('role is required'),
  profile: Yup.string().required('profile is required'),
})

const GeneratorForm1 = forwardRef<
  GeneratorForm1Ref,
  FormGeneratorStep1
>(
  (
    { data, loading, onSubmit, onChange, onCancel, setState },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      reset,
      setValue,
      getValues,
      formState: { isValid },
    } = useForm<IGeneratorStep1>({
      resolver: yupResolver(Schema),
      mode: 'all',
      defaultValues: data || {
        firstName: '',
        lastName: '',
        nickname: '',
        role: '',
        profile: '',
      },
    })

    const watchedValues = watch()
    const [files, setFiles] = useState<
      (string | Blob | FilePondInitialFile | ActualFileObject)[]
    >([])
    const prevValuesRef = useRef<IGeneratorStep1>(null)

    const handleUpdateFiles = (fileItems: FilePondFile[]) => {
      setFiles(fileItems.map((fileItem) => fileItem.file))
    }

    useEffect(() => {
      const hasChanged =
        !prevValuesRef.current ||
        JSON.stringify(prevValuesRef.current) !==
          JSON.stringify(watchedValues)

      if (hasChanged) {
        prevValuesRef.current = watchedValues

        if (onChange) {
          onChange(watchedValues)
        }

        if (setState) {
          setState(watchedValues)
        }
      }
    }, [watchedValues, onChange, setState])

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
        setFieldValue: (
          fieldName: keyof IGeneratorStep1,
          value: string,
        ) => {
          setValue(fieldName, value)
        },
      }),
      [handleSubmit, onSubmit, reset, getValues, setValue],
    )

    return (
      <Card title="Profile">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-2 py-3 px-2"
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

          <FileForm
            control={control}
            name="profileImage"
            fieldLabel={{
              children: 'Profile Image',
              required: true,
            }}
            fileInput={{
              enableCrop: true,
              cropAspectRatio: 1,
              acceptedFileTypes: ['image/*'],
              maxFiles: 1,
              labelIdle:
                'Drop your profile image here or <span class="font-bold">Browse</span>',
            }}
            className="mb-4"
            onChangeFile={(file: any) => console.log('file', file)}
          />

          <TextareaForm
            fieldLabel={{ children: 'Profile', required: true }}
            fieldInput={{ maxLength: 500 }}
            name="profile"
            control={control}
          />

          <div className="flex justify-end gap-5 w-full">
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
  },
)

GeneratorForm1.displayName = 'GeneratorForm1'

export default GeneratorForm1
