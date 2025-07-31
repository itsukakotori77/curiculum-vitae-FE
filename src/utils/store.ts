// stores/cvStep1Store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  CVNavigationStore,
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
} from '@/interface/curiculumVitae'
import { transformToICurrVitae } from './parseToForm'
import { debounce } from 'lodash'

interface CVMainStore {
  finalCV: ICurrVitae | null
  updateFinalCV: () => void
  resetAllData: () => void
}

export const useCVMainStore = create<CVMainStore>((set, get) => ({
  finalCV: null,

  updateFinalCV: () => {
    // Get data from all step stores
    const step1Data = useCVStep1Store.getState().data
    const step2Data = useCVStep2Store.getState().experiences
    const step3Data = useCVStep3Store.getState().educations
    const step4Data = useCVStep4Store.getState().skills
    const step5Data = useCVStep5Store.getState().data

    const finalCV = transformToICurrVitae(step1Data, step2Data, step3Data, step4Data, step5Data)

    set({ finalCV })
  },

  resetAllData: () => {
    // Clear all stores
    useCVStep1Store.getState().clearData()
    useCVStep2Store.getState().clearData()
    useCVStep3Store.getState().clearData()
    useCVStep4Store.getState().clearData()
    useCVStep5Store.getState().clearData()

    set({ finalCV: null })
  },
}))

export const useCVStep1Store = create<CVStep1Store>()(
  persist(
    (set) => ({
      data: undefined,

      updateData: debounce((data: IGeneratorStep1) => {
        set({ data })
      }, 200),

      clearData: () => {
        set({ data: undefined })
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
          experiences: state.experiences!.map((exp, i) => (i === index ? experience : exp)),
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
          educations: state.educations!.map((exp, i) => (i === index ? data : exp)),
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
      data: undefined,

      updateData: (data: IGeneratorStep5) => {
        set({ data })
      },

      clearData: () => {
        set({ data: undefined })
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
