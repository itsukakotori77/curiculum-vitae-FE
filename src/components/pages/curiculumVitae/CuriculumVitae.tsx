'use client'

import React, {
  HTMLAttributeReferrerPolicy,
  useCallback,
  useEffect,
  useMemo,
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
import BottomSheet from '@/components/globals/bottomSheet'
import { useWindowSize } from '@/utils/hooks'
import { ListFilter, Loader2 } from 'lucide-react'
import { apiGetListTemplate } from '@/services/template/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetDetailTemplate } from '@/services/template/query'
import Loading from '@/components/globals/UI/Loading'
import { useInfiniteQuery } from '@tanstack/react-query'

const defaultParam = {
  page: 1,
  limit: 4,
  sortBy: 'created_at',
  sortSystem: 'desc',
}

const MOBILE_BREAKPOINT = 1024

const extractTemplates = (response: any): any[] => {
  if (Array.isArray(response?.data?.data)) return response.data.data
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response)) return response
  return []
}

export default function CuriculumVitae() {
  const filterRef = useRef<HTMLAttributeReferrerPolicy>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const { openModal, closeModal } = useModalConfirm()
  const { data: dataSetting, updateData } = useCVSettingStore()
  const router = useRouter()
  const pathname = usePathname()
  const { width } = useWindowSize()
  const [modal, setModal] = useState<boolean>(false)
  const [currStep, setCurrStep] = useState<number>(1)
  const [usePhoto, setPhoto] = useState<boolean>(false)
  const [filterMobile, setFilterMobile] = useState<boolean>(false)
  const [filterState, setFilterState] = useState<any>(defaultParam)
  const { mutate: postSetting, isPending } = usePostSetting()
  const [detail, setDetail] = useState<number | null>(null)
  const isDesktop = width >= MOBILE_BREAKPOINT
  const limit = isDesktop ? 4 : 5
  const {
    data: dataDetail,
    refetch: refetchDetail,
    isPending: isLoadingDetail,
  } = useGetDetailTemplate(detail!, {
    enabled: false,
  })

  const queryParams = useMemo(
    () => ({
      ...filterState,
      limit,
    }),
    [filterState, limit],
  )

  const {
    data,
    isFetching,
    isPending: isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
  } = useInfiniteQuery({
    queryKey: ['LIST CV', queryParams],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      apiGetListTemplate({ ...queryParams, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      const lastItems = extractTemplates(lastPage)
      return lastItems.length === limit ? allPages.length + 1 : undefined
    },
    retry: 1,
  })

  const templates = useMemo(() => {
    if (!data?.pages) return []

    const merged = data.pages.flatMap((page) => extractTemplates(page))
    const seen = new Set<string | number>()

    return merged.filter((item: any) => {
      const key = item?.id
      if (key === undefined || key === null) return true
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [data])

  const setFilter = useCallback(
    (updater: any) => {
      setFilterState((prev: any) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        const normalized = {
          ...next,
          page: 1,
          limit,
        }

        if (JSON.stringify(prev) === JSON.stringify(normalized)) {
          return prev
        }

        return normalized
      })
    },
    [limit],
  )

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

  useEffect(() => {
    setFilterState((prev: any) => ({
      ...prev,
      page: 1,
      limit,
    }))
  }, [limit])

  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null,
        rootMargin: '120px',
        threshold: 0.1,
      },
    )

    observer.observe(loadMoreRef.current)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

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
                filter={filterState}
                setFilter={setFilter}
                defaultValue={{ ...defaultParam, limit }}
              />
            </div>
          </div>

          <BottomSheet
            isOpen={filterMobile}
            onClose={() => setFilterMobile(false)}
          >
            <Filter
              ref={filterRef}
              filter={filterState}
              setFilter={setFilter}
              defaultValue={{ ...defaultParam, limit }}
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
              {isInitialLoading
                ? Array.from({ length: limit }).map((_, index) => (
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
                        <div className="relative w-full aspect-[1/1.414] overflow-hidden rounded-sm bg-white">
                          <Image
                            className="w-full h-full object-cover object-top"
                            src={`${item.template_photo}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            alt={item.value || 'Template'}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))}

              {isFetchingNextPage &&
                Array.from({ length: limit }).map((_, index) => (
                  <div key={`skeleton-next-${index}`}>
                    <SkeletonCard />
                  </div>
                ))}
            </div>

            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2 py-3 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading more templates...</span>
              </div>
            )}

            {!isFetchingNextPage && hasNextPage && templates.length > 0 && (
              <div className="flex items-center justify-center py-3">
                <span className="text-xs text-gray-400">Scroll to load more</span>
              </div>
            )}

            <div ref={loadMoreRef} className="h-2 w-full" />

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
