import { HTMLMotionProps } from 'framer-motion'
import React, { forwardRef, useState, useEffect } from 'react'
import { RgbaColorPicker, RgbaColor } from 'react-colorful'
import { motion } from 'framer-motion'
import '@/assets/styles/partials/_colorpicker.css'

export interface ColorPickerProps
  extends Omit<HTMLMotionProps<'div'>, 'onChange'> {
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
  value?: RgbaColor
  onChange?: (color: RgbaColor) => void
  onBlur?: () => void
  name?: string
}

const ColorPickerInput = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      isDisabled,
      isInvalid,
      isValid,
      value,
      onChange,
      onBlur,
      name,
      ...props
    },
    ref,
  ) => {
    // Default color value
    const defaultColor: RgbaColor = { r: 255, g: 255, b: 255, a: 1 }

    const [color, setColor] = useState<RgbaColor>(
      value || defaultColor,
    )

    // Update internal state when value prop changes
    // useEffect(() => {
    //    if (value) {
    //       setColor(value)
    //    }
    // }, [value])

    const handleChange = (newColor: RgbaColor) => {
      setColor(newColor)
      if (onChange) {
        onChange(newColor)
      }
    }

    const handleBlur = () => {
      if (onBlur) {
        onBlur()
      }
    }

    // Convert color to CSS string for preview
    const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

    return (
      <motion.div
        ref={ref}
        className={`w-full ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
        {...props}
      >
        {/* Color preview */}
        <div
          className={`w-full h-10 rounded border-2 mb-2 ${
            isInvalid
              ? 'border-red-500'
              : isValid
                ? 'border-green-500'
                : 'border-gray-300'
          }`}
          style={{ backgroundColor: colorString }}
        />

        {/* Color picker */}
        <RgbaColorPicker
          color={color}
          onChange={handleChange}
          onBlur={handleBlur}
          className="!w-full"
        />

        {/* Hidden input for form compatibility */}
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(color)}
        />
      </motion.div>
    )
  },
)

ColorPickerInput.displayName = 'ColorPickerInput'

export default ColorPickerInput
