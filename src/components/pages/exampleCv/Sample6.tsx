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
import '@/assets/styles/exampleCurr/_example6.css'

const cvVariants = cva(
  'w-full bg-white sample6-container shadow-lg print:shadow-none',
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

const Sample6 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'lg',
      sidebarColor = '#FFFFF',
      primaryColor = '#97C2C6',
      sidebarTextColor = '#FFFFF',
      skillColor = '#97C2C6',
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
        <div ref={ref} className={cn(cvVariants({ size, scale }), className)}>
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            <div className="flex flex-col min-w-full gap-1 p-7">
              <CVText
                variant="title"
                size="lg"
                className="uppercase font-stretch-expanded font-[times-new-roman]"
              >
                {`${data?.firstName} ${data?.lastName}`}
              </CVText>
              <CVText variant="body" size="lg">
                {data?.role}
              </CVText>
              <CVText
                variant="body"
                size={textSize}
                as="p"
                className="text-justify font-extralight my-4"
              >
                {data?.profile}
              </CVText>

              {/* CONTACTS */}
              <div
                className="flex gap-2 justify-evenly -mx-7 px-2 py-2 mb-4"
                style={{ background: primaryColor }}
              >
                {/* Phone/WhatsApp */}
                {data?.contacts?.phone && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarColor }}
                    >
                      {data.contacts.phone}
                    </CVText>
                  </div>
                )}

                {/* Telegram */}
                {data?.contacts?.telegram && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faTelegram}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarColor }}
                    >
                      {data.contacts.telegram}
                    </CVText>
                  </div>
                )}

                {/* Email */}
                {data?.contacts?.email && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarColor }}
                    >
                      {data.contacts.email}
                    </CVText>
                  </div>
                )}

                {/* LinkedIn */}
                {data?.contacts?.linkedin && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarColor }}
                    >
                      {data.contacts.linkedin}
                    </CVText>
                  </div>
                )}

                {/* Instagram */}
                {data?.contacts?.instagram && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarColor }}
                    >
                      {data.contacts.instagram}
                    </CVText>
                  </div>
                )}

                {/* Otherwise (custom contact) */}
                {data?.contacts?.otherwise && (
                  <div className="flex justify-start items-center gap-1">
                    <FontAwesomeIcon
                      icon={faLink}
                      className={cn(iconVariants({ iconSize }))}
                    />
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium tracking-wide "
                      style={{ color: sidebarTextColor }}
                    >
                      {data.contacts.otherwise.name}:{' '}
                      {data.contacts.otherwise.username}
                    </CVText>
                  </div>
                )}
              </div>

              <div className="flex w-full gap-4">
                {/* EXPERIENCE */}
                <div className="w-1/2">
                  <CVText
                    variant="body"
                    size="lg"
                    className="font-extrabold font-[times-new-roman]"
                  >
                    WORK EXPERIENCE
                  </CVText>

                  {data?.experience
                    ?.toReversed()
                    ?.map((item: any, key: number) => (
                      <div className="flex flex-col gap-1.5" key={key}>
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
                          className="font-medium"
                        >
                          {item?.company}
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light italic"
                          as="p"
                        >
                          {`${moment(item?.startDate).format('DD/MM/YYYY')} - ${moment(item?.endDate).format('DD/MM/YYYY')}`}
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className=" text-justify font-medium mb-2"
                        >
                          {item?.descJob}
                        </CVText>
                      </div>
                    ))}
                </div>

                {/* SKIILS */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-col">
                    <CVText
                      variant="body"
                      size="lg"
                      className="font-extrabold font-[times-new-roman]"
                    >
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
                                  {Array.from(
                                    { length: item?.level },
                                    (_, index) => (
                                      <div
                                        key={index}
                                        className="h-3 w-full border-none"
                                        style={{
                                          background:
                                            index < item.level
                                              ? skillColor
                                              : '',
                                        }}
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                            ),
                        )}
                      </div>

                      {/* Skills without levels - wrapped badges */}
                      <div className="flex flex-wrap gap-2">
                        {data?.skills?.map(
                          (item: any, key: number) =>
                            !item?.isHasLevel && (
                              <div
                                key={key}
                                className="px-2 py-0.5 rounded-sm"
                                style={{ backgroundColor: skillColor }}
                              >
                                <CVText
                                  variant="small"
                                  size={textSize}
                                  className="font-medium"
                                  style={{ color: sidebarColor }}
                                >
                                  {item?.name}
                                </CVText>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* EDUCATION */}
                  <div className="flex flex-col">
                    <CVText
                      variant="body"
                      size="lg"
                      className="font-extrabold font-[times-new-roman]"
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

                  {/* CERTIFICATE */}
                  <div className="flex flex-col">
                    <CVText
                      variant="body"
                      size="lg"
                      className="font-extrabold font-[times-new-roman]"
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

Sample6.displayName = 'Sample6'

export default Sample6
