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
import { convertColor } from '@/utils/common'
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
  return lazy(
    () =>
      import(`../../exampleCv/Sample${id}`).catch(
        () => import('../../exampleCv/Sample5'),
      ), // Fallback to Sample5 if not found
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
    const { data: dataSetting } = useCVSettingStore()
    const [isDownloading, setIsDownloading] = useState<boolean>(false)
    const [downloadType, setDownloadType] = useState<'png' | 'pdf' | null>(null)
    const [SampleComponent, setSampleComponent] =
      useState<React.ComponentType<any> | null>(null)

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

    // Helper to convert font URL to base64
    const fetchFontAsBase64 = async (url: string): Promise<string | null> => {
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

    // Helper function to extract and embed fonts as base64
    const getCustomFontCSS = async () => {
      const origin = window.location.origin
      let fontCSS = ''

      const stylesheets = Array.from(document.styleSheets)

      for (const stylesheet of stylesheets) {
        try {
          const rules = Array.from(stylesheet.cssRules || [])

          for (const rule of rules) {
            if (rule instanceof CSSFontFaceRule) {
              const src = rule.style.getPropertyValue('src')

              if (src && src.includes('url(')) {
                // Extract URL from src
                const urlMatch = src.match(/url\(['"]?([^'")\s]+)['"]?\)/)
                if (!urlMatch) continue

                let fontUrl = urlMatch[1]
                if (fontUrl.startsWith('data:')) {
                  fontCSS += `
                    @font-face {
                      font-family: ${rule.style.getPropertyValue('font-family')};
                      src: ${src};
                      font-weight: ${rule.style.getPropertyValue('font-weight') || 'normal'};
                      font-style: ${rule.style.getPropertyValue('font-style') || 'normal'};
                    }
                  `
                  continue
                }

                if (fontUrl.includes('/../')) {
                  fontUrl = fontUrl.replace(/\/\.\.\//g, '/')
                }

                // Make URL absolute if relative
                if (!fontUrl.startsWith('http')) {
                  fontUrl = `${origin}${fontUrl.startsWith('/') ? fontUrl : '/' + fontUrl}`
                }

                // Fetch and convert to base64
                const base64Font = await fetchFontAsBase64(fontUrl)

                if (base64Font) {
                  // Extract format from src or guess from extension
                  let format = 'woff2'
                  const formatMatch = src.match(
                    /format\(['"]?([^'")\s]+)['"]?\)/,
                  )
                  if (formatMatch) {
                    format = formatMatch[1]
                  } else if (fontUrl.endsWith('.ttf')) {
                    format = 'truetype'
                  } else if (fontUrl.endsWith('.otf')) {
                    format = 'opentype'
                  } else if (fontUrl.endsWith('.woff')) {
                    format = 'woff'
                  }

                  fontCSS += `
                    @font-face {
                      font-family: ${rule.style.getPropertyValue('font-family')};
                      src: url("${base64Font}") format("${format}");
                      font-weight: ${rule.style.getPropertyValue('font-weight') || 'normal'};
                      font-style: ${rule.style.getPropertyValue('font-style') || 'normal'};
                    }
                  `
                }
              }
            }
          }
        } catch (err) {
          console.warn('Could not access stylesheet:', err)
        }
      }

      return fontCSS
    }

    const getImageOptions = async (type: string = 'png') => {
      let fontEmbedCSS = ''

      if (sampleRef.current) {
        try {
          await document.fonts.ready
          fontEmbedCSS = await getCustomFontCSS()
        } catch (err) {
          console.warn('Failed to embed fonts:', err)
        }
      }

      switch (type) {
        case 'png':
          return {
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
            fontEmbedCSS,
          }
          break

        case 'pdf':
          const a4Width = 210
          const a4Height = 297

          const a4WidthPx = 794
          const a4HeightPx = 1123

          return {
            cacheBust: true,
            includeQueryParams: true,
            quality: 1.0,
            pixelRatio: 3,
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
            fontEmbedCSS,
          }
          break
      }
    }

    const downloadPng = async () => {
      if (!sampleRef.current) {
        throw new Error('CV reference not found')
      }

      try {
        setIsDownloading(true)
        setDownloadType('png')

        await document.fonts.ready
        await new Promise((resolve) => setTimeout(resolve, 100))

        const options = await getImageOptions('png')
        const dataUrl = await toPng(sampleRef.current, options)

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
      if (!sampleRef.current) {
        throw new Error('CV reference not found')
      }

      try {
        setIsDownloading(true)
        setDownloadType('pdf')

        // Get the exact dimensions we want for A4

        // Generate image from HTML with exact A4 dimensions
        const options = await getImageOptions('pdf')
        const dataUrl = await toPng(sampleRef.current, options)

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

    const commonProps = useMemo(
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
          mobileImageSize: 300,
          tabletImageSize: 150,
          desktopImageSize: 200,
        },
        printable: 'print' as const,
        iconSize: 'xs' as const,
        variantText: 'tiny' as const,
        className:
          'bg-white shadow-lg !w-[210mm] !min-h-[297mm] !max-w-none mx-auto rounded-none sm:rounded-lg',
        childrenClassName: '!min-h-[297mm] !h-auto',
        ...colorProps,
      }),
      [data],
    )

    useImperativeHandle(
      ref,
      () => ({
        downloadPng,
        downloadPdf,
        getElement: () => sampleRef.current,
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
      <Modal
        isOpen={isShowing}
        handleClose={onClose}
        useCloseButton={false}
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
                      <SampleComponent ref={sampleRef} {...commonProps} />
                    )}
                  </Suspense>
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
