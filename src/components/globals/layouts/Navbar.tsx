'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/CultUI/Button'
import Modal from '../modal'
import LoginForm from '@/components/pages/home/LoginForm'
import { navMenu } from '@/data/menu'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLogin } from '@/services/login/mutation'
import { toast } from 'react-toastify'
import { Menu, X } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [modal, setModal] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { mutate: login, isPending } = useLogin()

  // Check for Google OAuth token in URL on component mount
  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (error) {
      toast.error('Login dengan Google gagal')
      router.replace(pathname) 
      return
    }

    if (token) {
      try {
        // Decode and save token
        const decoded = jwtDecode(token)
        const { exp } = decoded
        Cookies.set('accessToken', token, {
          expires: new Date(exp! * 1000),
        })

        setIsAuthenticated(true)
        toast.success('Login dengan Google berhasil!')

        // Clean URL and redirect
        router.replace('/curiculumVitae')
      } catch (error) {
        toast.error('Token tidak valid')
        router.replace(pathname)
      }
    }

    // Check if already authenticated
    const existingToken = localStorage.getItem('token')
    if (existingToken) {
      try {
        const decoded = jwtDecode(existingToken)
        // Check if token is expired
        const currentTime = Date.now() / 1000
        if (decoded.exp && decoded.exp > currentTime) {
          setIsAuthenticated(true)
        } else {
          // Token expired, clear storage
          Cookies.remove('accessToken')
        }
      } catch (error) {
        // Invalid token, clear storage
        Cookies.remove('accessToken')
      }
    }
  }, [searchParams, pathname, router])

  const handleLogin = (data: any) => {
    login(data, {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        setIsAuthenticated(true)
        setModal(false)
        router.push('/curiculumVitae')
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Login gagal')
      },
    })
  }

  const handleLogout = () => {
    Cookies.remove('accessToken')
    setIsAuthenticated(false)
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
      <header className="w-full flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-14 py-4">
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

        {/* Desktop Login/Logout Button */}
        {isAuthenticated ? (
          <Button
            className="primary w-20 sm:w-24 md:w-28 hidden lg:block"
            onClick={handleLogout}
          >
            <span className="font-bold text-sm md:text-base">Logout</span>
          </Button>
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
            <Button className="primary w-20 sm:w-24" onClick={handleLogout}>
              <span className="font-bold text-sm">Logout</span>
            </Button>
          ) : (
            <Button
              className="primary w-20 sm:w-24"
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
                  } hover:bg-[#5C5C5C] hover:text-white hover:cursor-pointer transition-colors`}
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
