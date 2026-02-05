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
  step2Data?: IGeneratorStep2[],
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
    profilePicture: step1Data?.profilePicture || '',

    // Step 2: Experience
    experience: Array.isArray(step2Data)
      ? step2Data
          .filter(
            (exp) =>
              exp.jobTitle?.trim() ||
              exp.company?.trim() ||
              exp.role?.trim() ||
              exp.descJob?.trim() ||
              (Array.isArray(exp.date) && (exp.date[0] || exp.date[1])),
          )
          .map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.date?.[0],
            endDate: exp.date?.[1],
            isCurrent: exp.isCurrent,
            role: exp.role,
            descJob: exp.descJob,
          }))
      : [],

    // Step 3: Education
    education: Array.isArray(step3Data)
      ? step3Data
          .filter(
            (data) =>
              data.degree?.trim() ||
              data.major?.value ||
              data.majorDesc?.trim() ||
              data.university?.trim() ||
              data.gpa ||
              data.graduatedStatus,
          )
          .map((data) => ({
            degree: data.degree,
            major: data.major?.value,
            majorDesc: data.majorDesc,
            graduated: data.graduated,
            graduatedStatus: data.graduatedStatus,
            university: data.university,
            gpa: data.gpa,
            gpaStatus: data.gpaStatus,
          }))
      : [],

    // Step 4: Certification
    certification: Array.isArray(step4Data)
      ? step4Data
          .filter(
            (data) =>
              data.certificateName?.trim() ||
              data.company?.trim() ||
              data.certificateDate,
          )
          .map((data) => ({
            name: data.certificateName,
            company: data.company,
            certificateDate: data.certificateDate,
          }))
      : [],

    // Step 4: Skills
    skills: Array.isArray(step4Data)
      ? step4Data
          .filter(
            (data) =>
              data.skillName?.trim() ||
              (data.isHasLevel && typeof data.level === 'number'),
          )
          .map((data) => ({
            name: data.skillName,
            isHasLevel: data.isHasLevel,
            level: data.level,
          }))
      : [],
    // Step 5: Extract skills and contacts separately
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
