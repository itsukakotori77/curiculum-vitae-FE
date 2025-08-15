'use client'

import React, {
  HTMLAttributeReferrerPolicy,
  useRef,
  useState,
} from 'react'
import Card from '@/components/CultUI/Card'
import Filter from './Filter'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '@/components/globals/modal'
import StepperStrips from '@/components/globals/stepper/StepperStrips'
import CuriculumVItaeStep1 from './step/CuriculumVitaeStep1'
import CuriculumVitaeStep2 from './step/CuriculumVitaeStep2'
import { useModalConfirm } from '@/libs/modalConfirm'
import Loading from '@/components/globals/UI/Loading'

export default function CuriculumVitae() {
  const filterRef =
    useRef<HTMLAttributeReferrerPolicy>(null)

  const { openModal, closeModal } = useModalConfirm()
  const [state, setState] = useState<{
    head?: string
    style?: string[]
  }>({
    head: '',
    style: [],
  })

  const [modal, setModal] = useState<boolean>(false)
  const [currStep, setCurrStep] = useState<number>(1)

  const componentConfig = [
    {
      key: 'sample1',
      title: 'Sample 1',
      value: 'sample1',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
    {
      key: 'sample2',
      title: 'Sample 2',
      value: 'sample2',
    },
    {
      key: 'sample3',
      title: 'Sample 3',
      value: 'sample3',
    },
  ]

  return (
    <>
      {/* <Loading isLoading /> */}
      <section className="w-full h-full px-7 mt-20 relative">
        <div className="flex w-full h-auto gap-24">
          <div className="flex w-[20%] items-start justify-center">
            <div className="w-full sticky top-0">
              <Filter
                ref={filterRef}
                filter={state}
                setFilter={setState}
              />
            </div>
          </div>

          <div className="w-[80%]">
            {/* CV Components Grid */}
            <div className="overflow-y-auto grid grid-cols-4 gap-6 pr-2 pb-4 py-2 px-4">
              {componentConfig?.map(
                (item: any, key: number) => (
                  <motion.div
                    key={key}
                    className="hover:cursor-pointer"
                    whileHover={{
                      scale: 1.04,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    onClick={() => setModal(true)}
                  >
                    <Card
                      className="w-full rounded-md h-full hover:bg-black hover:opacity-[100%]"
                      childrenClass="p-0.5 rounded-sm"
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={`/cvExample/${item.value}.png`}
                        width={800}
                        height={800}
                        alt={item.value}
                      />
                    </Card>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>

        <Modal
          isOpen={modal}
          handleClose={() => setModal(false)}
          size="lg"
          className="!max-h-screen overflow-auto"
        >
          <div className="flex flex-col gap-5 items-center justify-center py-5 px-3">
            <StepperStrips
              className="z-[99]"
              size={2}
              current={currStep}
              direction="horizontal"
              onChangeCurr={(index) => {
                console.log(`Changed to step: ${index}`)
                setCurrStep(index)
              }}
            />

            {currStep === 1 && (
              <CuriculumVItaeStep1
                handleChange={(val) => {
                  setCurrStep(val)
                }}
              />
            )}

            {currStep === 2 && <CuriculumVitaeStep2 />}
          </div>
        </Modal>
      </section>
    </>
  )
}
