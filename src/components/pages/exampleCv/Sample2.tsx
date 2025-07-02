import React from 'react'
import '@/assets/styles/exampleCurr/_example2.css'
import { ICurrVitae } from '@/interface/curiculumVitae'
import moment from 'moment'

interface Sample2Props {
  data?: ICurrVitae
}

export default function Sample2({ data }: Sample2Props) {
  return (
    <div className="min-h-screen flex justify-center items-start py-8 bg-gray-100 print:bg-white print:py-0">
      <div className="cv-container flex flex-col gap-3 w-full max-w-4xl bg-white shadow-lg min-h-fit sample2-container print:shadow-none">

        {/* BIOGRAPHY MAIN */}
        <div className="flex flex-col w-full">
          <div className="flex justify-center flex-col items-center w-full">
            <span className="font-bold text-2xl tracking-wide">{`${data?.firstName.toUpperCase()} ${data?.lastName.toUpperCase()}`}</span>
            <span className="font-medium text-lg tracking-wide">{data?.role}</span>
            <span className="font-medium text-sm tracking-normal whitespace-normal text-center">{data?.contacts?.address}</span>
          </div>

          <div className="flex justify-evenly">
            <span className="font-bold text-md">{data?.contacts?.email}</span>
            <span className="font-bold text-md">{data?.contacts?.phone}</span>
          </div>
        </div>

        <hr className="h-[3px] bg-black w-full" />

        {/* SUMMARY */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">SUMMARY</span>
          </div>
          <p className="text-xs text-justify">{data?.profile}</p>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">EXPERIENCE</span>
          </div>
          <ul className="list-none">
            {data?.experience?.toReversed().map((item: any, key: number) => (
              <li key={key} className="grid gap-2 mb-3">
                <div className="flex items-end justify-between">
                  <span className="font-bold text-sm">{`${item?.jobTitle}, ${item?.company}`}</span>
                  <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                  <time className="text-sm font-medium">
                    {`${moment(item?.startDate).format('MMMM, Do YYYY')} - ${item?.isCurrent ? 'Current' : moment(item?.endDate).format('MMMM, Do YYYY')}`}
                  </time>
                </div>
                <p className="text-xs font-light text-justify">{item?.descJob}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* EDUCATION */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">EDUCATION</span>
          </div>
          <ul className="list-none">
            {data?.education?.map((item: any, key: number) => (
              <li key={key} className="grid gap-2 mb-3">
                <div className="flex items-end justify-between">
                  <span className="font-bold text-sm">{`${item?.major}, ${item?.university.split('|')[1]}`}</span>
                  <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                  {item?.graduatedStatus ? (
                    <>
                      <time className="text-sm font-medium">
                        {`Graduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                      </time>
                    </>
                  ) : (
                    <p className="text-sm font-normal text-gray-500">
                      Not Graduated Yet
                    </p>
                  )}
                </div>
                <p className="text-xs font-light text-justify">{item?.majorDesc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* SKILLS */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">SKILLS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {data?.skills?.map((item: any, key: number) => (
              <div key={key} className="flex items-end justify-between">
                <span className="font-normal text-sm">{item?.name}</span>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
