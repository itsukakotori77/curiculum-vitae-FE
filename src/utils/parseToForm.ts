import {
  ICurrVitae,
  IGeneratorStep1,
  IGeneratorStep2,
  IGeneratorStep3,
  IGeneratorStep4,
  IGeneratorStep5,
} from '@/interface/curiculumVitae'

// Transform data to ICurrVitae structure
export const transformToICurrVitae = (
  step1Data?: IGeneratorStep1,
  step2Data?: IGeneratorStep2[] | IGeneratorStep2,
  step3Data?: IGeneratorStep3[],
  step4Data?: IGeneratorStep4[],
  step5Data?: IGeneratorStep5,
): ICurrVitae => {
  return {
    // Step 1 data maps directly
    firstName: step1Data?.firstName || '',
    lastName: step1Data?.lastName || '',
    nickname: step1Data?.nickname || '',
    role: step1Data?.role || '',
    profile: step1Data?.profile || '',

    // Step 2: Transform array of experiences
    experience:
      step2Data && Array.isArray(step2Data)
        ? step2Data.map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.date[0],
            endDate: exp.date[1],
            isCurrent: exp.isCurrent,
            role: exp.role,
            descJob: exp.descJob,
          }))
        : step2Data && typeof step2Data === 'object'
        ? [
            {
              jobTitle: step2Data.jobTitle,
              company: step2Data.company,
              startDate: step2Data.date[0],
              endDate: step2Data.date[1],
              isCurrent: step2Data.isCurrent,
              role: step2Data.role,
              descJob: step2Data.descJob,
            },
          ]
        : [],

    // Step 3: Education array (optional)
    education: step3Data || [],

    // Step 4: Certification array (optional)
    certification: step4Data || [],

    // Step 5: Extract skills and contacts separately
    skills:
      step5Data?.skills?.map((item: any) => ({
        name: item.name,
        isHasLevel: item.isHasLevel,
        level: item.level,
      })) || [],

    contacts: {
      address: step5Data?.address,
      phone: step5Data?.phone || '',
      email: step5Data?.email || '',
      telegram: step5Data?.telegram,
      instagram: step5Data?.instagram,
      linkedin: step5Data?.linkedin,
      otherwise: step5Data?.otherwise,
    },
  }
}
