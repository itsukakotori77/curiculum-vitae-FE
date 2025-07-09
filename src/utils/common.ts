import clsx, { ClassValue } from 'clsx'
import { RgbaColor } from 'react-colorful'
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

export const rgbaToHex = (color: RgbaColor): string => {
  const { r, g, b, a } = color

  const toHex = (value: number): string => {
    const hex = Math.round(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  const alpha = Math.round(a * 255)

  if (a < 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const convertColor = (color: RgbaColor) => {
  return color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : 'rgba(91, 116, 165, 1)'
}

export const hexToRgba = (hex: string, alpha: number = 1): RgbaColor => {
  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return {
    r,
    g,
    b,
    a: alpha,
  }
}
