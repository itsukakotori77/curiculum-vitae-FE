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
import '@/assets/styles/exampleCurr/_example19.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-[#00C098] sample19-container shadow-lg print:shadow-none',
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

const Sample19 = forwardRef<HTMLDivElement, Sample>(
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
            <div className="grid grid-cols-[3fr_7fr] w-full gap-4">
              {/* Left sidebar */}
              <div
                className="flex flex-col gap-2  relative p-4"
                style={{ background: sidebarColor }}
              >
                {!!setting?.usingPicture && (
                  <div className="flex justify-center items-center my-2">
                    <Image
                      src={data?.profilePicture || '/User.png'}
                      alt="user"
                      width={600}
                      height={600}
                      className="object-cover aspect-1/5 rounded-full"
                      style={
                        config.responsiveImage
                          ? {
                              width: `${config.mobileImageSize}px`,
                              height: `${config.mobileImageSize}px`,
                            }
                          : {
                              width: '150px',
                              height: '150px',
                            }
                      }
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2 px-4">
                  {/* ABOUT ME */}
                  <div className="grid gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-bold uppercase whitespace-nowrap my-2"
                        style={{ color: primaryColor }}
                      >
                        About
                      </CVText>
                      <div
                        className="w-full h-[2px]"
                        style={{ background: primaryColor }}
                      />
                    </div>

                    <CVText
                      variant="tiny"
                      size={textSize}
                      className="font-light text-justify"
                      style={{ color: primaryColor }}
                    >
                      {data?.profile}
                    </CVText>
                  </div>

                  {/* CONTACTS */}
                  <div className="grid gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-bold uppercase whitespace-nowrap my-2"
                        style={{ color: primaryColor }}
                      >
                        Contacs
                      </CVText>
                      <div
                        className="w-full h-[2px]"
                        style={{ background: primaryColor }}
                      />
                    </div>
                    {/* CONTACTS */}
                    <div className="w-full flex flex-col gap-3">
                      {/* Phone/WhatsApp */}
                      {data?.contacts?.phone && (
                        <div className="flex justify-start items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faWhatsapp}
                            className={cn(iconVariants({ iconSize }), 'py-2')}
                            style={{
                              background: primaryColor,
                              color: sidebarTextColor,
                            }}
                          />
                          <div className="grid">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              Phone
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              {data.contacts.phone}
                            </CVText>
                          </div>
                        </div>
                      )}

                      {/* Telegram */}
                      {data?.contacts?.telegram && (
                        <div className="flex justify-start items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faTelegram}
                            className={cn(iconVariants({ iconSize }), 'py-2')}
                            style={{
                              background: primaryColor,
                              color: sidebarTextColor,
                            }}
                          />
                          <div className="grid">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              Telegram
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              {data.contacts.telegram}
                            </CVText>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {data?.contacts?.email && (
                        <div className="flex justify-start items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className={cn(iconVariants({ iconSize }), 'py-2')}
                            style={{
                              background: primaryColor,
                              color: sidebarTextColor,
                            }}
                          />
                          <div className="grid">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              Email
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              {data.contacts.email}
                            </CVText>
                          </div>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {data?.contacts?.linkedin && (
                        <div className="flex justify-start items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faLinkedinIn}
                            className={cn(iconVariants({ iconSize }), 'py-2')}
                            style={{
                              background: primaryColor,
                              color: sidebarTextColor,
                            }}
                          />
                          <div className="grid">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              LinkedIn
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              {data.contacts.linkedin}
                            </CVText>
                          </div>
                        </div>
                      )}

                      {/* Instagram */}
                      {data?.contacts?.instagram && (
                        <div className="flex justify-start items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faInstagram}
                            className={cn(iconVariants({ iconSize }), 'py-2')}
                            style={{
                              background: primaryColor,
                              color: sidebarTextColor,
                            }}
                          />
                          <div className="grid">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              Instagram
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light tracking-wide text-[10px]"
                              style={{ color: primaryColor }}
                            >
                              {data.contacts.instagram}
                            </CVText>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="grid gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-bold uppercase whitespace-nowrap my-2"
                        style={{ color: primaryColor }}
                      >
                        Skills
                      </CVText>
                      <div
                        className="w-full h-[2px]"
                        style={{ background: primaryColor }}
                      />
                    </div>
                    {data?.skills?.map((item: any, key: number) => (
                      <div className="grid gap-1" key={key}>
                        <div className="flex justify-between">
                          <CVText
                            variant="tiny"
                            size="xs"
                            className="font-light"
                          >
                            {item?.name}
                          </CVText>
                        </div>
                        <div className="grid grid-cols-5">
                          {Array.from({ length: item?.level }, (_, index) => (
                            <div
                              key={index}
                              className="flex justify-center items-center w-full relative"
                            >
                              <div
                                className="h-2 w-full"
                                style={{ background: skillColor }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tear edge overlay */}
                <div className="absolute top-0 right-0 h-full w-4 translate-x-full z-10 bg-transparent">
                  <svg
                    viewBox="0 0 20 800"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <path
                      d="M0,0 
                        L8,15 L2,30 L10,48 L4,63 L12,78 
                        L3,95 L9,112 L1,128 L11,145 
                        L5,160 L13,175 L2,192 L8,208 
                        L4,224 L10,240 L3,256 L12,272 
                        L6,288 L14,304 L2,320 L9,336 
                        L5,352 L11,368 L3,384 L13,400 
                        L7,416 L15,432 L4,448 L10,464 
                        L2,480 L12,496 L6,512 L14,528 
                        L3,544 L9,560 L5,576 L11,592 
                        L1,608 L13,624 L7,640 L15,656 
                        L4,672 L10,688 L2,704 L8,720 
                        L6,736 L14,752 L3,768 L11,784 
                        L5,800 L0,800 Z"
                      fill={sidebarColor}
                    />
                  </svg>
                </div>
              </div>

              {/* Right content */}
              <div className="flex flex-col gap-2 w-full p-4">
                <div className="flex justify-center flex-col items-start px-4 my-6">
                  <CVText
                    variant="title"
                    size="lg"
                    className="font-bold uppercase "
                    style={{ color: sidebarColor }}
                  >
                    {data?.firstName}
                  </CVText>
                  <CVText
                    variant="title"
                    size="lg"
                    className="font-bold uppercase "
                    style={{ color: sidebarColor }}
                  >
                    {data?.lastName}
                  </CVText>
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-light uppercase font-[ntr]"
                    style={{ color: sidebarColor }}
                  >
                    {data?.role}
                  </CVText>
                </div>

                <div className="flex flex-col gap-2 px-4">
                  {/* WORK EXPERIENCES */}
                  <div className="grid gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-bold uppercase whitespace-nowrap my-2"
                        style={{ color: sidebarColor }}
                      >
                        Work Experiences
                      </CVText>
                      <div
                        className="w-full h-[2px]"
                        style={{ background: sidebarColor }}
                      />
                    </div>

                    <div className="grid gap-2">
                      {data?.experience
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex gap-1" key={key}>
                            <div className="w-20 shrink-0 flex items-start">
                              <CVText
                                variant="tiny"
                                size={textSize}
                                style={{ color: sidebarColor }}
                              >
                                {`${moment(item?.startDate).format('YYYY')} - ${
                                  item?.isCurrent == true
                                    ? 'Present'
                                    : moment(item?.endDate).format('YYYY')
                                }`}
                              </CVText>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-bold"
                                  style={{ color: sidebarColor }}
                                >
                                  {item?.jobTitle}
                                </CVText>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-bold"
                                  style={{ color: sidebarColor }}
                                >
                                  {`${item?.company} | ${item?.role}`}
                                </CVText>
                              </div>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-light text-justify"
                                style={{ color: sidebarColor }}
                              >
                                {item?.descJob}
                              </CVText>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* EDUCATIONS */}
                  <div className="grid gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-bold uppercase whitespace-nowrap my-2"
                        style={{ color: sidebarColor }}
                      >
                        Educations
                      </CVText>
                      <div
                        className="w-full h-[2px]"
                        style={{ background: sidebarColor }}
                      />
                    </div>

                    <div className="grid gap-2">
                      {data?.education
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex gap-1" key={key}>
                            <div className="w-20 shrink-0 flex items-start">
                              <CVText
                                variant="tiny"
                                size={textSize}
                                style={{ color: sidebarColor }}
                              >
                                {`${item?.graduatedStatus != true
                                    ? 'Ongoing'
                                    : moment(item?.graduated).format('YYYY')
                                }`}
                              </CVText>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-bold"
                                  style={{ color: sidebarColor }}
                                >
                                  {`${item?.degree}, ${item?.major}`}
                                </CVText>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-bold"
                                  style={{ color: sidebarColor }}
                                >
                                  {item?.university}
                                </CVText>
                              </div>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-light text-justify"
                                style={{ color: sidebarColor }}
                              >
                                {item?.majorDesc}
                              </CVText>
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

export default Sample19
