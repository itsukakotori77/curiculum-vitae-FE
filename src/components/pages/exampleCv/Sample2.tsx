import React from 'react'
import '@/assets/styles/exampleCurr/_example2.css'

interface Sample2Props {
  data?: any
}

export default function Sample2({ data }: Sample2Props) {
  return (
    <div className="min-h-screen flex justify-center items-start py-8 bg-gray-100 print:bg-white print:py-0">
      <div className="cv-container flex flex-col gap-3 w-full max-w-4xl bg-white shadow-lg min-h-fit sample2-container print:shadow-none">

        {/* BIOGRAPHY MAIN */}
        <div className="flex flex-col w-full">
          <div className="flex justify-center flex-col items-center w-full">
            <span className="font-bold text-2xl tracking-wide">RAHANDANU RACHMAT</span>
            <span className="font-medium text-lg tracking-wide">Software Engineer</span>
            <span className="font-medium text-sm tracking-normal whitespace-normal text-center">
              Jln. Haji Bakar No 41/65 RT/RW 01/06, Kel. Utama, Kec. Cimahi Selatan, Kota Cimahi, 40533
            </span>
          </div>

          <div className="flex justify-evenly">
            <span className="font-bold text-md">rahandanu77@gmail.com</span>
            <span className="font-bold text-md">(+62)85294113350</span>
          </div>
        </div>

        <hr className="h-[3px] bg-black w-full" />

        {/* SUMMARY */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">SUMMARY</span>
          </div>
          <p className="text-xs text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">EXPERIENCE</span>
          </div>
          <ul className="list-none">
            <li className="grid gap-2 mb-3">
              <div className="flex items-end justify-between">
                <span className="font-bold text-sm">IT Staff, PT Bencoolen Coffee</span>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                <time className="text-sm font-medium">
                  January 13th, 2024 - Present
                </time>
              </div>
              <p className="text-xs font-light text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </li>
            <li className="grid gap-2 mb-3">
              <div className="flex items-end justify-between">
                <span className="font-bold text-sm">IT Staff, PT Bencoolen Coffee</span>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                <time className="text-sm font-medium">
                  January 13th, 2024 - Present
                </time>
              </div>
              <p className="text-xs font-light text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </li>
            <li className="grid gap-2 mb-3">
              <div className="flex items-end justify-between">
                <span className="font-bold text-sm">IT Staff, PT Bencoolen Coffee</span>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                <time className="text-sm font-medium">
                  January 13th, 2024 - Present
                </time>
              </div>
              <p className="text-xs font-light text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </li>
          </ul>
        </div>

        {/* EDUCATION */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">EDUCATION</span>
          </div>
          <ul className="list-none">
            <li className="grid gap-2 mb-3">
              <div className="flex items-end justify-between">
                <span className="font-bold text-sm">IT Staff, PT Bencoolen Coffee</span>
                <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
                <time className="text-sm font-medium">
                  January 13th, 2024 - Present
                </time>
              </div>
              <p className="text-xs font-light text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </li>
          </ul>
        </div>

        {/* SKILLS */}
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-center items-center bg-[#F2F2F2] w-full">
            <span className="font-bold">SKILLS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-end justify-between">
              <span className="font-normal text-sm">Laravel</span>
              <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-normal text-sm">NextJs</span>
              <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-normal text-sm">ReactJs</span>
              <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-normal text-sm">VueJs</span>
              <div className="flex-1 border-b border-dotted border-black mx-1 mb-[4.5px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
