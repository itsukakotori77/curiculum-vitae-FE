import {
  ICurrVitae,
  IGeneratorStep1,
  IGeneratorStep2,
  IGeneratorStep3,
  IGeneratorStep4,
  IGeneratorStep5,
} from '@/interface/curiculumVitae'

export interface PayloadCv {
  name: string
  email: string
  phone: string
  address: string
  summary: string
  user_id: number
  file_id?: number | string
  cvitae_setting_id: number
  curEducation?: CurEducation[]
  curExperience?: CurExperience[]
  curSkill?: CurSkill[]
  curTemplate?: CurTemplate[]
}

export interface CurEducation {
  school: string
  degree: string
  start_date: Date
  end_date: Date
}

export interface CurExperience {
  company: string
  position: string
  start_date: Date
  end_date: Date
}

export interface CurSkill {
  skill: string
  level: number
}

export interface CurTemplate {
  name: string
}

export const transformToCurrPayload = (
  step1Data?: IGeneratorStep1,
  step2Data?: IGeneratorStep2[],
  step3Data?: IGeneratorStep3[],
  step4Data?: IGeneratorStep4[],
  step5Data?: IGeneratorStep5,
  data?: {
    user_id: number
    setting_id: number
  },
): PayloadCv => {
  return {
    name: `${step1Data?.firstName || ''} ${step1Data?.lastName || ''}`,
    email: step5Data?.email || '',
    phone: step5Data?.phone || '',
    address: step5Data?.address || '',
    summary: step1Data?.profile || '',
    user_id: data?.user_id!,
    file_id: +step1Data?.fileId! || '',
    cvitae_setting_id: data?.setting_id!,
    curEducation: Array.isArray(step3Data)
      ? step3Data?.map((val: any) => {
          return {
            school: val?.university,
            degree: val?.degree,
            start_date: new Date(val?.start_date),
            end_date: new Date(val?.start_date),
          }
        })
      : [],
    curExperience: Array.isArray(step2Data)
      ? step2Data?.map((val: any) => {
          return {
            company: val?.company,
            position: val?.jobTitle,
            start_date: new Date(val?.start_date),
            end_date: new Date(val?.end_date),
          }
        })
      : [],
    curSkill: Array.isArray(step4Data)
      ? step4Data?.map((val: any) => {
          return {
            skill: val?.skillName,
            level: val?.level,
          }
        })
      : [],
  }
}
