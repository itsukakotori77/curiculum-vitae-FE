'use client'

import Card from '@/components/CultUI/Card'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/CultUI/Button'
import { useCVSettingStore } from '@/utils/store'
import { IColorCurr, ISettingCurr } from '@/interface/curiculumVitae'
import Skeleton from 'react-loading-skeleton'

interface CurrVitae1Props {
  onStepChange: (step: number, data?: any) => void
  dataDetail?: any
}

export default function CuriculumVitaeStep1({
  onStepChange,
  dataDetail,
}: CurrVitae1Props) {
  const { updateData, data } = useCVSettingStore()
  const [focusedCard, setFocusedCard] = useState<boolean | number | null>(null)
  const [selectedCard, setSelectedCard] = useState<boolean | number | null>(
    data?.usingPicture !== undefined ? Number(data.usingPicture) : null,
  )
  const [detail, setDetail] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (dataDetail) {
      setIsLoading(false)
      if (!dataDetail.is_photo && selectedCard === 1) {
        setSelectedCard(0)
      }
    }
  }, [dataDetail, selectedCard])

  const photoOptions = dataDetail?.is_photo
    ? [
        {
          id: 0,
          title: 'Without Photo',
          image: dataDetail.template_nophoto || '/cvExample/sample1.png',
        },
        {
          id: 1,
          title: 'With Photo',
          image: dataDetail.template_photo || '/cvExample/sample1.png',
        },
      ]
    : dataDetail
      ? [
          {
            id: 0,
            title: 'Without Photo',
            image: dataDetail?.template_photo || '/cvExample/sample1.png',
          },
        ]
      : []

  const handleNext = (val: number) => {
    onStepChange(val, selectedCard)
    updateData({
      ...(data ?? {}),
      usingPicture: Number(selectedCard),
    } as ISettingCurr)
  }

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6">
      <div className="grid place-content-center place-items-center px-2 sm:px-4">
        {isLoading ? (
          <>
            <Skeleton width="80%" height={28} className="mb-2" />
            <Skeleton width="60%" height={16} />
          </>
        ) : (
          <>
            <span className="text-base sm:text-lg md:text-xl font-bold text-center">
              Will you be adding a photo to your resume?
            </span>
            <span className="text-xs sm:text-sm font-light text-center mt-1 sm:mt-2">
              Add a photo if it's a standard practice in your industry or
              region.
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 md:gap-5 items-center justify-center px-2 sm:px-4">
        {isLoading ? (
          // Show skeleton cards while loading
          <>
            {[0, 1].map((index) => (
              <Card
                key={index}
                className="w-full sm:w-[48%] md:w-[45%] lg:w-[40%] p-0"
                childrenClass="border-gray-200"
              >
                <div className="relative w-full aspect-[1/1.414] overflow-hidden rounded shadow-md">
                  <Skeleton height="100%" width="100%" />
                </div>
              </Card>
            ))}
          </>
        ) : (
          // Show actual content when loaded
          photoOptions.map((option) => (
            <Card
              key={option.id}
              className={`w-full sm:w-[48%] md:w-[45%] lg:w-[40%] cursor-pointer transition-all duration-200 rounded-lg p-0 ${
                selectedCard === option.id
                  ? 'ring-2 ring-blue-500'
                  : focusedCard === option.id
                    ? 'ring-1 ring-blue-300'
                    : 'hover:ring-1 hover:ring-gray-300'
              }`}
              childrenClass={`${selectedCard === option.id ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setSelectedCard(option.id)}
              onFocus={() => setFocusedCard(option.id)}
              onBlur={() => setFocusedCard(null)}
              tabIndex={0}
            >
              <div className="relative w-full h-full aspect-[1/1.414] overflow-hidden rounded shadow-md">
                {option?.image ? (
                  <Image
                    className="w-full h-full object-cover object-top"
                    src={option?.image}
                    fill
                    alt="Template preview"
                  />
                ) : (
                  <Skeleton height="100%" width="100%" />
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="flex justify-center sm:justify-end w-full px-2 sm:px-4 mt-2">
        {isLoading ? (
          <Skeleton width={160} height={48} borderRadius={8} />
        ) : (
          <Button
            intent="info"
            className="w-full sm:w-40 md:w-32 h-10 sm:h-11 md:h-12"
            onClick={() => handleNext(2)}
            disabled={selectedCard === null}
          >
            <span className="font-bold text-sm sm:text-base">Next</span>
          </Button>
        )}
      </div>
    </div>
  )
}
