import React, { forwardRef } from 'react'
import '@/assets/styles/exampleCurr/_example2.css'
import { CVProps } from '@/interface/curiculumVitae'
import moment from 'moment'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/common'
import { useCVSettingStore } from '@/utils/store'

// Define variants using CVA
const cvVariants = cva(
  // Base classes
  'flex flex-col gap-3 w-full bg-white shadow-lg sample2-container print:shadow-none',
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
          'print:py-0',
          'print:px-0',
          'flex-col',
        ],
        noPrint: [
          'min-h-screen',
          'flex',
          'justify-center',
          'items-start',
          'flex-col',
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

// Section header component for consistency
const SectionHeader = ({
  children,
  textSize = 'md',
}: {
  children: React.ReactNode
  textSize?: VariantProps<typeof textVariants>['size']
}) => (
  <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
    <CVText variant="body" size={textSize} className="font-bold">
      {children}
    </CVText>
  </div>
)

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

const Sample2 = forwardRef<HTMLDivElement, Sample>(
  (
    {
      data,
      size = 'md',
      scale = 'md',
      textSize = 'md',
      printable = 'noPrint',
      className,
      iconSize = 'md',
      sidebarColor = '#E3E9EF',
      primaryColor = '#5977AC',
      sidebarTextColor = '#463F3F',
      skillColor = '#262424',
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
    const { data: setting } = useCVSettingStore()

    // Safely handle potential undefined data
    if (!data) {
      return (
        <div className="flex items-center justify-center h-64">
          <CVText variant="body" size={textSize} className="text-gray-500">
            No CV data available
          </CVText>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          cvVariants({ size, scale }),
          'origin-top',
          className,
          childrenClassName,
        )}
        style={{
          transformOrigin: 'top center',
          marginBottom: scale === 'xs' || scale === 'sm' ? '10vh' : '0',
        }}
      >
        {/* BIOGRAPHY MAIN */}
        <div className="flex flex-col w-full">
          <div className="flex justify-center flex-col items-center w-full">
            <CVText variant="title" size={textSize} className="tracking-wide">
              {`${data?.firstName?.toUpperCase() || ''} ${data?.lastName?.toUpperCase() || ''}`}
            </CVText>
            <CVText
              variant="subtitle"
              size={textSize}
              className="font-medium tracking-wide"
            >
              {data?.role || ''}
            </CVText>
            <CVText
              variant="small"
              size={textSize}
              className="font-medium tracking-normal whitespace-normal text-center"
            >
              {data?.contacts?.address || ''}
            </CVText>
          </div>

          <div className="flex justify-evenly">
            <CVText variant="body" size={textSize} className="font-bold">
              {data?.contacts?.email || ''}
            </CVText>
            <CVText variant="body" size={textSize} className="font-bold">
              {data?.contacts?.phone || ''}
            </CVText>
          </div>
        </div>

        <hr className="h-[3px] bg-black w-full" />

        {/* SUMMARY */}
        <div className="flex flex-col w-full gap-3">
          <SectionHeader textSize={textSize}>SUMMARY</SectionHeader>
          <CVText
            variant="tiny"
            size={textSize}
            className="text-justify break-all"
          >
            {data?.profile || ''}
          </CVText>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col w-full gap-3">
          <SectionHeader textSize={textSize}>EXPERIENCE</SectionHeader>
          <ul className="list-none">
            {data?.experience?.toReversed().map((item: any, key: number) => (
              <li key={key} className="grid gap-2 mb-3">
                <div className="flex items-end justify-between">
                  <CVText variant="small" size={textSize} className="font-bold">
                    {`${item?.jobTitle || ''}, ${item?.company || ''}`}
                  </CVText>
                  <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                  <CVText
                    variant="small"
                    size={textSize}
                    className="font-medium"
                  >
                    {`${moment(item?.startDate).format('MMMM, Do YYYY')} - ${item?.isCurrent ? 'Current' : moment(item?.endDate).format('MMMM, Do YYYY')}`}
                  </CVText>
                </div>
                <CVText
                  variant="tiny"
                  size={textSize}
                  className="font-light text-justify"
                >
                  {item?.descJob || ''}
                </CVText>
              </li>
            ))}
          </ul>
        </div>

        {/* EDUCATION */}
        <div className="flex flex-col w-full gap-3">
          <SectionHeader textSize={textSize}>EDUCATION</SectionHeader>
          <ul className="list-none">
            {data?.education?.map((item: any, key: number) => (
              <li key={key} className="grid gap-2 mb-3">
                <div className="flex items-end justify-between">
                  <CVText variant="small" size={textSize} className="font-bold">
                    {`${item?.major || ''}, ${item?.university?.split('|')[1] || item?.university || ''}`}
                  </CVText>
                  <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                  {item?.graduatedStatus ? (
                    <CVText
                      variant="small"
                      size={textSize}
                      className="font-medium"
                    >
                      {`Graduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                    </CVText>
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
                <CVText
                  variant="tiny"
                  size={textSize}
                  className="font-light text-justify"
                >
                  {item?.majorDesc || ''}
                </CVText>
              </li>
            ))}
          </ul>
        </div>

        {/* SKILLS */}
        <div className="flex flex-col w-full gap-3">
          <SectionHeader textSize={textSize}>SKILLS</SectionHeader>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {data?.skills?.map((item: any, key: number) => (
              <div key={key} className="flex items-end justify-between">
                <CVText variant="small" size={textSize} className="font-normal">
                  {item?.name || ''}
                </CVText>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

Sample2.displayName = 'Sample2'

export default Sample2
