import clsx, { ClassValue } from 'clsx'
import { RgbaColor } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

export const autoUnoClassName = (className?: string) => {
  if (!className) return ''
  return className.startsWith(':uno:')
    ? className
    : `:uno: ${className}`
}

export function joinClass(
  ...args: Array<string | boolean | undefined>
) {
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
    return `#${toHex(r).toLocaleUpperCase()}${toHex(g).toUpperCase()}${toHex(b).toLocaleUpperCase}${
      toHex(alpha).toLocaleUpperCase
    }`
  }

  return `#${toHex(r).toLocaleUpperCase()}${toHex(g).toLocaleUpperCase()}${toHex(b).toUpperCase()}`
}

export const convertColor = (color: RgbaColor) => {
  return color
    ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    : 'rgba(91, 116, 165, 1)'
}

export const hexToRgba = (
  hex: string,
  alpha: number = 1,
): RgbaColor => {
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

export const calcHeight = (value: string) => {
  const numberOfLineBreaks = (String(value).match(/\n/g) || []).length
  const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2
  return newHeight
}

export const typeTextArea = (type: string): number => {
  switch (type) {
    case 'chat':
      return 34

    default:
      return 40
  }
}

export const convertTime = (
  dt2: any,
  dt1: any,
  type: string,
): number => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000
  let val = 0
  switch (type) {
    case 'minutes':
      diff /= 60
      val = Math.abs(Math.round(diff))
      break

    case 'hours':
      diff /= 60 * 60
      val = Math.abs(Math.round(diff))
      break

    case 'days':
      diff /= 60 * 1440
      val = Math.abs(Math.round(diff))
      break
  }

  return val
}

export const getToken = () => {
  const token = getCookie('accessToken')
  if (token && typeof token === 'string') {
    return token
  }

  return null
}

export const checkTimeDay = (dt2: any, dt1: any): number => {
  return convertTime(dt2, dt1, 'days')
}

export const parseToken = (token: string) => {
  if (token && token !== 'undefined') {
    const base64Url = token?.split('.')[1]
    const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/')
    const buff = new Buffer(base64, 'base64')
    const payloadinit = buff.toString('ascii')
    return JSON.parse(payloadinit)
  }
  return null
}

export const decodeToken = (token: string) => {
  const decoded = jwtDecode(token)
  return decoded
}

export const canvasToBlob = (
  canvas: HTMLCanvasElement,
  quality: number = 0.95,
): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
      },
      'image/jpeg',
      quality,
    )
  })
}
