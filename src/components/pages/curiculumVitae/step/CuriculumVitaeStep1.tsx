'use client'

import Card from '@/components/CultUI/Card'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/CultUI/Button'

interface CurrVitae1Props {
  handleChange: (step: number, data?: any) => void
}

export default function CuriculumVitaeStep1({
  handleChange,
}: CurrVitae1Props) {
  const [focusedCard, setFocusedCard] = useState<
    boolean | number | null
  >(null)
  const [selectedCard, setSelectedCard] = useState<
    boolean | number | null
  >(null)

  const handleNext = () => {
    handleChange(2)
  }

  return (
    <>
      <div className="grid place-content-center place-items-center">
        <span className="text-xl font-bold">
          Will you be adding a photo to your resume ?
        </span>
        <span className="text-sm font-light">
          Add a photo if it’s a standard practive in your industry or
          region.
        </span>
      </div>
      <div className="flex w-full gap-5 items-center justify-center">
        <Card
          className={`w-[40%] cursor-pointer transition-all duration-200 rounded-lg ${
            selectedCard === 0
              ? 'ring-2 ring-blue-500'
              : focusedCard === 0
                ? 'ring-1 ring-blue-300'
                : 'hover:ring-1 hover:ring-gray-300'
          }`}
          childrenClass={`${selectedCard === 0 ? 'border-blue-500' : 'border-gray-200'}`}
          onClick={() =>
            setSelectedCard(selectedCard === 0 ? null : 0)
          }
          onFocus={() => setFocusedCard(0)}
          onBlur={() => setFocusedCard(null)}
          tabIndex={0}
        >
          <div className="flex flex-col items-center justify-center gap-2 my-1">
            <span className="font-bold text-lg">With Photo</span>
            <Image
              className="w-full h-auto object-contain border border-gray-300 p-1"
              src={`/cvExample/sample1.png`}
              width={800}
              height={800}
              alt={''}
            />
          </div>
        </Card>

        <Card
          className={`w-[40%] cursor-pointer transition-all duration-200 rounded-lg ${
            selectedCard === 1
              ? 'ring-2 ring-blue-500'
              : focusedCard === 1
                ? 'ring-1 ring-blue-300'
                : 'hover:ring-1 hover:ring-gray-300'
          }`}
          childrenClass={`${selectedCard === 1 ? 'border-blue-500' : 'border-gray-200'}`}
          onClick={() =>
            setSelectedCard(selectedCard === 1 ? null : 1)
          }
          onFocus={() => setFocusedCard(1)}
          onBlur={() => setFocusedCard(null)}
          tabIndex={0}
        >
          <div className="flex flex-col items-center justify-center gap-2 my-1">
            <span className="font-bold text-lg">Without Photo</span>
            <Image
              className="w-full h-auto object-contain border border-gray-300 p-1"
              src={`/cvExample/sample1.png`}
              width={800}
              height={800}
              alt={''}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-end w-full">
        <Button
          intent="info"
          className="w-32"
          onClick={handleNext}
          disabled={selectedCard === null}
        >
          <span className="font-bold">Next</span>
        </Button>
      </div>
    </>
  )
}
