'use client'

import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  ComponentType
} from 'react'
import ColorPickerForm from '@/components/globals/form/ColorPickerForm'
import { useForm } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import { convertColor, hexToRgba } from '@/utils/common'
import { biodataCurr } from '@/data/cv'
import { IColorCurr } from '@/interface/curiculumVitae'
import { ChevronLeft } from 'lucide-react'
import { useWindowSize } from '@/utils/hooks'

interface IProps {
  className?: string
  isLoading?: boolean
  onSubmit: (val: IColorCurr) => void
  onStepChange: (step: number, data?: any) => void
  dataDetail?: any
}

const loadSampleComponent = (id: number) => {
  return lazy(
    () =>
      import(`../../exampleCv/Sample${id}`).catch(
        () => import('../../exampleCv/Sample5'),
      ),
  )
}

export default function CuriculumVitaeStep2({
  className,
  onSubmit,
  isLoading,
  onStepChange,
  dataDetail,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const { handleSubmit, control, watch, setValue } = useForm<IColorCurr>({
    defaultValues: {
      sidebarColor: hexToRgba('#8B8EBC', 1),
      primaryColor: hexToRgba('#FFF', 1),
      skillColor: hexToRgba('#262424', 1) ?? '',
    },
  })

  const handleBackStep = (val: number) => {
    onStepChange(val)
  }

  const templateId = dataDetail?.id || 5
  const [SampleComponent, setSampleComponent] =
    useState<ComponentType<any> | null>(null)

  // Memoize color conversions to avoid recalculating on every render
  const primaryColor = useMemo(
    () => convertColor(watch('primaryColor')) || '#E3E9EF',
    [watch('primaryColor')],
  )

  const sidebarColor = useMemo(
    () => convertColor(watch('sidebarColor')) || '#5977AC',
    [watch('sidebarColor')],
  )

  const skillColor = useMemo(
    () => convertColor(watch('skillColor')!) || '#262424',
    [watch('skillColor')],
  )

  // Responsive scale based on screen size
  const scale = useMemo(() => {
    if (width < 640) return 'sm' as const
    if (width < 1024) return 'md' as const
    return 'md' as const
  }, [width])

  // Memoize the entire props object to prevent unnecessary re-renders
  const commonProps = useMemo(
    () => ({
      data: biodataCurr,
      scale,
      textSize: 'xs' as const,
      config: {
        sidebarWidth: 25,
      },
      printable: 'noPrint' as const,
      primaryColor,
      sidebarColor,
      skillColor,
      iconSize: 'xs' as const,
      variantText: 'tiny' as const,
      className: 'bg-transparent shadow-none p-0 w-fit',
    }),
    [primaryColor, sidebarColor, skillColor, scale],
  )

  useEffect(() => {
    if (templateId) {
      const DynamicSample = loadSampleComponent(templateId)
      setSampleComponent(() => DynamicSample)
      setValue('cvTemplate', +templateId)
    }
  }, [templateId, setValue])

  const handleFormSubmit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main container with responsive layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between w-full h-auto">
        {/* CV Preview Section */}
        <div className="w-full lg:w-[70%] xl:w-[75%]">
          <div className="w-full aspect-[4/5] flex justify-center items-start border-2 border-black rounded-md p-3 sm:p-5 shadow-[3px_3px_0px_rgba(0,0,0,1)] overflow-auto bg-white">
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              }
            >
              {SampleComponent && (
                <div className="w-full h-full">
                  <SampleComponent ref={ref} {...commonProps} />
                </div>
              )}
            </Suspense>
          </div>
        </div>

        {/* Color Picker Form Section */}
        <div className="w-full lg:w-[30%] xl:w-[25%]">
          <div className="flex flex-col gap-4 w-full h-auto">
            {/* Color Pickers - Horizontal on tablet, vertical on mobile and desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <ColorPickerForm<IColorCurr>
                control={control}
                fieldLabel={{ children: 'Primary Color' }}
                name="primaryColor"
                rules={{
                  required: 'Please select a color',
                }}
              />
              <ColorPickerForm<IColorCurr>
                control={control}
                fieldLabel={{ children: 'Secondary Color' }}
                name="sidebarColor"
                rules={{
                  required: 'Please select a color',
                }}
              />
              <ColorPickerForm<IColorCurr>
                control={control}
                fieldLabel={{ children: 'Skills Color' }}
                name="skillColor"
                rules={{
                  required: 'Please select a color',
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-2">
              <Button
                type="button"
                intent="default"
                className="w-1/4 min-w-[60px]"
                onClick={() => handleBackStep(1)}
              >
                <ChevronLeft className="font-bold" />
              </Button>
              <Button
                type="button"
                intent="info"
                isLoading={isLoading}
                className="w-3/4"
                onClick={handleFormSubmit}
              >
                <span className="font-bold">Submit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}