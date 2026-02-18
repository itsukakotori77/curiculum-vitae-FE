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
import '@/assets/styles/exampleCurr/_example18.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-[#17191A] sample18-container shadow-lg print:shadow-none',
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
      className={cn(textVariants({ variant, size }), className, 'text-white')}
      {...props}
    >
      {children}
    </Component>
  )
}

const Sample18 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#fff',
      primaryColor = '#FDD100',
      sidebarTextColor = '#fff',
      skillColor = '#FDD100',
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
    const { data: setting } = useCVSettingStore()

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
            <div className="flex flex-col gap-2 w-full pr-10">
              {/* PROFILE & FULL NAME */}
              <div className="grid grid-cols-[4fr_6fr] gap-2">
                {/* IMAGE */}

                <div className="flex flex-col gap-2">
                  {!!setting?.usingPicture && (
                    <div className="flex justify-center items-center">
                      <div style={{ background: primaryColor }}>
                        <Image
                          src={data?.profilePicture || '/User.png'}
                          alt="user"
                          width={600}
                          height={600}
                          className="object-cover aspect-1/5 mt-3"
                          style={
                            config.responsiveImage
                              ? {
                                  width: `${config.mobileImageSize}px`,
                                  height: `${config.mobileImageSize}px`,
                                }
                              : {
                                  width: '170px',
                                  height: '210px',
                                }
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center items-start px-4">
                  <div className="flex justify-start flex-col">
                    <CVText variant="title" size="lg" className="font-light">
                      {data?.firstName}
                    </CVText>
                    <CVText variant="title" size="lg" className="font-bold">
                      {data?.lastName}
                    </CVText>
                    <CVText
                      variant="body"
                      size="lg"
                      className="font-extralight"
                      style={{ color: primaryColor }}
                    >
                      {data?.role}
                    </CVText>
                  </div>
                </div>
              </div>

              {/* ABOUT ME */}
              <div className="grid grid-cols-[4fr_6fr] gap-2 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center items-start my-3">
                    <div className="bg-black pr-[3px] pb-[3px] w-32 border-[1.5px] border-white">
                      <div className="bg-yellow-400 py-1 -mt-px -ml-[3px] shadow-[2px_2px_0px_black] flex justify-center items-center">
                        <CVText
                          variant="body"
                          size={textSize}
                          className="font-bold text-black! uppercase"
                        >
                          About Me
                        </CVText>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-start items-center flex-col">
                  <div className="flex">
                    <CVText
                      variant="tiny"
                      size={textSize}
                      className="font-light text-justify"
                    >
                      {data?.profile}
                    </CVText>
                  </div>
                </div>
              </div>

              {/* EXPERIENCES */}
              <div className="grid grid-cols-[4fr_6fr] gap-2 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center items-start my-3">
                    <div className="bg-black pr-[3px] pb-[3px] w-32 border-[1.5px] border-white">
                      <div className="bg-yellow-400 py-1 -mt-px -ml-[3px] shadow-[2px_2px_0px_black] flex justify-center items-center">
                        <CVText
                          variant="body"
                          size={textSize}
                          className="font-bold text-black! uppercase"
                        >
                          Experiences
                        </CVText>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-start items-center flex-col">
                  <div className="flex w-full">
                    <div className="p-0 my-4 flex flex-col gap-3 w-full">
                      {data?.experience
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex flex-col gap-2" key={key}>
                            <div className="flex justify-between">
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-bold"
                              >
                                {item?.jobTitle}
                              </CVText>
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-medium"
                              >
                                {`${item?.company} | ${moment(item?.startDate).format('YYYY')} - ${moment(item?.endDate).format('YYYY')}`}
                              </CVText>
                            </div>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className=" text-justify font-light"
                            >
                              {item?.descJob}
                            </CVText>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EDUCATIONS */}
              <div className="grid grid-cols-[4fr_6fr] gap-2 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center items-start my-3">
                    <div className="bg-black pr-[3px] pb-[3px] w-32 border-[1.5px] border-white">
                      <div className="bg-yellow-400 py-1 -mt-px -ml-[3px] shadow-[2px_2px_0px_black] flex justify-center items-center">
                        <CVText
                          variant="body"
                          size={textSize}
                          className="font-bold text-black! uppercase"
                        >
                          Educations
                        </CVText>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-start flex-col">
                  <div className="flex w-full">
                    <div className="p-0 my-4 flex flex-col gap-3 w-full">
                      {data?.education
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex flex-col gap-2" key={key}>
                            <div className="flex justify-between">
                              <div className="grid">
                                <CVText
                                  variant="small"
                                  size={textSize}
                                  className="font-bold"
                                >
                                  {`${item?.degree} of ${item?.major}`}
                                </CVText>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-light"
                                >
                                  {item?.university}
                                </CVText>
                              </div>
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-medium"
                              >
                                {`${item?.graduatedStatus == true ? moment(item?.graduated).format('YYYY') : 'ongoing'}`}
                              </CVText>
                            </div>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className=" text-justify font-light"
                            >
                              {item?.majorDesc}
                            </CVText>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SKILLS */}
              <div className="grid grid-cols-[4fr_6fr] gap-2 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center items-start my-3">
                    <div className="bg-black pr-[3px] pb-[3px] w-32 border-[1.5px] border-white">
                      <div className="bg-yellow-400 py-1 -mt-px -ml-[3px] shadow-[2px_2px_0px_black] flex justify-center items-center">
                        <CVText
                          variant="body"
                          size={textSize}
                          className="font-bold text-black! uppercase"
                        >
                          Skills
                        </CVText>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-start flex-col">
                  <div className="flex w-full">
                    <div className="p-0 my-4 flex flex-col gap-3 w-full">
                      <div className="grid grid-cols-3 gap-4">
                        {data?.skills
                          ?.toReversed()
                          ?.map((item: any, key: number) => (
                            <div
                              className="flex flex-col items-center gap-2"
                              key={key}
                            >
                              {/* Skill name */}
                              <span className="text-sm font-medium text-white">
                                {item.name}
                              </span>
                              {/* Circle container */}
                              <div
                                className="relative w-16 h-16 rounded-full border-4 overflow-hidden bg-gray-100 flex justify-center items-center"
                                style={{ borderColor: skillColor }}
                              >
                                {/* Water fill */}
                                <div
                                  className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-in-out"
                                  style={{
                                    height: `${(item.level / 5) * 100}%`,
                                    background: primaryColor,
                                  }}
                                />
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-bold text-black! z-999"
                                >{`${(item?.level / 5) * 100}%`}</CVText>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

export default Sample18
