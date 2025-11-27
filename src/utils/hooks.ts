'use client'

import {
  DependencyList,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  useCVMainStore,
  useCVStep1Store,
  useCVStep2Store,
  useCVStep3Store,
  useCVStep4Store,
  useCVStep5Store,
} from './store'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query'

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

export const useFetchQuery = <Params extends Record<string, any>, Response>(
  name: string,
  fetch: (params: Params) => Promise<Response>,
  params: Params,
  options?: Omit<
    UseQueryOptions<Response, unknown, Response, any[]>,
    'queryKey' | 'queryFn' | 'placeholderData'
  > & { keepPreviousData?: boolean },
  callback?: (value?: UseQueryResult<Response, any>) => void,
): [
  UseQueryResult<Response, unknown>,
  Params,
  Dispatch<SetStateAction<Params>>,
] => {
  const [state, setState] = useState<Params>(params)
  const { keepPreviousData: keepPrevious = true, ...queryOptions } =
    options || {}

  useEffect(() => {
    setState(params)
  }, [JSON.stringify(params)])

  const cleanState = useMemo(() => {
    return Object.entries(state).reduce((acc: any, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        acc[key] = value
      }
      return acc
    }, {} as Params)
  }, [state])

  const queryKey = useMemo(() => {
    const values = Object.values(cleanState).filter(
      (value) => value !== undefined && value !== null,
    )
    return [name, ...values]
  }, [name, JSON.stringify(cleanState)])

  const result = useQuery({
    queryKey,
    queryFn: () => fetch(cleanState),
    placeholderData: keepPrevious ? keepPreviousData : undefined,
    ...queryOptions,
  }) as any

  useEffect(() => {
    if (callback) {
      callback(result)
    }
  }, [callback, result])

  return [result.data || result, state, setState]
}
