'use client'

import React, { useRef, useCallback, useMemo } from 'react'
import StepperBubble from '@/components/globals/stepper/StepperBubble'
import GeneratorForm1, { GeneratorForm1Ref } from './GeneratorForm1'
import { IGeneratorStep1, IGeneratorStep2, IGeneratorStep3 } from '@/interface/curiculumVitae'
import { useRouter } from 'next/navigation'
import Sample3 from '../../exampleCv/Sample3'
import { biodataCurr } from '@/data/cv'
import GeneratorForm2, { GeneratorForm2Ref } from './GeneratorForm2'
import Button from '@/components/CultUI/Button'
import { useCVData, useWindowSize } from '@/utils/hooks'
import ProgressBar from '@/components/globals/progressBar'
import { Pencil, Trash, TriangleAlert, CirclePlus } from 'lucide-react'
import Badge from '@/components/globals/UI/Badge'
import { useModalConfirm } from '@/libs/modalConfirm'
import { useCVNavigationStore, useCVStep1Store, useCVStep2Store, useCVStep3Store } from '@/utils/store'
import GeneratorForm3, { GeneratorForm3Ref } from './GeneratorForm3'
import moment from 'moment'


const labels: string[] = [
   'Profile', 'Experience', 'Education', 'Skills', 'Contacts'
]

export default function CurrVitaeGenerator() {
   const router = useRouter()
   const ref = useRef<HTMLDivElement>(null)

   // Form refs
   const form1Ref = useRef<GeneratorForm1Ref>(null)
   const form2Ref = useRef<GeneratorForm2Ref>(null)
   const form3Ref = useRef<GeneratorForm3Ref>(null)

   // Zustand stores
   const { currentStep, showForm, setCurrentStep, setShowForm, nextStep } = useCVNavigationStore()
   const { updateData: updateStep1Data } = useCVStep1Store()
   const {
      experiences,
      currentEditIndex: idxExp,
      add: addExperience,
      update: updateExperience,
      remove: removeExperience,
      setEditIndex: setEditIndexExp
   } = useCVStep2Store()

   const { 
      educations, 
      currentEditIndex: idxEdu,
      add: addEducation,
      update: updateEducation,
      remove: removeEducation,
      setEditIndex: setEditIndexEdu 
   } = useCVStep3Store()

   // Combined CV data
   const { finalCV } = useCVData()

   const { openModal, closeModal } = useModalConfirm()
   const window = useWindowSize()

   // Form submission handlers
   const handleStep1Submit = useCallback((val: IGeneratorStep1) => {
      openModal({
         title: "Attention !",
         description: "Are you sure to save this data ?",
         onConfirm: () => {
            updateStep1Data(val)
            nextStep()
            closeModal()
         }
      })
   }, [updateStep1Data, nextStep, openModal, closeModal])

   const handleStep2Submit = useCallback((val: IGeneratorStep2) => {
      openModal({
         title: "Attention !",
         description: "Are you sure to save this data ?",
         onConfirm: () => {
            if (idxExp !== null) {
               // Update existing experience
               updateExperience(idxExp, val)
            } else {
               // Add new experience
               addExperience(val)
            }
            setShowForm(false)
            closeModal()
         }
      })
   }, [idxExp, updateExperience, addExperience, setShowForm, openModal, closeModal])

   const handleStep3Submit = useCallback((val: IGeneratorStep3) => {
      openModal({
         title: "Attention !",
         description: "Are you sure to save this data ?",
         onConfirm: () => {
            if(idxEdu !== null) {
               updateEducation(idxEdu, val)
            }else{
               addEducation(val)
            }
            setShowForm(false)
            closeModal()
         }
      })
   }, [idxEdu, updateEducation, addEducation, setShowForm, openModal, closeModal])

   // Experience management handlers
   const handleEditExperience = useCallback((index: number) => {
      setEditIndexExp(index)
      setShowForm(true)
   }, [setEditIndexExp, setShowForm])

   const handleDeleteExperience = useCallback((index: number) => {
      openModal({
         title: "Delete Experience",
         description: "Are you sure you want to delete this experience?",
         onConfirm: () => {
            removeExperience(index)
            closeModal()
         }
      })
   }, [removeExperience, openModal, closeModal])

   const handleAddNewExperience = useCallback(() => {
      setEditIndexExp(null)
      setShowForm(true)
   }, [setEditIndexExp, setShowForm])

   // Cancel handler
   const handleCancel = useCallback(() => {
      router.back()
   }, [router])

   const handleFormCancel = useCallback(() => {
      setShowForm(false)
      setEditIndexExp(null)
   }, [setShowForm, setEditIndexExp])

   // Render experiences
   const experienceItems = useMemo(() => {
      return experiences!.map((experience: any, index: number) => (
         <div key={index} className="w-full">
            <div className="px-4 py-6 border rounded-lg border-gray-300 bg-white shadow-sm">
               <div className="flex justify-between">
                  <div className="flex gap-4">
                     <div className="bg-blue-400 rounded-br-xl rounded-tl-sm 
                        w-10 h-10 text-white flex items-center 
                        justify-center font-bold"
                     >
                        {index + 1}
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-md">{experience.company}</span>
                        <p className="text-sm">{experience.jobTitle} | {experience.role}</p>
                        <p className="text-sm">
                           {experience.date?.startDate} - {
                              experience.isCurrent ? 'Present' : experience.date?.endDate
                           }
                        </p>
                        {experience.descJob && (
                           <p className="text-sm text-gray-600 mt-1">{experience.descJob}</p>
                        )}
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Trash
                        className="w-5 text-blue-400 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleDeleteExperience(index)}
                     />
                     <Pencil
                        className="w-5 text-blue-400 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleEditExperience(index)}
                     />
                  </div>
               </div>
            </div>
         </div>
      ))
   }, [experiences, handleDeleteExperience, handleEditExperience])

   const educationItems = useMemo(() => {
      return educations!.map((data: any, index: number) => (
         <div key={index} className="w-full">
            <div className="px-4 py-6 border rounded-lg border-gray-300 bg-white shadow-sm">
               <div className="flex justify-between">
                  <div className="flex gap-4">
                     <div className="bg-blue-400 rounded-br-xl rounded-tl-sm 
                        w-10 h-10 text-white flex items-center 
                        justify-center font-bold"
                     >
                        {index + 1}
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-md">{data.university}</span>
                        <p className="text-sm font-medium">{data.major?.value}</p>
                        <p className="text-sm">{`${data.graduatedStatus === 'true' ? `Graduated From ${moment(data?.graduated).format('MMMM, Do YYYY')}` : `Undergraduated`}`}</p>
                        <p className="text-sm">{`${data.gpa ? `GPA: ${data?.gpa}` : `Non GPA`}`}</p>
                        <p className="text-sm text-gray-600 mt-1">{data.majorDesc}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Trash
                        className="w-5 text-blue-400 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleDeleteExperience(index)}
                     />
                     <Pencil
                        className="w-5 text-blue-400 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleEditExperience(index)}
                     />
                  </div>
               </div>
            </div>
         </div>
      ))
   }, [educations])

   // Get current experience data for editing
   const currentExperienceData = useMemo(() => {
      return idxExp !== null ? experiences![idxExp] : undefined
   }, [idxExp, experiences])

   const currentEducationData = useMemo(() => {
      return idxEdu !== null ? educations![idxEdu] : undefined
   }, [idxEdu, educations])

   return (
      <div className="min-h-screen lg:h-screen">
         <div className="flex flex-col lg:flex-row h-full">
            {/* Sidebar - Responsive */}
            <div className="bg-[#FFDFD2] lg:w-64 xl:w-80 flex flex-col pb-16 px-5 lg:h-auto">
               <div className="flex-1 p-4 lg:p-6">
                  <StepperBubble
                     size={5}
                     current={currentStep}
                     direction={window.width > 1024 ? 'vertical' : 'horizontal'}
                     onChangeCurr={(val: number) => setCurrentStep(val)}
                     useNumber
                     className="justify-center lg:justify-start lg:py-12"
                     labels={labels}
                  />
               </div>
               <div className="h-8">
                  <ProgressBar
                     current={currentStep}
                     total={5}
                     title="Resume complete"
                  />
               </div>
            </div>

            {/* Content Area - Responsive */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden lg:h-full">
               {/* Form Section */}
               <div className="flex-1 p-4 lg:p-6 overflow-y-auto flex items-center justify-center lg:h-full">
                  {currentStep === 1 && (
                     <div className="w-full max-w-3xl">
                        <GeneratorForm1
                           ref={form1Ref}
                           data={useCVStep1Store.getState().data}
                           onSubmit={handleStep1Submit}
                           onCancel={handleCancel}
                           onChange={updateStep1Data}
                        />
                     </div>
                  )}

                  {/* Step 2 - Work Experience */}
                  {currentStep === 2 && (
                     <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 overflow-y-auto h-[calc(100vh-8rem)] px-4 lg:px-6">
                        <span className="font-semibold text-lg">Work History Summary</span>

                        {!showForm ? (
                           <>
                              {/* Display existing experiences */}
                              {experienceItems}

                              {/* Add new experience button */}
                              <div className="px-4 py-6 rounded-lg border-3 border-gray-400 border-dashed 
                                 flex justify-center items-center mt-4 cursor-pointer"
                                 onClick={handleAddNewExperience}
                              >
                                 <div className="flex gap-1 items-center text-blue-600 hover:underline">
                                    <CirclePlus className="w-5 h-5" />
                                    <p className="font-bold text-sm mt-1">Add Experience</p>
                                 </div>
                              </div>

                              {/* Navigation buttons */}
                              <div className="my-2 flex justify-end flex-row gap-2">
                                 <Button
                                    intent="default"
                                    className="lg:w-52"
                                    onClick={() => setCurrentStep(1)}
                                 >
                                    <span className="font-bold text-sm">Back</span>
                                 </Button>
                                 <Button
                                    intent="success"
                                    className="lg:w-52"
                                    onClick={nextStep}
                                    disabled={experiences!.length === 0}
                                 >
                                    <span className="font-bold text-sm">Next: Education</span>
                                 </Button>
                              </div>
                           </>
                        ) : (
                           <GeneratorForm2
                              ref={form2Ref}
                              data={currentExperienceData}
                              onSubmit={handleStep2Submit}
                              onCancel={handleFormCancel}
                              className="w-full"
                           />
                        )}
                     </div>
                  )}

                  {/* Step 2 - Work Experience */}
                  {currentStep === 3 && (
                     <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 overflow-y-auto h-[calc(100vh-8rem)] px-4 lg:px-6">
                        <span className="font-semibold text-lg">Work History Summary</span>

                        {!showForm ? (
                           <>
                              {/* Display existing experiences */}
                              {educationItems}

                              {/* Add new experience button */}
                              <div className="px-4 py-6 rounded-lg border-3 border-gray-400 border-dashed 
                                 flex justify-center items-center mt-4 cursor-pointer"
                                 onClick={handleAddNewExperience}
                              >
                                 <div className="flex gap-1 items-center text-blue-600 hover:underline">
                                    <CirclePlus className="w-5 h-5" />
                                    <p className="font-bold text-sm mt-1">Add Education</p>
                                 </div>
                              </div>

                              {/* Navigation buttons */}
                              <div className="my-2 flex justify-end flex-row gap-2">
                                 <Button
                                    intent="default"
                                    className="lg:w-52"
                                    onClick={() => setCurrentStep(1)}
                                 >
                                    <span className="font-bold text-sm">Back</span>
                                 </Button>
                                 <Button
                                    intent="success"
                                    className="lg:w-52"
                                    onClick={nextStep}
                                    disabled={experiences!.length === 0}
                                 >
                                    <span className="font-bold text-sm">Next: Education</span>
                                 </Button>
                              </div>
                           </>
                        ) : (
                           <GeneratorForm3
                              ref={form3Ref}
                              data={currentEducationData}
                              onSubmit={handleStep3Submit}
                              onCancel={handleFormCancel}
                              className="w-full"
                           />
                        )}
                     </div>
                  )}


               </div>

               {/* Preview Section */}
               {currentStep === 1 && (
                  <div className="w-full lg:w-1/3 xl:w-2/5 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-6 overflow-hidden">
                     <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Live Preview</h3>
                     </div>
                     <div className="scale-75 lg:scale-90 origin-top">
                        <Sample3
                           ref={ref}
                           data={finalCV || biodataCurr}
                           scale="sm"
                           size="xs"
                           textSize="xs"
                           iconSize="xs"
                           variantText="tiny"
                           sidebarWidth={25}
                           printable="noPrint"
                           primaryColor={'#FFFFF'}
                           sidebarColor={'#8B8EBC'}
                           skillColor={'#262424'}
                           className="bg-transparent shadow-none p-0"
                           childrenClassName="max-h-none"
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}