import { ICurrVitae } from '@/interface/curiculumVitae'
import moment from 'moment'

export const biodataCurr: ICurrVitae = {
  firstName: 'Itsuka',
  lastName: 'Kotori',
  nickname: 'kotori',
  role: 'Fullstack Development',
  profile: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  profilePicture: '/User.png',
  experience: [
    {
      jobTitle: 'IT Software Support',
      company: 'Bencoolen Coffee',
      role: 'Staff IT',
      isCurrent: false,
      startDate: moment('2020-09-01').format('YYYY-MM-DD'),
      endDate: moment('2020-12-01').format('YYYY-MM-DD'),
      descJob: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          `,
    },
    {
      jobTitle: 'Freelance Fullstack Development',
      company: 'Dinalogika Consulting',
      role: 'Staff IT',
      isCurrent: false,
      startDate: moment('2020-10-15').format('YYYY-MM-DD'),
      endDate: moment('2020-12-10').format('YYYY-MM-DD'),
      descJob: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          `,
    },
    {
      jobTitle: 'Fullstack Development',
      company: 'PT Dinalogika Consulting',
      role: 'Staff IT',
      isCurrent: false,
      startDate: moment('2021-02-15').format('YYYY-MM-DD'),
      endDate: moment('2022-06-10').format('YYYY-MM-DD'),
      descJob: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          `,
    },
    // {
    //   jobTitle: 'Frontend Development',
    //   company: 'PT Bank Rakyat Indonesia',
    //   role: 'Staff IT',
    //   isCurrent: true,
    //   startDate: moment('2022-06-15').format('YYYY-MM-DD'),
    //   descJob: `
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    //         incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    //         irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
    //         deserunt mollit anim id est laborum.
    //      `,
    // },
  ],
  education: [
    {
      degree: 'Bachelor',
      major: 'Informatics Engineering',
      university: 'University of Jenderal Achmad Yani | UNJANI',
      gpa: '3.5/4.0',
      gpaStatus: 'Cumlaude',
      graduated: moment('2020-09-10').format('YYYY-MM-DD'),
      graduatedStatus: true,
      majorDesc: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
          `,
    },
    {
      degree: 'Diploma',
      major: 'Civil Engineering',
      university: 'POLBAN',
      gpa: '3.5/4.0',
      gpaStatus: 'Cumlaude',
      graduated: moment('2020-09-10').format('YYYY-MM-DD'),
      graduatedStatus: true,
      majorDesc: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
          `,
    },
  ],
  certification: [
    {
      name: 'AWS Certified Developer Associate',
      company: 'Amazon',
      certificateDate: moment('2022-10-10').format('YYYY-MM-DD'),
      descCert: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: 'Google Cloud Professional Developer',
      company: 'Google',
      certificateDate: moment('2022-10-10').format('YYYY-MM-DD'),
      descCert: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: 'Microsoft Azure Fundamentals',
      company: 'Microsoft',
      certificateDate: moment('2022-10-10').format('YYYY-MM-DD'),
      descCert: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ],
  skills: [
    {
      name: 'Laravel',
      isHasLevel: true,
      level: 5,
    },
    {
      name: 'Codeignither',
      isHasLevel: true,
      level: 4,
    },
    {
      name: 'NextJs',
      isHasLevel: true,
      level: 4,
    },
    {
      name: 'ReactJs',
      isHasLevel: true,
      level: 5,
    },
    {
      name: 'VueJs',
      isHasLevel: true,
      level: 5,
    },
    {
      name: 'NuxtJs',
      isHasLevel: true,
      level: 3,
    },
    {
      name: 'Java Spring Boot',
      isHasLevel: true,
      level: 2,
    },
    {
      name: 'GO',
      isHasLevel: true,
      level: 2,
    },
    {
      name: 'Rust',
      isHasLevel: true,
      level: 1,
    },
  ],
  contacts: {
    phone: '621234567890',
    email: 'test@gmail.com',
    instagram: '@user_test',
    linkedin: 'user_test',
    address: `Jl. Gatot Subroto No. 177A, 
        Kel No.RT 009/01 Kav 64, Menteng Dalam, 
        Tebet, South Jakarta City, Jakarta 12870`,
  },
}
