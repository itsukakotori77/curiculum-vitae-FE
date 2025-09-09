import React from 'react'
import Label, { LabelProps } from './Label'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@/utils/common'
import RadioInput, { RadioInputProps } from './RadioInput'
import { HTMLMotionProps, motion } from 'framer-motion'

interface FieldInput extends RadioInputProps {
  label: string
  value: string | number | any
  checked?: boolean
}

interface RadioProps extends HTMLMotionProps<'div'> {
  fieldLabel: LabelProps
  fieldInput: FieldInput[]
  control: Control<any>
  name: string
  labelClassName?: string
  classNameWrapper?: string
  labelTitleClassName?: string
}

const RadioForm: React.FC<RadioProps> = ({
  fieldLabel,
  fieldInput,
  control,
  name,
  labelClassName,
  classNameWrapper,
  labelTitleClassName,
  ...props
}) => {
  return (
    <motion.div {...props}>
      <Label
        {...fieldLabel}
        className={joinClass('', labelTitleClassName as string)}
      />
      <Controller
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <div
              // className={joinClass(
              //   `flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-7 lg:gap-y-3 mt-1`
              // )}
              className={joinClass(
                `grid md:grid-cols-3 mt-1 gap-y-3 gap-1`,
                classNameWrapper,
              )}
            >
              {fieldInput.map((item, index) => (
                <label
                  key={`radio-item-${index}-${item.value}`}
                  className="flex flex-row gap-1 items-center cursor-pointer"
                >
                  <RadioInput
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={item.value}
                    checked={field.value === item.value}
                    ref={field.ref}
                    label={item.label}
                    className={joinClass('max-h-[16px] max-w-[16px]')}
                    labelClassName={labelClassName}
                    isInvalid={Boolean(errors?.[name]?.message)}
                  />
                </label>
              ))}
            </div>
            {errors?.[name]?.message && (
              <span className="text-xs text-error">
                {errors?.[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </motion.div>
  )
}

export default RadioForm
