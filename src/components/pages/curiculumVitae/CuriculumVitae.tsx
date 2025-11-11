'use client'

import React, { HTMLAttributeReferrerPolicy, useRef, useState } from 'react'
import Card from '@/components/CultUI/Card'
import Filter from './Filter'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '@/components/globals/modal'
import StepperStrips from '@/components/globals/stepper/StepperStrips'
import CuriculumVItaeStep1 from './step/CuriculumVitaeStep1'
import CuriculumVitaeStep2 from './step/CuriculumVitaeStep2'
import { useModalConfirm } from '@/libs/modalConfirm'
import Loading from '@/components/globals/UI/Loading'
import { usePostSetting } from '@/services/setting/mutation'
import { IColorCurr } from '@/interface/curiculumVitae'
import { rgbaToHex } from '@/utils/common'
import { toast } from 'react-toastify'
import { useCVSettingStore } from '@/utils/store'
import { useRouter, usePathname } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import BottomSheet from '@/components/globals/bottomSheet'
import { useWindowSize } from '@/utils/hooks'
import Button from '@/components/CultUI/Button'
import { ListFilter } from 'lucide-react'

export default function CuriculumVitae() {
  const filterRef = useRef<HTMLAttributeReferrerPolicy>(null)
  const { openModal, closeModal } = useModalConfirm()
  const { data: dataSetting, updateData } = useCVSettingStore()
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<{
    head?: string
    style?: string[]
  }>({
    head: '',
    style: [],
  })

  const [modal, setModal] = useState<boolean>(false)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [currStep, setCurrStep] = useState<number>(1)
  const [usePhoto, setPhoto] = useState<boolean>(false)
  const [filterMobile, setFilterMobile] = useState<boolean>(false)
  const { mutate: postSetting, isPending } = usePostSetting()

  const componentConfig = [
    {
      key: 'sample1',
      title: 'Sample 1',
      value: 'sample1',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
  ]

  const handleSubmit = (data: IColorCurr) => {
    const param = {
      primary_color: rgbaToHex(data.primaryColor),
      sidebar_color: rgbaToHex(data.sidebarColor),
      skill_color: rgbaToHex(data.skillColor!),
      is_using_photo: +usePhoto,
    }

    openModal({
      title: 'Attention',
      description: 'Are you sure want to use the configuration?',
      onConfirm: () => {
        postSetting(param, {
          onSuccess: (res: any) => {
            updateData({ id: res?.data?.id, ...data, usingPicture: +usePhoto })
            toast.success(res?.message)
            closeModal()
            router.push(`${pathname}/generate`)
          },
          onError: (error: any) => {
            toast.error(error?.response?.message)
          },
        })
      },
    })
  }

  return (
    <>
      <Loading isLoading={isPending} />
      <section className="w-full h-full px-4 sm:px-6 md:px-7 mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setFilterMobile(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Toggle filters"
        >
          <ListFilter className="w-4 h-4" />
        </button>

        <div className="flex flex-col lg:flex-row w-full h-auto gap-4 md:gap-8 lg:gap-24">
          {/* Desktop Filter - Sidebar */}
          <div className="hidden lg:flex w-full lg:w-[20%] items-start justify-center">
            <div className="w-full sticky top-0">
              <Filter ref={filterRef} filter={state} setFilter={setState} />
            </div>
          </div>

          {/* Mobile/Tablet Filter - Overlay */}
          {filterOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <Filter ref={filterRef} filter={state} setFilter={setState} />
                </div>
              </div>
            </div>
          )}

          {/* {window.height < 760 && (
          )} */}
          <BottomSheet
            isOpen={filterMobile}
            onClose={() => setFilterMobile(false)}
          >
            <Filter ref={filterRef} filter={state} setFilter={setState} />
          </BottomSheet>

          {/* CV Components Grid */}
          <div className="w-full lg:w-[80%]">
            <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pr-0 sm:pr-2 pb-4 py-2 px-0 sm:px-2 md:px-4">
              {componentConfig?.map((item: any, key: number) => (
                <motion.div
                  key={key}
                  className="hover:cursor-pointer"
                  whileHover={{
                    scale: 1.04,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  onClick={() => setModal(true)}
                >
                  <Card
                    className="w-full rounded-md h-full hover:bg-black hover:opacity-[100%]"
                    childrenClass="p-0.5 rounded-sm"
                  >
                    <Image
                      className="w-full h-full object-cover"
                      src={`/cvExample/${item.value}.png`}
                      width={800}
                      height={800}
                      alt={item.value}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Modal
          isOpen={modal}
          handleClose={() => setModal(false)}
          size={currStep == 1 ? 'lg' : 'xl'}
          className="!max-h-screen overflow-auto"
        >
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-center justify-center py-3 sm:py-4 md:py-5 px-2 sm:px-3">
            <StepperStrips
              className="z-[99] w-full"
              size={2}
              current={currStep}
              direction="horizontal"
              onChangeCurr={(index) => {
                setCurrStep(index)
              }}
            />

            {currStep === 1 && (
              <CuriculumVItaeStep1
                onStepChange={(val, photo) => {
                  setCurrStep(val)
                  setPhoto(photo)
                }}
              />
            )}

            {currStep === 2 && (
              <CuriculumVitaeStep2
                onSubmit={handleSubmit}
                isLoading={isPending}
                onStepChange={(val) => setCurrStep(val)}
              />
            )}
          </div>
        </Modal>
      </section>
    </>
  )
}
