import React, { forwardRef } from 'react'

interface ProgressInputProps extends HTMLInputElement {
  isDisabled?: boolean
  isValid?: boolean
  isInvalid?: boolean
}

const ProgressInput: React.FC<ProgressInputProps> = forwardRef(
  ({ isDisabled, isValid, isInvalid, ...props }, ref) => {
    return ''
  },
)

ProgressInput.displayName = 'ProgressInput'

export default ProgressInput
