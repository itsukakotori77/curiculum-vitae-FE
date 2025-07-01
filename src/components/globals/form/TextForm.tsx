'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import React, { useState } from 'react'
import Label, { LabelProps } from './Label'
import TextInput, { TextInputProps } from './TextInput'
import { Control, Controller } from 'react-hook-form'
import { joinClass } from '@/utils/common'
import { Eye, EyeOff } from 'lucide-react'

interface FieldInput extends TextInputProps {
   type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'range'
}

export interface TextFormProps extends HTMLMotionProps<'div'> {
   fieldLabel: LabelProps
   fieldInput?: FieldInput
   control: Control<any>
   name: string
   prefix?: string
   suffix?: string
   regexReplace?: RegExp
   counter?: boolean
}

const TextForm: React.FC<TextFormProps> = ({
   fieldLabel,
   fieldInput,
   control,
   name,
   prefix,
   suffix,
   regexReplace,
   counter,
   ...props
}) => {
   const [typePass, setTypePass] = useState<boolean>(false)
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
                        prefix && 'input-prefix',
                        suffix && 'input-suffix'
                     )}
                  >
                     {prefix && <span>{prefix}</span>}
                     <TextInput
                        {...field}
                        {...fieldInput}
                        type={
                           fieldInput?.type === 'password' && typePass
                              ? 'text'
                              : fieldInput?.type
                        }
                        onChange={e => {
                           if (!e.target.value?.replace(/\s/g, '').length) {
                              field.onChange(e.target.value?.trim())
                           } else if (regexReplace) {
                              field.onChange(e.target.value.replace(regexReplace, ''))
                           } else {
                              field.onChange(e)
                           }
                        }}
                        placeholder={
                           fieldInput?.placeholder ?? `Masukkan ${fieldLabel.children}`
                        }
                        // className={joinClass('mt-1')}
                        className={joinClass(
                           `mt-1 ${fieldInput?.readOnly ? 'bg-gray-200 cursor-not-allowed' : ''
                           }`
                        )}
                        isInvalid={Boolean(errors?.[name]?.message)}
                     />
                     {suffix && <span>{suffix}</span>}
                     {fieldInput?.type === 'password' && (
                        typePass ? (
                           <motion.div
                              className="absolute right-3 bottom-2.5 ms-6 translate-middle-y cursor-pointer"
                              animate={Boolean(errors?.[name]?.message) ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                              transition={{ duration: 0.4 }}
                              onClick={() => setTypePass(!typePass)}
                           >
                              <Eye className="text-gray-600 w-5 h-5" />
                           </motion.div>
                        ) : (
                           <motion.div
                              className="absolute right-3 bottom-2.5 ms-6 translate-middle-y cursor-pointer"
                              animate={Boolean(errors?.[name]?.message) ? { x: [0, -6, 6, -6, 6, 0] } : {}}
                              transition={{ duration: 0.4 }}
                              onClick={() => setTypePass(!typePass)}
                           >
                              <EyeOff className="text-gray-600 w-5 h-5" />
                           </motion.div>
                        )
                     )}
                  </motion.div>
                  <div className="flex items-center justify-between mt-1">
                     {errors?.[name]?.message ? (
                        <span className="text-xs text-error">
                           {errors?.[name]?.message?.toString()}
                        </span>
                     ) : (
                        <span />
                     )}
                     {counter && (
                        <span className="text-xs text-[#929393]">
                           {field.value?.length ?? 0} / {fieldInput?.maxLength ?? '-'}
                        </span>
                     )}
                  </div>
               </>
            )}
         />

      </motion.div>
   )
}

export default TextForm
