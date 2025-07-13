'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import StepperBubble from '@/components/globals/stepper/StepperBubble'
import GeneratorForm1 from './GeneratorForm1'
import {
   ICurrVitae,
   IGeneratorStep1,
   IGeneratorStep2,
   IGeneratorStep3,
   IGeneratorStep4,
   IGeneratorStep5
} from '@/interface/curiculumVitae'
import { useRouter } from 'next/navigation'
import Sample3 from '../../exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import { transformToICurrVitae } from '@/utils/parseToForm'
import GeneratorForm2 from './GeneratorForm2'

export default function CurrVitaeGenerator() {
   const router = useRouter()
   const ref = useRef<HTMLDivElement>(null)
   const [step, setStep] = useState<number>(1)
   const [dataCurr1, setDataCurr1] = useState<IGeneratorStep1>()
   const [dataCurr2, setDataCurr2] = useState<IGeneratorStep2>()
   const [dataCurr3, setDataCurr3] = useState<IGeneratorStep3[]>()
   const [dataCurr4, setDataCurr4] = useState<IGeneratorStep4[]>()
   const [dataCurr5, setDataCurr5] = useState<IGeneratorStep5>()

   // Live preview states
   const [liveDataCurr1, setLiveDataCurr1] = useState<IGeneratorStep1>()
   const [liveDataCurr2, setLiveDataCurr2] = useState<IGeneratorStep2>()
   const [liveDataCurr3, setLiveDataCurr3] = useState<IGeneratorStep3[]>()
   const [liveDataCurr4, setLiveDataCurr4] = useState<IGeneratorStep4[]>()
   const [liveDataCurr5, setLiveDataCurr5] = useState<IGeneratorStep5>()

   // Initialize dataCV with empty structure
   const [dataCV, setDataCV] = useState<ICurrVitae>(() => 
      transformToICurrVitae()
   )

   const handleLiveChange = useCallback((
      stepNumber: number, 
      val: IGeneratorStep1 | 
         IGeneratorStep2 | 
         IGeneratorStep3[] | 
         IGeneratorStep4[] | 
         IGeneratorStep5) => 
   {
      switch (stepNumber) {
         case 1:
            setLiveDataCurr1(val as IGeneratorStep1)
            break
         case 2:
            setLiveDataCurr2(val as IGeneratorStep2)
            break
         case 3:
            setLiveDataCurr3(val as IGeneratorStep3[])
            break
         case 4:
            setLiveDataCurr4(val as IGeneratorStep4[])
            break
         case 5:
            setLiveDataCurr5(val as IGeneratorStep5)
            break
         default:
            console.warn(`Unknown step number: ${stepNumber}`)
      }
   }, [])

   // Update dataCV whenever any step data changes (including live data)
   useEffect(() => {
      const newDataCV = transformToICurrVitae(
         liveDataCurr1 || dataCurr1,  // Use live data for step 1 if available
         dataCurr2,
         dataCurr3,
         dataCurr4,
         dataCurr5
      )
      setDataCV(newDataCV)
   }, [liveDataCurr1, dataCurr1, dataCurr2, dataCurr3, dataCurr4, dataCurr5])

   return (
      <div className="w-full px-14 py-8 grid grid-cols-2 gap-7">
         <div className="flex flex-col gap-6">
            <StepperBubble
               size={5}
               current={step}
               direction="horizontal"
               onChangeCurr={(val: number) => setStep(val)}
               className=""
               useNumber
            />
            
            {step === 1 && (
               <GeneratorForm1
                  data={dataCurr1}
                  onSubmit={(val) => setDataCurr1(val)}
                  onCancel={() => router.back()}
                  onChange={(val) => handleLiveChange(1, val)}
               />
            )}

            {step === 2 && (
               <GeneratorForm2
                  data={dataCurr2}
                  onSubmit={(val) => setDataCurr2(val)}
                  onCancel={() => router.back()}
                  onChange={(val) => handleLiveChange(2, val)}
               />
            )}
         </div>
         
         <Sample3
            ref={ref}
            data={dataCV || biodataCurr}
            scale="md"
            textSize="sm"
            sidebarWidth={25}
            printable="noPrint"
            primaryColor={'#FFFFF'}
            sidebarColor={'#8B8EBC'}
            skillColor={'#262424'}
            iconSize="sm"
            variantText="tiny"
            className="bg-transparent shadow-none p-0"
         />
      </div>
   )
}