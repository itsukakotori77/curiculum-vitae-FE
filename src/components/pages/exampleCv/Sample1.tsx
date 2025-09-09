import { cva, type VariantProps } from 'class-variance-authority'
import { CVProps } from '@/interface/curiculumVitae'
import { BookCheck, ChevronRight, User } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLink,
  faMapPin,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/utils/common'
import moment from 'moment'
import {
  faInstagram,
  faLinkedinIn,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import '@/assets/styles/exampleCurr/_example1.css'
import { forwardRef } from 'react'

// Define variants using CVA
const cvVariants = cva(
  // Base classes
  'flex w-full bg-white shadow-lg min-h-fit print:shadow-none',
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
        ],
        noPrint: [
          'min-h-screen',
          'flex',
          'justify-center',
          'items-start',
        ],
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

// Helper component for consistent text styling
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
} & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(textVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  )
}

interface Sample extends CVProps {
  size?: VariantProps<typeof cvVariants>['size']
  scale?: VariantProps<typeof cvVariants>['scale']
  textSize?: VariantProps<typeof textVariants>['size']
  printable?: VariantProps<typeof cvVariants>['printable']
}

const Sample1 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'md',
      sidebarWidth = 25,
      printable = 'print',
      className,
      sidebarColor = '#E3E9EF',
      primaryColor = '#5977AC',
      skillColor = '',
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(cvVariants({ printable }))}>
        <div
          className={cn(
            cvVariants({ size, scale }),
            'origin-top',
            className,
          )}
          style={{
            transformOrigin: 'top center',
            marginBottom:
              scale === 'xs' || scale === 'sm' ? '10vh' : '0',
          }}
        >
          {/* BIOGRAPHY SIDEBAR */}
          <div
            className="sidebar min-h-full lg:block"
            style={{
              width: `${sidebarWidth}%`,
              background: sidebarColor,
            }}
          >
            <div className="flex justify-center">
              <div className="w-full aspect-square p-4 border border-black flex items-center justify-center max-w-[200px] mx-auto lg:max-w-none">
                <User className="w-3/4 h-3/4" />
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col p-4 gap-y-2">
              <CVText
                variant="subtitle"
                size={textSize}
                style={{ color: primaryColor }}
              >
                CONTACTS
              </CVText>

              {/* Phone */}
              {data?.contacts?.phone && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.phone}
                  </CVText>
                </div>
              )}

              {/* Email */}
              {data?.contacts?.email && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.email}
                  </CVText>
                </div>
              )}

              {/* Address/Location - if you add this to your contacts interface */}
              {/* {data?.contacts?.address && (
              <div className="flex flex-row gap-2 items-center w-full justify-start">
                <FontAwesomeIcon icon={faMapPin} className="text-[17px] text-gray-700 w-6" />
                <span className="font-semibold text-[12px] text-gray-500 line-clamp-1">
                  {data.contacts.address}
                </span>
              </div>
            )} */}

              {/* LinkedIn */}
              {data?.contacts?.linkedin && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.linkedin}
                  </CVText>
                </div>
              )}

              {/* Telegram */}
              {data?.contacts?.telegram && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.telegram}
                  </CVText>
                </div>
              )}

              {/* Instagram */}
              {data?.contacts?.instagram && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.email}
                  </CVText>
                </div>
              )}

              {/* Otherwise (custom contact) */}
              {data?.contacts?.otherwise && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon
                    icon={faLink}
                    className="text-[17px] text-gray-700 w-6"
                  />
                  <CVText
                    variant="tiny"
                    size={textSize}
                    className="font-semibold text-gray-500"
                  >
                    {data.contacts.email}
                  </CVText>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <hr className="h-[3px] bg-[#5C74A5] mx-3 rounded" />
            <div className="flex flex-col p-4">
              <CVText
                variant="subtitle"
                size={textSize}
                style={{ color: primaryColor }}
              >
                PROFILE
              </CVText>
              <CVText
                variant="tiny"
                size={textSize}
                className="font-light leading-relaxed mt-2 break-all"
              >
                {data?.profile}
              </CVText>
            </div>

            {/* SKILLS */}
            <hr className="h-[3px] bg-[#5C74A5] mx-3 rounded" />
            <div className="flex flex-col p-4">
              <CVText
                variant="subtitle"
                size={textSize}
                style={{ color: primaryColor }}
              >
                SKILL LEVELS
              </CVText>
              <ul className="list-none px-1 py-2 flex flex-col gap-3">
                {data?.skills?.map((item: any, key: number) => (
                  <li key={key}>
                    <div className="flex flex-col gap-2">
                      <CVText
                        variant="small"
                        size={textSize}
                        className="font-normal"
                      >
                        {item?.name}
                      </CVText>
                      <div className="grid grid-cols-5 gap-0.5">
                        {Array.from(
                          { length: item?.level },
                          (_, index) => (
                            <div
                              key={index}
                              className={`h-4 rounded-sm`}
                              style={{
                                background: `${
                                  item.isHasLevel &&
                                  index < item.level
                                    ? skillColor
                                    : '#99a1af'
                                }`,
                              }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div
            className="main-content bg-white px-6 py-6 lg:px-8 lg:py-8"
            style={{ width: `${100 - sidebarWidth}%` }}
          >
            <div className="flex flex-col gap-1 mb-6">
              <CVText
                variant="title"
                size={textSize}
                className="text-[#5977AC]"
              >
                {`${data?.firstName} ${data?.lastName}`}
              </CVText>
              <CVText
                variant="subtitle"
                size={textSize}
                className="text-black"
              >
                {data?.role.toUpperCase()}
              </CVText>
            </div>

            {/* TIMELINE */}
            <div className="flex my-4 mx-2">
              <ol className="relative border-s border-gray-200">
                {/* EXPERIENCE */}
                <li className="mb-8 ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                    <BookCheck className="text-blue-800 w-4 h-4" />
                  </span>
                  <CVText
                    variant="subtitle"
                    size={textSize}
                    className="flex items-center mb-3 text-gray-900"
                  >
                    Experience
                  </CVText>

                  <ul className="space-y-4 list-disc pl-4">
                    {data?.experience
                      ?.toReversed()
                      ?.map((item: any, key: number) => (
                        <li key={key}>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="block mb-2 font-bold leading-none text-gray-600"
                          >
                            {`${item?.jobTitle} - ${item?.company}`}
                          </CVText>
                          <CVText
                            variant="small"
                            size={textSize}
                            className="flex items-center mb-2 font-medium leading-none text-gray-500"
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
                            variant="small"
                            size={textSize}
                            className="mb-2 font-normal text-gray-500 leading-relaxed"
                          >
                            {item?.descJob}
                          </CVText>
                        </li>
                      ))}
                  </ul>
                </li>

                {/* Education and Certifications sections follow similar pattern... */}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default Sample1
// Usage examples:
// <Sample data={cvData} size="lg" scale="md" textSize="sm" />
// <Sample data={cvData} size="xl" scale="lg" textSize="lg" />
// <Sample data={cvData} size="sm" scale="xs" textSize="xs" />
