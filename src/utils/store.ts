// stores/cvStep1Store.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  CVNavigationStore,
  CVSettingStore,
  CVStep1Store,
  CVStep2Store,
  CVStep3Store,
  CVStep4Store,
  CVStep5Store,
  ICurrVitae,
  IGeneratorStep1,
  IGeneratorStep2,
  IGeneratorStep3,
  IGeneratorStep4,
  IGeneratorStep5,
  ISettingCurr,
} from '@/interface/curiculumVitae'
import { transformToICurrVitae } from './parseToForm'
import { transformToCurrPayload } from './parseToPayload'
import { cookieAuthStorage, decodeToken, getToken } from './common'
import { IFileManagerStore, MetadataFile } from '@/interface/fileManager'
import { IAuth } from '@/interface/login'
import { jwtDecode } from 'jwt-decode'
import httpRequest from '@/libs/httpsRequest'
import { URL } from '@/libs/constants'
import { apiGetIsLogin } from '@/services/login/api'

interface CVMainStore {
  finalCV: ICurrVitae | null
  updateFinalCV: () => void
  updatePayloadCV: () => void
  resetAllData: () => void
}

export const useCVSettingStore = create<CVSettingStore>()(
  persist(
    (set) => ({
      data: null,
      updateData: (data: ISettingCurr) => {
        set({ data })
      },
      clearData: () => {
        set({ data: null })
      },
    }),
    {
      name: 'cv-setting',
    },
  ),
)

export const useCVMainStore = create<CVMainStore>((set, get) => ({
  finalCV: null,

  updateFinalCV: () => {
    // Get data from all step stores
    const step1Data = useCVStep1Store.getState().data
    const step2Data = useCVStep2Store.getState().experiences
    const step3Data = useCVStep3Store.getState().educations
    const step4Data = useCVStep4Store.getState().skills
    const step5Data = useCVStep5Store.getState().contacts

    const finalCV = transformToICurrVitae(
      step1Data!,
      step2Data!,
      step3Data!,
      step4Data!,
      step5Data!,
    )

    set({ finalCV })
  },

  updatePayloadCV: () => {
    // Get data from all step stores
    const step1Data = useCVStep1Store.getState().data
    const step2Data = useCVStep2Store.getState().experiences
    const step3Data = useCVStep3Store.getState().educations
    const step4Data = useCVStep4Store.getState().skills
    const step5Data = useCVStep5Store.getState().contacts
    const setting = useCVSettingStore.getState().data
    const user = decodeToken(getToken()!) as any

    const payloadCV = transformToCurrPayload(
      step1Data!,
      step2Data!,
      step3Data!,
      step4Data!,
      step5Data!,
      {
        user_id: user?.id,
        setting_id: setting?.id!,
      },
    )

    return payloadCV
  },

  resetAllData: () => {
    // Clear all stores
    useCVStep1Store.getState().clearData()
    useCVStep2Store.getState().clearData()
    useCVStep3Store.getState().clearData()
    useCVStep4Store.getState().clearData()
    // useCVStep5Store.getState().clearData()

    set({ finalCV: null })
  },
}))

export const useCVStep1Store = create<CVStep1Store>()(
  persist(
    (set) => ({
      data: null,

      updateData: (data: IGeneratorStep1) => {
        set({ data })
      },

      clearData: () => {
        set({ data: null })
      },
    }),
    {
      name: 'cv-step1-storage',
    },
  ),
)

export const useCVStep2Store = create<CVStep2Store>()(
  persist(
    (set, get) => ({
      experiences: [],
      currentEditIndex: null,

      add: (experience: IGeneratorStep2) => {
        set((state) => ({
          experiences: [...(state.experiences ?? []), experience],
          currentEditIndex: null,
        }))
      },

      update: (index: number, experience: IGeneratorStep2) => {
        set((state) => ({
          experiences: state.experiences!.map((exp, i) =>
            i === index ? experience : exp,
          ),
          currentEditIndex: null,
        }))
      },

      remove: (index: number) => {
        set((state) => ({
          experiences: state.experiences!.filter((_, i) => i !== index) ?? [],
          currentEditIndex: null,
        }))
      },

      setEditIndex: (index: number | null) => {
        set({ currentEditIndex: index })
      },

      clearData: () => {
        set({
          experiences: [],
          currentEditIndex: null,
        })
      },
    }),
    {
      name: 'cv-step2-storage',
      partialize: (state) => ({
        experiences: state.experiences,
      }),
    },
  ),
)

export const useCVStep3Store = create<CVStep3Store>()(
  persist(
    (set, get) => ({
      educations: [],
      currentEditIndex: null,

      add: (data: IGeneratorStep3) => {
        set((state) => ({
          educations: [...(state.educations ?? []), data],
          currentEditIndex: null,
        }))
      },

      update: (index: number, data: IGeneratorStep3) => {
        set((state) => ({
          educations: state.educations!.map((exp, i) =>
            i === index ? data : exp,
          ),
          currentEditIndex: null,
        }))
      },

      remove: (index: number) => {
        set((state) => ({
          educations: state.educations!.filter((_, i) => i !== index) ?? [],
        }))
      },

      setEditIndex: (index: number | null) => {
        set({ currentEditIndex: index })
      },

      clearData: () => {
        set({
          educations: [],
          currentEditIndex: null,
        })
      },
    }),
    {
      name: 'cv-step3-storage',
    },
  ),
)

export const useCVStep4Store = create<CVStep4Store>()(
  persist(
    (set) => ({
      skills: [],
      certification: [],
      currentEditIndex: null,

      add: (data: IGeneratorStep4) => {
        set((state) => ({
          skills: [...(state.skills ?? []), data],
          currentEditIndex: null,
        }))
      },

      update: (index: number, data: IGeneratorStep4) => {
        set((state) => ({
          skills: state.skills!.map((skils, i) => (i === index ? data : skils)),
          currentEditIndex: null,
        }))
      },

      remove: (index: number) => {
        set((state) => ({
          skills: state.skills!.filter((_, i) => i !== index) ?? [],
        }))
      },

      setEditIndex: (index: number | null) => {
        set({ currentEditIndex: index })
      },

      clearData: () => {
        set({
          skills: [],
          currentEditIndex: null,
        })
      },
    }),
    {
      name: 'cv-step4-storage',
    },
  ),
)

export const useCVStep5Store = create<CVStep5Store>()(
  persist(
    (set) => ({
      contacts: null,

      update: (data: IGeneratorStep5) => {
        set({ contacts: data })
      },
    }),
    {
      name: 'cv-step5-storage',
    },
  ),
)

export const useCVNavigationStore = create<CVNavigationStore>((set, get) => ({
  currentStep: 1,
  showForm: false,
  maxStep: 6,

  setCurrentStep: (step: number) => {
    const { maxStep } = get()
    if (step >= 1 && step <= maxStep) {
      set({ currentStep: step })
    }
  },

  setShowForm: (show: boolean) => {
    set({ showForm: show })
  },

  nextStep: () => {
    const { currentStep, maxStep } = get()
    if (currentStep < maxStep) {
      set({ currentStep: currentStep + 1 })
    }
  },

  previousStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 })
    }
  },
}))

export const useFileManagerStore = create<IFileManagerStore>()(
  persist(
    (set, get) => ({
      fileEntries: [],

      addFile: (file: File) => {
        set((state) => ({
          fileEntries: [
            ...state.fileEntries,
            {
              file,
              uploadStatus: 'pending' as const,
            },
          ],
        }))
      },

      updateFileMetadata: (file: File, metadata: MetadataFile) => {
        set((state) => ({
          fileEntries: state.fileEntries.map((entry) =>
            entry.file === file
              ? { ...entry, ...metadata, uploadStatus: 'success' as const }
              : entry,
          ),
        }))
      },

      setFileUploading: (file: File) => {
        set((state) => ({
          fileEntries: state.fileEntries.map((entry) =>
            entry.file === file
              ? { ...entry, uploadStatus: 'uploading' as const }
              : entry,
          ),
        }))
      },

      setFileError: (file: File, error: string) => {
        set((state) => ({
          fileEntries: state.fileEntries.map((entry) =>
            entry.file === file
              ? { ...entry, uploadStatus: 'error' as const, error }
              : entry,
          ),
        }))
      },

      getFileEntry: (file: File) => {
        return get().fileEntries.find((entry) => entry.file === file)
      },

      getFileMetadata: (file: File | any) => {
        const entry = get().fileEntries.find(
          (entry) => entry.filename === file.filename,
        )
        if (!entry) return null

        return {
          id: entry.id,
          url: entry.url,
          public_id: entry.public_id,
          uploadStatus: entry.uploadStatus,
        }
      },

      removeFileFromState: (file: File) => {
        set((state) => ({
          fileEntries: state.fileEntries.filter((entry) => entry.file !== file),
        }))
      },

      getFiles: () => {
        return get().fileEntries.map((entry) => entry.file)
      },

      clearAllFiles: () => {
        set({ fileEntries: [] })
      },

      setFiles: (files: File[]) => {
        set({
          fileEntries: files.map((file) => ({
            file,
            uploadStatus: 'pending' as const,
          })),
        })
      },
    }),
    {
      name: 'file-manager-storage',
      // Optional: customize what gets persisted
      partialize: (state) => ({
        fileEntries: state.fileEntries.map((entry) => ({
          uploadStatus: entry.uploadStatus,
          id: entry.id,
          url: entry.url,
          public_id: entry.public_id,
          filename: entry.filename,
          error: entry.error,
        })),
      }),
    },
  ),
)

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        set({ isAuthenticated: true, token, user })

        const { exp } = jwtDecode(token)
        cookieAuthStorage.setItem('accessToken', token, {
          expires: new Date(exp! * 1000),
        })
      },
      logout: () => {
        set({ isAuthenticated: false, token: null, user: null })
        cookieAuthStorage.removeItem('accessToken')
      },
      checkAuth: async () => {
        console.log('asdasd')
        try {
          const res = await apiGetIsLogin()
          set({ isAuthenticated: true, user: res?.user })
        } catch (error) {
          set({ isAuthenticated: false, user: null })
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
