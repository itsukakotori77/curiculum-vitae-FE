'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/CultUI/Button'
import Card from '@/components/CultUI/Card'
import { useRouter, useSearchParams } from 'next/navigation'

interface IProps {
  title?: string
}

export default function Home({ title }: IProps) {
  const router = useRouter()
  const param = useSearchParams()

  useEffect(() => {
    const redirect = param.get('redirected')
    if (redirect) {
      console.log('this redirect')
    }
  }, [param])

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row w-full h-full justify-between p-4 sm:p-6 md:p-8 lg:p-10 box-border gap-6 lg:gap-8">
        {/* Left Text Section */}
        <div className="w-full lg:w-[35%] text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            {title}
          </h1>
          <div className="grid mt-2 gap-3 sm:gap-4 w-full max-w-md lg:max-w-none">
            <Button
              intent="secondary"
              className="w-full sm:w-64 lg:w-48 h-12 sm:h-14 rounded-lg"
              onClick={() => router.push('/curiculumVitae')}
            >
              <span className="font-bold text-sm sm:text-base">Get Started</span>
            </Button>
            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
              <Card className="rounded-lg w-full sm:w-1/2">
                <div className="grid gap-2 sm:gap-3 p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <Image
                      src="/icon/icon-rocket.svg"
                      alt="sement"
                      className="w-12 sm:w-14 md:w-16"
                      width={64}
                      height={64}
                    />
                    <span className="font-black text-3xl sm:text-4xl text-[#FB7842]">
                      100%
                    </span>
                  </div>
                  <span className="text-sm sm:text-base">
                    Its totally free for you!
                  </span>
                </div>
              </Card>
              <Card className="rounded-lg w-full sm:w-1/2">
                <div className="grid gap-2 sm:gap-3 p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <Image
                      src="/icon/icon-rocket.svg"
                      alt="sement"
                      className="w-12 sm:w-14 md:w-16"
                      width={64}
                      height={64}
                    />
                    <span className="font-black text-3xl sm:text-4xl text-[#FB7842]">
                      90%
                    </span>
                  </div>
                  <span className="text-sm sm:text-base">
                    We'll promise you can get job faster!
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full lg:w-[65%] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-[750px] h-auto aspect-[912/608] flex items-center mx-auto lg:mx-0 mt-6 lg:mt-0">
          <Image
            src="/background/background.svg"
            alt="Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}