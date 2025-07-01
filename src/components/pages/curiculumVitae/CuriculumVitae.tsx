'use client'

import React, { HTMLAttributeReferrerPolicy, useRef, useState } from 'react'
import Card from '@/components/CultUI/Card'
import Filter from './Filter'


export default function CuriculumVitae() {

  const filterRef = useRef<HTMLAttributeReferrerPolicy>(null)
  const [state, setState] = useState<{
    head?: string,
    style?: string[]
  }>({
    head: '',
    style: [],
  })

  return (
    <section className="w-full h-full px-7 pt-36">
      <div className="flex w-full h-auto gap-24">
        <div className="flex w-[20%] items-center justify-center">
          <Filter
            ref={filterRef}
            filter={state}
            setFilter={setState}
          />
        </div>
        <div className="flex w-[80%] gap-2">
          <Card className="w-full">
            Test
          </Card>
          <Card className="w-full">
            Test
          </Card>
          <Card className="w-full">
            Test
          </Card>
          <Card className="w-full">
            Test
          </Card>
        </div>
      </div>
    </section>
  )
}
