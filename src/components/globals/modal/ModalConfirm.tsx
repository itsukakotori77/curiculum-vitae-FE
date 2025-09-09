import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/globals/modal'
import { emitter } from '@/libs/emitter'
import Button from '@/components/CultUI/Button'

export type TypeModalConfirm = {
  title: string
  description: string
  cancelText?: string
  submitText?: string
  onConfirm: (val?: any) => void
}

const ModalConfirm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<
    TypeModalConfirm & { isOpen: boolean }
  >({
    isOpen: false,
    title: '',
    cancelText: 'No',
    submitText: 'Yes',
    description: '',
    onConfirm: (val?: any) => {},
  })

  const openModal = useCallback((data: TypeModalConfirm) => {
    setState({ ...data, isOpen: true })
  }, [])

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  useEffect(() => {
    emitter.on('open-modal-confirm', openModal)
    emitter.on('close-modal-confirm', closeModal)
    emitter.on('loading-modal-confirm', (val: boolean) =>
      setLoading(val),
    )

    return () => {
      emitter.off('open-modal-confirm', openModal)
      emitter.off('close-modal-confirm', closeModal)
      emitter.off('loading-modal-confirm', closeModal)
    }
  }, [openModal, closeModal])

  return (
    <Modal
      isOpen={state.isOpen}
      handleClose={() => closeModal()}
      size="md"
      className="z-[999]"
      classNameOverlay="z-[998]"
    >
      <div className="flex justify-center items-center flex-col mt-2 mb-4 gap-2">
        <span className="text-2xl font-bold">{state.title}</span>
        <span className="text-lg font-semibold">
          {state.description}
        </span>
      </div>

      <div className="flex justify-between gap-5">
        <Button
          intent="success"
          isLoading={loading}
          onClick={state.onConfirm}
        >
          <span className="font-bold">
            {state.submitText || 'Yes'}
          </span>
        </Button>
        <Button
          intent="default"
          isLoading={loading}
          onClick={closeModal}
        >
          <span className="font-bold">
            {state.cancelText || 'No'}
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default ModalConfirm
