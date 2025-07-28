import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import SelectInput, { SelectInputProps } from './SelectInput'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { LabelValueProps } from '@/interface/select'

interface IProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   fieldInput?: SelectInputProps
   control: Control<any>
   name: string
   setValue: UseFormSetValue<any>
   options: LabelValueProps[]
   placeholder?: string
   isSearchable?: boolean
   onChangeValue?: (value: string | number) => void
}

const SelectForm: React.FC<IProps> = ({
   fieldLabel,
   fieldInput,
   control,
   name,
   setValue,
   options,
   placeholder,
   isSearchable = true,
   onChangeValue = () => { },
   ...props
}) => {
   return (
      <div {...props}>
         <Label {...fieldLabel} />
         <Controller
            control={control}
            name={name}
            render={({ field: { value, name, onBlur, ref }, formState: { errors } }) => (
               <>
                  <SelectInput
                     {...fieldInput}
                     name={name}
                     className="mt-1"
                     // value={!fieldInput?.isMultiple ? value : Array.isArray(value) ? value.map(v => v.value) : []}
                     value={value}
                     onBlur={onBlur}
                     ref={ref}
                     isSearchable={isSearchable}
                     onChange={(value: any) => {
                        setValue(name, value, { shouldValidate: true, shouldDirty: true })
                        onChangeValue(value?.value)
                     }}
                     isInvalid={Boolean(errors?.[name]?.message)}
                     options={options}
                     placeholder={placeholder ?? `Pilih ${fieldLabel.children}`}
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

export default SelectForm