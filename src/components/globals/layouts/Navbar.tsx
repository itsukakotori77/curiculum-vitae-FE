'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/CultUI/Button'
import Modal from '../modal'
import LoginForm from '@/components/pages/home/LoginForm'
import { navMenu } from '@/data/menu'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLogin } from '@/services/login/mutation'
import { toast } from 'react-toastify'
import { Menu as Menus, X } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '@/utils/store'
import { pushRotate as Menu } from 'react-burger-menu'
import { Spin as Hamburger } from 'hamburger-react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [modal, setModal] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const { mutate: login, isPending } = useLogin()
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore()

  // Check for Google OAuth token in URL on component mount
  useEffect(() => {
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (error) {
      toast.error('Login dengan Google gagal')
      router.replace(pathname)
      return
    }

    if (success) {
      checkAuth()
        .then(() => {
          toast.success('Login dengan Google berhasil!')
          // router.replace('/curiculumVitae')
        })
        .catch(() => {
          toast.error('Token tidak valid')
          // router.replace(pathname)
        })
    }

    // const existingToken = localStorage.getItem('token')
    // if (existingToken) {
    //   try {
    //     const decoded = jwtDecode(existingToken)
    //     const currentTime = Date.now() / 1000
    //     if (decoded.exp && decoded.exp > currentTime) {
    //     } else {
    //       logout()
    //     }
    //   } catch (error) {
    //     logout()
    //   }
    // }
  }, [searchParams, pathname, router])

  const handleLogin = (data: any) => {
    login(data, {
      onSuccess: async (res: any) => {
        await checkAuth()
        toast.success(res?.message)
        setModal(false)
        router.push('/curiculumVitae')
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Login gagal')
      },
    })
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    toast.success('Logout berhasil')
    router.push('/')
  }

  const handleNavClick = (url: string) => {
    router.push(url)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="w-full flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-20 py-4">
        <span
          className="text-lg font-semibold hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          Logo
        </span>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex justify-between items-center py-4 gap-7">
          {navMenu
            ?.filter((val: any) => val?.name != 'Home')
            .map((val: any, key: number) => (
              <li
                key={key}
                className={`text-md p-2 font-medium rounded-lg ${
                  pathname.includes(val?.url) ? 'bg-[#5C5C5C] text-white' : ''
                } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer transition-colors`}
                onClick={() => router.push(val?.url)}
              >
                {val.name}
              </li>
            ))}
        </ul>

        {/* Desktop Login Button */}
        {isAuthenticated ? (
          <div className="hidden lg:flex w-28 font-bold">
            <span className="font-bold text-xl">Hello,&nbsp;</span>
            <span className="text-xl text-[#F9773F]">{user?.username}</span>
          </div>
        ) : (
          <Button
            className="primary w-20 sm:w-24 md:w-28 hidden lg:block"
            onClick={() => setModal(true)}
          >
            <span className="font-bold text-sm md:text-base">Login</span>
          </Button>
        )}

        {/* Mobile/Tablet Menu Button & Login */}
        <div className="flex lg:hidden items-center gap-3">
          {isAuthenticated ? (
            <div className="w-20 sm:w-24 lg:hidden" />
          ) : (
            <Button
              className="primary w-20 sm:w-24 lg:hidden"
              onClick={() => setModal(true)}
            >
              <span className="font-bold text-sm">Login</span>
            </Button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {/* {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menus className="w-6 h-6" />
            )} */}
            <Hamburger
              toggled={mobileMenuOpen}
              toggle={setMobileMenuOpen}
              direction="left"
            />
          </button>
        </div>
      </header>

      {/* Mobile/Tablet Navigation Menu */}
      <Menu
        right
        isOpen={mobileMenuOpen}
        onStateChange={(state) => setMobileMenuOpen(state.isOpen)}
        outerContainerId="outer-container"
        pageWrapId="page-wrap"
        customBurgerIcon={false}
        customCrossIcon={false}
        className="bg-white"
      >
        <ul className="flex flex-col py-4 px-4 sm:px-6 md:px-10">
          {navMenu
            ?.filter((val: any) => val?.name != 'Home')
            .map((val: any, key: number) => (
              <li
                key={key}
                className={`text-md p-3 font-medium rounded-lg mb-2 ${
                  pathname.includes(val?.url) ? 'bg-[#5C5C5C] text-white' : ''
                } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer transition-colors`}
                onClick={() => handleNavClick(val?.url)}
              >
                {val.name}
              </li>
            ))}
        </ul>
      </Menu>
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
