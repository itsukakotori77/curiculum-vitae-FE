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
import '@/assets/styles/exampleCurr/_example14.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full sample14-container shadow-lg print:shadow-none bg-[#D1D6D1]',
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

const Sample14 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#78A060',
      primaryColor = '#78A060',
      sidebarTextColor = '#ffff',
      skillColor = '#CBBF8F',
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
            <div className="flex flex-col w-full">
              {/* PROFILE PICTURE & CONTACTS*/}
              <div className="flex flex-row gap-1">
                <div className="w-[70%]">
                  <div className="flex flex-col gap-1 p-4 w-full">
                    <div
                      className="flex justify-evenly items-center rounded-lg p-4 gap-1"
                      style={{ background: primaryColor }}
                    >
                      {/* Phone/WhatsApp */}
                      {data?.contacts?.phone && (
                        <div className="flex justify-start items-center gap-2">
                          <div
                            className="flex justify-center items-center rounded-md px-1 py-2 text bg-yellow-200"
                            // style={{ background: sidebarColor }}
                          >
                            <FontAwesomeIcon
                              icon={faWhatsapp}
                              className={cn(iconVariants({ iconSize }))}
                            />
                          </div>
                          <div className="flex flex-col">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: sidebarTextColor }}
                            >
                              Phone
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: sidebarTextColor }}
                            >
                              {data.contacts.phone}
                            </CVText>
                          </div>
                        </div>
                      )}
                      {/* Email */}
                      {data?.contacts?.email && (
                        <div className="flex justify-start items-center gap-2">
                          <div
                            className="flex justify-center items-center rounded-md px-1 py-2 text bg-yellow-200"
                            // style={{ background: sidebarColor }}
                          >
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className={cn(iconVariants({ iconSize }))}
                            />
                          </div>
                          <div className="flex flex-col">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: sidebarTextColor }}
                            >
                              Email
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: sidebarTextColor }}
                            >
                              {data.contacts.email}
                            </CVText>
                          </div>
                        </div>
                      )}
                      {/* Email */}
                      {data?.contacts?.email && (
                        <div className="flex justify-start items-center gap-2">
                          <div
                            className="flex justify-center items-center rounded-md px-1 py-2 text bg-yellow-200"
                            // style={{ background: sidebarColor }}
                          >
                            <FontAwesomeIcon
                              icon={faLinkedinIn}
                              className={cn(iconVariants({ iconSize }))}
                            />
                          </div>
                          <div className="flex flex-col">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: sidebarTextColor }}
                            >
                              LinkedIn
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{
                                color: getContrastColor(sidebarTextColor),
                              }}
                            >
                              {data.contacts.linkedin}
                            </CVText>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="w-[30%] rounded-bl-[60px] h-[calc(100vh-80vh)] z-999"
                  style={{ background: skillColor }}
                >
                  {!!setting?.usingPicture && (
                    <div className="flex justify-center items-center h-full">
                      <Image
                        src={data?.profilePicture || '/User.png'}
                        alt="user"
                        width={600}
                        height={600}
                        className="object-cover aspect-square rounded-[45px]"
                        style={
                          config.responsiveImage
                            ? {
                                width: `${config.mobileImageSize}px`,
                                height: `${config.mobileImageSize}px`,
                                borderColor: sidebarColor,
                                boxShadow: `0 0 0 4px ${mixWithWhite(skillColor)}`,
                              }
                            : {
                                width: '50%',
                                borderColor: sidebarColor,
                                boxShadow: `0 0 0 4px ${mixWithWhite(skillColor)}`,
                              }
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* PROFILE */}
              <div
                className="flex flex-col py-4 px-10 gap-1 w-[96%] rounded-br-[60px] -mt-12 z-1"
                style={{ background: mixWithWhite(primaryColor) }}
              >
                <CVText variant="title" size="lg" className="font-[euphemia]">
                  {data?.firstName}
                </CVText>
                <CVText variant="title" size="lg" className="font-[euphemia]">
                  {data?.lastName}
                </CVText>
                <CVText
                  variant="body"
                  size={textSize}
                  className="font-[euphemia] my-1"
                >
                  {data?.role}
                </CVText>
                <div className="grid grid-cols-[7fr_3fr] gap-8 mt-5">
                  <div className="w-full flex flex-col gap-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-semibold font-[euphemia]"
                    >
                      Certifications
                    </CVText>
                    <CVText
                      variant="tiny"
                      size={textSize}
                      className="text-justify leading-4"
                    >
                      {data?.profile}
                    </CVText>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col gap-2">
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="font-semibold font-[euphemia]"
                      >
                        Achivements
                      </CVText>
                      <ul className="list-disc pl-4 w-full cert-list-unique">
                        {data?.certification
                          ?.toReversed()
                          ?.map((item: any, key: number) => (
                            <li key={key}>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-medium"
                              >
                                {item?.name}
                              </CVText>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  {/* EDUCATION */}
                  <div className="flex flex-col gap-2 px-8 py-4">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-bold font-[euphemia] my-2"
                    >
                      Educations
                    </CVText>
                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex gap-1" key={key}>
                          <div className="w-8 shrink-0 flex items-start">
                            <CVText variant="tiny" size={textSize}>
                              {moment(item?.graduated).format('YYYY')}
                            </CVText>
                          </div>
                          <div className="flex flex-col">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold"
                            >
                              {item?.university}
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold"
                            >
                              {`${item?.degree} of ${item?.major}`}
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light text-justify"
                            >
                              {item?.majorDesc}
                            </CVText>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* SKILLS */}
                  <div
                    className="p-6 rounded-t-4xl mt-2"
                    style={{ background: primaryColor }}
                  >
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-bold font-[euphemia]"
                    >
                      Skills
                    </CVText>

                    <div className="grid grid-cols-2 gap-3">
                      {data?.skills?.map((item: any, key: number) => (
                        <div className="flex flex-col gap-1" key={key}>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-medium"
                          >
                            {item?.name}
                          </CVText>
                          <div className="relative">
                            <div className="grid grid-cols-5 w-full gap-0">
                              {Array.from(
                                { length: item?.level },
                                (_, index) => (
                                  <div
                                    key={index}
                                    className="h-1 w-full border-none z-99"
                                    style={{
                                      background:
                                        index < item.level ? skillColor : '',
                                    }}
                                  />
                                ),
                              )}
                            </div>
                            <div className="absolute h-1 w-full bg-gray-200 z-1 top-0 border-none"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EXPERIENCES */}
                <div className="flex flex-col gap-2 px-8 py-4">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-bold font-[euphemia] my-2"
                  >
                    Work Experiences
                  </CVText>
                  {data?.experience
                    ?.toReversed()
                    ?.map((item: any, key: number) => (
                      <div className="flex gap-1" key={key}>
                        <div className="w-11 shrink-0 flex items-start">
                          <CVText variant="tiny" size={textSize}>
                            {`${moment(item?.startDate).format('YYYY')} - ${item?.isCurrent == true ? 'Present' : moment(item?.endDate).format('YYYY')}`}
                          </CVText>
                        </div>
                        <div className="flex flex-col">
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-bold"
                          >
                            {item?.jobTitle}
                          </CVText>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-bold"
                          >
                            {`${item?.company} of ${item?.role}`}
                          </CVText>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light text-justify"
                          >
                            {item?.descJob}
                          </CVText>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

export default Sample14
