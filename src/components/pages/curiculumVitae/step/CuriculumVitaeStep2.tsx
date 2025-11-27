'use client'

import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
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
      ), // Fallback to Sample5 if not found
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
    useState<React.ComponentType<any> | null>(null)

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

  // Memoize the entire props object to prevent unnecessary re-renders
  const commonProps = useMemo(
    () => ({
      data: biodataCurr,
      scale: 'md' as const,
      textSize: 'xs' as const,
      config: {
        sidebarWidth: 25,
        ...(width < 768 ? { scale: 'md' as const } : {}),
      },
      printable: 'noPrint' as const,
      primaryColor,
      sidebarColor,
      skillColor,
      iconSize: 'xs' as const,
      variantText: 'tiny' as const,
      className: 'bg-transparent shadow-none p-0 w-fit',
    }),
    [primaryColor, sidebarColor, skillColor, width],
  )

  useEffect(() => {
    if (templateId) {
      const DynamicSample = loadSampleComponent(templateId)
      setSampleComponent(() => DynamicSample)
      setValue('cvTemplate', +templateId)
    }
  }, [templateId])

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:flex gap-10 justify-between w-full h-auto">
        <div className="lg:w-[75%] sm:w-full aspect-[4/5] lg:flex justify-center items-center h-auto border-2 border-black rounded-md p-5 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            {SampleComponent && <SampleComponent ref={ref} {...commonProps} />}
          </Suspense>
        </div>

        <form
          id="color-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 lg:w-[25%] sm:w-full"
        >
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
          <div className="flex w-full gap-2">
            <Button
              type="button"
              intent="default"
              className="w-1/4"
              onClick={() => handleBackStep(1)}
            >
              <ChevronLeft className="font-bold" />
            </Button>
            <Button
              type="submit"
              form="color-form"
              intent="info"
              isLoading={isLoading}
              className="w-3/4"
            >
              <span className="font-bold">Submit</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
