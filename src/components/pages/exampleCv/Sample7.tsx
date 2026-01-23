import { CVProps } from '@/interface/curiculumVitae'
import { cn } from '@/utils/common'
import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import moment from 'moment'
import '@/assets/styles/exampleCurr/_example4.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import '@/assets/styles/exampleCurr/_example7.css'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-white sample7-container shadow-lg print:shadow-none',
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
        noPrint: ['min-h-screen', 'flex', 'justify-center', 'items-start'],
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

const Sample7 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#B79A83',
      primaryColor = '#525B5D',
      sidebarTextColor = '#FFFFF',
      skillColor = '#929292',
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
            <div className={`flex min-w-full gap-2 px-10 pb-8 -mx-4`}>
              <div className="w-[40%]">
                {!!setting?.usingPicture && (
                  <div className="flex justify-center items-center flex-col">
                    {/* Responsive Background */}
                    <div
                      className="rounded-br-4xl rounded-bl-3xl"
                      style={
                        config.responsiveImage
                          ? {
                              background: primaryColor,
                              height: `${config.mobileBackgroundHeight || 240}px`,
                              width: `${config.mobileBackgroundWidth || 144}px`,
                            }
                          : {
                              background: primaryColor,
                              height: '320px',
                              width: '192px',
                            }
                      }
                    ></div>

                    {/* Image Container */}
                    <div
                      className="rounded-full border-6"
                      style={{
                        borderColor: sidebarColor,
                        marginTop: config.responsiveImage
                          ? `-${+config.mobileImageSize! * 0.89}px` // Responsive negative margin
                          : '-160px', // Default margin
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

                <div className="flex flex-col gap-2 w-full px-6 mt-2">
                  {/* SKIILS */}
                  <div className="flex flex-col">
                    <CVText variant="body" size="lg" className="font-medium">
                      SKILLS
                    </CVText>
                    <div className="my-2">
                      {/* Skills with levels */}
                      <div className="grid gap-1.5 mb-3">
                        {data?.skills?.map(
                          (item: any, key: number) =>
                            item?.isHasLevel && (
                              <div className="flex flex-col" key={key}>
                                <CVText
                                  variant="small"
                                  size={textSize}
                                  className="font-medium"
                                  style={{ color: sidebarTextColor }}
                                >
                                  {item?.name}
                                </CVText>
                                <div className="grid grid-cols-5 w-full gap-0">
                                  {/* LEVEL */}
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <div
                                      key={index}
                                      className={`h-0.5 w-full border-none relative`}
                                      style={{
                                        background: ` ${
                                          Boolean(item?.isHasLevel) &&
                                          index < item.level
                                            ? skillColor
                                            : '#D9D9D9'
                                        }`,
                                      }}
                                    >
                                      {!!item?.isHasLevel && (
                                        <>
                                          {index == item?.level && (
                                            <div
                                              className="absolute w-2.5 h-2.5 rounded-full border-2 -top-1 -left-2.5"
                                              style={{
                                                background: skillColor,
                                                borderColor: sidebarColor,
                                              }}
                                            ></div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  </div>
                  {/* CERTIFICATE */}
                  <div className="flex flex-col">
                    <CVText variant="body" size="lg" className="font-medium">
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
                  </div>
                </div>
              </div>

              <div className="w-[60%]">
                {/* FIRST SEGMENT */}
                <div className="flex flex-col gap-1 justify-center w-full mt-12">
                  <CVText
                    variant="title"
                    size="lg"
                    className="font-bold"
                    style={{ color: sidebarColor }}
                  >
                    {`${data?.firstName} ${data?.lastName}`}
                  </CVText>
                  <CVText
                    variant="subtitle"
                    size="md"
                    className="font-medium uppercase tracking-wide"
                  >
                    {data?.role}
                  </CVText>
                </div>

                <div className="flex flex-col gap-2 mt-20">
                  {/* CONTACTS */}
                  <hr className="bg-black h-[1px] w-full" />
                  <div className="flex justify-evenly flex-wrap gap-1">
                    {/* Phone/WhatsApp */}
                    {data?.contacts?.phone && (
                      <div className="flex justify-start items-center gap-0.5">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className={cn(iconVariants({ iconSize }))}
                        />
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
                      <div className="flex justify-start items-center gap-0.5">
                        <FontAwesomeIcon
                          icon={faTelegram}
                          className={cn(iconVariants({ iconSize }))}
                        />
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
                      <div className="flex justify-start items-center gap-0.5">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={cn(iconVariants({ iconSize }))}
                        />
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
                      <div className="flex justify-start items-center gap-0.5">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className={cn(iconVariants({ iconSize }))}
                        />
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
                      <div className="flex justify-start items-center gap-0.5">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className={cn(iconVariants({ iconSize }))}
                        />
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
                  <hr className="bg-black h-[1px] w-full" />

                  {/* PROFILE */}
                  <div className="py-2">
                    <CVText
                      variant="tiny"
                      size={textSize}
                      as="p"
                      className="text-justify"
                    >
                      {data?.profile}
                    </CVText>
                  </div>

                  <hr className="bg-black h-[1px] w-full" />
                </div>

                {/* EXPERIENCE */}
                <div className="flex flex-col gap-1 w-full mt-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-medium"
                  >
                    EXPERIENCES
                  </CVText>
                  <div className="p-0 my-4 flex flex-col gap-3">
                    {data?.experience
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex flex-col gap-2" key={key}>
                          <div className="flex gap-4 items-start">
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-bold flex-shrink-0 w-24"
                              style={{ color: sidebarColor }}
                            >
                              {`${moment(item?.startDate).format('YYYY')} - ${
                                moment(item?.endDate).isAfter(moment()) ||
                                moment(item?.endDate).isSame(moment(), 'day')
                                  ? 'Present'
                                  : moment(item?.endDate).format('YYYY')
                              }`}
                            </CVText>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="flex-shrink-0 w-3"
                            />
                            <div className="flex flex-col gap-1">
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-bold"
                                style={{ color: sidebarColor }}
                              >
                                {item?.jobTitle}
                              </CVText>
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
                                className="text-justify font-medium"
                              >
                                {item?.descJob}
                              </CVText>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr className="bg-black h-[1px]  w-full" />
                </div>

                {/* EDUCATION */}
                <div className="flex flex-col gap-1 w-full mt-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-medium"
                  >
                    EDUCATIONS
                  </CVText>
                  <div className="p-0 my-4 flex flex-col gap-3">
                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex flex-col gap-2" key={key}>
                          <div className="flex gap-4 items-start">
                            <div className="flex flex-col flex-shrink-0 w-30">
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-bold"
                                style={{ color: sidebarColor }}
                              >
                                {`${moment(item?.graduated).format('YYYY')}`}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-medium"
                                style={{ color: sidebarColor }}
                              >
                                {`${!!item?.graduatedStatus ? `(Graduated - ${item?.gpa})` : ''}`}
                              </CVText>
                            </div>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="flex-shrink-0 w-3"
                            />
                            <div className="flex flex-col gap-1">
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-bold"
                                style={{ color: sidebarColor }}
                              >
                                {item?.major}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-semibold"
                              >
                                {item?.university}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="text-justify font-medium"
                              >
                                {item?.majorDesc}
                              </CVText>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr className="bg-black h-[1px]  w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

Sample7.displayName = 'Sample7'

export default Sample7
