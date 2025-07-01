import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const autoUnoClassName = (className?: string) => {
  if (!className) return ''
  return className.startsWith(':uno:') ? className : `:uno: ${className}`
}

export function joinClass(...args: Array<string | boolean | undefined>) {
  return twMerge(
    args
      .filter((str) => typeof str === 'string')
      .join(' ')
      .trim(),
  )
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toIcon = () => {

}
