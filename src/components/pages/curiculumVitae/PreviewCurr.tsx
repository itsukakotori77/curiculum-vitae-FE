'use client'

import React, {
  HTMLAttributeReferrerPolicy,
  useRef,
  useState,
} from 'react'
import { Download, FileImage, FileText, Loader2 } from 'lucide-react'
import Card from '@/components/CultUI/Card'
import Filter from './Filter'
import Sample1 from '../exampleCv/Sample1'
import Sample2 from '../exampleCv/Sample2'
import Sample3 from '../exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function CuriculumVitae() {
  const filterRef = useRef<HTMLAttributeReferrerPolicy>(null)
  const [state, setState] = useState<{
    head?: string
    style?: string[]
  }>({
    head: '',
    style: [],
  })

  const [exportLoading, setExportLoading] = useState<{
    [key: number]: boolean
  }>({})
  const [exportProgress, setExportProgress] = useState<{
    [key: number]: string
  }>({})

  const componentConfig = [
    {
      Component: Sample1,
      key: 'sample1',
      title: 'Sample 1',
    },
    {
      Component: Sample2,
      key: 'sample2',
      title: 'Sample 2',
    },
    {
      Component: Sample3,
      key: 'sample3',
      title: 'Sample 3',
    },
  ]

  // Helper function to prepare element for export
  const prepareElementForExport = (
    element: HTMLElement,
  ): HTMLElement => {
    // Add export-safe classes
    element.classList.add('cv-export-wrapper', 'export-safe')

    // Convert any problematic styles
    const allElements = [
      element,
      ...element.querySelectorAll('*'),
    ] as HTMLElement[]
    allElements.forEach((el) => {
      const style = el.getAttribute('style') || ''
      if (
        style.includes('oklch') ||
        style.includes('lch') ||
        style.includes('lab')
      ) {
        // Remove problematic color functions
        const cleanedStyle = style.replace(
          /(?:oklch|lch|lab)\([^)]+\)/g,
          'rgb(107, 114, 128)',
        )
        el.setAttribute('style', cleanedStyle)
      }
    })

    return element
  }

  // Export to PNG with improved error handling
  const exportToPNG = async (elementId: string, filename: string) => {
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`)
      }

      // Prepare element for export
      const preparedElement = prepareElementForExport(
        element.cloneNode(true) as HTMLElement,
      )

      // Create temporary container
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = element.offsetWidth + 'px'
      tempContainer.style.height = element.offsetHeight + 'px'
      tempContainer.appendChild(preparedElement)
      document.body.appendChild(tempContainer)

      try {
        const canvas = await html2canvas(preparedElement, {
          useCORS: true,
          allowTaint: true,
          background: '#ffffff',
          logging: false,
          width: element.scrollWidth,
          height: element.scrollHeight,
          //  scale: 1, // Reduced scale to avoid memory issues
          //  foreignObjectRendering: false, // Disable for better compatibility
          //  ignoreElements: (element) => {
          //    // Skip elements with problematic styles
          //    const style = element.getAttribute('style') || ''
          //    const className = element.className || ''
          //    return style.includes('oklch') ||
          //           style.includes('lch') ||
          //           style.includes('lab') ||
          //           className.includes('ignore-export')
          //  }
        })

        // Create download link
        const link = document.createElement('a')
        link.download = `${filename}.png`
        link.href = canvas.toDataURL('image/png', 0.9)
        link.click()

        console.log('PNG export completed successfully')
      } finally {
        // Clean up temporary container
        document.body.removeChild(tempContainer)
      }
    } catch (error) {
      console.error('Error exporting to PNG:', error)
      throw error
    }
  }

  // Export to PDF with improved error handling
  const exportToPDF = async (elementId: string, filename: string) => {
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`)
      }

      // Prepare element for export
      const preparedElement = prepareElementForExport(
        element.cloneNode(true) as HTMLElement,
      )

      // Create temporary container
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = element.offsetWidth + 'px'
      tempContainer.style.height = element.offsetHeight + 'px'
      tempContainer.appendChild(preparedElement)
      document.body.appendChild(tempContainer)

      try {
        // Capture the element as canvas
        const canvas = await html2canvas(preparedElement, {
          useCORS: true,
          allowTaint: true,
          background: '#ffffff',
          logging: false,
          width: element.scrollWidth,
          height: element.scrollHeight,
          //  scale: 1,
          //  foreignObjectRendering: false,
          //  ignoreElements: (element) => {
          //    const style = element.getAttribute('style') || ''
          //    const className = element.className || ''
          //    return style.includes('oklch') ||
          //           style.includes('lch') ||
          //           style.includes('lab') ||
          //           className.includes('ignore-export')
          //  }
        })

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        // Calculate dimensions to fit the page
        const ratio = Math.min(
          pdfWidth / canvasWidth,
          pdfHeight / canvasHeight,
        )
        const imgWidth = canvasWidth * ratio
        const imgHeight = canvasHeight * ratio

        // Center the image
        const x = (pdfWidth - imgWidth) / 2
        const y = (pdfHeight - imgHeight) / 2

        const imgData = canvas.toDataURL('image/png', 0.9)
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
        pdf.save(`${filename}.pdf`)

        console.log('PDF export completed successfully')
      } finally {
        // Clean up temporary container
        document.body.removeChild(tempContainer)
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      throw error
    }
  }

  // Handle export with loading state
  const handleExport = async (
    index: number,
    format: 'png' | 'pdf',
  ) => {
    const elementId = `cv-component-${index}`
    const filename = `cv-${componentConfig[index].title.toLowerCase().replace(/\s+/g, '-')}`

    setExportLoading((prev) => ({ ...prev, [index]: true }))
    setExportProgress((prev) => ({
      ...prev,
      [index]: 'Preparing export...',
    }))

    try {
      if (format === 'png') {
        setExportProgress((prev) => ({
          ...prev,
          [index]: 'Capturing component...',
        }))
        await exportToPNG(elementId, filename)
      } else {
        setExportProgress((prev) => ({
          ...prev,
          [index]: 'Generating PDF...',
        }))
        await exportToPDF(elementId, filename)
      }

      setExportProgress((prev) => ({
        ...prev,
        [index]: 'Export completed!',
      }))
    } catch (error: any) {
      console.error(`Export failed:`, error)
      setExportProgress((prev) => ({
        ...prev,
        [index]: 'Export failed!',
      }))

      // Show user-friendly error message
      if (
        error.message.includes('oklch') ||
        error.message.includes('color')
      ) {
        alert(
          'Export failed due to unsupported color format. The CV template may be using modern CSS colors that are not supported by the export library.',
        )
      } else {
        alert(`Export failed: ${error.message}`)
      }
    } finally {
      setExportLoading((prev) => ({ ...prev, [index]: false }))
      setTimeout(() => {
        setExportProgress((prev) => ({ ...prev, [index]: '' }))
      }, 2000)
    }
  }

  // Batch export all components
  const handleBatchExport = async (format: 'png' | 'pdf') => {
    try {
      const promises = componentConfig.map(async (config, index) => {
        const elementId = `cv-component-${index}`
        const filename = `cv-${config.title.toLowerCase().replace(/\s+/g, '-')}`

        // Add delay between exports to prevent memory issues
        await new Promise((resolve) =>
          setTimeout(resolve, index * 500),
        )

        if (format === 'png') {
          return exportToPNG(elementId, filename)
        } else {
          return exportToPDF(elementId, filename)
        }
      })

      await Promise.all(promises)
      alert(
        `All ${componentConfig.length} templates exported as ${format.toUpperCase()}`,
      )
    } catch (error: any) {
      console.error('Batch export failed:', error)
      alert(`Batch export failed: ${error.message}`)
    }
  }

  return (
    <section className="w-full h-full px-7 pt-36">
      <div className="flex w-full h-auto gap-24">
        <div className="flex w-[20%] items-center justify-center">
          <Filter
            ref={filterRef}
            filter={state}
            setFilter={setState}
          />
        </div>

        <div className="w-[80%] flex flex-col">
          {/* Batch Export Controls */}
          <div className="flex gap-2 mb-4 justify-end">
            <button
              onClick={() => handleBatchExport('png')}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors"
            >
              <FileImage className="w-4 h-4" />
              Export All PNG
            </button>
            <button
              onClick={() => handleBatchExport('pdf')}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              Export All PDF
            </button>
          </div>

          {/* CV Components Grid */}
          <div className="overflow-y-auto grid grid-cols-2 gap-4 pr-2">
            {componentConfig?.map(
              ({ Component, key, title, ...props }, index) => (
                <Card
                  key={key}
                  className="w-full flex-shrink-0 overflow-hidden relative group"
                >
                  {/* Export Controls Overlay */}
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                      {/* PNG Export */}
                      <button
                        onClick={() => handleExport(index, 'png')}
                        disabled={exportLoading[index]}
                        className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 disabled:opacity-50 transition-colors"
                      >
                        {exportLoading[index] ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <FileImage className="w-3 h-3" />
                        )}
                        PNG
                      </button>

                      {/* PDF Export */}
                      <button
                        onClick={() => handleExport(index, 'pdf')}
                        disabled={exportLoading[index]}
                        className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:opacity-50 transition-colors"
                      >
                        {exportLoading[index] ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <FileText className="w-3 h-3" />
                        )}
                        PDF
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {exportProgress[index] && (
                    <div className="absolute bottom-2 left-2 right-2 z-10">
                      <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {exportProgress[index]}
                      </div>
                    </div>
                  )}

                  {/* CV Component */}
                  <div
                    id={`cv-component-${index}`}
                    className="overflow-y-auto aspect-[210/297]"
                  >
                    <Component data={biodataCurr} {...props} />
                  </div>

                  {/* Template Title */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    {title}
                  </div>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
