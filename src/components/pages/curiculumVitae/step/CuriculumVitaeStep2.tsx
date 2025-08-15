'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import ColorPickerForm from '@/components/globals/form/ColorPickerForm'
import { useForm } from 'react-hook-form'
import Button from '@/components/CultUI/Button'
import {
  convertColor,
  rgbaToHex,
  hexToRgba,
} from '@/utils/common'
import Sample3 from '../../exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import { IColorCurr } from '@/interface/curiculumVitae'
import { useModalConfirm } from '@/libs/modalConfirm'
import { useCVSettingStore } from '@/utils/store'
import { useRouter } from 'next/navigation'

export default function CuriculumVitaeStep2() {
  const ref = useRef<HTMLDivElement>(null)
  const { updateData } = useCVSettingStore()
  const router = useRouter()

  const { handleSubmit, control, watch } =
    useForm<IColorCurr>({
      defaultValues: {
        sidebarColor: hexToRgba('#8B8EBC', 1),
        primaryColor: hexToRgba('#FFF', 1),
        skillColor: hexToRgba('#262424', 1) ?? '',
      },
    })

  const { openModal, closeModal } = useModalConfirm()

  const onSubmit = useCallback((val: IColorCurr) => {
    openModal({
      title: 'Attention !',
      description: 'You sure want to use this color ?',
      onConfirm: async () => {
        updateData(val)
        console.log(val)
        closeModal()
        router.push('/curiculumVitae/generate')
      },
    })
  }, [])

  useEffect(() => {
    console.log(convertColor(watch('skillColor')!))
  }, [watch()])

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
              convertColor(watch('primaryColor')) ||
              '#E3E9EF'
            }
            sidebarColor={
              convertColor(watch('sidebarColor')) ||
              '#5977AC'
            }
            skillColor={
              convertColor(watch('skillColor')!) ||
              '#262424'
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
          <Button type="submit" intent="secondary">
            <span className="font-bold">Choose</span>
          </Button>
        </form>
      </div>
    </>
  )
}
