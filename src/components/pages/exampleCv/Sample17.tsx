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
import '@/assets/styles/exampleCurr/_example17.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-white sample17-container shadow-lg print:shadow-none',
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

const Sample17 = forwardRef<HTMLDivElement, Sample>(
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
      primaryColor = '#2F4856',
      sidebarTextColor = '#fff',
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
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            <div className="flex flex-col gap-2 w-full">
              {/* HEADER FULLNAME & ROLE */}
              <div
                className="flex justify-center items-center flex-col py-2"
                style={{ background: primaryColor }}
              >
                <CVText
                  variant="title"
                  size="lg"
                  className="font-bold font-[literata] uppercase"
                  style={{ color: sidebarColor }}
                >
                  {`${data?.firstName} ${data?.lastName}`}
                </CVText>
                <CVText
                  variant="small"
                  size={textSize}
                  className="font-light font-[literata] uppercase"
                  style={{ color: sidebarTextColor }}
                >
                  {data?.role}
                </CVText>

                <div className="bg-white h-[2px] w-full mt-8" />
                {/* CONTACTS */}
                <div className="w-full flex gap-2 justify-center px-10 mt-1">
                  {/* Phone/WhatsApp */}
                  {data?.contacts?.phone && (
                    <div className="flex justify-start items-center gap-1.5">
                      <div
                        className="flex justify-center items-center rounded-full w-6 h-6"
                        style={{ background: primaryColor }}
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className={cn(iconVariants({ iconSize }))}
                          style={{ color: sidebarTextColor }}
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
                          className={cn(iconVariants({ iconSize }))}
                          style={{ color: sidebarTextColor }}
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
                          className={cn(iconVariants({ iconSize }))}
                          style={{ color: sidebarTextColor }}
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
                          className={cn(iconVariants({ iconSize }))}
                          style={{ color: sidebarTextColor }}
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
                          className={cn(iconVariants({ iconSize }))}
                          style={{ color: sidebarTextColor }}
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
              </div>

              {/* PROFILE & PROFILE */}
              <div
                className={cn(
                  !!setting?.usingPicture ? 'grid grid-cols-[2fr_8fr]' : 'grid',
                  'px-5 gap-4',
                )}
              >
                {/* IMAGE */}
                {!!setting?.usingPicture && (
                  <div
                    className="rounded-full border-6 flex justify-center items-center"
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
                              width: '120px',
                              height: '120px',
                            }
                      }
                    />
                  </div>
                )}

                {/* PROFILE */}
                <div className="flex jusitfy-center items-center">
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-light text-justify"
                  >
                    {data?.profile}
                  </CVText>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="bg-gray-500 h-[2px] mx-5 my-2" />

              {/* WORK EXPERIENCES & SKILLS */}
              <div className="grid grid-cols-[3fr_7fr] px-5 gap-4">
                {/* EDUCATIONS */}
                <div className="flex flex-col gap-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-bold uppercase font-[imfell]"
                  >
                    Educations
                  </CVText>

                  <div className="my-1">
                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex flex-col" key={key}>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light text-neutral-600"
                          >
                            {`${item?.graduatedStatus == true ? moment(item?.graduated).format('YYYY') : 'Under Study'}`}
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
                            className="font-medium mb-2"
                          >
                            {item?.university}
                          </CVText>
                        </div>
                      ))}
                  </div>

                  {/* SKILS */}
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-bold uppercase font-[imfell]"
                  >
                    SKills
                  </CVText>

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
                        <CVText
                          variant="tiny"
                          size="xs"
                          className="font-light"
                        >
                          {`${+((100 / 5) * item?.level).toFixed(2)}%`}
                        </CVText>
                      </div>
                      <div className="grid grid-cols-5">
                        {Array.from({ length: 5 }, (_, index) => (
                          <div
                            key={index}
                            className="flex justify-center items-center w-full relative"
                          >
                            <div
                              className="h-[1.5px] w-full"
                              style={{ background: skillColor }}
                            />
                            {index == item?.level && (
                              <div
                                className="absolute w-[2.5px] h-2 aspect-square"
                                style={{ background: skillColor }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* EXPERIENCES & SKILLS */}
                <div className="flex flex-col gap-2">
                  {/* EXPERIENCES */}
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-bold uppercase font-[imfell]"
                  >
                    Work Experiences
                  </CVText>

                  <div className="my-1">
                    {data?.experience
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex gap-2 items-start" key={key}>
                          <div className="flex items-center justify-center rounded-lg border border-black px-1 py-2 shrink-0">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light text-neutral-600 whitespace-nowrap"
                              style={{
                                writingMode: 'sideways-lr',
                                textOrientation: 'mixed',
                              }}
                            >
                              {`${moment(item?.startDate).format('YYYY')} - ${
                                item?.isCurrent === true
                                  ? moment(item?.endDate).format('YYYY')
                                  : 'Pre'
                              }`}
                            </CVText>
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
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
                              className="font-medium"
                            >
                              {item?.company}
                            </CVText>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-light text-justify mb-2"
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
        </div>
      </>
    )
  },
)

export default Sample17
