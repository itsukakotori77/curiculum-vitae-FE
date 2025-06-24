'use client'

import React, { useState } from 'react'
import Button from '@/components/CultUI/Button'
import Modal from '../modal'
import LoginForm from '@/components/pages/home/LoginForm'

export default function Navbar() {

   const [modal, setModal] = useState<boolean>(false)

   return (
      <header className="w-full flex justify-between items-center px-14 py-4 ">
         <span>Logo</span>
         <div className="flex justify-between items-center py-4 gap-10 ">
            <div className="text-md p-2 font-medium rounded-lg hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer">About Us</div>
            <div className="text-md p-2 font-medium rounded-lg hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer">Why Choose Us</div>
            <div className="text-md p-2 font-medium rounded-lg hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer">Why Choose Us</div>
            <div className="text-md p-2 font-medium rounded-lg hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer">FAQ</div>
         </div>

         <Button
            className="primary w-28"
            onClick={() => setModal(true)}
         >
            <span className="font-bold">Login</span>
         </Button>

         <Modal
            isOpen={modal}
            handleClose={() => setModal(false)}
            size="sm"
            className="rounded-xl"
         >
            <LoginForm
               className="pt-12 pb-6 "
               onSubmit={() => console.log('mantAPP')}
            />
         </Modal>

      </header>
   )
}
