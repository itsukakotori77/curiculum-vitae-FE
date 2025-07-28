'use client'

import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
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
  const step4Data = useCVStep4Store((state) => state.data)
  const step5Data = useCVStep5Store((state) => state.data)

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

//  export default function useFetchQuery<Params, Response>(
//    name: string,
//    fetch: (params: Params) => Promise<Response>,
//    params: Params,
//    options?: Omit<
//      UseQueryOptions<Response, unknown, Response, (string | any[])[]>,
//      'queryKey' | 'queryFn'
//    >,
//    callback?: (value?: UseQueryResult<Response, any>) => void
//  ): [
//    UseQueryResult<Response, unknown>,
//    Params,
//    Dispatch<SetStateAction<Params>>
//  ] {
//    const [state, setState] = useState<Params>(params)
//    const result = useQuery(
//      [
//        name,
//        ...Object.values(state as any).filter(
//          value => value !== undefined && value !== null
//        ),
//      ],
//      () => fetch(state),
//      options as any
//    )

//    if (callback) {
//      callback(result)
//    }

//    return [result, state, setState]
//  }

export function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as any)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
