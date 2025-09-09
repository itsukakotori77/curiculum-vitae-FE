import { HTMLMotionProps } from 'framer-motion'

export interface StepProps extends HTMLMotionProps<'div'> {
  size: number
  current: number
  className?: string
  childClassName?: string
  onChangeCurr: (val: number) => void
}
