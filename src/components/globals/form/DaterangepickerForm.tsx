import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import DaterangepickerInput from './DaterangepickerInput'

interface IProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   control: Control<any>
   name: string
   max?: number
   maxDate?: Date
   minDate?: Date
}


const DaterangepickerForm: React.FC<IProps> = ({
   fieldLabel,
   control,
   name,
   max,
   maxDate,
   minDate,
   ...props
}) => {
   return (
      <div {...props}>
         <Label {...fieldLabel} />
         <Controller
            defaultValue={''}
            control={control}
            name={name}
            render={({ 
               field: {value, name, onBlur, onChange},
               formState: {errors}
            }) => (
               <>
                  <DaterangepickerInput
                     name={name}
                     value={value}
                     onBlur={onBlur}
                     onChange={val => onChange(val)}
                     disabled={props.disabled}
                     max={max}
                     maxDate={maxDate}
                     minDate={minDate}
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

export default DaterangepickerForm
