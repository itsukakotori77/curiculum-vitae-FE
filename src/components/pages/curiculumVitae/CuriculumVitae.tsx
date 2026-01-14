'use client'

import React, {
  HTMLAttributeReferrerPolicy,
  useEffect,
  useRef,
  useState,
} from 'react'
import Card from '@/components/CultUI/Card'
import Filter from './Filter'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '@/components/globals/modal'
import StepperStrips from '@/components/globals/stepper/StepperStrips'
import CuriculumVItaeStep1 from './step/CuriculumVitaeStep1'
import CuriculumVitaeStep2 from './step/CuriculumVitaeStep2'
import { useModalConfirm } from '@/libs/modalConfirm'
import { usePostSetting } from '@/services/setting/mutation'
import { IColorCurr } from '@/interface/curiculumVitae'
import { rgbaToHex } from '@/utils/common'
import { toast } from 'react-toastify'
import { useCVSettingStore } from '@/utils/store'
import { useRouter, usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import BottomSheet from '@/components/globals/bottomSheet'
import { useWindowSize, useFetchQuery } from '@/utils/hooks'
import Button from '@/components/CultUI/Button'
import { ListFilter } from 'lucide-react'
import { apiGetListTemplate } from '@/services/template/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetDetailTemplate } from '@/services/template/query'
import Loading from '@/components/globals/UI/Loading'

const defaultParam = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortSystem: 'desc',
}

export default function CuriculumVitae() {
  const filterRef = useRef<HTMLAttributeReferrerPolicy>(null)
  const { openModal, closeModal } = useModalConfirm()
  const { data: dataSetting, updateData } = useCVSettingStore()
  const router = useRouter()
  const pathname = usePathname()
  const [modal, setModal] = useState<boolean>(false)
  const [currStep, setCurrStep] = useState<number>(1)
  const [usePhoto, setPhoto] = useState<boolean>(false)
  const [filterMobile, setFilterMobile] = useState<boolean>(false)
  const { mutate: postSetting, isPending } = usePostSetting()
  const [detail, setDetail] = useState<number | null>(null)
  const {
    data: dataDetail,
    refetch: refetchDetail,
    isPending: isLoadingDetail,
  } = useGetDetailTemplate(detail!, {
    enabled: false,
  })

  const [
    { data, isFetching, refetch, isSuccess, isError, error },
    state,
    setState,
  ] = useFetchQuery('LIST CV', apiGetListTemplate, defaultParam, {
    keepPreviousData: false,
    retry: 1,
    retryDelay: 1000,
    enabled: true,
  })

  const templates = data?.data || data || []

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

  const SkeletonCard = () => (
    <Card className="w-full rounded-md h-full" childrenClass="p-0.5 rounded-sm">
      <Skeleton className="w-full" height={300} borderRadius={4} />
    </Card>
  )

  useEffect(() => {
    if (detail) {
      refetchDetail()
    }
  }, [detail])

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
          {/* Desktop Filter */}
          <div className="hidden lg:flex w-full lg:w-[15%] items-start justify-center">
            <div className="w-full sticky top-0">
              <Filter
                ref={filterRef}
                filter={state}
                setFilter={setState}
                defaultValue={defaultParam}
              />
            </div>
          </div>

          <BottomSheet
            isOpen={filterMobile}
            onClose={() => setFilterMobile(false)}
          >
            <Filter
              ref={filterRef}
              filter={state}
              setFilter={setState}
              defaultValue={defaultParam}
            />
          </BottomSheet>

          {/* CV Templates Grid */}
          <div className="w-full lg:w-[80%]">
            {/* Show error message if query failed */}
            {isError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">
                  Failed to load templates. Please try again.
                </p>
                <button
                  onClick={() => refetch()}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pr-0 sm:pr-2 pb-4 py-2 px-0 sm:px-2 md:px-4">
              {isFetching
                ? Array.from({ length: defaultParam.limit }).map((_, index) => (
                    <div key={`skeleton-${index}`}>
                      <SkeletonCard />
                    </div>
                  ))
                : Array.isArray(templates) &&
                  templates.map((item: any, key: number) => (
                    <motion.div
                      key={item.id || key}
                      className="hover:cursor-pointer"
                      whileHover={{
                        scale: 1.04,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        },
                      }}
                      onClick={(vl) => {
                        setDetail(item.id)
                        setModal(true)
                      }}
                    >
                      <Card
                        className="w-full rounded-md h-full hover:bg-black hover:opacity-[100%] border"
                        childrenClass="p-0 rounded-sm aspect-[1/1.414]"
                      >
                        {/* A4 aspect ratio container using Tailwind */}
                        <div className="relative w-full aspect-[1/1.414]">
                          <Image
                            className="w-full h-full object-cover object-top"
                            src={`${item.template_photo}`}
                            fill
                            alt={item.value || 'Template'}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
            </div>

            {/* No data message */}
            {!isFetching &&
              !isError &&
              (!templates || templates.length === 0) && (
                <div className="flex items-center justify-center py-12">
                  <p className="text-gray-500 text-lg">No templates found</p>
                </div>
              )}
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
                dataDetail={dataDetail}
                onStepChange={(val, photo) => {
                  setCurrStep(val)
                  setPhoto(photo)
                }}
              />
            )}

            {currStep === 2 && (
              <CuriculumVitaeStep2
                dataDetail={dataDetail}
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
