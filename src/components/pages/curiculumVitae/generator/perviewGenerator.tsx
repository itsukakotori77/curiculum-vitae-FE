import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Modal from '@/components/globals/modal'
import { ICurrVitae } from '@/interface/curiculumVitae'
import Sample3 from '../../exampleCv/Sample3'
import { toPng } from 'html-to-image'
import { useCVSettingStore } from '@/utils/store'
import { convertColor } from '@/utils/common'

interface IProps {
  data?: ICurrVitae | any
  isShowing: boolean
  onClose: () => void
}

export interface PreviewGeneratorHandle {
  downloadPng: () => Promise<void>
  getElement: () => HTMLDivElement | null
}

const PreviewGenerator = forwardRef<PreviewGeneratorHandle, IProps>(
  ({ data, isShowing, onClose }, ref) => {
    const sample3Ref = useRef<HTMLDivElement>(null)
    const { data: dataSetting } = useCVSettingStore()

    const downloadSampleImage = () => {
      if (!sample3Ref.current) return
      toPng(sample3Ref.current, {
        cacheBust: true,
        includeQueryParams: true,
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: (node) => true,
        style: {
          transform: 'scale(1)',
          //  transformOrigin: 'top left',
        },
      }).then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'cv-resume.png'
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }

    useImperativeHandle(
      ref,
      () => ({
        downloadPng: async () => {
          if (!sample3Ref.current) {
            console.log('Sample3 ref is null')
            return
          }

          try {
            const dataUrl = await toPng(sample3Ref.current, {
              cacheBust: true,
              includeQueryParams: true,
              quality: 0.95,
              pixelRatio: 2,
              backgroundColor: '#ffffff',
              filter: (node) => true,
              style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
              },
            })

            const link = document.createElement('a')
            link.download = 'cv-resume.png'
            link.href = dataUrl
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (err) {
            console.error('Error generating PNG:', err)
            throw err
          }
        },
        getElement: () => sample3Ref.current,
      }),
      [],
    )

    return (
      <Modal
        isOpen={isShowing}
        handleClose={onClose}
        className="max-h-screen overflow-auto py-2 h-screen flex flex-col"
        // keepMounted={true}
      >
        <div className="flex-1 overflow-auto pb-20">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-0">
            <Sample3
              ref={sample3Ref}
              data={data!}
              scale="md"
              size="sm"
              textSize="sm"
              iconSize="sm"
              variantText="tiny"
              sidebarWidth={28}
              printable="print"
              primaryColor={
                convertColor(dataSetting?.primaryColor!) || '#FFFFF'
              }
              sidebarColor={
                convertColor(dataSetting?.sidebarColor!) || '#8B8EBC'
              }
              skillColor={
                convertColor(dataSetting?.skiilColor!) || '#262424'
              }
              className="bg-transparent shadow-none p-0 w-[1080px]"
              childrenClassName="max-h-none"
            />
          </div>
        </div>
      </Modal>
    )
  },
)

export default PreviewGenerator
