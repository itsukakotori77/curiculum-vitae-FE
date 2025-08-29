'use client'

import React from 'react'
import Lottie from 'lottie-react'
import register from '@/assets/animation/register.json'

interface IProps {
  isLoading?: boolean
}

export default function Loading({ isLoading }: IProps) {
  return (
    <div 
      className={`fixed inset-0 bg-gray-800 z-[999] transition-opacity duration-300 ${
        isLoading ? 'opacity-95' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`flex justify-center items-center h-screen transition-all duration-500 delay-150 ${
          isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span className="font-bold text-white text-8xl">
          <Lottie animationData={register} loop />
        </span>
      </div>
    </div>
  )
}