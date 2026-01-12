'use client'

import { LabelValueProps } from '@/interface/select'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import Card from '@/components/CultUI/Card'
import { Resolver, useForm, useWatch } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CheckBoxForm from '@/components/globals/form/CheckBoxForm'
import { IFilterCur } from '@/interface/curiculumVitae'
import { joinClass } from '@/utils/common'
import RadioForm from '@/components/globals/form/RadioForm'
import Button from '@/components/CultUI/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface FilterProps {
  filter?: any
  setFilter: React.Dispatch<React.SetStateAction<any>> | ((val?: any) => void)
  className?: string
  defaultValue?: any
}

const headOpt: LabelValueProps[] = [
  {
    label: 'With Photo',
    value: 1,
  },
  {
    label: 'Without Photo',
    value: 0,
  },
]

const styleOpt: LabelValueProps[] = [
  {
    label: 'Modern',
    value: 'MODERN',
  },
  {
    label: 'ATS',
    value: 'ATS',
  },
]

const schema = Yup.object().shape({
  head: Yup.string().nullable().optional(),
  style: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.mixed<string>().required(),
        value: Yup.mixed<string>().required(),
      }),
    )
    .nullable()
    .optional(),
})

const Filter = forwardRef(
  ({ filter, setFilter, className, defaultValue }: FilterProps, ref) => {
    const { handleSubmit, control, reset } = useForm<IFilterCur>({
      resolver: yupResolver(schema) as Resolver<IFilterCur>,
      mode: 'onChange',
    })
    const formValue = useWatch({ control })
    const isFilterActive =
      !!formValue?.head ||
      (Array.isArray(formValue?.style) && formValue?.style?.length > 0)

    const onResetForm = () => {
      reset({
        head: null,
        style: null,
      })

      setFilter(defaultValue)
    }

    useImperativeHandle(ref, () => {
      return {
        reset() {
          onResetForm()
        },
      }
    })

    useEffect(() => {
      const newFilter: any = {}

      console.log('form value type', typeof formValue?.style)
      console.log('form value', formValue?.style)

      if (formValue?.head !== undefined && formValue?.head !== null) {
        newFilter.isPhoto = formValue.head
      }

      if (Array.isArray(formValue?.style)) {
        newFilter.styles = formValue.style
      }

      setFilter((prev: any) => ({
        ...prev,
        ...newFilter,
      }))
    }, [formValue, setFilter])

    return (
      <Card
        className={joinClass('w-full', className)}
        childrenClass="flex flex-col gap-1"
      >
        {isFilterActive && (
          <Button intent="danger" className=" my-2" onClick={onResetForm}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        )}
        <form className="grid gap-4" onSubmit={handleSubmit(setFilter)}>
          {/* Head Filter */}
          <div className="grid">
            <span className="font-bold">Heads</span>
            <RadioForm
              fieldLabel={{ children: '' }}
              name="head"
              fieldInput={headOpt as any}
              classNameWrapper="flex flex-col lg:gap-y-1"
              classNameInput="radio-neutral"
              control={control}
            />
          </div>

          {/* Style Filter */}
          <div className="grid">
            <span className="font-bold">Style</span>
            <CheckBoxForm
              fieldLabel={{ children: '' }}
              name="style"
              control={control}
              titleClassName="text-sm"
              fieldInput={styleOpt}
              classNameWrapper="flex flex-col lg:flex-col lg:flex-justify-start my-2"
            />
          </div>
        </form>
      </Card>
    )
  },
)

Filter.displayName = 'Filter'

export default Filter
