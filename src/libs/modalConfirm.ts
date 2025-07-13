'use client'

import { useCallback, useEffect } from 'react'
import { emitter } from './emitter'
import { TypeModalConfirm } from '@/components/globals/modal/ModalConfirm'

interface IUseModalConfirm {
  loading?: boolean
}

export function useModalConfirm({ loading = false }: IUseModalConfirm = {}) {
  const openModal = useCallback((modalContent: TypeModalConfirm) => {
    emitter.emit('open-modal-confirm', modalContent)
  }, [])

  const closeModal = useCallback(() => {
    emitter.emit('close-modal-confirm')
  }, [])

  useEffect(() => {
    emitter.emit('loading-modal-confirm', loading)
  }, [loading])

  return { openModal, closeModal }
}
