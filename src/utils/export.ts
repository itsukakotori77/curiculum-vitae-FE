// utils/exportUtils.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export interface ExportOptions {
  filename?: string
  scale?: number
  quality?: number
  format?: 'A4' | 'A3' | 'Letter'
  orientation?: 'portrait' | 'landscape'
}

// Function to convert OKLCH and other modern CSS colors to supported formats
const convertUnsupportedColors = (
  element: HTMLElement,
): HTMLElement => {
  const clonedElement = element.cloneNode(true) as HTMLElement

  // Get all elements in the cloned tree
  const allElements = [
    clonedElement,
    ...clonedElement.querySelectorAll('*'),
  ] as HTMLElement[]

  allElements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el)

    // Convert colors that might be in unsupported formats
    const colorProperties = [
      'color',
      'backgroundColor',
      'borderColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'outlineColor',
      'textDecorationColor',
      'caretColor',
      'fill',
      'stroke',
    ]

    colorProperties.forEach((prop) => {
      const value = computedStyle.getPropertyValue(prop)
      if (value && value !== 'none' && value !== 'transparent') {
        // Convert computed color to RGB format
        const rgb = window.getComputedStyle(el).getPropertyValue(prop)
        el.style.setProperty(prop, rgb)
      }
    })

    // Handle CSS custom properties (variables) that might contain OKLCH
    const styles = el.getAttribute('style') || ''
    if (
      styles.includes('oklch') ||
      styles.includes('lch') ||
      styles.includes('lab')
    ) {
      // Remove potentially problematic custom properties
      const cleanedStyles = styles.replace(
        /--[^:]+:\s*(?:oklch|lch|lab)\([^)]+\);?/g,
        '',
      )
      el.setAttribute('style', cleanedStyles)
    }
  })

  return clonedElement
}

// Alternative approach: Create a temporary container with converted colors
const createExportableElement = (
  originalElement: HTMLElement,
): HTMLElement => {
  // Create a temporary container
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '-9999px'
  container.style.width = originalElement.offsetWidth + 'px'
  container.style.height = originalElement.offsetHeight + 'px'

  // Clone and convert the element
  const convertedElement = convertUnsupportedColors(originalElement)
  container.appendChild(convertedElement)

  // Temporarily add to DOM
  document.body.appendChild(container)

  return container
}

// Convert TSX component to PNG
export const exportToPNG = async (
  elementId: string,
  options: ExportOptions = {},
): Promise<void> => {
  const { filename = 'export', scale = 2, quality = 1 } = options

  let tempContainer: HTMLElement | null = null

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Create exportable element with converted colors
    tempContainer = createExportableElement(element)
    const targetElement =
      tempContainer.firstElementChild as HTMLElement

    const canvas = await html2canvas(targetElement, {
      // scale,
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      // Additional options to handle problematic styles
      // ignoreElements: (element) => {
      //   // Skip elements that might have unsupported styles
      //   const style = element.getAttribute('style') || ''
      //   return style.includes('oklch') || style.includes('lch') || style.includes('lab')
      // },
      // onclone: (clonedDoc) => {
      //   // Additional cleanup on the cloned document
      //   const allElements = clonedDoc.querySelectorAll('*')
      //   allElements.forEach((el) => {
      //     const htmlEl = el as HTMLElement
      //     const style = htmlEl.getAttribute('style') || ''
      //     if (style.includes('oklch') || style.includes('lch') || style.includes('lab')) {
      //       // Remove problematic inline styles
      //       htmlEl.removeAttribute('style')
      //     }
      //   })
      // },
    })

    // Create download link
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png', quality)
    link.click()

    console.log('PNG export completed successfully')
  } catch (error) {
    console.error('Error exporting to PNG:', error)
    throw error
  } finally {
    // Clean up temporary container
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer)
    }
  }
}

// Convert TSX component to PDF
export const exportToPDF = async (
  elementId: string,
  options: ExportOptions = {},
): Promise<void> => {
  const {
    filename = 'export',
    scale = 2,
    format = 'A4',
    orientation = 'portrait',
  } = options

  let tempContainer: HTMLElement | null = null

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Create exportable element with converted colors
    tempContainer = createExportableElement(element)
    const targetElement =
      tempContainer.firstElementChild as HTMLElement

    // Capture the element as canvas
    const canvas = await html2canvas(targetElement, {
      // scale,
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      // ignoreElements: (element: any) => {
      //   const style = element.getAttribute('style') || ''
      //   return style.includes('oklch') || style.includes('lch') || style.includes('lab')
      // },
      // onclone: (clonedDoc: any) => {
      //   const allElements = clonedDoc.querySelectorAll('*')
      //   allElements.forEach((el: any) => {
      //     const htmlEl = el as HTMLElement
      //     const style = htmlEl.getAttribute('style') || ''
      //     if (style.includes('oklch') || style.includes('lch') || style.includes('lab')) {
      //       htmlEl.removeAttribute('style')
      //     }
      //   })
      // },
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format.toLowerCase(),
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Calculate dimensions to fit the page
    const ratio = Math.min(
      pdfWidth / (canvasWidth / scale),
      pdfHeight / (canvasHeight / scale),
    )
    const imgWidth = (canvasWidth / scale) * ratio
    const imgHeight = (canvasHeight / scale) * ratio

    // Center the image
    const x = (pdfWidth - imgWidth) / 2
    const y = (pdfHeight - imgHeight) / 2

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
    pdf.save(`${filename}.pdf`)

    console.log('PDF export completed successfully')
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    throw error
  } finally {
    // Clean up temporary container
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer)
    }
  }
}

// Simpler alternative: CSS-only approach
export const exportToPNG_Simple = async (
  elementId: string,
  options: ExportOptions = {},
): Promise<void> => {
  const { filename = 'export', quality = 1 } = options

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      logging: false,
      // Simplified options to avoid color issues
      // foreignObjectRendering: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png', quality)
    link.click()

    console.log('PNG export completed successfully')
  } catch (error) {
    console.error('Error exporting to PNG:', error)
    throw error
  }
}

// Convert TSX component to multi-page PDF (for long content)
export const exportToMultiPagePDF = async (
  elementId: string,
  options: ExportOptions = {},
): Promise<void> => {
  const {
    filename = 'export',
    scale = 2,
    format = 'A4',
    orientation = 'portrait',
  } = options

  let tempContainer: HTMLElement | null = null

  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    tempContainer = createExportableElement(element)
    const targetElement =
      tempContainer.firstElementChild as HTMLElement

    const canvas = await html2canvas(targetElement, {
      // scale,
      useCORS: true,
      allowTaint: true,
      background: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format.toLowerCase(),
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    pdf.save(`${filename}.pdf`)
    console.log('Multi-page PDF export completed successfully')
  } catch (error) {
    console.error('Error exporting to multi-page PDF:', error)
    throw error
  } finally {
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer)
    }
  }
}

// Batch export multiple components
export const batchExport = async (
  elementIds: string[],
  format: 'png' | 'pdf',
  options: ExportOptions = {},
): Promise<void> => {
  const promises = elementIds.map(async (id, index) => {
    const filename = `${options.filename || 'export'}_${index + 1}`

    if (format === 'png') {
      return exportToPNG(id, { ...options, filename })
    } else {
      return exportToPDF(id, { ...options, filename })
    }
  })

  try {
    await Promise.all(promises)
    console.log(`Batch export completed: ${promises.length} files`)
  } catch (error) {
    console.error('Error in batch export:', error)
    throw error
  }
}

// Export with loading state
export const exportWithLoading = async (
  id: string,
  elementId: string,
  format: 'png' | 'pdf',
  options: ExportOptions = {},
  onProgress?: (message: string) => void,
): Promise<void> => {
  try {
    onProgress?.('Preparing export...')

    if (format === 'png') {
      onProgress?.('Capturing component...')
      await exportToPNG(id, options)
    } else {
      onProgress?.('Generating PDF...')
      await exportToPDF(elementId, options)
    }

    onProgress?.('Export completed!')
  } catch (error) {
    onProgress?.('Export failed!')
    throw error
  }
}
