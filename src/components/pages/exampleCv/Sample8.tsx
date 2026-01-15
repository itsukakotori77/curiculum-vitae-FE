import { CVProps } from '@/interface/curiculumVitae'
import { cn } from '@/utils/common'
import {
  faInstagram,
  faLinkedinIn,
  faTelegram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cva, VariantProps } from 'class-variance-authority'
import React, { forwardRef } from 'react'
import '@/assets/styles/exampleCurr/_example8.css'
import Badge from '@/components/globals/UI/Badge'
import moment from 'moment'

const cvVariants = cva(
  'w-full bg-white sample8-container shadow-lg print:shadow-none',
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

const Sample8 = forwardRef<HTMLDivElement, Sample>(
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
            <div className="flex flex-col gap-2 mt-20 px-6 w-full">
              {/* CONTACTS */}
              <div className="flex justify-evenly flex-wrap gap-1 w-full mb-4">
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
                      className="tracking-wide text-[12px] font-medium"
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
                      className="tracking-wide text-[12px] font-medium"
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
                      className="tracking-wide text-[12px] font-medium"
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
                      className="tracking-wide text-[12px] font-medium"
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
                      className="tracking-wide text-[12px] font-medium"
                      style={{ color: sidebarTextColor }}
                    >
                      {data.contacts.instagram}
                    </CVText>
                  </div>
                )}
              </div>

              <hr className="h-[2px] bg-gray-800" />

              {/* PROFILE AND NAME */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <CVText
                    variant="title"
                    size="lg"
                    className="font-bold uppercase"
                  >
                    {data?.firstName.toUpperCase()}
                  </CVText>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <CVText
                      variant="title"
                      size="lg"
                      className="font-bold uppercase"
                    >
                      {data?.lastName?.toUpperCase()}
                    </CVText>
                    <Badge className="flex justify-center items-center whitespace-nowrap bg-white border-2">
                      <CVText variant="small" size="sm" className="font-bold">
                        {data?.role}
                      </CVText>
                    </Badge>
                  </div>
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
                </div>
              </div>

              {/* SKILLS & EDUCATION */}
              <div className="grid grid-cols-2 gap-4">
                {/* EDUCATION */}
                <div className="flex flex-col w-full">
                  <div className="my-4">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-bold"
                    >
                      EDUCATIONS
                    </CVText>
                    <hr className="h-[2px] bg-gray-800 -mr-2" />
                  </div>

                  {data?.education
                    ?.toReversed()
                    ?.map((item: any, key: number) => (
                      <div className="flex justify-between mb-1" key={key}>
                        <div className="flex flex-col">
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-bold"
                          >
                            {`${item?.degree} in ${item?.major}`}
                          </CVText>

                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-medium"
                          >
                            {item?.university}
                          </CVText>
                        </div>
                        <div className="flex gap-0.5">
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-medium italic"
                          >
                            {` ${!!item?.graduatedStatus ? moment(item?.graduated).format('YYYY') : ''}`}
                          </CVText>
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-semibold italic"
                          >
                            {`${!!item?.graduatedStatus ? `(${item?.gpa})` : ''}`}
                          </CVText>
                        </div>
                      </div>
                    ))}
                </div>

                {/* SKILLS  */}
                <div className="flex flex-col w-full">
                  <div className="my-4">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-medium"
                    >
                      SKILLS
                    </CVText>
                    <hr className="h-[2px] bg-gray-800 -ml-2" />

                    <div className="flex gap-1 flex-wrap my-3">
                      {data?.skills?.map((item: any, key: number) => (
                        <div key={key}>
                          <Badge className="flex justify-center items-center whitespace-nowrap bg-white border-2">
                            <CVText
                              variant="tiny"
                              size="sm"
                              className="font-bold"
                            >
                              {item?.name}
                            </CVText>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* EXPEDIENCES */}
              <div className="flex flex-col gap-2">
                <CVText
                  variant="subtitle"
                  size={textSize}
                  className="font-bold"
                >
                  EXPERIENCES
                </CVText>
                <hr className="h-[2px] bg-gray-800" />

                <div className="grid grid-cols-2 gap-4">
                  {data?.experience
                    ?.toReversed()
                    ?.map((item: any, key: number) => (
                      <div className="flex flex-col gap-1" key={key}>
                        <CVText
                          variant="small"
                          size="sm"
                          className="font-bold text-sm"
                        >
                          {item?.jobTitle}
                        </CVText>
                        <CVText
                          variant="tiny"
                          size="sm"
                          className="font-medium italic"
                        >
                          {`${item?.company} / ${moment(item?.startDate).format('YYYY')} - ${
                            moment(item?.endDate).isAfter(moment()) ||
                            moment(item?.endDate).isSame(moment(), 'day')
                              ? 'Present'
                              : moment(item?.endDate).format('YYYY')
                          }`}
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="text-justify font-light"
                        >
                          {item?.descJob}
                        </CVText>
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

export default Sample8
