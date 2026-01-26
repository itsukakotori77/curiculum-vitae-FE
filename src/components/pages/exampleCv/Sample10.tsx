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
import '@/assets/styles/exampleCurr/_example10.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-white sample10-container shadow-lg print:shadow-none',
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

const Sample10 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#000',
      primaryColor = '#D7DCDD',
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
    const { data: setting } = useCVSettingStore()

    return (
      <>
        <div ref={ref} className={cn(cvVariants({ size, scale }), className)}>
          <div className={cn(cvVariants({ printable }), childrenClassName)}>
            <div className="flex flex-row gap-2 w-full">
              <div className="w-[70%] flex flex-col bg-white p-4">
                <div className="flex gap-2">
                  {!!setting?.usingPicture && (
                    <Image
                      src={data?.profilePicture || '/User.png'}
                      alt="user"
                      width={600}
                      height={600}
                      className="object-cover grayscale aspect-4/5"
                      style={{
                        width: config.responsiveImage
                          ? `${config.mobileImageSize}px`
                          : '200px',
                        height: 'auto',
                      }}
                    />
                  )}

                  <div
                    className={`flex flex-col items-center justify-center z-999 ${!!setting?.usingPicture ? '-ml-8' : ''}`}
                  >
                    {/* ROLE */}
                    <CVText variant="body" size="md" className="w-full">
                      {data?.role?.toUpperCase()}
                    </CVText>
                    {/* FULLNAME */}
                    <div className="flex items-center gap-3 relative">
                      <CVText
                        variant="title"
                        size="md"
                        className="font-bold font-[libre-caslon]"
                      >
                        {data?.firstName?.toUpperCase()}
                      </CVText>
                      <CVText
                        variant="title"
                        size="md"
                        className="font-bold font-[libre-caslon] bg-amber-200 py-2 px-1"
                      >
                        {data?.lastName?.toUpperCase()}
                      </CVText>
                    </div>

                    {/* EXPERIENCES */}
                  </div>
                </div>

                {/* CONTACTS */}
                <div className="flex flex-col my-4 gap-2 mt-10">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-[libre-caslon] font-extrabold"
                  >
                    CONTACTS
                  </CVText>
                  <div className="w-full flex flex-col gap-2">
                    <hr
                      className="h-[1.5px]"
                      style={{ background: sidebarColor }}
                    />
                    <div className="flex justify-between">
                      {/* Phone/WhatsApp */}
                      {data?.contacts?.phone && (
                        <div className="flex gap-2 justify-start">
                          <FontAwesomeIcon
                            icon={faWhatsapp}
                            className={cn(
                              iconVariants({ iconSize }),
                              'font-bold shrink-0 w-5 text-xl',
                            )}
                            style={{ color: sidebarColor }}
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
                            style={{ color: sidebarColor }}
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
                            style={{ color: sidebarColor }}
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
                            style={{ color: sidebarColor }}
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
                            style={{ color: sidebarColor }}
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
                            style={{ color: sidebarColor }}
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
                    <hr
                      className="h-[1.5px]"
                      style={{ background: sidebarColor }}
                    />
                  </div>
                </div>

                {/* EXPERIENCES  */}
                <div className="flex flex-col gap-2 mt-5">
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
                            <div className="flex flex-col gap-1">
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
                                className="font-medium italic"
                              >
                                {`${moment(item?.startDate).format('YYYY')} - ${moment(item?.endDate).format('YYYY')}`}
                              </CVText>
                            </div>
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-bold italic"
                            >
                              {item?.company}
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
              </div>
              <div
                className="w-[30%] flex flex-col p-4 gap-2"
                style={{ background: primaryColor }}
              >
                <div className="flex flex-col gap-1">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-[libre-caslon] font-extrabold"
                  >
                    PROFILE
                  </CVText>
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-light text-justify py-2"
                  >
                    {data?.profile}
                  </CVText>
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
                  <ul className="space-y-0.5 list-disc pl-4">
                    {data?.skills?.map((item: any, key: number) => (
                      <li key={key}>
                        <CVText
                          variant="small"
                          size={textSize}
                          className="font-medium"
                          style={{ color: sidebarTextColor }}
                        >
                          {item?.name}
                        </CVText>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EDUCATIONS */}
                <div className="flex flex-col my-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    style={{ color: sidebarTextColor }}
                    className="font-[libre-caslon]"
                  >
                    EDUCATIONS
                  </CVText>
                  <ul className="space-y-0.5 list-disc pl-4">
                    {data?.education?.map((item: any, key: number) => (
                      <li key={key}>
                        <div className="flex flex-col gap-1">
                          <CVText
                            variant="small"
                            size={textSize}
                            className="font-semibold"
                          >
                            {item?.major},
                          </CVText>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="font-normal"
                          >
                            {item?.university}
                          </CVText>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-medium italic"
                          >
                            {` ${!!item?.graduatedStatus ? moment(item?.graduated).format('YYYY') : ''}`}
                          </CVText>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CERTIFICATES */}
                <div className="flex flex-col my-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    style={{ color: sidebarTextColor }}
                    className="font-[libre-caslon]"
                  >
                    CERTICATES
                  </CVText>
                  <ul className="space-y-0.5 list-disc pl-4">
                    {data?.certification?.map((item: any, key: number) => (
                      <li key={key}>
                        <CVText
                          variant="small"
                          size={textSize}
                          className="font-semibold"
                        >
                          {`${item?.name} - ${item?.company}`}
                        </CVText>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

export default Sample10
