'use client'

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
  lazy,
  useEffect,
  Suspense,
} from 'react'
import Modal from '@/components/globals/modal'
import { ICurrVitae } from '@/interface/curiculumVitae'
import { toPng } from 'html-to-image'
import { useCVSettingStore } from '@/utils/store'
import { convertColor, getCustomFontCSS } from '@/utils/common'
import jsPDF from 'jspdf'
import { FileText, Image as ImageIcon, Loader2 } from 'lucide-react'
import Button from '@/components/CultUI/Button'
import { biodataCurr } from '@/data/cv'

interface IProps {
  data?: ICurrVitae | any
  isShowing: boolean
  onClose: () => void
  templateId?: number | string
}

const loadSampleComponent = (id: number) => {
  return lazy(() =>
    import(`../../exampleCv/Sample${id}`).catch(
      () => import('../../exampleCv/Sample5'),
    ),
  )
}

export interface PreviewGeneratorHandle {
  downloadPng: () => Promise<void>
  downloadPdf: () => Promise<void>
  getElement: () => HTMLDivElement | null
}

const PreviewGenerator = forwardRef<PreviewGeneratorHandle, IProps>(
  ({ data, isShowing, onClose, templateId }, ref) => {
    const sampleRef = useRef<HTMLDivElement>(null)
    const captureRef = useRef<HTMLDivElement>(null)
    const { data: dataSetting } = useCVSettingStore()
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const [downloadType, setDownloadType] = useState<'png' | 'pdf' | null>(null)
    const [SampleComponent, setSampleComponent] =
      useState<React.ComponentType<any> | null>(null)

    const colorProps = useMemo(
      () => ({
        primaryColor: convertColor(dataSetting?.primaryColor!) || '#FFFFFF',
        sidebarColor: convertColor(dataSetting?.sidebarColor!) || '#8B8EBC',
        skillColor: convertColor(dataSetting?.skillColor!) || '#262424',
      }),
      [dataSetting],
    )

    const generateFilename = (extension: 'png' | 'pdf'): string => {
      const firstName = data?.firstName || 'CV'
      const lastName = data?.lastName || 'Resume'
      return `${firstName}_${lastName}_CV.${extension}`
    }

    const getImageOptions = async (
      type: string = 'png',
      targetRef: React.RefObject<HTMLDivElement>,
    ) => {
      let fontEmbedCSS = ''

      if (targetRef.current) {
        try {
          await document.fonts.ready
          fontEmbedCSS = await getCustomFontCSS()
        } catch (err) {
          console.warn('Failed to embed fonts:', err)
        }
      }

      const baseOptions = {
        cacheBust: true,
        includeQueryParams: true,
        backgroundColor: 'transparent',
        filter: () => true,
        fontEmbedCSS,
        skipFonts: false,
      }

      switch (type) {
        case 'png':
          return {
            ...baseOptions,
            quality: 0.95,
            pixelRatio: 2,
          }
        case 'pdf':
          return {
            ...baseOptions,
            quality: 1.0,
            pixelRatio: 3,
          }
        default:
          return baseOptions
      }
    }

    const downloadPng = async () => {
      if (!captureRef.current) throw new Error('CV reference not found')

      try {
        setIsDownloading(true)
        setDownloadType('png')

        await document.fonts.ready
        await new Promise((resolve) => setTimeout(resolve, 150))

        const options = await getImageOptions('png', captureRef as any)
        const dataUrl = await toPng(captureRef.current, options)

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
      if (!captureRef.current) throw new Error('CV reference not found')

      try {
        setIsDownloading(true)
        setDownloadType('pdf')

        await document.fonts.ready
        await new Promise((resolve) => setTimeout(resolve, 150))

        const options = await getImageOptions('pdf', captureRef as any)
        const dataUrl = await toPng(captureRef.current, options)

        // 🔥 Always use REAL A4 size
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const imgProps = pdf.getImageProperties(dataUrl)

        const pdfWidth = pageWidth
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

        pdf.addImage(
          dataUrl,
          'PNG',
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST',
        )

        pdf.save(generateFilename('pdf'))
      } catch (err) {
        console.error('Error generating PDF:', err)
        throw new Error('Failed to generate PDF document')
      } finally {
        setIsDownloading(false)
        setDownloadType(null)
      }
    }

    // Props for the scaled-down preview inside the modal
    const previewProps = useMemo(
      () => ({
        data: data || biodataCurr,
        scale: 'md' as const,
        textSize: 'xs' as const,
        config: {
          sidebarWidth: 28,
          responsiveImage: true,
          responsiveSidebar: true,
          mobileSidebarWidth: 28,
          tabletSidebarWidth: 35,
          mobileImageSize: 150,
          tabletImageSize: 150,
          desktopImageSize: 200,
          mobileBackgroundHeight: 220,
          tabletBackgroundHeight: 280,
          desktopBackgroundHeight: 320,
          mobileBackgroundWidth: 144,
          tabletBackgroundWidth: 168,
          desktopBackgroundWidth: 192,
        },
        printable: 'noPrint' as const,
        iconSize: 'xs' as const,
        variantText: 'tiny' as const,
        className:
          'bg-white shadow-lg !w-[210mm] !min-h-[297mm] !max-w-none mx-auto rounded-none sm:rounded-lg',
        childrenClassName: '!min-h-[297mm] !h-auto',
        ...colorProps,
      }),
      [data, colorProps],
    )

    // Props for the hidden capture target — fixed pixel dimensions, no scaling
    const captureProps = useMemo(
      () => ({
        data: data || biodataCurr,
        scale: 'md' as const,
        textSize: 'xs' as const,
        config: {
          sidebarWidth: 28,
          responsiveImage: false,
          responsiveSidebar: false,
          mobileSidebarWidth: 28,
          tabletSidebarWidth: 28,
          mobileImageSize: 200,
          tabletImageSize: 200,
          desktopImageSize: 200,
          mobileBackgroundHeight: 320,
          tabletBackgroundHeight: 320,
          desktopBackgroundHeight: 320,
          mobileBackgroundWidth: 192,
          tabletBackgroundWidth: 192,
          desktopBackgroundWidth: 192,
        },
        printable: 'print' as const,
        iconSize: 'xs' as const,
        variantText: 'tiny' as const,
        className:
          'bg-transparent! !w-[210mm] !min-h-[297mm] !max-w-none rounded-none px-[10rem] box-border',
        childrenClassName: '!min-h-[297mm] !h-auto',
        ...colorProps,
      }),
      [data, colorProps],
    )

    useImperativeHandle(
      ref,
      () => ({
        downloadPng,
        downloadPdf,
        getElement: () => captureRef.current,
      }),
      [data, colorProps],
    )

    useEffect(() => {
      if (templateId) {
        const DynamicSample = loadSampleComponent(+templateId!)
        setSampleComponent(() => DynamicSample)
      }
    }, [templateId])

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: '210mm',
            minHeight: '297mm',
            overflow: 'hidden',
            zIndex: -1,
            pointerEvents: 'none',
          }}
          className="px-40"
          aria-hidden="true"
        >
          <div
            style={{
              width: '210mm',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Suspense fallback={null}>
              {SampleComponent && (
                <div
                  ref={captureRef}
                  className="bg-transparent! !w-[210mm] !min-h-[297mm] !max-w-none rounded-none box-border"
                >
                  <div className="px-20 w-full h-full">
                    <SampleComponent
                      {...captureProps}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </Suspense>
          </div>
        </div>

        <Modal
          isOpen={isShowing}
          handleClose={onClose}
          useCloseButton={false}
          className="max-h-screen overflow-hidden h-screen flex flex-col p-0 m-0 sm:m-4 md:m-6 lg:m-8 rounded-none sm:rounded-lg"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex-shrink-0">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate flex-1">
                  CV Preview
                </h2>
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

              <div className="flex flex-wrap gap-2">
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
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4" />
                      <span className="hidden xs:inline">Download PNG</span>
                      <span className="xs:hidden">PNG</span>
                    </>
                  )}
                </Button>

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
                      <span>Generating...</span>
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
            <div className="flex justify-center items-start min-h-full lg:px-20">
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
                  scale-50
                  sm:scale-[0.55]
                  md:scale-[0.7]
                  lg:scale-[0.85]
                  xl:scale-[0.95]
                  2xl:scale-[1]
                "
                  >
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center min-w-full h-full">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                      }
                    >
                      {SampleComponent && (
                        <SampleComponent
                          ref={sampleRef}
                          {...previewProps}
                          className="w-auto"
                        />
                      )}
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block sticky bottom-0 z-20 bg-white border-t border-gray-200 px-6 py-3 shrink-0">
            <p className="text-xs text-gray-500 text-center">
              Tip: Pinch to zoom on mobile devices • Use scroll to navigate the
              document
            </p>
          </div>
        </Modal>
      </>
    )
  },
)

PreviewGenerator.displayName = 'PreviewGenerator'

export default PreviewGenerator
