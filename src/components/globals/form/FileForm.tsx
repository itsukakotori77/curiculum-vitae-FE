import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import { FileInputProps } from './FileInput'
import FileInput from './FileInput'

interface IProps extends HTMLProps<HTMLDivElement>, FileInputProps {
  fieldLabel: LabelProps
  control: Control<any>
  name: string
}

const FileForm: React.FC<IProps> = ({
  fieldLabel,
  control,
  name,
  ...props
}) => {
  return (
    <div>
      <Label {...fieldLabel} />
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({
          field: { value, name, onChange },
          formState: { errors },
        }) => (
          <>
            <FileInput
              value={value}
              name={name}
              onUpdateFiles={onChange}
              {...props}
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
