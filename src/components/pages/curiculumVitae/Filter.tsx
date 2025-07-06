'use client'

import { LabelValueProps } from '@/interface/select'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import Card from '@/components/CultUI/Card'
import { Resolver, useForm, useWatch } from 'react-hook-form'
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import CheckBoxForm from '@/components/globals/form/CheckBoxForm'
import { IFilterCur } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'

interface FilterProps {
   filter?: any
   setFilter: React.Dispatch<React.SetStateAction<any>> | ((val?: any) => void)
   className?: string
}

const headOpt: LabelValueProps[] = [
   {
      label: 'With Photo',
      value: 1
   },
   {
      label: 'Without Photo',
      value: 0
   },
]

const styleOpt: LabelValueProps[] = [
   {
      label: 'Traditional',
      value: 'traditional'
   },
   {
      label: 'Creative',
      value: 'creative'
   },
   {
      label: 'ATS',
      value: 'ats'
   },
]

const schema = Yup.object().shape({
   head: Yup.object().shape({
      label: Yup.mixed<string | number>().required(),
      value: Yup.mixed<string | number>().required()
   }).nullable().optional(),
   style: Yup.object().shape({
      label: Yup.mixed<string | number>().required(),
      value: Yup.mixed<string | number>().required()
   }).nullable().optional()
})

const Filter = forwardRef(
   ({ filter, setFilter, className }: FilterProps, ref) => {

      const { handleSubmit, control, reset, register, watch } = useForm<IFilterCur>({
         resolver: yupResolver(schema) as Resolver<IFilterCur>,
         mode: 'onChange'
      })

      const formValue = useWatch({ control })

      const onResetForm = () => {
         reset({
            head: headOpt.find(item => item.value == filter.head),
            style: styleOpt.find(item => item.value == filter.style)
         })
      }

      // useEffect(() => {
      //    onResetForm()
      // }, [filter])

      useImperativeHandle(
         ref, () => {
            return {
               reset() {
                  onResetForm()
               }
            }
         }
      )

      useEffect(() => {
         const newFilter = {
            head: formValue?.head?.[0],
            style: formValue?.style?.map((item: any) => {
               return item
            }) || []
         }
         
         setFilter(newFilter)

         console.log('NEW filter being set:', newFilter) // This shows what you're actually setting
         console.log('OLD filter state (has delay):', filter.style) // This shows the previous state
      }, [formValue, setFilter])

      return (
         <Card
            className={joinClass('w-full', className)}
         >
            <form
               className="grid gap-4"
               onSubmit={handleSubmit(setFilter)}
            >
               {/* Head Filter */}
               <div className="grid">
                  <span className="font-bold">Heads</span>
                  <CheckBoxForm
                     fieldLabel={{ children: '' }}
                     name="head"
                     register={register}
                     titleClassName="text-sm"
                     fieldInput={headOpt}
                     classNameWrapper="my-2"
                  />
               </div>

               {/* Style Filter */}
               <div className="grid">
                  <span className="font-bold">Style</span>
                  <CheckBoxForm
                     fieldLabel={{ children: '' }}
                     name="style"
                     register={register}
                     titleClassName="text-sm"
                     fieldInput={styleOpt}
                     classNameWrapper="flex flex-col lg:flex-col lg:flex-justify-start my-2"
                  />
               </div>
            </form>
         </Card>
      )
   }
)

Filter.displayName = 'Filter'

export default Filter


