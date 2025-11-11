'use client'

import React, { useState } from 'react'
import Button from '@/components/CultUI/Button'
import Modal from '../modal'
import LoginForm from '@/components/pages/home/LoginForm'
import { navMenu } from '@/data/menu'
import { useRouter, usePathname } from 'next/navigation'
import { useLogin } from '@/services/login/mutation'
import { toast } from 'react-toastify'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [modal, setModal] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { mutate: login, isPending } = useLogin()

  const handleLogin = (data: any) => {
    login(data, {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        router.push('/curiculumVitae')
        console.log(res)
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message)
      },
    })
  }

  const handleNavClick = (url: string) => {
    router.push(url)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="w-full flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-14 py-4">
        <span className="text-lg font-semibold">Logo</span>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex justify-between items-center py-4 gap-7">
          {navMenu
            ?.filter((val: any) => val?.name != 'Home')
            .map((val: any, key: number) => (
              <li
                key={key}
                className={`text-md p-2 font-medium rounded-lg ${
                  pathname.includes(val?.url) ? 'bg-[#5C5C5C] text-white' : ''
                } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer`}
                onClick={() => router.push(val?.url)}
              >
                {val.name}
              </li>
            ))}
        </ul>

        {/* Desktop Login Button */}
        <Button
          className="primary w-20 sm:w-24 md:w-28 hidden lg:block"
          onClick={() => setModal(true)}
        >
          <span className="font-bold text-sm md:text-base">Login</span>
        </Button>

        {/* Mobile/Tablet Menu Button & Login */}
        <div className="flex lg:hidden items-center gap-3">
          <Button
            className="primary w-20 sm:w-24"
            onClick={() => setModal(true)}
          >
            <span className="font-bold text-sm">Login</span>
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col py-4 px-4 sm:px-6 md:px-10">
            {navMenu
              ?.filter((val: any) => val?.name != 'Home')
              .map((val: any, key: number) => (
                <li
                  key={key}
                  className={`text-md p-3 font-medium rounded-lg mb-2 ${
                    pathname.includes(val?.url) ? 'bg-[#5C5C5C] text-white' : ''
                  } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer`}
                  onClick={() => handleNavClick(val?.url)}
                >
                  {val.name}
                </li>
              ))}
          </ul>
        </div>
      )}

      <Modal
        isOpen={modal}
        handleClose={() => setModal(false)}
        size="md"
        className="rounded-xl"
      >
        <LoginForm
          className="pt-12 pb-6"
          onSubmit={handleLogin}
          isLoading={isPending}
        />
      </Modal>
    </>
  )
}
