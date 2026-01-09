import React from 'react'
import Card from '@/components/CultUI/Card'
import TextForm from '@/components/globals/form/TextForm'
import { useForm } from 'react-hook-form'
import { ILogin } from '@/interface/login'
import Button from '@/components/CultUI/Button'
import { joinClass } from '@/utils/common'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Mail, LockKeyhole } from 'lucide-react'
import CheckBoxForm from '@/components/globals/form/CheckBoxForm'
import Image from 'next/image'

interface IProps {
  className?: string
  onSubmit: (val?: any) => void
  isLoading?: boolean
}

const schema = Yup.object().shape({
  email: Yup.string().required('email wajib diisi'),
  password: Yup.string().required('password wajib diisi'),
})

export default function LoginForm({
  className,
  onSubmit,
  isLoading,
}: IProps) {
  const { handleSubmit, control, reset } = useForm<ILogin>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  return (
    <form
      className={joinClass('max-md:w-full grid gap-2', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextForm
        fieldLabel={{
          children: 'Email',
          className: 'text-lg font-bold',
        }}
        fieldInput={{
          maxLength: 100,
          placeholder: 'Insert Email',
          type: 'text',
          icon: (
            <span className="text-xs">
              <Mail className="w-5 h-5 text-gray-400" />
            </span>
          ),
        }}
        control={control}
        name="email"
        className="w-full"
      />

      <TextForm
        fieldLabel={{
          children: 'Password',
          className: 'text-lg font-bold',
        }}
        fieldInput={{
          maxLength: 100,
          placeholder: 'Insert Password',
          type: 'password',
          icon: (
            <span className="text-xs">
              <LockKeyhole className="w-5 h-5 text-gray-400" />
            </span>
          ),
        }}
        control={control}
        name="password"
        className="w-full"
      />

      <div className="flex justify-between mb-4">
        <CheckBoxForm
          fieldLabel={{ children: '' }}
          name="remember_me"
          control={control}
          titleClassName="text-sm"
          fieldInput={[
            {
              label: 'Remember Me',
              value: 'remember_me',
            },
          ]}
        />
        <span className="font-bold hover:text-stone-600 hover:cursor-pointer">
          Forgot Password ?
        </span>
      </div>

      <div className="grid gap-4">
        <Button
          className="lg:w-full border-2 rounded-lg"
          intent="secondary"
          type="submit"
          isLoading={isLoading}
        >
          <div className="font-bold">LOGIN NOW</div>
        </Button>
        <Button
          className="lg:w-full border-2 rounded-lg flex gap-1.5"
          intent="default"
          type="button"
          isLoading={isLoading}
        >
          <Image
            src={'/icon/icon-google.svg'}
            width={10}
            height={10}
            alt="google"
            className="w-6"
          />
          <div className="font-bold">LOGIN WITH GOOGLE</div>
        </Button>
      </div>
    </form>
  )
}
