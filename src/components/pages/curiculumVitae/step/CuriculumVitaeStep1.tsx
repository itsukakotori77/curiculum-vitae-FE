'use client'

import Card from '@/components/CultUI/Card'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/CultUI/Button'
import { useCVSettingStore } from '@/utils/store'
import { IColorCurr, ISettingCurr } from '@/interface/curiculumVitae'

interface CurrVitae1Props {
  onStepChange: (step: number, data?: any) => void
}

export default function CuriculumVitaeStep1({ onStepChange }: CurrVitae1Props) {
  const { updateData, data } = useCVSettingStore()
  const [focusedCard, setFocusedCard] = useState<boolean | number | null>(null)
  const [selectedCard, setSelectedCard] = useState<boolean | number | null>(
    data?.usingPicture !== undefined ? Number(data.usingPicture) : null,
  )

  const photoOptions = [
    {
      id: 0,
      title: 'Without Photo',
      image: '/cvExample/sample1.png',
    },
    {
      id: 1,
      title: 'With Photo',
      image: '/cvExample/sample1.png',
    },
  ]

  const handleNext = (val: number) => {
    onStepChange(val, selectedCard)
    updateData({
      ...(data ?? {}),
      usingPicture: Number(selectedCard),
    } as ISettingCurr)
  }

  return (
    <>
      <div className="grid place-content-center place-items-center">
        <span className="text-xl font-bold">
          Will you be adding a photo to your resume ?
        </span>
        <span className="text-sm font-light">
          Add a photo if it's a standard practive in your industry or region.
        </span>
      </div>

      <div className="flex w-full gap-5 items-center justify-center">
        {photoOptions.map((option) => (
          <Card
            key={option.id}
            className={`w-[40%] cursor-pointer transition-all duration-200 rounded-lg ${
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
            <div className="flex flex-col items-center justify-center gap-2 my-1">
              <span className="font-bold text-lg">{option.title}</span>
              <Image
                className="w-full h-auto object-contain border border-gray-300 p-1"
                src={option.image}
                width={800}
                height={800}
                alt={option.title}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end w-full">
        <Button
          intent="info"
          className="w-32"
          onClick={() => handleNext(2)}
          disabled={selectedCard === null}
        >
          <span className="font-bold">Next</span>
        </Button>
      </div>
    </>
  )
}
