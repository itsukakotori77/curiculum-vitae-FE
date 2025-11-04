import { joinClass } from '@/utils/common'
import React from 'react'
import { Drawer } from 'vaul'

interface IProps {
  onClose: () => void
  isOpen: boolean
  className?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  title?: string
}

const BottomSheet: React.FC<IProps> = ({
  onClose,
  isOpen,
  className,
  children,
  footer,
  title,
}: IProps) => {
  return (
    <>
      <Drawer.Root open={isOpen} onOpenChange={onClose}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40"></Drawer.Overlay>
          <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
            {title ? (
              <Drawer.Title className="sr-only">{title}</Drawer.Title>
            ) : (
              <Drawer.Title className="sr-only">Dialog</Drawer.Title>
            )}
            <div className={joinClass('p-4', className)}>{children}</div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
