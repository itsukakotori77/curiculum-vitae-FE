'use client'

import React from 'react'
import Button from '@/components/CultUI/Button'

export default function Navbar() {
   return (
      <header className="w-full flex justify-between items-center px-14 py-4 ">
         <span>Logo</span>
         <div className="flex justify-between items-center py-4 gap-10 ">
            <div className="text-md font-normal">About Us</div>
            <div className="text-md font-normal">Why Choose Us</div>
            <div className="text-md font-normal">Why Choose Us</div>
            <div className="text-md font-normal">FAQ</div>
         </div>
         
         <Button
            className="primary w-24"
         >asd</Button>
      </header>
   )
}
