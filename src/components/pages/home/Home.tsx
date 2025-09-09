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
      <div className="flex flex-col md:flex-row w-full h-full justify-between p-4 md:p-10 box-border">
        {/* Left Text Section */}
        <div className="w-full md:w-[35%] text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            {title}
          </h1>
          <div className="grid mt-2 gap-2 lg:w-full">
            <Button
              intent="secondary"
              className="lg:w-48 lg:h-14 rounded-lg"
              onClick={() => router.push('/curiculumVitae')}
            >
              <span className="font-bold">Get Started</span>
            </Button>
            <div className="flex w-full gap-4">
              <Card className="mt-3 rounded-lg w-full">
                <div className="grid gap-3 p-1">
                  <div className="flex justify-between items-center">
                    <Image
                      src="/icon/icon-rocket.svg"
                      alt="sement"
                      className="w-16"
                      width={10}
                      height={10}
                    />
                    <span className="font-black text-4xl text-[#FB7842]">
                      100%
                    </span>
                  </div>
                  <span className="text-md">
                    Its totaly free for you !
                  </span>
                </div>
              </Card>
              <Card className="mt-3 rounded-lg w-full">
                <div className="grid gap-3 p-1">
                  <div className="flex justify-between items-center">
                    <Image
                      src="/icon/icon-rocket.svg"
                      alt="sement"
                      className="w-16"
                      width={10}
                      height={10}
                    />
                    <span className="font-black text-4xl text-[#FB7842]">
                      90%
                    </span>
                  </div>
                  <span className="text-md">
                    We’ll promise you can get job faster !
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full md:w-[65%] max-w-[750px] h-auto aspect-[912/608] flex items-center">
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
