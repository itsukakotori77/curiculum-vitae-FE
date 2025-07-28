import { joinClass } from '@/utils/common';
import { motion } from 'framer-motion';
import React, { forwardRef, PropsWithRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export interface NumberInputProps extends NumericFormatProps, PropsWithRef<any> {
   isInvalid?: boolean
   isValid?: boolean
   allowNegative?: boolean
}

const NumberInput: React.FC<NumberInputProps> = forwardRef(
   ({
      isInvalid,
      isValid,
      allowNegative = false,
      thousandSeparator = '.',
      decimalSeparator = ',',
      className,
      ...props
   }, ref) => {
      return (
         <motion.div
            animate={isInvalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
         >
            <NumericFormat
               getInputRef={ref}
               className={joinClass(
                  'w-full py-2 px-3 border-2 border-black rounded-lg outline-none focus:border-primary/60',
                  'disabled:bg-gray-200 disabled:text-gray-400 shadow-[3px_3px_0px_rgba(0,0,0,1)]',
                  isInvalid
                     ? 'border-error'
                     : isValid
                        ? 'border-success'
                        : 'border-black',
                  className
               )}
               autoComplete="off"
               allowNegative={allowNegative}
               thousandSeparator={thousandSeparator}
               decimalSeparator={decimalSeparator}
               {...props}
            />
         </motion.div>
      )
   }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput