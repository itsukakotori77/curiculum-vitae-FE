import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import { FileInputProps, FileMetadata } from './FileInput'
import FileInput from './FileInput'

interface IProps extends HTMLProps<HTMLDivElement>, FileInputProps {
  fieldLabel: LabelProps
  fileInput: FileInputProps
  control: Control<any>
  name: string
  filesMetadata?: Map<string, FileMetadata>
  onChangeFile?: (files: any[]) => void
}

const FileForm: React.FC<IProps> = ({
  fieldLabel,
  fileInput,
  control,
  name,
  filesMetadata,
  onChangeFile,
  ...props
}) => {
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
              filesMetadata={filesMetadata}
              onUpdateFiles={(files: any) => {
                onChange(files)
                onChangeFile?.(files)
              }}
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
