'use client'

import React, { useEffect, useRef } from 'react'
import ColorPickerForm from '@/components/globals/form/ColorPickerForm'
import { useForm } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import { convertColor, hexToRgba } from '@/utils/common'
import Sample3 from '../../exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import { IColorCurr } from '@/interface/curiculumVitae'
interface IProps {
  className?: string
  onSubmit: (val: IColorCurr) => void
  isLoading?: boolean
}

export default function CuriculumVitaeStep2({
  className,
  onSubmit,
  isLoading,
}: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { handleSubmit, control, watch } = useForm<IColorCurr>({
    defaultValues: {
      sidebarColor: hexToRgba('#8B8EBC', 1),
      primaryColor: hexToRgba('#FFF', 1),
      skillColor: hexToRgba('#262424', 1) ?? '',
    },
  })

  return (
    <>
      <div className="flex gap-10 justify-between w-full max-h-screen">
        <div className="w-full aspect-[4/5] max-h-screen">
          <Sample3
            ref={ref}
            data={biodataCurr}
            scale="md"
            textSize="xs"
            sidebarWidth={25}
            printable="noPrint"
            primaryColor={
              convertColor(watch('primaryColor')) || '#E3E9EF'
            }
            sidebarColor={
              convertColor(watch('sidebarColor')) || '#5977AC'
            }
            skillColor={
              convertColor(watch('skillColor')!) || '#262424'
            }
            iconSize="xs"
            variantText="tiny"
            className="bg-transparent shadow-none p-0"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          <ColorPickerForm<IColorCurr>
            control={control}
            fieldLabel={{ children: 'Sidebar Color' }}
            name="sidebarColor"
            rules={{
              required: 'Please select a color',
            }}
          />
          <ColorPickerForm<IColorCurr>
            control={control}
            fieldLabel={{ children: 'Text Color' }}
            name="primaryColor"
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
          <Button
            type="submit"
            intent="secondary"
            isLoading={isLoading}
          >
            <span className="font-bold">Choose</span>
          </Button>
        </form>
      </div>
    </>
  )
}
