import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { TextInputProps } from './TextInput'
import { Control, Controller } from 'react-hook-form'
import NumberInput from './NumberInput'
import { joinClass } from '@/utils/common'

interface IProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   fieldInput?: TextInputProps
   control: Control<any>
   name: string
   prefix?: string
   suffix?: string
   allowNegative?: boolean
   thousandSeparator?: string | boolean
   decimalSeparator?: string
   regexReplace?: RegExp
   isFloat?: boolean
}


const NumberInputForm: React.FC<IProps> = ({
   fieldLabel,
   fieldInput,
   control,
   name,
   prefix,
   suffix,
   allowNegative,
   thousandSeparator,
   decimalSeparator,
   regexReplace,
   isFloat,
   ...props
}) => {
   return (
      <div {...props}>
         <Label {...fieldLabel} />
         <Controller
            control={control}
            name={name}
            render={({
               field: { name, onBlur, onChange, ref, value },
               formState: { errors },
            }) => (
               <>
                  <NumberInput
                     placeholder={
                        fieldInput?.placeholder ?? `Masukkan ${fieldLabel.children}`
                     }
                     name={name}
                     onBlur={onBlur}
                     ref={ref}
                     value={value}
                     prefix={prefix}
                     suffix={suffix}
                     allowNegative={allowNegative}
                     thousandSeparator={thousandSeparator}
                     decimalSeparator={decimalSeparator}
                     onValueChange={({ value, floatValue }) => {
                        if (isFloat) {
                           onChange(floatValue)
                        } else if (regexReplace) {
                           onChange(value.replace(regexReplace, ''))
                        } else {
                           onChange(value)
                        }
                     }}
                     className={joinClass(
                        `mt-1 ${fieldInput?.readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
                        }`
                     )}
                     isInvalid={Boolean(errors?.[name]?.message)}
                     readOnly={fieldInput?.readOnly}
                     maxLength={fieldInput?.maxLength}
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

export default NumberInputForm