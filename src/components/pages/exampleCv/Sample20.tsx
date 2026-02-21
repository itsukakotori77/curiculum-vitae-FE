import { CVProps } from '@/interface/curiculumVitae'
import { cn, getContrastColor, mixWithWhite } from '@/utils/common'
import {
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import '@/assets/styles/exampleCurr/_example20.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-[#EFF1EE] sample20-container shadow-lg print:shadow-none',
  {
    variants: {
      size: {
        xxs: 'max-w-xl',
        xs: 'max-w-2xl',
        sm: 'max-w-3xl',
        md: 'max-w-4xl',
        lg: 'max-w-5xl',
        xl: 'max-w-6xl',
        full: 'max-w-full',
      },
      scale: {
        xxs: 'scale-[0.4]',
        xs: 'scale-[0.6]',
        sm: 'scale-[1.0]',
        md: 'scale-[1.0]',
        lg: 'scale-[1.2]',
        xl: 'scale-[1.4]',
      },
      printable: {
        print: [
          'min-h-screen',
          'flex',
          'justify-center',
          'items-start',
          'print:bg-white',
          'print:py-0',
          'print:px-0',
        ],
        noPrint: ['min-h-screen', 'flex'],
      },
    },
    defaultVariants: {
      size: 'md',
      scale: 'md',
    },
  },
)

const textVariants = cva('', {
  variants: {
    variant: {
      title: '',
      subtitle: '',
      body: '',
      small: '',
      tiny: '',
    },
    size: {
      xxs: '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Title variants
    { variant: 'title', size: 'xxs', class: 'text-lg font-bold' },
    { variant: 'title', size: 'xs', class: 'text-xl font-bold' },
    { variant: 'title', size: 'sm', class: 'text-2xl font-bold' },
    { variant: 'title', size: 'md', class: 'text-3xl font-bold' },
    { variant: 'title', size: 'lg', class: 'text-4xl font-bold' },
    { variant: 'title', size: 'xl', class: 'text-5xl font-bold' },

    // Subtitle variants
    {
      variant: 'subtitle',
      size: 'xxs',
      class: 'text-xs font-semibold',
    },
    {
      variant: 'subtitle',
      size: 'xs',
      class: 'text-sm font-semibold',
    },
    {
      variant: 'subtitle',
      size: 'sm',
      class: 'text-base font-semibold',
    },
    {
      variant: 'subtitle',
      size: 'md',
      class: 'text-lg font-semibold',
    },
    {
      variant: 'subtitle',
      size: 'lg',
      class: 'text-xl font-semibold',
    },
    {
      variant: 'subtitle',
      size: 'xl',
      class: 'text-2xl font-semibold',
    },

    // Body variants
    { variant: 'body', size: 'xxs', class: 'text-[9px]' },
    { variant: 'body', size: 'xs', class: 'text-xs' },
    { variant: 'body', size: 'sm', class: 'text-sm' },
    { variant: 'body', size: 'md', class: 'text-base' },
    { variant: 'body', size: 'lg', class: 'text-lg' },
    { variant: 'body', size: 'xl', class: 'text-xl' },

    // Small variants
    { variant: 'small', size: 'xxs', class: 'text-[8px]' },
    { variant: 'small', size: 'xs', class: 'text-[10px]' },
    { variant: 'small', size: 'sm', class: 'text-xs' },
    { variant: 'small', size: 'md', class: 'text-sm' },
    { variant: 'small', size: 'lg', class: 'text-base' },
    { variant: 'small', size: 'xl', class: 'text-lg' },

    // Tiny variants
    { variant: 'tiny', size: 'xxs', class: 'text-[6px]' },
    { variant: 'tiny', size: 'xs', class: 'text-[8px]' },
    { variant: 'tiny', size: 'sm', class: 'text-[10px]' },
    { variant: 'tiny', size: 'md', class: 'text-xs' },
    { variant: 'tiny', size: 'lg', class: 'text-sm' },
    { variant: 'tiny', size: 'xl', class: 'text-base' },
  ],
  defaultVariants: {
    variant: 'body',
    size: 'md',
  },
})

const iconVariants = cva('', {
  variants: {
    iconSize: {
      xxs: ['text-[9px]', 'w-3'],
      xs: ['text-xs', 'w-3'],
      sm: ['text-sm', 'w-7'],
      md: ['text-xl', 'w-7'],
      lg: ['text-2xl', 'w-8'],
      xl: ['text-3xl', 'w-10'],
    },
  },
  defaultVariants: {
    iconSize: 'md',
  },
})

interface Sample extends CVProps {
  size?: VariantProps<typeof cvVariants>['size']
  scale?: VariantProps<typeof cvVariants>['scale']
  textSize?: VariantProps<typeof textVariants>['size']
  printable?: VariantProps<typeof cvVariants>['printable']
  iconSize?: VariantProps<typeof iconVariants>['iconSize']
  variantText?: VariantProps<typeof textVariants>['variant']
  childrenClassName?: string
}

const CVText = ({
  variant = 'body',
  size = 'md',
  className,
  children,
  as = 'span',
  ...props
}: {
  variant?: VariantProps<typeof textVariants>['variant']
  size?: VariantProps<typeof textVariants>['size']
  className?: string
  children: React.ReactNode
  as?: 'span' | 'p' | 'div'
} & React.HTMLAttributes<HTMLElement>) => {
  const Component = as
  return (
    <Component
      className={cn(textVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

const Sample20 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#F3E7C3',
      primaryColor = '#00C098',
      sidebarTextColor = '#fff',
      skillColor = '#00C098',
      variantText = 'small',
      childrenClassName,
      config = {
        sidebarWidth: 25,
        responsiveSidebar: false,
        responsiveImage: false,
        mobileSidebarWidth: 35,
        tabletSidebarWidth: 30,
        mobileImageSize: 120,
        tabletImageSize: 150,
        desktopImageSize: 200,
        mobileBackgroundHeight: 240,
        tabletBackgroundHeight: 280,
        desktopBackgroundHeight: 320,
        mobileBackgroundWidth: 144,
        tabletBackgroundWidth: 168,
        desktopBackgroundWidth: 192,
      },
    },
    ref,
  ) => {
    return (
      <>
        <div ref={ref} className={cn(cvVariants({ size, scale }), className)}>
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            <div className="flex flex-col gap-4 py-10 px-20 w-full">
              {/* FULLNAME */}
              <div className="flex flex-col justify-center items-center">
                <CVText
                  variant="title"
                  size="lg"
                  className="font-bold font-[josefin-slab] uppercase"
                >
                  {`${data?.firstName} ${data?.lastName}`}
                </CVText>
                <CVText
                  variant="subtitle"
                  size={textSize}
                  className="font-bold font-[josefin-slab] uppercase"
                >
                  {data?.role}
                </CVText>
              </div>

              {/* CONTACTS */}
              <div className="flex flex-col gap-1">
                <div className="w-full h-[0.9px] bg-black" />
                <div className="flex items-start justify-center divide-x divide-black">
                  {Object.entries(data?.contacts ?? {})
                    .filter(([key, value]) => key !== 'address' && value)
                    .map(([key, val]) => (
                      <CVText
                        key={key}
                        variant="body"
                        size={textSize}
                        className="px-4 font-medium font-[josefin-slab]"
                      >
                        {String(val)}
                      </CVText>
                    ))}
                </div>
                <div className="w-full h-[0.9px] bg-black" />
              </div>

              {/* SUMMARY */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-light font-[volkhov] uppercase"
                  >
                    Profesional Summary
                  </CVText>
                </div>
                <CVText
                  variant="tiny"
                  size={textSize}
                  className="font-medium text-justify"
                >
                  {data?.profile}
                </CVText>
              </div>

              <div className="w-full h-px bg-black" />

              {/* WORK EXPERIENCES */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-light font-[volkhov] uppercase"
                  >
                    Work Experiences
                  </CVText>
                </div>

                <div className="grid">
                  <ul className="list-none">
                    {data?.experience
                      ?.toReversed()
                      .map((item: any, key: number) => (
                        <li key={key} className="grid gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-bold font-[volkhov]"
                            >
                              {`${item?.jobTitle || ''}`}
                            </CVText>
                            {'|'}
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-medium font-[volkhov]"
                            >
                              {`${item?.jobTitle || ''}`}
                            </CVText>
                            {'|'}
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-medium font-[volkhov]"
                            >
                              {`${moment(item?.startDate).format('YYYY')} - ${
                                item?.isCurrent == true
                                  ? 'Current'
                                  : moment(item?.endDate).format('YYYY')
                              }`}
                            </CVText>
                          </div>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light text-justify"
                          >
                            {item?.descJob || ''}
                          </CVText>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="w-full h-px bg-black" />

              {/* EDUCATION */}
              {data?.education && data.education.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center items-center">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-light font-[volkhov] uppercase"
                    >
                      Educations
                    </CVText>
                  </div>
                  <ul className="list-none">
                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <li key={key} className="grid gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-bold font-[volkhov]"
                            >
                              {item?.major || ''}
                            </CVText>
                            {'|'}
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-bold font-[volkhov]"
                            >
                              {item?.university?.split('|')[1] ||
                                item?.university ||
                                ''}
                            </CVText>
                            {item?.graduatedStatus ? (
                              <>
                                {'|'}
                                <CVText
                                  variant="small"
                                  size={textSize}
                                  className="font-medium font-[volkhov]"
                                >
                                  {`Graduated, ${moment(item?.graduated).format('YYYY')}`}
                                </CVText>
                              </>
                            ) : (
                              <>
                                {'|'}
                                <CVText
                                  variant="small"
                                  size={textSize}
                                  className="font-normal text-gray-500"
                                >
                                  Not Graduated Yet
                                </CVText>
                              </>
                            )}
                          </div>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light text-justify"
                          >
                            {item?.majorDesc || ''}
                          </CVText>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="w-full h-px bg-black" />

              {/* SKILLS */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-light font-[volkhov] uppercase"
                  >
                    Skills
                  </CVText>
                </div>
                <ul className="grid grid-cols-4 list-disc list-inside space-y-1 ">
                  {data?.skills?.map((item: any, key: number) => (
                    <li key={key}>
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-normal"
                      >
                        {item?.name || ''}
                      </CVText>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

export default Sample20
