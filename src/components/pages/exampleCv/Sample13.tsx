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
import '@/assets/styles/exampleCurr/_example13.css'
import moment from 'moment'
import Image from 'next/image'
import { useCVSettingStore } from '@/utils/store'

const cvVariants = cva(
  'w-full bg-white sample13-container shadow-lg print:shadow-none bg-[#FEF7E3]',
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

const Sample13 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'sm',
      printable = 'noPrint',
      className,
      iconSize = 'sm',
      sidebarColor = '#F4EBD9',
      primaryColor = '#FFB1AC',
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
          <div
            className={cn(cvVariants({ printable }), childrenClassName)}
            style={{
              transformOrigin: 'top center',
              marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
            }}
          >
            <div className="flex flex-col gap-1 w-full">
              {/* FULLNAME + IMAGE */}
              <div className="flex flex-row gap-2 p-4 px-12">
                <div className="w-[70%] px-2 py-5">
                  <div className="flex flex-col gap-1">
                    <CVText
                      variant="title"
                      size="lg"
                      className="font-black uppercase"
                    >
                      {data?.firstName}
                    </CVText>
                    <CVText
                      variant="title"
                      size="lg"
                      className="font-black uppercase"
                    >
                      {data?.lastName}
                    </CVText>
                    <div className="bg-black h-0.5 w-full my-2" />
                    <CVText
                      variant="subtitle"
                      size="md"
                      className="font-semibold uppercase"
                    >
                      {data?.role}
                    </CVText>
                  </div>
                </div>
                <div className="w-[30%]">
                  <div className="flex flex-col gap-1">
                    {!!setting?.usingPicture && (
                      <div className="flex justify-center items-center flex-col">
                        {/* Image Container */}
                        <Image
                          src={data?.profilePicture || '/User.png'}
                          alt="user"
                          width={600}
                          height={600}
                          className="object-cover"
                          style={
                            config.responsiveImage
                              ? {
                                  width: `${config.mobileImageSize}px`,
                                  height: `${config.mobileImageSize}px`,
                                  borderColor: sidebarColor,
                                }
                              : {
                                  width: '100%',
                                  height: '280px',
                                  borderColor: sidebarColor,
                                }
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SKILLS & EXPERIENCES */}
              <div className="flex flex-row relative">
                <div
                  className="w-[35%] pl-6 absolute left-0 top-0 pb-8"
                  style={{ background: primaryColor }}
                >
                  {/* EDUCATION */}
                  <div className="flex flex-col gap-2 px-4 py-2 mt-6">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="uppercase font-bold"
                    >
                      My Education
                    </CVText>

                    {data?.education
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <div className="flex flex-col gap-1" key={key}>
                          <CVText
                            variant="tiny"
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
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="flex items-center font-light"
                          >
                            {`Graduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                          </CVText>
                        </div>
                      ))}
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="uppercase font-bold"
                    >
                      My Skills
                    </CVText>

                    <ul className="pl-1">
                      {data?.skills?.map((item: any, key: number) => (
                        <li
                          className="relative pl-4
                            before:absolute before:left-0 before:top-3.5
                            before:w-1 before:h-px before:bg-black"
                          key={key}
                        >
                          <CVText
                            variant="tiny"
                            size={textSize}
                            className="font-light"
                          >
                            {item?.name}
                          </CVText>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CONTACTS */}
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <CVText
                      variant="subtitle"
                      size={textSize}
                      className="uppercase font-bold"
                    >
                      My Contacts
                    </CVText>
                    <div className="w-full flex flex-col gap-2 -ml-1">
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
                  </div>
                </div>
                <div
                  className="w-[90%] ml-[5%] p-6 grid gap-3"
                  style={{ background: sidebarColor, marginTop: '2rem' }}
                >
                  <div className="ml-[35%] flex flex-col gap-4">
                    {/* PROFILE */}
                    <div className="flex flex-col gap-1">
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="uppercase font-bold"
                      >
                        My Profile
                      </CVText>
                      <CVText
                        variant="tiny"
                        size={textSize}
                        className="font-light text-justify"
                      >
                        {data?.profile}
                      </CVText>
                    </div>

                    {/* EXPERIENCES */}
                    <div className="flex flex-col gap-1">
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="uppercase font-bold"
                      >
                        My Experiences
                      </CVText>

                      {data?.experience
                        ?.toReversed()
                        ?.map((item: any, key: number) => (
                          <div className="flex flex-col gap-1 my-2" key={key}>
                            <CVText
                              variant="tiny"
                              size={textSize}
                              className="font-bold"
                            >
                              {`${moment(item?.startDate).format('YYYY')} - ${
                                moment(item?.endDate).isAfter(moment()) ||
                                moment(item?.endDate).isSame(moment(), 'day')
                                  ? 'Present'
                                  : moment(item?.endDate).format('YYYY')
                              } / ${item?.jobTitle}`}
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
                              className="font-light text-justify"
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
          </div>
        </div>
      </>
    )
  },
)

export default Sample13
