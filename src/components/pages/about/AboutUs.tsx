import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface IProps {
   title?: string
}

export default function AboutUs({ title }: IProps) {
   return (
      <section className="w-full">
         <div className="flex w-full justify-center p-5">
            <div className="w-1/2">
               <Image
                  src="/background/background-about.svg"
                  width={40}
                  height={40}
                  alt="about"
                  className="w-full"
               />
            </div>
            <div className=":uno: flex flex-col justify-center w-1/2">
               <h1 className="text-4xl md:text-6xl font-black leading-tight">{title}</h1>
               <span className="font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia mollit anim id
                  est laborum.
               </span>
               <div className="grid my-2 gap-2">
                  <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                     <div className="collapse-title font-semibold flex gap-2 items-center">
                        <div className="rounded-full bg-[#F77744] p-1"><Check className="text-white" /></div> How do I create an account?
                     </div>
                     <div className="collapse-content text-sm">
                        Click the "Sign Up" button in the top right corner and follow the registration process.
                     </div>
                  </div>
                  <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                     <div className="collapse-title font-semibold flex gap-2 items-center">
                        <div className="rounded-full bg-[#F77744] p-1"><Check className="text-white" /></div> How do I create an account?
                     </div>
                     <div className="collapse-content text-sm">
                        Click the "Sign Up" button in the top right corner and follow the registration process.
                     </div>
                  </div>
                  <div tabIndex={0} className="collapse collapse-arrow bg-[#FEFDF7] border-base-300 border-4 rounded-2xl">
                     <div className="collapse-title font-semibold flex gap-2 items-center">
                        <div className="rounded-full bg-[#F77744] p-1"><Check className="text-white" /></div> How do I create an account?
                     </div>
                     <div className="collapse-content text-sm">
                        Click the "Sign Up" button in the top right corner and follow the registration process.
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
