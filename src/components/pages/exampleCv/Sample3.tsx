import { ChevronRight, User } from 'lucide-react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedinIn, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'
import '@/assets/styles/exampleCurr/_example3.css'
import { ICurrVitae } from '@/interface/curiculumVitae'
import moment from 'moment'

interface CVProps {
   data?: ICurrVitae
}

export default function Sample3({ data }: CVProps) {
   return (
      <>
         {/* PRINT STYLES */}
         <div className="min-h-screen flex justify-center items-start py-8 bg-gray-100 print:bg-white print:py-0 print:px-0">
            <div className="cv-container p-5 flex w-full max-w-4xl bg-white shadow-lg min-h-fit sample3-container print:shadow-none">

               {/* BIOGRAPHY */}
               <div className="sidebar lg:w-[25%] w-full bg-[#8B8EBC] min-h-full">
                  <div className="flex justify-center p-4 flex-col">
                     <div className="w-full aspect-square p-4 flex items-center 
                        justify-center max-w-[200px] mx-auto lg:max-w-none bg-blue-500 rounded-full">
                        <User className="w-3/4 h-3/4"
                        />
                     </div>

                     {/* CONTACTS */}
                     <div className="flex flex-col my-4">
                        <span className="font-bold text-lg">CONTACTS</span>
                        <div className="h-1.5 rounded-sm bg-[#403D3D]"></div>
                        <div className="grid my-2 gap-2">
                           {/* Phone/WhatsApp */}
                           {data?.contacts?.phone && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faWhatsapp} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.phone}
                                 </span>
                              </div>
                           )}

                           {/* Telegram */}
                           {data?.contacts?.telegram && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faTelegram} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.telegram}
                                 </span>
                              </div>
                           )}

                           {/* Email */}
                           {data?.contacts?.email && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faEnvelope} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.email}
                                 </span>
                              </div>
                           )}

                           {/* LinkedIn */}
                           {data?.contacts?.linkedin && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faLinkedinIn} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.linkedin}
                                 </span>
                              </div>
                           )}

                           {/* Instagram */}
                           {data?.contacts?.instagram && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faInstagram} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.instagram}
                                 </span>
                              </div>
                           )}

                           {/* Otherwise (custom contact) */}
                           {data?.contacts?.otherwise && (
                              <div className="flex justify-start items-center gap-2">
                                 <FontAwesomeIcon icon={faLink} className="text-[22px] w-7" />
                                 <span className="font-light text-sm tracking-wide">
                                    {data.contacts.otherwise.name}: {data.contacts.otherwise.username}
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* SKILLS */}
                     <div className="flex flex-col my-2">
                        <span className="font-bold text-lg">SKILLS</span>
                        <div className="h-1.5 rounded-sm bg-[#403D3D]"></div>
                        <div className="grid my-2 gap-1.5">
                           {data?.skills?.map((item: any, key: number) => (
                              <div className="flex flex-col items-start" key={key}>
                                 <span className="font-medium">{item?.name}</span>
                                 <div className="grid grid-cols-5 w-full">
                                    {Array.from({ length: item?.level }, (_, index) => (
                                       <div
                                          key={index}
                                          className={`h-3.5 w-full ${item?.isHasLevel && index < item.level
                                             ? 'bg-gray-800'
                                             : ''
                                             }`}
                                       >
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="main-content lg:w-[75%] w-full">
                  {/* DETAIL */}
                  <div className="border-t-4 border-b-4 border-r-4 border-[#8B8EBC] p-4">
                     <div className="flex flex-col justify-center items-center gap-2">
                        <span className="font-bold text-3xl">{`${data?.firstName.toUpperCase()} ${data?.lastName.toUpperCase()}`}</span>
                        <div className="bg-[#8B8EBC] h-2.5 w-1/4"></div>
                        <span className="font-light text-xl">{data?.role}</span>
                     </div>
                  </div>

                  {/* TIMELINE */}
                  <div className="flex w-full flex-col items-start my-2 py-2 pl-4">
                     {/* PROFILE */}
                     <div className="group flex gap-x-5 w-full">
                        <div className="relative">
                           <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                           <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                 bg-white border-4 border-[#8B8EBC] text-[#8B8EBC] 
                                 font-extrabold text-lg"
                           >1</span>
                        </div>
                        <div className="pb-8 text-slate-600 w-full">
                           <div className="bg-[#8B8EBC] px-2 py-1 mt-1">
                              <p className="font-sans text-white font-bold text-slate-800 antialiased dark:text-white tracking-wide">PROFILE</p>
                           </div>
                           <p className="mt-2 text-xs/4 font-light text-slate-600 px-2 text-justify">{data?.profile}</p>
                        </div>
                     </div>

                     {/* EXPERIENCE */}
                     <div className="group flex gap-x-5 w-full">
                        <div className="relative">
                           <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                           <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                 bg-white border-4 border-[#8B8EBC] text-[#8B8EBC] 
                                 font-extrabold text-lg"
                           >2</span>
                        </div>
                        <div className="pb-8 text-slate-600 w-full">
                           <div className="bg-[#8B8EBC] px-2 py-1 mt-1">
                              <p className="font-sans text-white font-bold text-slate-800 antialiased dark:text-white tracking-wide">EXPERIENCE</p>
                           </div>
                           <ul className="list-disc pl-5 my-2">
                              {data?.experience?.toReversed()?.map((item: any, key: number) => (
                                 <li key={key}>
                                    <div className="flex flex-col gap-1">
                                       <span className="font-bold text-xs">{`${item?.jobTitle} - ${item?.company}`}</span>
                                       <time className="flex items-center text-xs font-medium text-gray-500">
                                          {moment(item?.startDate).format('MMMM, Do YYYY')}
                                          <ChevronRight className="w-4 h-4 mx-1" />
                                          {item?.isCurrent ? 'Current' : moment(item?.endDate).format('MMMM, Do YYYY')}
                                       </time>
                                       <p className="mb-2 text-xs font-light text-gray-500 text-justify">{item?.descJob}</p>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     {/* EDUCATION */}
                     <div className="group flex gap-x-5 w-full">
                        <div className="relative">
                           {data?.certification && data?.certification.length > 1 && (
                              <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div>
                           )}
                           <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                 bg-white border-4 border-[#8B8EBC] text-[#8B8EBC] 
                                 font-extrabold text-lg"
                           >3</span>
                        </div>
                        <div className="pb-8 text-slate-600 w-full">
                           <div className="bg-[#8B8EBC] px-2 py-1 mt-1">
                              <p className="font-sans text-white font-bold text-slate-800 antialiased dark:text-white tracking-wide">EDUCATION</p>
                           </div>

                           <ul className="list-disc pl-5 my-2">
                              {data?.education?.map((item: any, key: number) => (
                                 <li key={key}>
                                    <div className="flex flex-col gap-1">
                                       <span className="font-bold text-xs">{`${item?.degree} of ${item?.major} - ${item?.university.split('|')[0]}`}</span>
                                       {item?.graduatedStatus ? (
                                          <>
                                             <time className="flex items-center text-xs font-medium text-gray-500">
                                                {`Graduated, ${moment(item?.graduated).format('MMMM, Do YYYY')}`}
                                             </time>
                                             <p className="text-xs font-normal text-gray-500">
                                                {`GPA: ${item?.gpa} - ${item?.gpaStatus}`}
                                             </p>
                                          </>
                                       ) : (
                                          <p className="text-sm font-normal text-gray-500">
                                             Not Graduated Yet
                                          </p>
                                       )}
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     {/* CERTIFICATIONS */}
                     {data?.certification && data?.certification.length > 1 && (
                        <div className="group flex gap-x-5 w-full">
                           <div className="relative">
                              {/* <div className="absolute left-1/2 top-0 h-full w-[5px] -translate-x-1/2 bg-gray-500"></div> */}
                              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full 
                                 bg-white border-4 border-[#8B8EBC] text-[#8B8EBC] 
                                 font-extrabold text-lg"
                              >4</span>
                           </div>
                           <div className="pb-8 text-slate-600 w-full">
                              <div className="bg-[#8B8EBC] px-2 py-1 mt-1">
                                 <p className="font-sans text-white font-bold text-slate-800 antialiased dark:text-white tracking-wide">
                                    CERTIFICATIONS
                                 </p>
                              </div>

                              <ul className="space-y-0.5 list-disc pl-4 my-4">
                                 {data?.certification?.map((item: any, key: number) => (
                                    <li key={key}>
                                       <span className="block text-xs font-medium text-gray-600">
                                          {`${item?.name} - ${item?.company}`}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
