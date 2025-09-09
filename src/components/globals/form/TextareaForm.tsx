import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'
import Label, { LabelProps } from './Label'
import TextareaInput, { TextareaInputProps } from './TextareaInput'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@/utils/common'

interface FieldInput extends TextareaInputProps {}

export interface TextareaFormProps extends HTMLMotionProps<'div'> {
  fieldLabel: LabelProps
  fieldInput?: FieldInput
  control: Control<any>
  name: string
  className?: string
  regexReplace?: RegExp
}

const TextareaForm: React.FC<TextareaFormProps> = ({
  fieldLabel,
  fieldInput,
  control,
  name,
  className,
  regexReplace,
  ...props
}) => {
  return (
    <motion.div {...props}>
      <Label {...fieldLabel} />
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <motion.div
              className={joinClass(
                'flex items-center relative',
                className,
              )}
            >
              <TextareaInput
                {...field}
                {...fieldInput}
                onChange={(e) => {
                  if (!e.target.value?.replace(/\s/g, '').length) {
                    field.onChange(e.target.value?.trim())
                  } else if (regexReplace) {
                    field.onChange(
                      e.target.value.replace(regexReplace, ''),
                    )
                  } else {
                    field.onChange(e)
                  }
                }}
                placeholder={
                  fieldInput?.placeholder ??
                  `Masukkan ${fieldLabel.children}`
                }
                // className={joinClass('mt-1')}
                className={joinClass(
                  `mt-1 ${
                    fieldInput?.readOnly
                      ? 'bg-gray-200 cursor-not-allowed'
                      : ''
                  }`,
                )}
                isInvalid={Boolean(errors?.[name]?.message)}
              />
            </motion.div>
            <div className="flex items-center justify-between mt-1">
              {errors?.[name]?.message ? (
                <span className="text-xs text-error">
                  {errors?.[name]?.message?.toString()}
                </span>
              ) : (
                <span />
              )}
            </div>
          </>
        )}
      />
    </motion.div>
  )
}

export default TextareaForm
