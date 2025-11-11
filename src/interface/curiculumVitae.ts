import { RgbaColor } from 'react-colorful'
import { LabelValueProps } from './select'

export interface IFilterCur {
  head?: LabelValueProps | any | null
  style?: LabelValueProps | any | null
}

export interface PastExperience {
  jobTitle: string
  company: string | null
  role?: string
  isCurrent: false
  startDate: Date | string
  endDate: Date | string
  descJob?: string
}

export interface CurrentExperience {
  jobTitle: string
  company: string | null
  role?: string
  startDate: Date | string
  isCurrent: true
  descJob?: string
}

// Create a union of the two experience types
export type Experience = PastExperience | CurrentExperience

export interface SkillsLevel {
  name: string
  isHasLevel: true
  level: number
}

export interface SkillsNonLevel {
  name: string
  isHasLevel: false
}

export type SkillsType = SkillsLevel | SkillsNonLevel

export interface ICurrVitae {
  // +=========+ STEP 1 +=========+ //
  firstName: string
  lastName: string
  nickname: string
  role: string
  profile: string
  profilePicture?: string

  // +=========+ STEP 2 +=========+ //
  experience: Array<Experience>

  // +=========+ STEP 3 +=========+ //
  education?: Array<{
    degree: string
    major?: string
    graduated?: Date | string
    graduatedStatus?: boolean
    university: string
    gpa?: string
    gpaStatus?: string
    majorDesc?: string
    gpaCheck?: boolean
  }>

  // +=========+ STEP 4 +=========+ //
  certification?: Array<{
    name: string
    company?: string
    certificateDate?: Date | string
    descCert?: string
  }>
  skills: Array<SkillsType>

  // +=========+ STEP 5 +=========+ //
  contacts: {
    address?: string
    phone: string
    email: string
    telegram?: string
    instagram?: string
    linkedin?: string
    otherwise?: {
      name: string
      username: string
    }
  }
}

export interface IColorCurr {
  sidebarColor: RgbaColor
  primaryColor: RgbaColor
  skillColor?: RgbaColor
  isUsingPhoto?: boolean | number
}

export interface CVProps {
  data?: ICurrVitae
  className?: string
  sidebarColor?: string
  primaryColor?: string
  sidebarTextColor?: string
  skillColor?: string
  config?: {
    sidebarWidth?: number
    responsiveSidebar?: boolean
    responsiveImage?: boolean
    mobileSidebarWidth?: number
    tabletSidebarWidth?: number
    mobileImageSize?: number
    tabletImageSize?: number
    desktopImageSize?: number
  }
}

export interface IGeneratorStep1 {
  firstName: string | any
  lastName: string | any
  nickname: string | any
  role: string | any
  profile: string | any
  profilePicture?: string | null
  fileId?: number | string
}

export interface IGeneratorStep2 {
  jobTitle: string | any
  company: string | any
  role: string | any
  isCurrent: boolean | any
  date: Date[] | string[]
  descJob?: string | any
}

export interface IGeneratorStep3 {
  degree: string | any
  major: string | any
  graduatedStatus: boolean | string | any
  graduated?: Date | string | any
  university: string | any
  gpa?: string | null | any
  gpaStatus?: string | null | any
  majorDesc?: string | null | any
}

export interface IGeneratorStep4 {
  certificateName: string | any
  company?: string | null | any
  certificateDate?: Date | string | null | any
  skillName: string | null | any
  isHasLevel: boolean | null | any
  level: number | null | any
}

export interface IGeneratorStep5 {
  address?: string
  phone: string
  email: string
  telegram?: string
  instagram?: string
  linkedin?: string
  otherwise?: {
    name: string
    username: string
  }
}

export interface ISettingCurr {
  id?: number
  sidebarColor?: RgbaColor
  primaryColor?: RgbaColor
  skillColor?: RgbaColor
  usingPicture?: boolean | number
}

export interface CVStep1Store {
  data: IGeneratorStep1 | undefined | null
  updateData: (data: IGeneratorStep1) => void
  clearData: () => void
}

export interface storeFormStep<T> {
  add: (data: T) => void
  update: (index: number, data: T) => void
  remove: (index: number) => void
  currentEditIndex: number | null
  setEditIndex: (index: number | null) => void
  clearData: () => void
}

export interface CVStep2Store extends storeFormStep<IGeneratorStep2> {
  experiences: IGeneratorStep2[] | undefined
}

export interface CVStep3Store extends storeFormStep<IGeneratorStep3> {
  educations: IGeneratorStep3[] | undefined
}

export interface CVStep4Store extends storeFormStep<IGeneratorStep4> {
  skills: IGeneratorStep4[] | undefined
}

export interface CVStep5Store {
  contacts: IGeneratorStep5 | any
  update: (val: IGeneratorStep5) => void
}

export interface CVSettingStore {
  data: ISettingCurr | null | undefined
  updateData: (data: ISettingCurr) => void
  clearData: () => void
}

export interface CVNavigationStore {
  currentStep: number
  showForm: boolean
  maxStep: number
  setCurrentStep: (step: number) => void
  setShowForm: (show: boolean) => void
  nextStep: () => void
  previousStep: () => void
}
