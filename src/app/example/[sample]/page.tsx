'use client'

import React from 'react'
import Sample1 from '@/components/pages/exampleCv/Sample1'
import Sample2 from '@/components/pages/exampleCv/Sample2'
import Sample3 from '@/components/pages/exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import { useParams } from 'next/navigation'

export default function Page() {
  const { sample } = useParams()
  console.log(sample)
  return (
    <>
      {sample === '1' && (
        <Sample1 data={biodataCurr} />
      )}
      {sample === '2' && (
        <Sample2 />
      )}
      {sample === '3' && (
        <Sample3 data={biodataCurr} />
      )}
    </>
  )
}
