'use client'

import React, { useRef, useCallback, useMemo, useState } from 'react'
import StepperBubble from '@/components/globals/stepper/StepperBubble'
import GeneratorForm1, { GeneratorForm1Ref } from './GeneratorForm1'
import GeneratorForm2, { GeneratorForm2Ref } from './GeneratorForm2'
import GeneratorForm3, { GeneratorForm3Ref } from './GeneratorForm3'
import GeneratorForm4, { GeneratorForm4Ref } from './GeneratorForm4'
import GeneratorForm5, { GeneratorForm5Ref } from './GeneratorForm5'
import PreviewGenerator, { PreviewGeneratorHandle } from './PerviewGenerator'
import Sample3 from '../../exampleCv/Sample3'
import Button from '@/components/CultUI/Button'
import ProgressBar from '@/components/globals/progressBar'
import { Pencil, Trash, CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import moment from 'moment'
import { biodataCurr } from '@/data/cv'
import { labels } from '@/data/menu'
import { useCVData, useWindowSize } from '@/utils/hooks'
import { useModalConfirm } from '@/libs/modalConfirm'
import { convertColor } from '@/utils/common'
import { usePostCurr } from '@/services/curivulumVitae/mutation'
import {
  useCVNavigationStore,
  useCVSettingStore,
  useCVStep1Store,
  useCVStep2Store,
  useCVStep3Store,
  useCVStep4Store,
  useCVStep5Store,
  useCVMainStore,
} from '@/utils/store'
import {
  IGeneratorStep1,
  IGeneratorStep2,
  IGeneratorStep3,
  IGeneratorStep4,
  IGeneratorStep5,
} from '@/interface/curiculumVitae'

// Types
interface ItemCardProps {
  index: number
  children: React.ReactNode
  onEdit: () => void
  onDelete: () => void
}

interface ExperienceItemProps {
  experience: IGeneratorStep2 | any
  index: number
  onEdit: () => void
  onDelete: () => void
}

interface EducationItemProps {
  education: IGeneratorStep3
  index: number
  onEdit: () => void
  onDelete: () => void
}

interface SkillItemProps {
  skill: IGeneratorStep4
  index: number
  onEdit: () => void
  onDelete: () => void
}

interface AddItemButtonProps {
  onClick: () => void
  label: string
}

interface NavigationButtonsProps {
  onBack: () => void
  onNext: () => void
  nextLabel: string
  disabled?: boolean
}

interface ListContainerProps {
  title: string
  children: React.ReactNode
}

interface ColorProps {
  primaryColor?: string
  sidebarColor?: string
  skillColor?: string
}

// Reusable Item Card Component
const ItemCard: React.FC<ItemCardProps> = ({
  index,
  children,
  onEdit,
  onDelete,
}) => (
  <div className="w-full">
    <div className="px-4 py-4 sm:py-6 border rounded-lg border-gray-300 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-3 sm:gap-4 items-start flex-1">
          <div className="bg-blue-400 rounded-br-xl rounded-tl-sm w-10 h-10 text-white flex items-center justify-center font-bold flex-shrink-0">
            {index + 1}
          </div>
          <div className="flex flex-col flex-1 min-w-0">{children}</div>
        </div>
        <div className="flex gap-2 sm:flex-col md:flex-row sm:self-start justify-end sm:justify-start">
          <Trash
            className="w-5 h-5 text-blue-400 hover:text-blue-700 cursor-pointer transition-colors"
            onClick={onDelete}
          />
          <Pencil
            className="w-5 h-5 text-blue-400 hover:text-blue-700 cursor-pointer transition-colors"
            onClick={onEdit}
          />
        </div>
      </div>
    </div>
  </div>
)

// Experience Item Component
const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  index,
  onEdit,
  onDelete,
}) => (
  <ItemCard index={index} onEdit={onEdit} onDelete={onDelete}>
    <span className="font-bold text-sm sm:text-md break-words">
      {experience.company}
    </span>
    <p className="text-xs sm:text-sm break-words">
      {experience.jobTitle} | {experience.role}
    </p>
    <p className="text-xs sm:text-sm text-gray-600">
      {experience.date?.startDate} -{' '}
      {experience.isCurrent ? 'Present' : experience.date?.endDate}
    </p>
    {experience.descJob && (
      <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
        {experience.descJob}
      </p>
    )}
  </ItemCard>
)

// Education Item Component
const EducationItem: React.FC<EducationItemProps> = ({
  education,
  index,
  onEdit,
  onDelete,
}) => (
  <ItemCard index={index} onEdit={onEdit} onDelete={onDelete}>
    <span className="font-bold text-sm sm:text-md break-words">
      {education.university}
    </span>
    <p className="text-xs sm:text-sm font-medium break-words">
      {education.major?.value}
    </p>
    <p className="text-xs sm:text-sm text-gray-600">
      {education.graduatedStatus === 'true'
        ? `Graduated ${moment(education.graduated).format('MMMM, Do YYYY')}`
        : 'Undergraduated'}
    </p>
    <p className="text-xs sm:text-sm text-gray-600">
      {education.gpa ? `GPA: ${education.gpa}` : 'Non GPA'}
    </p>
    {education.majorDesc && (
      <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
        {education.majorDesc}
      </p>
    )}
  </ItemCard>
)

// Skill Item Component
const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  index,
  onEdit,
  onDelete,
}) => (
  <ItemCard index={index} onEdit={onEdit} onDelete={onDelete}>
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-col">
        <span className="font-bold text-lg sm:text-xl">Certificate</span>
        <span className="font-bold text-sm sm:text-md break-words">
          {skill.certificateName}
        </span>
        <p className="text-xs sm:text-sm font-medium break-words">
          {skill.company}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          <span className="font-medium">Certificated Publish </span>
          {moment(skill.certificateDate).format('MMMM, Do YYYY')}
        </p>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg sm:text-xl">Skills</span>
        <span className="font-bold text-sm sm:text-md break-words">
          {skill.skillName}
        </span>
        <p className="text-xs sm:text-sm font-medium break-words">
          {skill.company}
        </p>
        {skill.isHasLevel && (
          <div className="grid grid-cols-5 gap-1 mt-2 max-w-[200px] sm:max-w-xs">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`${
                  i + 1 <= skill.level ? 'bg-green-600' : 'bg-gray-300'
                } w-full h-3 sm:h-4 rounded-sm transition-colors`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </ItemCard>
)

// Add New Item Button
const AddItemButton: React.FC<AddItemButtonProps> = ({ onClick, label }) => (
  <div
    className="px-4 py-4 sm:py-6 rounded-lg border-2 sm:border-3 border-gray-400 border-dashed 
               flex justify-center items-center cursor-pointer hover:border-blue-400 
               hover:bg-blue-50 transition-all"
    onClick={onClick}
  >
    <div className="flex gap-1 sm:gap-2 items-center text-blue-600">
      <CirclePlus className="w-4 h-4 sm:w-5 sm:h-5" />
      <p className="font-bold text-xs sm:text-sm">{label}</p>
    </div>
  </div>
)

// Navigation Buttons
const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel,
  disabled = false,
}) => (
  <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
    <Button
      intent="default"
      className="w-full sm:w-auto sm:min-w-[200px]"
      onClick={onBack}
    >
      <span className="font-bold text-sm">Back</span>
    </Button>
    <Button
      intent="success"
      className="w-full sm:w-auto sm:min-w-[200px]"
      onClick={onNext}
      disabled={disabled}
    >
      <span className="font-bold text-sm">{nextLabel}</span>
    </Button>
  </div>
)

// List Container
const ListContainer: React.FC<ListContainerProps> = ({ title, children }) => (
  <div className="flex flex-col w-full max-w-5xl mx-auto gap-3 sm:gap-4 overflow-y-auto h-[calc(100vh-10rem)] sm:h-[calc(100vh-8rem)] px-3 sm:px-4 lg:px-6 py-2">
    <span className="font-semibold text-base sm:text-lg sticky top-0 bg-white py-2 z-10">
      {title}
    </span>
    {children}
  </div>
)

// Main Component
const CurrVitaeGenerator: React.FC = () => {
  const router = useRouter()
  const previewRef = useRef<HTMLDivElement>(null)
  const refPreview = useRef<PreviewGeneratorHandle>(null)
  const windowSize = useWindowSize()
  const [preview, setPreview] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // Stores
  const {
    currentStep,
    showForm,
    setCurrentStep,
    setShowForm,
    nextStep,
    maxStep,
  } = useCVNavigationStore()
  const { data: profile, updateData: updateStep1Data } = useCVStep1Store()
  const {
    experiences,
    currentEditIndex: idxExp,
    add: addExp,
    update: updateExp,
    remove: removeExp,
    setEditIndex: setIdxExp,
  } = useCVStep2Store()
  const {
    educations,
    currentEditIndex: idxEdu,
    add: addEdu,
    update: updateEdu,
    remove: removeEdu,
    setEditIndex: setIdxEdu,
  } = useCVStep3Store()
  const {
    skills,
    currentEditIndex: idxSkill,
    add: addSkill,
    update: updateSkill,
    remove: removeSkill,
    setEditIndex: setIdxSkill,
  } = useCVStep4Store()
  const { contacts, update: updateContacts } = useCVStep5Store()
  const { data: dataSetting } = useCVSettingStore()
  const { updatePayloadCV } = useCVMainStore()
  const { finalCV } = useCVData()
  const { openModal, closeModal } = useModalConfirm()
  const { mutate: postCurr, isPending } = usePostCurr()

  const colorProps: ColorProps = useMemo(
    () => ({
      primaryColor: convertColor(dataSetting?.primaryColor!),
      sidebarColor: convertColor(dataSetting?.sidebarColor!),
      skillColor: convertColor(dataSetting?.skillColor!),
    }),
    [dataSetting],
  )

  // Generic confirmation handler
  const confirmAction = useCallback(
    (title: string, description: string, onConfirm: () => void) => {
      openModal({
        title,
        description,
        onConfirm: () => {
          onConfirm()
          closeModal()
        },
      })
    },
    [openModal, closeModal],
  )

  // Form submissions
  const handleStep1Submit = useCallback(
    (val: IGeneratorStep1) => {
      confirmAction('Attention!', 'Are you sure to save this data?', () => {
        updateStep1Data(val)
        nextStep()
      })
    },
    [updateStep1Data, nextStep, confirmAction],
  )

  const handleStep2Submit = useCallback(
    (val: IGeneratorStep2) => {
      confirmAction('Attention!', 'Are you sure to save this data?', () => {
        idxExp !== null ? updateExp(idxExp, val) : addExp(val)
        setShowForm(false)
      })
    },
    [idxExp, updateExp, addExp, setShowForm, confirmAction],
  )

  const handleStep3Submit = useCallback(
    (val: IGeneratorStep3) => {
      confirmAction('Attention!', 'Are you sure to save this data?', () => {
        idxEdu !== null ? updateEdu(idxEdu, val) : addEdu(val)
        setShowForm(false)
      })
    },
    [idxEdu, updateEdu, addEdu, setShowForm, confirmAction],
  )

  const handleStep4Submit = useCallback(
    (val: IGeneratorStep4) => {
      confirmAction('Attention!', 'Are you sure to save this data?', () => {
        idxSkill !== null ? updateSkill(idxSkill, val) : addSkill(val)
        setShowForm(false)
      })
    },
    [idxSkill, updateSkill, addSkill, setShowForm, confirmAction],
  )

  const handleStep5Submit = useCallback(
    (val: IGeneratorStep5) => {
      confirmAction('Attention!', 'Are you sure to save this data?', () => {
        updateContacts(val)
        nextStep()
      })
    },
    [updateContacts, nextStep, confirmAction],
  )

  // Generic handlers
  const handleEdit = useCallback(
    (setIndex: (index: number | null) => void, index: number) => {
      setIndex(index)
      setShowForm(true)
    },
    [setShowForm],
  )

  const handleDelete = useCallback(
    (remove: (index: number) => void, index: number, itemType: string) => {
      confirmAction(
        `Delete ${itemType}`,
        `Are you sure you want to delete this ${itemType.toLowerCase()}?`,
        () => remove(index),
      )
    },
    [confirmAction],
  )

  const handleAddNew = useCallback(
    (setIndex: (index: number | null) => void) => {
      setIndex(null)
      setShowForm(true)
    },
    [setShowForm],
  )

  const handleFormCancel = useCallback(() => {
    setShowForm(false)
    setIdxExp(null)
    setIdxEdu(null)
    setIdxSkill(null)
  }, [setShowForm, setIdxExp, setIdxEdu, setIdxSkill])

  const downloadPdf = useCallback(async () => {
    confirmAction(
      'Download PDF',
      'Do you want to download your CV as a PDF document?',
      async () => {
        if (!refPreview.current) {
          toast.error('Preview reference not found')
          return
        }
        try {
          setIsGenerating(true)
          await refPreview.current.downloadPdf()
          toast.success('PDF downloaded successfully!')
        } catch (err: any) {
          toast.error(err?.message || 'Failed to generate PDF')
        } finally {
          setIsGenerating(false)
        }
      },
    )
  }, [confirmAction])

  const downloadPng = useCallback(async () => {
    confirmAction(
      'Download PNG',
      'Do you want to download your CV as a PDF document?',
      async () => {
        closeModal()
        if (!refPreview.current) {
          toast.error('Preview reference not found')
          return
        }

        try {
          setIsGenerating(true)
          await refPreview.current.downloadPng()
          toast.success('PDF downloaded successfully!')
        } catch (err: any) {
          console.error('PDF generation error:', err)
          toast.error(err?.message || 'Failed to generate PDF')
        } finally {
          setIsGenerating(false)
        }
      },
    )
  }, [])

  const handleSaveCurr = useCallback(() => {
    confirmAction(
      'Attention!',
      'Are you sure you want to save this data?',
      () => {
        postCurr(updatePayloadCV(), {
          onSuccess: (res: any) => toast.success(res?.message),
          onError: (error: any) => toast.error(error?.response?.message),
        })
      },
    )
  }, [postCurr, updatePayloadCV, confirmAction])

  const currentData = useMemo(
    () => ({
      experience: idxExp !== null ? experiences![idxExp] : undefined,
      education: idxEdu !== null ? educations![idxEdu] : undefined,
      skill: idxSkill !== null ? skills![idxSkill] : undefined,
    }),
    [idxExp, idxEdu, idxSkill, experiences, educations, skills],
  )

  return (
    <div className="min-h-screen lg:h-screen">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Sidebar */}
        <div className="bg-[#FFDFD2] lg:w-64 xl:w-80 flex flex-col pb-12 sm:pb-16 px-3 sm:px-5">
          <div className="flex-1 p-3 sm:p-4 lg:p-6">
            <StepperBubble
              size={maxStep}
              current={currentStep}
              direction={windowSize.width > 1024 ? 'vertical' : 'horizontal'}
              onChangeCurr={setCurrentStep}
              useNumber
              className="justify-center lg:justify-start lg:py-12"
              labels={labels}
            />
          </div>
          <div className="h-8 px-2">
            <ProgressBar
              current={currentStep}
              total={maxStep}
              title="Resume complete"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden lg:h-full">
          {/* Forms */}
          {currentStep === 1 && (
            <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto flex items-center justify-center">
              <div className="w-full max-w-3xl">
                <GeneratorForm1
                  data={profile!}
                  onSubmit={handleStep1Submit}
                  onCancel={() => router.back()}
                  onChange={updateStep1Data}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex-1 overflow-y-auto">
              {!showForm ? (
                <ListContainer title="Work History Summary">
                  {experiences!.map((exp, i) => (
                    <ExperienceItem
                      key={i}
                      experience={exp}
                      index={i}
                      onEdit={() => handleEdit(setIdxExp, i)}
                      onDelete={() => handleDelete(removeExp, i, 'Experience')}
                    />
                  ))}
                  <AddItemButton
                    onClick={() => handleAddNew(setIdxExp)}
                    label="Add Experience"
                  />
                  <NavigationButtons
                    onBack={() => setCurrentStep(1)}
                    onNext={nextStep}
                    nextLabel="Next: Education"
                    disabled={experiences!.length === 0}
                  />
                </ListContainer>
              ) : (
                <div className="p-4 lg:p-20">
                  <GeneratorForm2
                    data={currentData.experience}
                    onSubmit={handleStep2Submit}
                    onCancel={handleFormCancel}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex-1 overflow-y-auto">
              {!showForm ? (
                <ListContainer title="Education History Summary">
                  {educations!.map((edu, i) => (
                    <EducationItem
                      key={i}
                      education={edu}
                      index={i}
                      onEdit={() => handleEdit(setIdxEdu, i)}
                      onDelete={() => handleDelete(removeEdu, i, 'Education')}
                    />
                  ))}
                  <AddItemButton
                    onClick={() => handleAddNew(setIdxEdu)}
                    label="Add Education"
                  />
                  <NavigationButtons
                    onBack={() => setCurrentStep(2)}
                    onNext={nextStep}
                    nextLabel="Next: Skills"
                    disabled={educations!.length === 0}
                  />
                </ListContainer>
              ) : (
                <div className="p-4 lg:p-20">
                  <GeneratorForm3
                    data={currentData.education}
                    onSubmit={handleStep3Submit}
                    onCancel={handleFormCancel}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex-1 overflow-y-auto">
              {!showForm ? (
                <ListContainer title="Skills Summary">
                  {skills!.map((skill, i) => (
                    <SkillItem
                      key={i}
                      skill={skill}
                      index={i}
                      onEdit={() => handleEdit(setIdxSkill, i)}
                      onDelete={() => handleDelete(removeSkill, i, 'Skill')}
                    />
                  ))}
                  <AddItemButton
                    onClick={() => handleAddNew(setIdxSkill)}
                    label="Add Skills & Certificate"
                  />
                  <NavigationButtons
                    onBack={() => setCurrentStep(3)}
                    onNext={nextStep}
                    nextLabel="Next: Contact"
                    disabled={skills!.length === 0}
                  />
                </ListContainer>
              ) : (
                <div className="p-4 lg:p-20">
                  <GeneratorForm4
                    data={currentData.skill}
                    onSubmit={handleStep4Submit}
                    onCancel={handleFormCancel}
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="flex-1 p-3 sm:p-4 lg:p-20 overflow-y-auto">
              <div className="w-full max-w-5xl mx-auto">
                <GeneratorForm5
                  data={contacts}
                  onSubmit={handleStep5Submit}
                  onCancel={() => setCurrentStep(4)}
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full p-3 sm:p-4 lg:p-6">
              <div className="w-full lg:w-2/5 xl:w-3/6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-3 sm:p-4 lg:p-6 overflow-auto">
                <div className="sticky lg:-top-6 -top-4 p-2 bg-white pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-gray-200 z-[4]">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Live Preview
                  </h3>
                </div>
                <div className="relative min-h-[400px]">
                  {/* Contains the scaled preview */}
                  <div
                    className="absolute top-0 left-0 sm:scale-75 lg:scale-90 origin-top-left cursor-pointer"
                    onClick={() => setPreview(true)}
                  >
                    <Sample3
                      ref={previewRef}
                      data={finalCV || biodataCurr}
                      scale="sm"
                      size="xs"
                      textSize="xs"
                      iconSize="xs"
                      variantText="tiny"
                      config={{
                        sidebarWidth: 28,
                        mobileSidebarWidth: 28,
                        tabletSidebarWidth: 30,
                        responsiveImage: true,
                        mobileImageSize: 120,
                        tabletImageSize: 150,
                        desktopImageSize: 200,
                        responsiveSidebar: true,
                      }}
                      printable="noPrint"
                      className="bg-transparent shadow-none p-0"
                      childrenClassName="max-h-none"
                      {...colorProps}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 lg:w-1/3 xl:w-2/5 py-4 sm:py-6 lg:py-10">
                <Button
                  intent="secondary"
                  isLoading={isGenerating}
                  onClick={downloadPng}
                  className="w-full"
                >
                  <span className="font-bold text-sm sm:text-base">
                    Generate PNG
                  </span>
                </Button>
                <Button
                  intent="secondary"
                  isLoading={isGenerating}
                  onClick={downloadPdf}
                  className="w-full"
                >
                  <span className="font-bold text-sm sm:text-base">
                    Generate PDF
                  </span>
                </Button>
                <Button
                  intent="secondary"
                  isLoading={isPending}
                  onClick={handleSaveCurr}
                  className="w-full"
                >
                  <span className="font-bold text-sm sm:text-base">
                    Save Data
                  </span>
                </Button>
              </div>
            </div>
          )}

          {/* Preview Sidebar (Step 1 only) */}
          {currentStep === 1 && (
            <div className="hidden lg:block w-1/3 xl:w-2/5 bg-white border-l border-gray-200 p-4 lg:p-6 overflow-hidden">
              <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Live Preview</h3>
              </div>
              <div
                className="scale-75 lg:scale-90 origin-top -mt-20 cursor-pointer"
                onClick={() => setPreview(true)}
              >
                <Sample3
                  ref={previewRef}
                  data={finalCV || biodataCurr}
                  scale="sm"
                  size="xs"
                  textSize="xs"
                  iconSize="xs"
                  variantText="tiny"
                  config={{
                    sidebarWidth: 28,
                  }}
                  printable="noPrint"
                  {...colorProps}
                  className="bg-transparent shadow-none p-0"
                  childrenClassName="max-h-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <PreviewGenerator
        ref={refPreview}
        data={finalCV || biodataCurr}
        isShowing={preview}
        onClose={() => setPreview(false)}
      />
    </div>
  )
}

export default CurrVitaeGenerator
