import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
} from 'react'
import Modal from '@/components/globals/modal'
import { ICurrVitae } from '@/interface/curiculumVitae'
import Sample3 from '../../exampleCv/Sample3'
import { toPng } from 'html-to-image'
import { useCVSettingStore } from '@/utils/store'
import { convertColor } from '@/utils/common'
import jsPDF from 'jspdf'
import { Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react'
import Button from '@/components/CultUI/Button'

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
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const [downloadType, setDownloadType] = useState<'png' | 'pdf' | null>(null)

    // Memoize color props to avoid recalculation
    const colorProps = useMemo(
      () => ({
        primaryColor: convertColor(dataSetting?.primaryColor!) || '#FFFFFF',
        sidebarColor: convertColor(dataSetting?.sidebarColor!) || '#8B8EBC',
        skillColor: convertColor(dataSetting?.skillColor!) || '#262424',
      }),
      [dataSetting],
    )

    // Generate filename based on CV data
    const generateFilename = (extension: 'png' | 'pdf'): string => {
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

    const downloadPng = async () => {
      if (!sample3Ref.current) {
        throw new Error('CV reference not found')
      }

      try {
        setIsDownloading(true)
        setDownloadType('png')

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
      } finally {
        setIsDownloading(false)
        setDownloadType(null)
      }
    }

    const downloadPdf = async () => {
      if (!sample3Ref.current) {
        throw new Error('CV reference not found')
      }

      try {
        setIsDownloading(true)
        setDownloadType('pdf')

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
        pdf.addImage(dataUrl, 'PNG', 0, 0, a4Width, a4Height, undefined, 'FAST')

        // Save PDF
        pdf.save(generateFilename('pdf'))
      } catch (err) {
        console.error('Error generating PDF:', err)
        throw new Error('Failed to generate PDF document')
      } finally {
        setIsDownloading(false)
        setDownloadType(null)
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        downloadPng,
        downloadPdf,
        getElement: () => sample3Ref.current,
      }),
      [data, colorProps],
    )

    return (
      <Modal
        isOpen={isShowing}
        handleClose={onClose}
        className="max-h-screen overflow-hidden h-screen flex flex-col p-0 m-0 sm:m-4 md:m-6 lg:m-8 rounded-none sm:rounded-lg"
      >
        {/* Header with Download Actions - Fixed at top */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex flex-col gap-3">
            {/* Title and Close - Always visible */}
            <div className="flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate flex-1">
                CV Preview
              </h2>

              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* PNG Download Button */}
              <Button
                type="button"
                intent="success"
                onClick={downloadPng}
                disabled={isDownloading}
                className="flex-1 min-w-[120px] sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 lg:w-36"
              >
                {isDownloading && downloadType === 'png' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden xs:inline">Generating...</span>
                    <span className="xs:hidden">Loading</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden xs:inline">Download PNG</span>
                    <span className="xs:hidden">PNG</span>
                  </>
                )}
              </Button>

              {/* PDF Download Button */}
              <Button
                type="button"
                intent="danger"
                onClick={downloadPdf}
                disabled={isDownloading}
                className="flex-1 min-w-[120px] sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 lg:w-36"
              >
                {isDownloading && downloadType === 'pdf' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden xs:inline">Generating...</span>
                    <span className="xs:hidden">Loading</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span className="hidden xs:inline">Download PDF</span>
                    <span className="xs:hidden">PDF</span>
                  </>
                )}
              </Button>
            </div>

            {/* Download Status Message */}
            {isDownloading && (
              <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <span className="font-medium">
                  {downloadType === 'png'
                    ? 'Generating PNG image...'
                    : 'Generating PDF document...'}
                </span>
                <span className="hidden sm:inline">
                  {' '}
                  This may take a moment.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CV Preview - Scrollable */}
        <div className="flex-1 overflow-auto bg-gray-50 sm:bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="flex justify-center items-start min-h-full">
            {/* Responsive Container */}
            <div className="w-full">
              {/* Scaling wrapper for different screen sizes */}
              <div
                className="
                w-full
                overflow-x-auto
                overflow-y-visible
                flex
                justify-center
              "
              >
                <div
                  className="
                  transform-gpu
                  origin-top
                  transition-transform
                  duration-300
                  scale-40
                  sm:scale-[0.55]
                  md:scale-[0.7]
                  lg:scale-[0.85]
                  xl:scale-[0.95]
                  2xl:scale-[1]
                "
                >
                  <Sample3
                    ref={sample3Ref}
                    data={data!}
                    scale="md"
                    size="full"
                    textSize="md"
                    iconSize="md"
                    variantText="small"
                    config={{
                      sidebarWidth: 28, 
                      responsiveImage: true,
                      responsiveSidebar: true,
                      mobileSidebarWidth: 28, 
                      tabletSidebarWidth: 35,
                      mobileImageSize: 120,
                      tabletImageSize: 150,
                      desktopImageSize: 200,
                    }}
                    printable="print"
                    className="bg-white shadow-lg !w-[210mm] !min-h-[297mm] !max-w-none mx-auto rounded-none sm:rounded-lg"
                    childrenClassName="!min-h-[297mm] !h-auto"
                    {...colorProps}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with additional info - Optional, hidden on mobile */}
        <div className="hidden md:block sticky bottom-0 z-20 bg-white border-t border-gray-200 px-6 py-3 flex-shrink-0">
          <p className="text-xs text-gray-500 text-center">
            Tip: Pinch to zoom on mobile devices • Use scroll to navigate the
            document
          </p>
        </div>
      </Modal>
    )
  },
)

PreviewGenerator.displayName = 'PreviewGenerator'

export default PreviewGenerator
