'use client'

import { User } from 'lucide-react'
import React from 'react'
import {
  ChevronRight,
  GraduationCap,
  BookCheck,
  ScrollText
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faMapPin, faLink } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedinIn, faTelegram } from '@fortawesome/free-brands-svg-icons'
import moment from 'moment'
import '@/assets/styles/exampleCurr/_example1.css'
import { ICurrVitae } from '@/interface/curiculumVitae'

interface CVProps {
  data?: ICurrVitae
}

export default function Sample({ data }: CVProps) {
  return (
    <>
      {/* Print Styles */}
      <div className="min-h-screen flex justify-center items-start py-8 bg-gray-100 print:bg-white print:py-0">
        <div className="cv-container flex w-full max-w-4xl bg-white shadow-lg min-h-fit print:shadow-none">

          {/* BIOGRAPHY SIDEBAR */}
          <div className="sidebar lg:w-[25%] w-full bg-[#E3E9EF] min-h-full">
            <div className="flex justify-center">
              <div className="w-full aspect-square p-4 border border-black flex items-center justify-center max-w-[200px] mx-auto lg:max-w-none">
                <User className="w-3/4 h-3/4" />
              </div>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col p-4 gap-y-2">
              <span className="text-blue-500 font-semibold text-lg">CONTACTS</span>
              {/* Phone */}
              {data?.contacts?.phone && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faPhone} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.phone}
                  </span>
                </div>
              )}

              {/* Email */}
              {data?.contacts?.email && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.email}
                  </span>
                </div>
              )}

              {/* Address/Location - if you add this to your contacts interface */}
              {data?.contacts?.address && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faMapPin} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500 line-clamp-1">
                    {data.contacts.address}
                  </span>
                </div>
              )}

              {/* LinkedIn */}
              {data?.contacts?.linkedin && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.linkedin}
                  </span>
                </div>
              )}

              {/* Telegram */}
              {data?.contacts?.telegram && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faTelegram} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.telegram}
                  </span>
                </div>
              )}

              {/* Instagram */}
              {data?.contacts?.instagram && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faInstagram} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.instagram}
                  </span>
                </div>
              )}

              {/* Otherwise (custom contact) */}
              {data?.contacts?.otherwise && (
                <div className="flex flex-row gap-2 items-center w-full justify-start">
                  <FontAwesomeIcon icon={faLink} className="text-[17px] text-gray-700 w-6" />
                  <span className="font-semibold text-[12px] text-gray-500">
                    {data.contacts.otherwise.name}: {data.contacts.otherwise.username}
                  </span>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <hr className="h-[3px] bg-[#5C74A5] mx-3 rounded" />
            <div className="flex flex-col p-4">
              <span className="text-blue-500 font-semibold text-lg">PROFILE</span>
              <p className="text-[11px] font-light leading-relaxed mt-2">{data?.profile}</p>
            </div>

            {/* SKILLS */}
            <hr className="h-[3px] bg-[#5C74A5] mx-3 rounded" />
            <div className="flex flex-col p-4">
              <span className="text-blue-500 font-semibold text-lg">SKILL LEVELS</span>
              <ul className="list-none px-1 py-2 flex flex-col gap-3">
                {data?.skills?.map((item: any, key: number) => (
                  <li key={key}>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-normal">{item?.name}</span>
                      <div className="grid grid-cols-5 gap-0.5">
                        {Array.from({ length: item?.level }, (_, index) => (
                          <div
                            key={index}
                            className={`h-4 rounded-sm ${item.isHasLevel && index < item.level
                              ? 'bg-blue-400'
                              : 'bg-gray-400'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* MAIN CONTENT */}
          <div className="main-content lg:w-[75%] w-full bg-white px-6 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-1 mb-6">
              <span className="font-bold text-[#5977AC] text-3xl lg:text-4xl">{`${data?.firstName} ${data?.lastName}`}</span>
              <span className="font-semibold text-black text-lg">{data?.role.toUpperCase()}</span>
            </div>

            {/* TIMELINE */}
            <div className="flex my-4 mx-2">
              <ol className="relative border-s border-gray-200">

                {/* EXPERIENCE */}
                <li className="mb-8 ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                    <BookCheck className="text-blue-800 w-4 h-4" />
                  </span>
                  <h3 className="flex items-center mb-3 text-lg font-semibold text-gray-900">Experience</h3>

                  <ul className="space-y-4 list-disc pl-4">
                    {data?.experience?.toReversed()?.map((item: any, key: number) => (
                      <li key={key}>
                        <span className="block mb-2 text-sm font-bold leading-none text-gray-600">
                          {`${item?.jobTitle} - ${item?.company}`}
                        </span>
                        <time className="flex items-center mb-2 text-sm font-medium leading-none text-gray-500">
                          {moment(item?.startDate).format('MMMM, Do YYYY')}
                          <ChevronRight className="w-4 h-4 mx-1" />
                          {item?.isCurrent ? 'Current' : moment(item?.endDate).format('MMMM, Do YYYY')}
                        </time>
                        <p className="mb-2 text-sm font-normal text-gray-500 leading-relaxed">{item?.descJob}</p>
                      </li>
                    ))}
                  </ul>

                </li>

                {/* EDUCATION */}
                <li className="mb-8 ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                    <GraduationCap className="text-blue-800 w-4 h-4" />
                  </span>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Education
                  </h3>

                  <ul className="space-y-2 list-disc pl-4">
                    {data?.education?.map((item: any, key: number) => (
                      <li key={key}>
                        <span className="block mb-2 text-sm font-bold leading-none text-gray-600">
                          {`${item?.degree} of ${item?.major} - ${item?.university.split('|')[0]}`}
                        </span>
                        {item?.graduatedStatus ? (
                          <>
                            <time className="flex items-center mb-2 text-sm font-medium leading-none text-gray-500">
                              {`G raduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                            </time>
                            <p className="text-sm font-normal text-gray-500">
                              {`GPA: ${item?.gpa} - ${item?.gpaStatus}`}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-normal text-gray-500">
                            Not Graduated Yet
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>

                {/* CERTIFICATIONS */}
                <li className="mb-8 ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
                    <ScrollText className="text-blue-800 w-4 h-4" />
                  </span>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Certifications
                  </h3>

                  <ul className="space-y-2 list-disc pl-4">
                    {data?.certification?.map((item: any, key: number) => (
                      <li key={key}>
                        <span className="block mb-1 text-sm font-medium leading-none text-gray-600">
                          {`${item?.name} - ${item?.company}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>

              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}