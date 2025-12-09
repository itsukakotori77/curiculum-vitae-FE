'use client'

import { IGeneratorStep1 } from '@/interface/curiculumVitae'
import { yupResolver } from '@hookform/resolvers/yup'
import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import TextForm from '@/components/globals/form/TextForm'
import TextareaForm from '@/components/globals/form/TextareaForm'
import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import FileForm from '@/components/globals/form/FileForm'
import { useCVSettingStore } from '@/utils/store'
import { joinClass } from '@/utils/common'

interface FormGeneratorStep1 {
  data?: IGeneratorStep1
  loading?: boolean
  onSubmit: (val: IGeneratorStep1) => void
  onCancel: (val: IGeneratorStep1) => void
  onChange?: (val: IGeneratorStep1) => void
  setState?: React.Dispatch<React.SetStateAction<IGeneratorStep1 | undefined>>
  className?: string
}

export interface GeneratorForm1Ref {
  submitForm: () => void
  resetForm: () => void
  getCurrentValues: () => IGeneratorStep1
  setFieldValue: (fieldName: keyof IGeneratorStep1, value: string) => void
}

const Schema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required'),
  lastName: Yup.string().required('Lastname is required'),
  nickname: Yup.string().required('Nickname is required'),
  role: Yup.string().required('Role is required'),
  profile: Yup.string().required('Profile is required'),
})

const GeneratorForm1 = forwardRef<GeneratorForm1Ref, FormGeneratorStep1>(
  (
    { data, loading, onSubmit, onChange, onCancel, setState, className },
    ref,
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      reset,
      setValue,
      getValues,
      formState: { isValid, isDirty },
    } = useForm<IGeneratorStep1>({
      resolver: yupResolver(Schema),
      mode: 'all',
      defaultValues: data || {
        firstName: '',
        lastName: '',
        nickname: '',
        role: '',
        profile: '',
        profilePicture: '',
      },
    })

    const profileImageFiles = useMemo(() => {
      const url = watch('profilePicture')
      if (url && typeof url === 'string' && url.trim() !== '') {
        return [url]
      }
      return []
    }, [watch('profilePicture')])

    const watchedValues = watch()
    const usingPicture = useCVSettingStore((state) => state.data?.usingPicture)

    useEffect(() => {
      const subscription = watch((value) => {
        if (onChange) {
          onChange(value as IGeneratorStep1)
        }
        if (setState) {
          setState(value as IGeneratorStep1)
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
        setFieldValue: (fieldName: keyof IGeneratorStep1, value: string) => {
          setValue(fieldName, value)
        },
      }),
      [handleSubmit, onSubmit, reset, getValues, setValue],
    )

    return (
      <Card
        title="Profile"
        className={joinClass('w-full max-w-full overflow-hidden', className)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-3 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 md:px-6 w-full"
        >
          {/* Name Fields - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full">
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Firstname',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 100,
                  placeholder: 'Enter your first name',
                }}
                name="firstName"
                control={control}
              />
            </div>
            <div className="w-full">
              <TextForm
                fieldLabel={{
                  children: 'Lastname',
                  required: true,
                }}
                fieldInput={{
                  maxLength: 100,
                  placeholder: 'Enter your last name',
                }}
                name="lastName"
                control={control}
              />
            </div>
          </div>

          {/* Nickname Field */}
          <div className="w-full">
            <TextForm
              fieldLabel={{
                children: 'Nickname',
                required: true,
              }}
              fieldInput={{
                maxLength: 100,
                placeholder: 'Enter your nickname',
              }}
              name="nickname"
              control={control}
            />
          </div>

          {/* Role Field */}
          <div className="w-full">
            <TextForm
              fieldLabel={{
                children: 'Role',
                required: true,
              }}
              fieldInput={{
                maxLength: 100,
                placeholder: 'e.g., Software Engineer, Designer',
              }}
              name="role"
              control={control}
            />
          </div>

          {/* Profile Image - Conditional */}
          {!!usingPicture && (
            <div className="w-full">
              <FileForm
                control={control}
                name="image"
                fieldLabel={{
                  children: 'Profile Image',
                  required: true,
                }}
                fileInput={{
                  enableCrop: true,
                  cropAspectRatio: 1,
                  acceptedFileTypes: ['image/*'],
                  maxFiles: 1,
                  uploadFolder: 'cv_image',
                  files: profileImageFiles,
                  labelIdle:
                    '<span class="text-xs sm:text-sm">Drop your profile image here or <span class="font-bold">Browse</span></span>',
                }}
                className="mb-2 sm:mb-4"
                onSuccessUpload={(res, file, fileManager) => {
                  const fileId = fileManager.getFileEntry(file).id
                  setValue('fileId', fileId)
                  setValue('profilePicture', res.data.url)
                }}
                onSuccessDelete={() => {
                  setValue('profilePicture', '')
                }}
              />
            </div>
          )}

          {/* Profile Textarea */}
          <div className="w-full">
            <TextareaForm
              fieldLabel={{
                children: 'Profile',
                required: true,
              }}
              fieldInput={{
                maxLength: 500,
                rows: 4,
                placeholder: 'Write a brief description about yourself...',
              }}
              name="profile"
              control={control}
            />
          </div>

          {/* Action Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 md:gap-5 w-full mt-2 sm:mt-4">
            <Button
              type="button"
              intent="default"
              className="w-full sm:w-32 md:w-40 order-2 sm:order-1"
              onClick={() => onCancel(watchedValues)}
            >
              <span className="font-bold text-sm sm:text-base">Cancel</span>
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

GeneratorForm1.displayName = 'GeneratorForm1'

export default GeneratorForm1
