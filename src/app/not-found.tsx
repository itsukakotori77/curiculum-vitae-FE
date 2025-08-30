'use client'

import React from 'react'
import Image from 'next/image'
import Button from '@/components/CultUI/Button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="!max-h-screen bg-white">
      <div className="flex justify-center items-center h-screen flex-col lg:gap-2 gap-3">
        <Image
          src={'/background/background-notfound.svg'}
          alt="notfound"
          className="w-2xl -mt-40"
          width={500}
          height={500}
        />
        <span className="lg:text-4xl text-xl font-bold text-indigo-800">Oops! Page not found</span>
        <p className="font-light lg:text-lg text-sm whitespace-pre text-center">
          {"The page doesn't exist or was removed\nwe suggest you back to home"}
        </p>
        <Button
          type="button"
          className="w-48 rounded-xl"
          intent="indigo"
          onClick={() => router.push('/')}
        >
          <span className="font-bold whitespace-nowrap">Back to home</span>
        </Button>
      </div>
    </div>
  )
}
