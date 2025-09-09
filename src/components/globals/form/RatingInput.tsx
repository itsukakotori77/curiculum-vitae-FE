import React, { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { joinClass } from '@/utils/common'

interface RatingInputProps {
  value?: number
  isInvalid?: boolean
  isValid?: boolean
  isDisabled?: boolean
  onChange: (value: number) => void
  onBlur?: () => void
  name: string
  label?: string
  required?: boolean
  error?: { message: string } | any
  className?: string
}

const RatingInput = forwardRef<HTMLDivElement, RatingInputProps>(
  (
    {
      value = 0,
      isInvalid = false,
      isValid = false,
      isDisabled = false,
      label,
      onChange,
      onBlur,
      name,
      required = false,
      error,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [hoveredRating, setHoveredRating] = useState<number>(0)

    const handleStarClick = (starValue: number): void => {
      if (isDisabled) return
      onChange(starValue)
    }

    const handleStarHover = (starValue: number): void => {
      if (isDisabled) return
      setHoveredRating(starValue)
    }

    const handleMouseLeave = (): void => {
      setHoveredRating(0)
    }

    const getStarColor = (starIndex: number): string => {
      const activeRating = hoveredRating || value
      if (isDisabled) {
        return starIndex <= value ? '#9ca3af' : '#e5e7eb'
      }
      return starIndex <= activeRating ? '#fbbf24' : '#d1d5db'
    }

    const ratingTexts: Record<number, string> = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    }

    // Determine border color based on validation state
    const getBorderColor = (): string => {
      if (isInvalid || error) return 'border-red-300'
      if (isValid) return 'border-green-300'
      return 'border-gray-200'
    }

    return (
      <div
        className={joinClass('w-full', className)}
        ref={ref}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {label && (
            <label className="block text-sm font-medium text-gray-700">
              {label}
              {required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          <div
            className={`flex space-x-1 p-3 rounded-lg border-2 transition-colors duration-200 ${getBorderColor()} ${
              isDisabled
                ? 'opacity-50 cursor-not-allowed bg-gray-50'
                : 'bg-white hover:border-blue-300'
            }`}
            onMouseLeave={handleMouseLeave}
          >
            {[1, 2, 3, 4, 5].map((starValue: number) => (
              <motion.button
                key={starValue}
                type="button"
                name={name}
                onBlur={onBlur}
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleStarHover(starValue)}
                disabled={isDisabled}
                className={`p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded ${
                  isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                whileHover={isDisabled ? {} : { scale: 1.15 }}
                whileTap={isDisabled ? {} : { scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: starValue * 0.05,
                  duration: 0.3,
                }}
                aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
              >
                <motion.div
                  animate={{
                    rotate:
                      !isDisabled &&
                      (hoveredRating === starValue ||
                        value === starValue)
                        ? 360
                        : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <Star
                    size={24}
                    fill={getStarColor(starValue)}
                    stroke={getStarColor(starValue)}
                    className="transition-colors duration-200"
                  />
                </motion.div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* {(hoveredRating || value) > 0 && (
                  )} */}
            <motion.div
              key={hoveredRating || value}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <span className="text-sm font-medium text-gray-700">
                {ratingTexts[hoveredRating || value] || 'none'}
              </span>
              <motion.div
                className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((hoveredRating || value) / 5) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </motion.div>
              <span className="text-xs text-gray-500 min-w-0">
                {hoveredRating || value || 0}/5
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    )
  },
)

RatingInput.displayName = 'RatingInput'

export default RatingInput

// Example usage with React Hook Form Controller
/*
import { Controller } from 'react-hook-form';

<Controller
   name="rating"
   control={control}
   rules={{ required: "Please provide a rating" }}
   render={({ field, fieldState: { error, invalid } }) => (
      <RatingInput
         {...field}
         error={error}
         isInvalid={invalid}
         label="Rate your experience"
         required
      />
   )}
/>
*/
