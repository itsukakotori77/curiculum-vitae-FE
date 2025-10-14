import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react'
import Modal from '@/components/globals/modal'
import { ICurrVitae } from '@/interface/curiculumVitae'
import Sample3 from '../../exampleCv/Sample3'
import { toPng } from 'html-to-image'
import { useCVSettingStore } from '@/utils/store'
import { convertColor } from '@/utils/common'
import jsPDF from 'jspdf'

interface IProps {
  data?: ICurrVitae | any
  isShowing: boolean
  onClose: () => void
}

export interface PreviewGeneratorHandle {
  downloadPng: () => Promise<void>
  downloadPdf: () => Promise<void>
  getElement: () => HTMLDivElement | null
}

const PreviewGenerator = forwardRef<PreviewGeneratorHandle, IProps>(
  ({ data, isShowing, onClose }, ref) => {
    const sample3Ref = useRef<HTMLDivElement>(null)
    const { data: dataSetting } = useCVSettingStore()

    // Memoize color props to avoid recalculation
    const colorProps = useMemo(
      () => ({
        primaryColor: convertColor(dataSetting?.primaryColor!) || '#FFFFF',
        sidebarColor: convertColor(dataSetting?.sidebarColor!) || '#8B8EBC',
        skillColor: convertColor(dataSetting?.skillColor!) || '#262424',
      }),
      [dataSetting]
    )

    // Generate filename based on CV data
    const generateFilename = (extension: 'png' | 'pdf') => {
      const firstName = data?.firstName || 'CV'
      const lastName = data?.lastName || 'Resume'
      return `${firstName}_${lastName}_CV.${extension}`
    }

    // Common image generation options
    const getImageOptions = () => ({
      cacheBust: true,
      includeQueryParams: true,
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      filter: () => true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
    })

    useImperativeHandle(
      ref,
      () => ({
        downloadPng: async () => {
          if (!sample3Ref.current) {
            throw new Error('CV reference not found')
          }

          try {
            const dataUrl = await toPng(sample3Ref.current, getImageOptions())

            const link = document.createElement('a')
            link.download = generateFilename('png')
            link.href = dataUrl
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (err) {
            console.error('Error generating PNG:', err)
            throw new Error('Failed to generate PNG image')
          }
        },

        downloadPdf: async () => {
          if (!sample3Ref.current) {
            throw new Error('CV reference not found')
          }

          try {
            // Get the exact dimensions we want for A4
            const a4WidthPx = 794 // A4 width at 96 DPI
            const a4HeightPx = 1123 // A4 height at 96 DPI

            // Generate image from HTML with exact A4 dimensions
            const dataUrl = await toPng(sample3Ref.current, {
              cacheBust: true,
              includeQueryParams: true,
              quality: 1.0,
              pixelRatio: 3, // Higher quality for PDF
              backgroundColor: '#ffffff',
              filter: () => true,
              width: a4WidthPx,
              height: a4HeightPx,
              style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
                width: `${a4WidthPx}px`,
                height: `${a4HeightPx}px`,
              },
            })

            // A4 dimensions in mm
            const a4Width = 210
            const a4Height = 297

            // Create PDF with portrait orientation
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: 'a4',
              compress: true,
            })

            // Add image to PDF - full page
            pdf.addImage(
              dataUrl,
              'PNG',
              0,
              0,
              a4Width,
              a4Height,
              undefined,
              'FAST'
            )

            // Save PDF
            pdf.save(generateFilename('pdf'))
          } catch (err) {
            console.error('Error generating PDF:', err)
            throw new Error('Failed to generate PDF document')
          }
        },

        getElement: () => sample3Ref.current,
      }),
      [data, colorProps]
    )

    return (
      <Modal
        isOpen={isShowing}
        handleClose={onClose}
        className="max-h-screen overflow-auto py-2 h-screen flex flex-col"
      >
        <div className="flex-1 overflow-auto pb-20">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-0">
            <Sample3
              ref={sample3Ref}
              data={data!}
              scale="md"
              size="full"
              textSize="md"
              iconSize="md"
              variantText="small"
              sidebarWidth={28}
              printable="print"
              {...colorProps}
              className="bg-white shadow-none p-0 !w-[210mm] !min-h-[297mm] !max-w-none"
              childrenClassName="!min-h-[297mm] !h-auto"
            />
          </div>
        </div>
      </Modal>
    )
  }
)

PreviewGenerator.displayName = 'PreviewGenerator'

export default PreviewGenerator