import React, { HTMLProps, useMemo } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller, useController } from 'react-hook-form'
import { FileInputProps, FileMetadata } from './FileInput'
import FileInput from './FileInput'

interface IProps extends HTMLProps<HTMLDivElement>, FileInputProps {
  fieldLabel: LabelProps
  fileInput: FileInputProps
  control: Control<any>
  name: string
  filesMetadata?: Map<string, FileMetadata>
  onChangeFile?: (files: any[]) => void
  onSuccessUpload?: (response: any, file: File, fileManager?: any) => void
  onErrorUpload?: (response: any) => void
  onSuccessDelete?: (response: any) => void
  onErrorDelete?: (response: any) => void
}

const FileForm: React.FC<IProps> = ({
  fieldLabel,
  fileInput,
  control,
  name,
  filesMetadata,
  onChangeFile,
  onSuccessUpload,
  onErrorUpload,
  onSuccessDelete,
  onErrorDelete,
  ...props
}) => {
  const { field } = useController({ control, name })

  const initialFiles = useMemo(() => {
    const value = field.value
    if (value && typeof value === 'string') {
      return [
        {
          source: value,
          options: {
            type: 'local',
          },
        },
      ]
    }
    return []
  }, [field.value])

  return (
    <div {...props}>
      <Label {...fieldLabel} />
      <Controller
        defaultValue={[]}
        control={control}
        name={name}
        render={({
          field: { value, name, onChange },
          formState: { errors },
          fieldState: { invalid },
        }) => (
          <>
            <FileInput
              value={value || []}
              name={name}
              files={initialFiles}
              filesMetadata={filesMetadata}
              onUpdateFiles={(files: any) => {
                onChange(files)
                onChangeFile?.(files)
              }}
              onSuccessUpload={onSuccessUpload}
              onErrorUpload={onErrorUpload}
              onSuccessDelete={onSuccessDelete}
              onErrorDelete={onErrorDelete}
              isInvalid={invalid}
              {...fileInput}
            />
            {errors?.[name]?.message && (
              <span className="text-xs text-error">
                {errors?.[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </div>
  )
}

export default FileForm
