'use client'

import React, { HTMLProps } from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import Switch from './Switch'
import { joinClass } from '@/utils/common'

interface SwitchFormProps extends HTMLProps<HTMLDivElement> {
   fieldLabel: LabelProps
   control: Control<any>
   name: string
   label?: string
   setChange: (val: boolean) => void
   className?: string
}

const SwitchForm: React.FC<SwitchFormProps> = ({
   fieldLabel,
   control,
   name,
   setChange,
   label,
   className,
   ...props
}) => {
   return (
      <div 
         className={joinClass('w-auto', className)}
         {...props}
      >
         <Label {...fieldLabel} />
         <Controller
            defaultValue={false}
            control={control}
            name={name}
         render={({
               field: { onChange, ref, name, value },
               formState: { errors }
            }) => (
               <>
                  <Switch
                     ref={ref}
                     isChecked={value || false}
                     onChangeSwitch={(val) => {
                        setChange(val)
                        onChange(val) 
                     }}
                     name={name}
                     intent="secondary"
                     label={label || 'You want to use level in your skill ?'}
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

export default SwitchForm

