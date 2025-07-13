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
  startDate: Date | string | any
  endDate: Date | string | any 
  descJob?: string | any
}

export interface IGeneratorStep3 {
  degree: string | any
  major?: string | any
  graduated?: Date | string | any
  graduatedStatus?: boolean | any
  university: string | any 
  gpa?: string | any
  gpaStatus?: string | any
  majorDesc?: string | any
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
