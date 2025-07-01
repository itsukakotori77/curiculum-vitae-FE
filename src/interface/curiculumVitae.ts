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
  firstName: string
  lastName: string
  nickname: string
  role: string
  profile: string
  profilePicture?: string
  experience?: Array<Experience>
  education?: Array<{
    degree: string
    major?: string
    graduated?: Date | string
    graduatedStatus?: boolean
    university: string
    gpa?: string
    gpaStatus?: string
  }>
  certification?: Array<{
    name: string
    company?: string
    certificate_date?: Date | string
  }>
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