import { CVProps } from '@/interface/curiculumVitae'
import { cn } from '@/utils/common'
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
import '@/assets/styles/exampleCurr/_example9.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'
import { Triangle } from 'lucide-react'

const cvVariants = cva(
  'w-full bg-white sample9-container shadow-lg print:shadow-none bg-[#FEF3E4]',
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

const Sample9 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#C9A488',
      primaryColor = '#F2B696',
      sidebarTextColor = '#000',
      skillColor = '#F2B696',
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
            className={cn(
              cvVariants({ printable }),
              childrenClassName,
              'relative',
            )}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            {/* LEFT LINE */}
            <div
              className="absolute min-h-screen h-full w-3 left-0"
              style={{
                background: primaryColor,
              }}
            ></div>
            <div
              className="absolute min-h-screen h-full w-[2.5px] left-7"
              style={{
                background: sidebarColor,
              }}
            ></div>

            {/* RIGHT LINE */}
            <div
              className="absolute min-h-screen h-full w-1.5 right-0"
              style={{
                background: primaryColor,
              }}
            ></div>
            <div
              className="absolute min-h-screen h-full w-[2.5px] right-4.5"
              style={{
                background: sidebarColor,
              }}
            ></div>

            {/* BOTTOM LINE */}
            <div
              className="absolute min-w-full h-2 bottom-0"
              style={{
                background: primaryColor,
              }}
            ></div>

            {/* ARROW RIGHT */}
            <div className="absolute right-1.5 top-4 flex w-1/2 items-center">
              <Triangle
                className="-rotate-90"
                size={20}
                style={{ color: sidebarColor }}
              />
              <div
                className="h-[2.5px] w-full ml-[-2px]"
                style={{ background: sidebarColor }}
              />
            </div>

            <div className="flex flex-row gap-2 px-14 py-4 mt-10 justify-between w-full">
              <div className="w-[70%] flex flex-col gap-2 justify-start px-6 py-10">
                {/* NAME & PROFILE */}
                <div className="grid gap-1">
                  <CVText
                    variant="title"
                    size="xl"
                    className="font-bold font-[libre-caslon]"
                  >
                    {data?.firstName}
                  </CVText>
                  <CVText
                    variant="title"
                    size="xl"
                    className="font-bold font-[libre-caslon]"
                  >
                    {data?.lastName}
                  </CVText>
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-light text-justify py-2"
                  >
                    {data?.profile}
                  </CVText>
                  <CVText
                    variant="small"
                    size={textSize}
                    className="font-medium text-[#B5521B] uppercase"
                  >
                    {data?.role?.toUpperCase()}
                  </CVText>
                  <div className="relative">
                    <div className="absolute left-0 top-1/2  flex flex-col items-center h-auto">
                      {/* Tail */}
                      <div
                        className="w-[2.5px] h-24 sm:h-32 md:h-30"
                        style={{
                          background: `linear-gradient(
                            to bottom,
                            transparent,
                            ${sidebarColor}
                          )`,
                        }}
                      />
                      {/* Arrow head */}
                      <Triangle
                        className="rotate-180 mt-[-2px]"
                        size={20}
                        style={{ color: sidebarColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* EXPERIENCES */}
                <div className="mt-40">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-[libre-caslon] font-extrabold"
                  >
                    EXPERIENCES
                  </CVText>
                  <div className="p-0 my-4 flex flex-col gap-3">
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
                              className="font-normal"
                            >
                              {`${item?.company} | ${moment(item?.startDate).format('YYYY')} - ${moment(item?.endDate).format('YYYY')}`}
                            </CVText>
                          </div>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light text-justify"
                          >
                            {item?.descJob}
                          </CVText>
                        </div>
                      ))}
                  </div>
                </div>

                {/* CERTIFICATE */}
                {/* <div className="flex flex-col">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-[libre-caslon] font-extrabold"
                  >
                    CERTIFICATES
                  </CVText>
                  <ul className="space-y-0.5 list-disc pl-4 ">
                    {data?.certification?.map((item: any, key: number) => (
                      <li key={key}>
                        <CVText
                          variant="small"
                          size={textSize}
                          className="font-semibold mb-2"
                        >
                          {`${item?.name} - ${item?.company}`}
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="block font-medium text-gray-600"
                        >
                          {item?.descCert}
                        </CVText>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
              <div className="w-[30%]">
                {/* PROFILE PHOTO */}
                {!!setting?.usingPicture && (
                  <div className="flex justify-center items-center flex-col">
                    {/* Image Container */}
                    <div
                      className="rounded-full border-6"
                      style={{
                        borderColor: sidebarColor,
                      }}
                    >
                      <Image
                        src={data?.profilePicture || '/User.png'}
                        alt="user"
                        width={600}
                        height={600}
                        className="object-cover rounded-full"
                        style={
                          config.responsiveImage
                            ? {
                                width: `${config.mobileImageSize}px`,
                                height: `${config.mobileImageSize}px`,
                              }
                            : {
                                width: '200px',
                                height: '200px',
                              }
                        }
                      />
                    </div>
                  </div>
                )}

                {/* CONTACTS */}
                <div className="flex flex-col my-4">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-[libre-caslon] font-extrabold"
                  >
                    CONTACTS
                  </CVText>
                  <div className="grid my-2 gap-4">
                    {/* Phone/WhatsApp */}
                    {data?.contacts?.phone && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            WhatsApp
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.phone}
                          </CVText>
                        </div>
                      </div>
                    )}

                    {/* Telegram */}
                    {data?.contacts?.telegram && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faTelegram}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            Telegram
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.telegram}
                          </CVText>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {data?.contacts?.email && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            Email
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.email}
                          </CVText>
                        </div>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {data?.contacts?.linkedin && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            LinkedIn
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.linkedin}
                          </CVText>
                        </div>
                      </div>
                    )}

                    {/* Instagram */}
                    {data?.contacts?.instagram && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            Instagram
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.instagram}
                          </CVText>
                        </div>
                      </div>
                    )}

                    {/* Otherwise (custom contact) */}
                    {data?.contacts?.otherwise && (
                      <div className="flex gap-2 justify-start">
                        <FontAwesomeIcon
                          icon={faLink}
                          className={cn(
                            iconVariants({ iconSize }),
                            'font-bold shrink-0 w-5 text-xl',
                          )}
                          style={{ color: primaryColor }}
                        />
                        <div className="flex flex-col gap-2">
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-extrabold tracking-wide font-[libre-caslon]"
                          >
                            {data.contacts.otherwise.name}
                          </CVText>
                          <CVText
                            variant={variantText}
                            size={textSize}
                            className="font-light tracking-wide"
                            style={{ color: sidebarTextColor }}
                          >
                            {data.contacts.otherwise.username}
                          </CVText>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SKIILS */}
                  <div className="flex flex-col my-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      style={{ color: sidebarTextColor }}
                      className="font-[libre-caslon]"
                    >
                      SKILLS
                    </CVText>
                    <div className="grid my-2 gap-1.5">
                      {data?.skills?.map((item: any, key: number) => (
                        <div className="flex flex-col items-start" key={key}>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="font-medium"
                            style={{ color: sidebarTextColor }}
                          >
                            {item?.name}
                          </CVText>
                          <div className="grid grid-cols-5 w-full gap-0">
                            {Array.from({ length: item?.level }, (_, index) => (
                              <div
                                key={index}
                                className={`h-2 w-full border-none`}
                                style={{
                                  background: ` ${
                                    Boolean(item?.isHasLevel) &&
                                    index < item.level
                                      ? skillColor
                                      : ''
                                  }`,
                                }}
                              ></div>
                            ))}
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
      </>
    )
  },
)

export default Sample9
