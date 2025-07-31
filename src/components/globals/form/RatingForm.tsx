import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import RatingInput from './RatingInput'

interface RatingFormProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   control: Control<any>
   name: string
   className?: string
   label?: string
   disabled?: boolean
}

const RatingForm: React.FC<RatingFormProps> = ({
   fieldLabel,
   control,
   name,
   className,
   label,
   disabled,
   ...props
}) => {
   return (
      <div {...props}>
         <Label {...fieldLabel} />
         <Controller
            defaultValue={0 || null}
            control={control}
            name={name}
            render={({
               field,
               formState: { errors },
               fieldState: { error, invalid }
            }) => (
               <>
                  <RatingInput
                     {...field}
                     label={label || "Rate your experience"}
                     required
                     name={name}
                     isDisabled={disabled}
                     isInvalid={invalid}
                     error={error}
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

export default RatingForm
