import { ChevronRight } from 'lucide-react'
import React, { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import '@/assets/styles/exampleCurr/_example3.css'
import { CVProps, ICurrVitae } from '@/interface/curiculumVitae'
import moment from 'moment'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/common'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

// Define variants using CVA
const cvVariants = cva(
  // Base classes
  'p-5 flex w-full bg-white shadow-lg sample3-container print:shadow-none',
  {
    variants: {
      size: {
        xs: 'max-w-2xl',
        sm: 'max-w-3xl',
        md: 'max-w-4xl',
        lg: 'max-w-5xl',
        xl: 'max-w-6xl',
        full: 'max-w-full',
      },
      scale: {
        xs: 'scale-[0.6]',
        sm: 'scale-[0.8]',
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
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
  compoundVariants: [
    // Title variants
    { variant: 'title', size: 'xs', class: 'text-xl font-bold' },
    { variant: 'title', size: 'sm', class: 'text-2xl font-bold' },
    { variant: 'title', size: 'md', class: 'text-3xl font-bold' },
    { variant: 'title', size: 'lg', class: 'text-4xl font-bold' },
    { variant: 'title', size: 'xl', class: 'text-5xl font-bold' },

    // Subtitle variants
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
    { variant: 'body', size: 'xs', class: 'text-xs' },
    { variant: 'body', size: 'sm', class: 'text-sm' },
    { variant: 'body', size: 'md', class: 'text-base' },
    { variant: 'body', size: 'lg', class: 'text-lg' },
    { variant: 'body', size: 'xl', class: 'text-xl' },

    // Small variants
    { variant: 'small', size: 'xs', class: 'text-[10px]' },
    { variant: 'small', size: 'sm', class: 'text-xs' },
    { variant: 'small', size: 'md', class: 'text-sm' },
    { variant: 'small', size: 'lg', class: 'text-base' },
    { variant: 'small', size: 'xl', class: 'text-lg' },

    // Tiny variants
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
  ...props
}: {
  variant?: VariantProps<typeof textVariants>['variant']
  size?: VariantProps<typeof textVariants>['size']
  className?: string
  children: React.ReactNode
} & React.HtmlHTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(textVariants({ variant, size }), 'break-all', className)}
      {...props}
    >
      {children}
    </span>
  )
}

const Sample3 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'md',
      sidebarWidth = 25,
      printable = 'noPrint',
      className,
      iconSize = 'md',
      sidebarColor = '#8B8EBC',
      primaryColor = '#FFFFF',
      sidebarTextColor = '#463F3F',
      skillColor = '#262424',
      variantText = 'small',
      childrenClassName,
    },
    ref,
  ) => {
    const { data: setting } = useCVSettingStore()

    return (
      <>
        {/* PRINT STYLES */}
        <div ref={ref} className={cn(cvVariants({ size, scale }), className)}>
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            {/* BIOGRAPHY */}
            <div
              className="sidebar min-h-full lg:block"
              style={{
                width: `${sidebarWidth}%`,
                background: sidebarColor,
              }}
            >
              <div className="flex justify-center p-4 flex-col">
                {!!setting?.usingPicture && (
                  <Image
                    src={data?.profilePicture! || '/User.png'}
                    alt="profilePicture"
                    width={500}
                    height={500}
                    className="w-full h-full aspect-square p-0 flex items-center 
                             justify-center max-w-[200px] mx-auto lg:max-w-none rounded-full object-cover"
                    key={data?.profilePicture}
                    unoptimized
                  />
                )}

                {/* CONTACTS */}
                <div className="flex flex-col my-4">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    style={{ color: sidebarTextColor }}
                  >
                    CONTACTS
                  </CVText>
                  <div className="h-1.5 rounded-sm bg-[#403D3D]"></div>
                  <div className="grid my-2 gap-2">
                    {/* Phone/WhatsApp */}
                    {data?.contacts?.phone && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.phone}
                        </CVText>
                      </div>
                    )}

                    {/* Telegram */}
                    {data?.contacts?.telegram && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTelegram}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.telegram}
                        </CVText>
                      </div>
                    )}

                    {/* Email */}
                    {data?.contacts?.email && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.email}
                        </CVText>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {data?.contacts?.linkedin && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.linkedin}
                        </CVText>
                      </div>
                    )}

                    {/* Instagram */}
                    {data?.contacts?.instagram && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.instagram}
                        </CVText>
                      </div>
                    )}

                    {/* Otherwise (custom contact) */}
                    {data?.contacts?.otherwise && (
                      <div className="flex justify-start items-center gap-2">
                        <FontAwesomeIcon
                          icon={faLink}
                          className={cn(iconVariants({ iconSize }))}
                        />
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-light tracking-wide"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.otherwise.name}:{' '}
                          {data.contacts.otherwise.username}
                        </CVText>
                      </div>
                    )}
                  </div>
                </div>

                {/* SKILLS */}
                <div className="flex flex-col my-2">
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    style={{ color: sidebarTextColor }}
                  >
                    SKILLS
                  </CVText>
                  <div className="h-1.5 rounded-sm bg-[#403D3D]"></div>
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
                              className={`h-3.5 w-full border-none`}
                              style={{
                                background: ` ${
                                  Boolean(item?.isHasLevel) && index < item.level
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

            <div className="main-content lg:w-[75%] w-full">
              {/* DETAIL */}
              <div
                className="border-t-4 border-b-4 border-r-4 p-4"
                style={{ borderColor: sidebarColor }}
              >
                <div className="flex flex-col justify-center items-center gap-2">
                  <CVText variant="title" size={textSize}>
                    {`${data?.firstName.toUpperCase()} ${data?.lastName.toUpperCase()}`}
                  </CVText>
                  <div
                    className="h-2.5 w-1/4"
                    style={{ background: sidebarColor }}
                  ></div>
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="font-light"
                  >
                    {data?.role}
                  </CVText>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="flex w-full flex-col items-start my-2 py-2 pl-4">
                {/* PROFILE */}
                <div className="group flex gap-x-5 w-full">
                  <div className="relative">
                    <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                    <span
                      style={{
                        borderColor: sidebarColor,
                        color: sidebarColor,
                      }}
                      className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                    bg-white border-4
                                    font-extrabold text-lg"
                    >
                      1
                    </span>
                  </div>
                  <div className="pb-8 text-slate-600 w-full">
                    <div
                      style={{ background: sidebarColor }}
                      className="px-2 py-1 mt-1"
                    >
                      <CVText
                        variant="small"
                        size={textSize}
                        style={{ color: primaryColor }}
                        className="font-bold tracking-wide"
                      >
                        PROFILE
                      </CVText>
                    </div>
                    <CVText
                      variant="tiny"
                      size={textSize}
                      className="mt-2 font-light text-slate-600 px-2 text-justify block"
                    >
                      {data?.profile}
                    </CVText>
                  </div>
                </div>

                {/* EXPERIENCE */}
                <div className="group flex gap-x-5 w-full">
                  <div className="relative">
                    <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                    <span
                      style={{
                        borderColor: sidebarColor,
                        color: sidebarColor,
                      }}
                      className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                    bg-white border-4 
                                    font-extrabold text-lg"
                    >
                      2
                    </span>
                  </div>
                  <div className="pb-8 text-slate-600 w-full">
                    <div
                      style={{ background: sidebarColor }}
                      className="px-2 py-1 mt-1"
                    >
                      <CVText
                        variant="small"
                        size={textSize}
                        style={{ color: primaryColor }}
                        className="font-bold tracking-wide"
                      >
                        EXPERIENCE
                      </CVText>
                    </div>
                    <ul className="list-disc pl-5 my-2">
                      {data?.experience
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <li key={key}>
                            <div className="flex flex-col gap-1">
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-bold"
                              >
                                {`${item?.jobTitle} - ${item?.company}`}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="flex items-center font-medium text-gray-500"
                              >
                                {moment(item?.startDate).format(
                                  'MMMM, Do YYYY',
                                )}
                                <ChevronRight className="w-4 h-4 mx-1" />
                                {item?.isCurrent
                                  ? 'Current'
                                  : moment(item?.endDate).format(
                                      'MMMM, Do YYYY',
                                    )}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="mb-2 font-light text-gray-500 text-justify"
                              >
                                {item?.descJob}
                              </CVText>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="group flex gap-x-5 w-full">
                  <div className="relative">
                    {data?.certification && data?.certification.length > 1 && (
                      <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                    )}
                    <span
                      style={{
                        borderColor: sidebarColor,
                        color: sidebarColor,
                      }}
                      className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                    bg-white border-4 
                                    font-extrabold text-lg"
                    >
                      3
                    </span>
                  </div>
                  <div className="pb-8 text-slate-600 w-full">
                    <div
                      style={{ background: sidebarColor }}
                      className="px-2 py-1 mt-1"
                    >
                      <CVText
                        variant="small"
                        size={textSize}
                        style={{ color: primaryColor }}
                        className="font-bold tracking-wide"
                      >
                        EDUCATION
                      </CVText>
                    </div>

                    <ul className="list-disc pl-5 my-2">
                      {data?.education?.map((item: any, key: number) => (
                        <li key={key}>
                          <div className="flex flex-col gap-1">
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold"
                            >
                              {`${item?.degree} of ${item?.major} - ${item?.university.split('|')[0]}`}
                            </CVText>
                            {item?.graduatedStatus ? (
                              <>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="flex items-center font-medium text-gray-500"
                                >
                                  {`Graduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                                </CVText>
                                <CVText
                                  variant="tiny"
                                  size={textSize}
                                  className="font-normal text-gray-500"
                                >
                                  {`GPA: ${item?.gpa} - ${item?.gpaStatus}`}
                                </CVText>
                              </>
                            ) : (
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-normal text-gray-500"
                              >
                                Not Graduated Yet
                              </CVText>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CERTIFICATIONS */}
                {data?.certification && data?.certification.length > 1 && (
                  <div className="group flex gap-x-5 w-full">
                    <div className="relative">
                      <span
                        style={{
                          borderColor: sidebarColor,
                          color: sidebarColor,
                        }}
                        className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                    bg-white border-4 
                                    font-extrabold text-lg"
                      >
                        4
                      </span>
                    </div>
                    <div className="pb-8 text-slate-600 w-full">
                      <div
                        style={{ background: sidebarColor }}
                        className="px-2 py-1 mt-1"
                      >
                        <CVText
                          variant="small"
                          size={textSize}
                          style={{ color: primaryColor }}
                          className="font-bold tracking-wide"
                        >
                          CERTIFICATIONS
                        </CVText>
                      </div>

                      <ul className="space-y-0.5 list-disc pl-4 my-4">
                        {data?.certification?.map((item: any, key: number) => (
                          <li key={key}>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="block font-medium text-gray-600"
                            >
                              {`${item?.name} - ${item?.company}`}
                            </CVText>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)

export default Sample3
