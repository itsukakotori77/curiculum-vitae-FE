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
  }>

  // +=========+ STEP 4 +=========+ //
  certification?: Array<{
    name: string
    company?: string
    certificate_date?: Date | string
  }>

  // +=========+ STEP 5 +=========+ //
  skills: Array<SkillsType>
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
}

export interface CVProps {
  data?: ICurrVitae
  sidebarWidth?: number
  className?: string
  sidebarColor?: string
  primaryColor?: string
  sidebarTextColor?: string
  skillColor?: string
}

export interface IGeneratorStep1 {
  firstName: string | any
  lastName: string | any
  nickname: string | any
  role: string | any
  profile: string | any
  // profilePicture?: string | null
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
  name: string | any
  company?: string | any
  certificate_date?: Date | string | any
}

export interface IGeneratorStep5 {
  // SKILLS
  skills: Array<SkillsType>

  // CONTACTS
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

export interface CVStep1Store {
  data: IGeneratorStep1 | undefined
  updateData: (data: IGeneratorStep1) => void
  clearData: () => void
}

export interface storeFormStep<T> {
  add: (data: T) => void
  update: (index: number, data: T) => void 
  remove: (index: number) => void 
  setEditIndex: (index: number | null) => void  
  clearData: () => void 
}

export interface CVStep2Store extends storeFormStep<IGeneratorStep2> {
  experiences: IGeneratorStep2[] | undefined
  currentEditIndex: number | null
  // addExperience: (experience: IGeneratorStep2) => void
  // updateExperience: (index: number, experience: IGeneratorStep2) => void
  // removeExperience: (index: number) => void
  // setEditIndex: (index: number | null) => void
  // clearExperiences: () => void
}

export interface CVStep3Store extends storeFormStep<IGeneratorStep3> {
  educations: IGeneratorStep3[] | undefined
  currentEditIndex: number | null
  // addEducations: (education: IGeneratorStep3) => void 
  // updateEducation: (index: number, education: IGeneratorStep3) => void 
  // removeEducation: (index: number) => void 
  // setEditIndex: (index: number | null) => void 
  // clearEducation: () => void
}

export interface CVStep4Store {
  data: IGeneratorStep4[] | undefined
  updateData: (data: IGeneratorStep4[]) => void
  clearData: () => void
}

export interface CVStep5Store {
  data: IGeneratorStep5 | undefined
  updateData: (data: IGeneratorStep5) => void
  clearData: () => void
}

export interface CVNavigationStore {
  currentStep: number
  showForm: boolean
  setCurrentStep: (step: number) => void
  setShowForm: (show: boolean) => void
  nextStep: () => void
  previousStep: () => void
}
