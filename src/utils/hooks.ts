'use client'

import { DependencyList, useEffect, useState } from 'react'

import {
  useCVMainStore,
  useCVStep1Store,
  useCVStep2Store,
  useCVStep3Store,
  useCVStep4Store,
  useCVStep5Store,
} from './store'

export const useCVData = () => {
  const step1Data = useCVStep1Store((state) => state.data)
  const step2Data = useCVStep2Store((state) => state.experiences)
  const step3Data = useCVStep3Store((state) => state.educations)
  const step4Data = useCVStep4Store((state) => state.skills)
  const step5Data = useCVStep5Store((state) => state.contacts)

  const { finalCV, updateFinalCV } = useCVMainStore()

  // Update final CV whenever any step data changes
  useEffect(() => {
    updateFinalCV()
  }, [step1Data, step2Data, step3Data, step4Data, step5Data, updateFinalCV])

  return {
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    finalCV,
  }
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export const useDebounceEffect = (
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as any)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
