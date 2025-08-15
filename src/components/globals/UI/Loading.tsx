'use client'

import React from 'react'
import Lottie from 'lottie-react'
import register from '@/assets/animation/register.json'

interface IProps {
  isLoading?: boolean
}

export default function Loading({ isLoading }: IProps) {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 opacity-95 z-[999]">
          <div className="flex justify-center items-center h-screen">
            <span className="font-bold text-white text-8xl opacity-100">
              <Lottie animationData={register} loop />
            </span>
          </div>
        </div>
      )}
    </>
  )
}