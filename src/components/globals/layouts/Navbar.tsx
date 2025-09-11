'use client'

import React, { useState } from 'react'
import Button from '@/components/CultUI/Button'
import Modal from '../modal'
import LoginForm from '@/components/pages/home/LoginForm'
import { navMenu } from '@/data/menu'
import { useRouter, usePathname } from 'next/navigation'
import { useLogin } from '@/services/login/mutation'
import { toast } from 'react-toastify'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [modal, setModal] = useState<boolean>(false)
  const { mutate: login, isPending } = useLogin()

  const handleLogin = (data: any) => {
    login(data, {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        console.log(res)
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message)
      },
    })
  }

  return (
    <header className="w-full flex justify-between items-center px-14 py-4 ">
      <span>Logo</span>
      <ul className="flex justify-between items-center py-4 gap-7">
        {navMenu
          ?.filter((val: any) => val?.name != 'Home')
          .map((val: any, key: number) => (
            <li
              key={key}
              className={`text-md p-2 font-medium rounded-lg ${
                pathname.includes(val?.url)
                  ? 'bg-[#5C5C5C] text-white'
                  : ''
              } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer`}
              onClick={() => router.push(val?.url)}
            >
              {val.name}
            </li>
          ))}
      </ul>

      <Button className="primary w-28" onClick={() => setModal(true)}>
        <span className="font-bold">Login</span>
      </Button>

      <Modal
        isOpen={modal}
        handleClose={() => setModal(false)}
        size="md"
        className="rounded-xl"
      >
        <LoginForm
          className="pt-12 pb-6 "
          onSubmit={handleLogin}
          isLoading={isPending}
        />
      </Modal>
    </header>
  )
}
