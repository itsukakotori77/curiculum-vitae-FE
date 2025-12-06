import clsx, { ClassValue } from 'clsx'
import { RgbaColor } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

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

export const convertTime = (dt2: any, dt1: any, type: string): number => {
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

// Helper to convert font URL to base64
export const fetchFontAsBase64 = async (
  url: string,
): Promise<string | null> => {
  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (err) {
    console.warn(`Failed to fetch font: ${url}`, err)
    return null
  }
}

export const getCustomFontCSS = async () => {
  let fontCSS = ''

  try {
    // Wait for fonts to load
    await document.fonts.ready

    // Get all loaded fonts from document
    const loadedFonts = Array.from(document.fonts.values())
    
    console.log('Loaded fonts:', loadedFonts.map(f => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status
    })))

    // Scan stylesheets for Next.js font definitions
    const stylesheets = Array.from(document.styleSheets)

    for (const stylesheet of stylesheets) {
      try {
        // Next.js injects fonts into the document
        const rules = Array.from(stylesheet.cssRules || [])

        for (const rule of rules) {
          if (rule instanceof CSSFontFaceRule) {
            const fontFamily = rule.style.getPropertyValue('font-family')
            const src = rule.style.getPropertyValue('src')

            // Check if this is a font we care about
            if (!fontFamily || !src) continue

            console.log('Found font-face:', fontFamily, src)

            if (src.includes('url(')) {
              const urlMatches = Array.from(src.matchAll(/url\(['"]?([^'")\s]+)['"]?\)/g))
              
              for (const match of urlMatches) {
                let fontUrl = match[1]

                // Skip if already base64
                if (fontUrl.startsWith('data:')) {
                  fontCSS += `
                    @font-face {
                      font-family: ${fontFamily};
                      src: ${src};
                      font-weight: ${rule.style.getPropertyValue('font-weight') || 'normal'};
                      font-style: ${rule.style.getPropertyValue('font-style') || 'normal'};
                      font-display: ${rule.style.getPropertyValue('font-display') || 'swap'};
                    }
                  `
                  console.log('✓ Font already base64:', fontFamily)
                  break
                }

                // Make URL absolute if it's relative (Next.js fonts)
                if (!fontUrl.startsWith('http')) {
                  const origin = window.location.origin
                  fontUrl = fontUrl.startsWith('/') ? `${origin}${fontUrl}` : `${origin}/${fontUrl}`
                }

                console.log('Fetching font from:', fontUrl)

                try {
                  const base64Font = await fetchFontAsBase64(fontUrl)
                  
                  if (base64Font) {
                    // Get format
                    let format = 'woff2'
                    const formatMatch = src.match(/format\(['"]?([^'")\s]+)['"]?\)/)
                    if (formatMatch) {
                      format = formatMatch[1]
                    } else if (fontUrl.includes('.woff2')) {
                      format = 'woff2'
                    } else if (fontUrl.includes('.woff')) {
                      format = 'woff'
                    }

                    fontCSS += `
                      @font-face {
                        font-family: ${fontFamily};
                        src: url("${base64Font}") format("${format}");
                        font-weight: ${rule.style.getPropertyValue('font-weight') || 'normal'};
                        font-style: ${rule.style.getPropertyValue('font-style') || 'normal'};
                        font-display: ${rule.style.getPropertyValue('font-display') || 'swap'};
                        unicode-range: ${rule.style.getPropertyValue('unicode-range') || ''};
                      }
                    `
                    console.log(`✓ Font embedded: ${fontFamily}`)
                    break
                  }
                } catch (err) {
                  console.warn('Failed to fetch font:', fontUrl, err)
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Could not access stylesheet:', err)
      }
    }

    // Also handle your local fonts
    const origin = window.location.origin
    const localFonts = [
      { family: 'Playfair', url: '/fonts/playfair/Playfair-Regular.ttf', format: 'truetype', weight: '400', style: 'normal' },
      { family: 'Gram', url: '/fonts/gram/Gramregular.ttf', format: 'truetype', weight: '400', style: 'normal' },
    ]

    for (const font of localFonts) {
      try {
        const fontUrl = `${origin}${font.url}`
        const base64Font = await fetchFontAsBase64(fontUrl)
        
        if (base64Font) {
          fontCSS += `
            @font-face {
              font-family: '${font.family}';
              src: url("${base64Font}") format("${font.format}");
              font-weight: ${font.weight};
              font-style: ${font.style};
            }
          `
          console.log(`✓ Local font embedded: ${font.family}`)
        }
      } catch (err) {
        console.error(`Failed to embed ${font.family}:`, err)
      }
    }

  } catch (err) {
    console.error('Error in getCustomFontCSS:', err)
  }

  console.log('Total font CSS length:', fontCSS.length)
  return fontCSS
}