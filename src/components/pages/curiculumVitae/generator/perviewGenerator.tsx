import React from 'react'
import Modal from '@/components/globals/modal'
import { ICurrVitae } from '@/interface/curiculumVitae'
import Sample3 from '../../exampleCv/Sample3'

interface IProps {
   data?: ICurrVitae | any
   isShowing: boolean
   onClose: () => void
}

export default function PreviewGenerator({
   data,
   isShowing,
   onClose
}: IProps) {
   return (
      <Modal
         isOpen={isShowing}
         handleClose={onClose}
         className="max-h-screen overflow-auto py-2"
      >
         <Sample3
            // ref={ref}
            data={data!}
            scale="md"
            size="sm"
            textSize="sm"
            iconSize="sm"
            variantText="tiny"
            sidebarWidth={28}
            printable="noPrint"
            primaryColor={'#FFFFF'}
            sidebarColor={'#8B8EBC'}
            skillColor={'#262424'}
            className="bg-transparent shadow-none p-0"
            childrenClassName="max-h-none"
         />
      </Modal>
   )
}
