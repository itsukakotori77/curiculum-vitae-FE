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
import Badge from '@/components/globals/UI/Badge'

const cvVariants = cva(
  'w-full bg-white sample14-container shadow-lg print:shadow-none',
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

const Sample15 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#CAD9DB',
      primaryColor = '#63999A',
      sidebarTextColor = '#000',
      skillColor = '#000',
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
            <div className="flex flex-col gap-1.5 w-full">
              {/* CONTACTS & FULLNAME */}
              <div className="grid grid-cols-[3fr_7fr]">
                {/* CONTACTS */}
                <div className="w-full flex flex-col gap-2 justify-center px-10">
                  {/* Phone/WhatsApp */}
                  {data?.contacts?.phone && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className={cn(
                            iconVariants({ iconSize }),
                            'text-white',
                          )}
                        />
                      </div>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light tracking-wide text-[10px]"
                        style={{ color: sidebarTextColor }}
                      >
                        {data.contacts.phone}
                      </CVText>
                    </div>
                  )}

                  {/* Telegram */}
                  {data?.contacts?.telegram && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faTelegram}
                          className={cn(
                            iconVariants({ iconSize }),
                            'text-white',
                          )}
                        />
                      </div>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light tracking-wide text-[10px]"
                        style={{ color: sidebarTextColor }}
                      >
                        {data.contacts.telegram}
                      </CVText>
                    </div>
                  )}

                  {/* Email */}
                  {data?.contacts?.email && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={cn(
                            iconVariants({ iconSize }),
                            'text-white',
                          )}
                        />
                      </div>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light tracking-wide text-[10px]"
                        style={{ color: sidebarTextColor }}
                      >
                        {data.contacts.email}
                      </CVText>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {data?.contacts?.linkedin && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className={cn(
                            iconVariants({ iconSize }),
                            'text-white',
                          )}
                        />
                      </div>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light tracking-wide text-[10px]"
                        style={{ color: sidebarTextColor }}
                      >
                        {data.contacts.linkedin}
                      </CVText>
                    </div>
                  )}

                  {/* Instagram */}
                  {data?.contacts?.instagram && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className={cn(
                            iconVariants({ iconSize }),
                            'text-white',
                          )}
                        />
                      </div>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light tracking-wide text-[10px]"
                        style={{ color: sidebarTextColor }}
                      >
                        {data.contacts.instagram}
                      </CVText>
                    </div>
                  )}
                </div>

                {/* FULLNAME */}
                <div className="w-full bg-white">
                  <div
                    className="relative h-[20vh] [clip-path:polygon(0_0,100%_0,100%_100%,20%_100%)]"
                    style={{ background: primaryColor }}
                  >
                    <div className="flex flex-col justify-center items-end px-4 py-6">
                      <CVText variant="title" size="lg" className="text-white">
                        {`${data?.firstName} ${data?.lastName}`}
                      </CVText>
                      <CVText variant="small" size="lg" className="text-white">
                        {data?.role}
                      </CVText>
                    </div>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div
                className="w-full h-[6px]"
                style={{ background: primaryColor }}
              />

              <div className="grid mt-8">
                <div className="grid grid-cols-[3fr_7fr] gap-2">
                  {/* ABOUT & SKILLS & EDUCATION */}
                  <div
                    className="flex flex-col w-full gap-3 min-h-screen py-4 px-6"
                    style={{ background: sidebarColor }}
                  >
                    {/* ABOUT */}
                    <div className="grid gap-1">
                      <CVText variant="body" size="lg" className="font-bold">
                        About
                      </CVText>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light"
                      >
                        {data?.profile}
                      </CVText>
                    </div>

                    {/* EDUCATION */}
                    <div className="grid gap-1">
                      <CVText variant="body" size="lg" className="font-bold">
                        Education
                      </CVText>
                      {data?.education?.toReversed()?.map((item, key) => (
                        <div className="flex flex-col gap-1" key={key}>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="font-bold"
                          >
                            {item?.major}
                          </CVText>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light"
                          >
                            {item?.university}
                          </CVText>
                          <Badge
                            variant="transparent"
                            className="rounded-lg border border-black w-16"
                          >
                            <CVText variant="tiny">
                              {moment(item?.graduated).format('YYYY')}
                            </CVText>
                          </Badge>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light"
                          >
                            {item?.majorDesc}
                          </CVText>
                        </div>
                      ))}
                    </div>

                    {/* SKILLS */}
                    <div className="grid gap-2">
                      <CVText variant="body" size="lg" className="font-bold">
                        Skills
                      </CVText>
                      {data?.skills?.map((item: any, key: number) => (
                        <div className="grid grid-cols-2 gap-1" key={key}>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light"
                          >
                            {item?.name}
                          </CVText>
                          <div className="grid grid-cols-5">
                            {Array.from({ length: 5 }, (_, index) => (
                              <div
                                key={index}
                                className="flex justify-center items-center w-full relative"
                              >
                                <div
                                  className="h-[3px] w-full"
                                  style={{ background: skillColor }}
                                />
                                {index == item?.level && (
                                  <div
                                    className="absolute w-1 h-2 aspect-square"
                                    style={{ background: skillColor }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EXPERIENCE & CERTIFICATE */}
                  <div className="flex flex-col w-full gap-5 px-4 py-2">
                    {/* EXPERIENCES */}
                    <div className="grid">
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="font-bold"
                      >
                        Work Experience
                      </CVText>

                      {data?.experience
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div
                            className="flex flex-col w-full gap-2 py-2"
                            key={key}
                          >
                            <div className="flex gap-5">
                              {/* COMPANY NAME */}
                              <div className="flex flex-col shrink-0 w-1/5 gap-0.5">
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-semibold"
                                >
                                  {item?.company}
                                </CVText>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font"
                                >
                                  {item?.role}
                                </CVText>
                                <Badge
                                  variant="transparent"
                                  className="rounded-lg border w-24"
                                >
                                  <CVText
                                    variant="tiny"
                                    size={textSize}
                                    className="font-light"
                                  >
                                    {`${moment(item?.startDate).format('YYYY')} - ${moment(item?.endDate).format('YYYY')}`}
                                  </CVText>
                                </Badge>
                              </div>

                              {/* DIVIDER */}
                              <div className="flex justify-center relative mb-1">
                                <div className="rounded-full w-2 h-2 bg-black absolute top-0" />
                                <div className="h-full w-px bg-black" />
                              </div>

                              {/* DESC */}
                              <div className="flex flex-col gap-1 px-1">
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
                                  className="font-light text-justify"
                                >
                                  {item?.descJob}
                                </CVText>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* CERTIFICATES */}
                    <div className="grid">
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="font-bold"
                      >
                        Certificates
                      </CVText>

                      <div className="grid">
                        <div className="w-full">
                          <div className="flex flex-col gap-2">
                            <ul className="list-disc pl-4 w-full cert-list-unique">
                              {data?.certification
                                ?.toReversed()
                                ?.map((item: any, key: number) => (
                                  <li key={key}>
                                    <div className="grid">
                                      <CVText
                                        variant="tiny"
                                        size={textSize}
                                        className="font-medium"
                                      >
                                        {item?.name}
                                      </CVText>
                                      <CVText
                                        variant="tiny"
                                        size={textSize}
                                        className="font-light"
                                      >
                                        {item?.descCert}
                                      </CVText>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
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

export default Sample15
