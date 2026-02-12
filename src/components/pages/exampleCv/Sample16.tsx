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
import '@/assets/styles/exampleCurr/_example16.css'
import moment from 'moment'
import Badge from '@/components/globals/UI/Badge'

const cvVariants = cva(
  'w-full bg-white sample15-container shadow-lg print:shadow-none',
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

const Sample16 = forwardRef<HTMLDivElement, Sample>(
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
      primaryColor = '#83DCD3',
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
            <div className="flex flex-col gap-2 w-full">
              <div className="grid grid-cols-[7fr_3fr] py-4 gap-4">
                <div className="flex flex-col">
                  {/* FULLNAME */}
                  <div className="flex gap-2">
                    <div
                      className="w-1/3"
                      style={{ background: primaryColor }}
                    />
                    <div className="grid place-content-center">
                      <CVText
                        variant="title"
                        size="lg"
                        className="font-bold"
                      >{`${data?.firstName.toUpperCase()} ${data?.lastName.toUpperCase()}`}</CVText>
                      <CVText
                        variant="subtitle"
                        size={textSize}
                        className="font-normal"
                      >
                        {data?.role}
                      </CVText>
                    </div>
                  </div>

                  <div className="flex flex-col p-4">
                    <CVText
                      variant="body"
                      size="lg"
                      className="font-bold uppercase"
                    >
                      Profile
                    </CVText>
                    <CVText
                      variant="tiny"
                      size={textSize}
                      className="font-light text-justify"
                    >
                      {data?.profile}
                    </CVText>
                  </div>
                </div>

                {/* CONTACTS */}
                <div className="w-full flex flex-col ">
                  {/* Phone/WhatsApp */}
                  {data?.contacts?.phone && (
                    <div className="flex justify-start items-center gap-1.5">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className={cn(iconVariants({ iconSize }), 'py-4')}
                        style={{ background: primaryColor }}
                      />
                      <div className="grid">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-bold tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          Phone
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
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
                        className={cn(iconVariants({ iconSize }), 'py-4')}
                        style={{ background: primaryColor }}
                      />
                      <div className="grid">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-bold tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          Telegram
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
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
                        className={cn(iconVariants({ iconSize }), 'py-4')}
                        style={{ background: primaryColor }}
                      />
                      <div className="grid">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-bold tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          Email
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
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
                        className={cn(iconVariants({ iconSize }), 'py-4')}
                        style={{ background: primaryColor }}
                      />
                      <div className="grid">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-bold tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          LinkedIn
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
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
                        className={cn(iconVariants({ iconSize }), 'py-4')}
                        style={{ background: primaryColor }}
                      />
                      <div className="grid">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-bold tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          Instagram
                        </CVText>
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light tracking-wide text-[10px]"
                          style={{ color: sidebarTextColor }}
                        >
                          {data.contacts.instagram}
                        </CVText>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-neutral-400 mx-4" />

              {/* EDUCATIONS */}
              <div className="px-4">
                <CVText
                  variant="body"
                  size="lg"
                  className="font-bold uppercase"
                >
                  Educations
                </CVText>
                <div className="grid grid-cols-3 gap-3 w-full my-3">
                  {data?.education
                    ?.toReversed()
                    ?.splice(0, 3)
                    ?.map((item: any, key: number) => (
                      <div key={key} className="flex gap-2">
                        <div className="grid">
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
                            className="font-semibold"
                          >
                            {moment(item?.graduated).format('YYYY')}
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
                            className="font-light text-justify"
                          >
                            {item?.majorDesc}
                          </CVText>
                        </div>

                        {/* Divider - only show if not the last item */}
                        {key < 2 && (
                          <div className="bg-neutral-400 w-2 h-full mx-2" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-neutral-400 mx-4" />

              {/* EXPERIENCES */}
              <div className="px-4">
                <CVText
                  variant="body"
                  size="lg"
                  className="font-bold uppercase"
                >
                  Experiences
                </CVText>
                
                {data?.experience
                  ?.toReversed()
                  ?.map((item: any, key: number) => (
                    <div className="flex gap-2 w-full my-4" key={key}>
                      <div className="flex flex-col shrink-0 w-1/4">
                        <CVText
                          variant="small"
                          size={textSize}
                          className="font-semibold"
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
                          className="font-medium"
                        >
                          {`${moment(item?.startDate).format('YYYY')}-${item?.isCurrent == true 
                            ? 'Present' 
                            : moment(item?.endDate).format('YYYY')}`}
                        </CVText>
                      </div>
                      <div className="flex px-4 min-w-0">
                        <CVText
                          variant="tiny"
                          size={textSize}
                          className="font-light text-justify"
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
      </>
    )
  },
)

export default Sample16
