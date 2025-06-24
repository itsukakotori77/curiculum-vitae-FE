import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface IProps {
  title?: string
}

export default function Faq({ title }: IProps) {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col h-full">
        <div className="bg-[#F5F4F0] w-full h-1/4"></div>
        <div className="bg-[#2A2A2A] w-full h-3/4 px-8 py-6">

          <div className="lg:flex sm:flex-col md:flex-row w-full h-full gap-5 lg:pt-20">
            {/* Background */}
            <div className="lg:flex flex-col md:w-1/2 h-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{title}</h1>
              <span className="text-4xl text-lg text-white font-extralight leading-tight">
                Lorem ipsum is placeholder text commonly used in the graphic, print
              </span>
            </div>

            {/* Collapse */}
            <div className="flex flex-col md:w-1/2">
              <div className="grid my-2 gap-2 w-full">
                <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                  <div className="collapse-title font-semibold flex gap-2 items-center">
                    How do I create an account?
                  </div>
                  <div className="collapse-content text-sm">
                    Click the "Sign Up" button in the top right corner and follow the registration process.
                  </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                  <div className="collapse-title font-semibold flex gap-2 items-center">
                    How do I create an account?
                  </div>
                  <div className="collapse-content text-sm">
                    Click the "Sign Up" button in the top right corner and follow the registration process.
                  </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                  <div className="collapse-title font-semibold flex gap-2 items-center">
                    How do I create an account?
                  </div>
                  <div className="collapse-content text-sm">
                    Click the "Sign Up" button in the top right corner and follow the registration process.
                  </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                  <div className="collapse-title font-semibold flex gap-2 items-center">
                    How do I create an account?
                  </div>
                  <div className="collapse-content text-sm">
                    Click the "Sign Up" button in the top right corner and follow the registration process.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
