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
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import '@/assets/styles/exampleCurr/_example5.css'

const cvVariants = cva(
  'w-full bg-white sample5-container shadow-lg print:shadow-none',
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

const Sample5 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'lg',
      sidebarColor = '#F6F1FF',
      primaryColor = '#000000',
      sidebarTextColor = '#FFFFF',
      skillColor = '#000000',
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
      },
    },
    ref,
  ) => {
    return (
      <>
        <div ref={ref} className={cn(cvVariants({ size, scale }))}>
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            <div className="flex flex-col min-w-full gap-2 px-6">
              <div
                className="p-7 -mx-6  flex flex-col gap-2"
                style={{ background: sidebarColor }}
              >
                {/* NAME & ROLE & PROFILE */}
                <div
                  className="flex w-full p-2 border-2 "
                  style={{ borderColor: primaryColor }}
                >
                  <div
                    className="flex flex-col border-r-2 -m-2 py-2 px-4 lg:w-[30%]"
                    style={{ borderColor: primaryColor }}
                  >
                    <CVText variant="title" size={textSize}>
                      {data?.firstName}
                    </CVText>
                    <CVText variant="title" size={textSize}>
                      {data?.lastName}
                    </CVText>
                    {/* ROLE */}
                    <div
                      className="border-t-2 -mx-4 py-2 px-4"
                      style={{ borderColor: primaryColor }}
                    >
                      <CVText variant="body" size={textSize}>
                        {data?.role}
                      </CVText>
                    </div>
                  </div>
                  <div
                    className="px-4 py-2 flex-1 lg:w-[70%] text-justify leading-4"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    <CVText variant="tiny" size={textSize}>
                      {data?.profile}
                    </CVText>
                  </div>
                </div>

                {/* CONTACTS */}
                <div
                  className="flex w-full p-2 border-2 gap-2 justify-evenly"
                  style={{ borderColor: primaryColor }}
                >
                  {/* Phone/WhatsApp */}
                  {data?.contacts?.phone && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Phone
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.phone}
                        </CVText>
                      </div>
                    </div>
                  )}

                  {/* Telegram */}
                  {data?.contacts?.telegram && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faTelegram}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Telegram
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.telegram}
                        </CVText>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {data?.contacts?.email && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Email
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.email}
                        </CVText>
                      </div>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {data?.contacts?.linkedin && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Linkedin
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.linkedin}
                        </CVText>
                      </div>
                    </div>
                  )}

                  {/* Instagram */}
                  {data?.contacts?.instagram && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Instagram
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.instagram}
                        </CVText>
                      </div>
                    </div>
                  )}

                  {/* Otherwise (custom contact) */}
                  {data?.contacts?.otherwise && (
                    <div className="flex justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLink}
                        className={cn(iconVariants({ iconSize }))}
                      />
                      <div className="flex flex-col">
                        <CVText
                          variant={variantText}
                          size={textSize}
                          className="font-bold tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          Other
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide "
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.otherwise.name}:{' '}
                          {data.contacts.otherwise.username}
                        </CVText>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                {/* SKILL & EDUCATION */}
                <div className="w-[30%] flex flex-col gap-2">
                  {/* EDUCATION  */}
                  <div
                    className="py-3 px-2 w-full"
                    style={{
                      borderColor: primaryColor,
                    }}
                  >
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-extrabold"
                    >
                      EDUCATION
                    </CVText>

                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex flex-col gap-1 my-1" key={key}>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="font-semibold"
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
                          {item?.graduatedStatus ? (
                            <>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="flex items-center font-medium"
                              >
                                {`${moment(item?.graduated).format('YYYY')}`}
                              </CVText>
                              <CVText
                                variant="tiny"
                                size={textSize}
                                className="font-normal"
                              >
                                {`${item?.gpa} - ${item?.gpaStatus}`}
                              </CVText>
                            </>
                          ) : (
                            <CVText
                              variant="small"
                              size={textSize}
                              className="font-normal"
                            >
                              Not Graduated Yet
                            </CVText>
                          )}
                        </div>
                      ))}
                  </div>

                  <hr
                    className="h-0.5 rounded-x"
                    style={{ background: primaryColor }}
                  />

                  {/* Skills */}
                  <div
                    className="py-3 px-2 w-full"
                    style={{ borderColor: primaryColor }}
                  >
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-extrabold"
                    >
                      SKILLS
                    </CVText>

                    <div className="flex flex-col gap-2">
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
                            {/* LEVEL */}
                            {Array.from({ length: 5 }, (_, index) => (
                              <div
                                key={index}
                                className={`h-2 w-full border-none relative`}
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
                                        className="absolute w-[4px] h-4 -top-1"
                                        style={{ background: skillColor }}
                                      ></div>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-[70%]">
                  {/* EXPERIENCES */}
                  <div className="p-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-extrabold"
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
                              className=" text-justify font-medium"
                            >
                              {item?.descJob}
                            </CVText>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* CERTIFICATIONS   */}
                  <div className="p-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="font-extrabold"
                    >
                      CERTIFICATIONS  
                    </CVText>
                    <div className="p-0 my-4 flex flex-col gap-3">
                      {data?.certification
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex flex-col gap-2" key={key}>
                            <div className="flex justify-between">
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-bold"
                              >
                                {item?.name}
                              </CVText>
                              <CVText
                                variant="small"
                                size={textSize}
                                className="font-normal"
                              >
                              {`${item?.company} | ${moment(item?.certificateDate).format('YYYY')}`}
                              </CVText>
                            </div>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className=" text-justify font-medium"
                            >
                              {item?.descCert}
                            </CVText>
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

Sample5.displayName = 'Sample5'

export default Sample5
