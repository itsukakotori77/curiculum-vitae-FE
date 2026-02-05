'use client'

import React, { forwardRef, PropsWithRef } from 'react'
import {
  MobileDatePicker,
  MobileDatePickerProps,
} from '@mui/x-date-pickers'
import { motion } from 'framer-motion'
import { joinClass } from '@/utils/common'
import { IconButton } from '@mui/material'
import { X } from 'lucide-react'

export interface DatepickerInputProps
  extends MobileDatePickerProps,
    PropsWithRef<any> {
  isValid?: boolean
  isInvalid?: boolean
  propsExtra?: any
  placeholder?: string
  onClear?: () => void
  showClearButton?: boolean
}

const DatepickerInput: React.FC<DatepickerInputProps> = forwardRef(
  ({ isInvalid, isValid, className, placeholder, onClear, showClearButton = true, ...props }, ref) => {
    const hasValue = props.value !== null && props.value !== undefined

    return (
      <motion.div
        animate={isInvalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <MobileDatePicker
          inputRef={ref as any}
          {...props}
          closeOnSelect
          className={joinClass(
            'w-full py-2 px-3 !border-2 !border-black rounded-lg outline-none focus:border-primary/60',
            'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)] bg-white',
            isInvalid
              ? '!border-error'
              : isValid
                ? '!border-success'
                : '!border-black',
            className,
          )}
          onClose={() => {
            setTimeout(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur()
              }
            }, 0)
          }}
          slotProps={{
            textField: {
              onFocus: () => {
                setTimeout(() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur()
                  }
                }, 0)
              },
              placeholder,
              error: isInvalid,
              size: 'small',
              className: joinClass(
                'custom-textfield',
                className as string,
              ),
            },
          }}
        />
        {showClearButton && hasValue && !props.disabled && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onClear?.()
            }}
            className="!absolute !right-10 !top-1/2 !-translate-y-1/2 !z-10"
            sx={{
              padding: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <X fontSize="small" />
          </IconButton>
        )}
      </motion.div>
    )
  },
)

DatepickerInput.displayName = 'DatepickerInput'

export default DatepickerInput