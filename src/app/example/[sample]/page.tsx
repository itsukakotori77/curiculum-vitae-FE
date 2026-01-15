'use client'

import React from 'react'
import Sample1 from '@/components/pages/exampleCv/Sample1'
import Sample2 from '@/components/pages/exampleCv/Sample2'
import Sample3 from '@/components/pages/exampleCv/Sample3'
import Sample4 from '@/components/pages/exampleCv/Sample4'
import Sample5 from '@/components/pages/exampleCv/Sample5'
import Sample6 from '@/components/pages/exampleCv/Sample6'
import { biodataCurr } from '@/data/cv'
import { useParams } from 'next/navigation'
import Sample7 from '@/components/pages/exampleCv/Sample7'
import Sample8 from '@/components/pages/exampleCv/Sample8'

export default function Page() {
  const { sample } = useParams()
  console.log(sample)
  return (
    <>
      {sample === '1' && <Sample1 data={biodataCurr} />}
      {sample === '2' && <Sample2 data={biodataCurr} />}
      {sample === '3' && <Sample3 data={biodataCurr} />}
      {sample === '4' && <Sample4 data={biodataCurr} />}
      {sample === '5' && <Sample5 data={biodataCurr} />}
      {sample === '6' && <Sample6 data={biodataCurr} />}
      {sample === '7' && <Sample7 data={biodataCurr} />}
      {sample === '8' && <Sample8 data={biodataCurr} />}
    </>
  )
}
